param(
 [ValidateSet('install','status','uninstall')][string]$Action='install',
 [ValidateSet('codex','claude','cursor','gemini')][string]$Agent='codex',
 [string]$Project,
 [string]$Version,
 [string]$SHA256,
 [string]$Archive,
 [switch]$ConfirmReplace
)
$ErrorActionPreference='Stop'
$repoRoot=Split-Path $PSScriptRoot -Parent
$stageRoot=$null
try {
 if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw '需要 Node.js 22 或更高版本' }
 $nodeVersion=& node --version
 if ([int]($nodeVersion.TrimStart('v').Split('.')[0]) -lt 22) { throw '需要 Node.js 22 或更高版本' }
 if ($Version) {
  if ($Version -notmatch '^\d+\.\d+\.\d+$' -or $SHA256 -notmatch '^[a-fA-F0-9]{64}$') { throw '固定版本和 SHA256 必填，版本格式为 1.0.0' }
  $stageRoot=Join-Path ([IO.Path]::GetTempPath()) ('fluid-ui-download-'+[guid]::NewGuid())
  New-Item -ItemType Directory -Path $stageRoot | Out-Null
  $zipPath=Join-Path $stageRoot 'release.zip'
  if ($Archive) { Copy-Item -LiteralPath $Archive -Destination $zipPath }
  else { Invoke-WebRequest -Uri "https://github.com/ZZM112451/fluid-ui-skill/releases/download/v$Version/fluid-ui-skill-v$Version.zip" -OutFile $zipPath }
  $hashAlgorithm=[Security.Cryptography.SHA256]::Create()
  $archiveStream=[IO.File]::OpenRead($zipPath)
  try {$actualSHA=[BitConverter]::ToString($hashAlgorithm.ComputeHash($archiveStream)).Replace('-','').ToLowerInvariant()}
  finally {$archiveStream.Dispose();$hashAlgorithm.Dispose()}
  if ($actualSHA -ne $SHA256.ToLowerInvariant()) { throw 'SHA256 校验失败，现有安装未改动' }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $zip=[IO.Compression.ZipFile]::OpenRead($zipPath)
  try {
   $totalBytes=0L
   foreach($entry in $zip.Entries) {
    $totalBytes+=$entry.Length
    if ($entry.FullName -match '(^/|^[a-zA-Z]:|\\|(^|/)\.\.(/|$))' -or (($entry.ExternalAttributes -shr 16) -band 0xF000) -eq 0xA000) { throw '归档包含不安全路径或链接' }
   }
   if($totalBytes -gt 50MB -or $zip.Entries.Count -gt 1000){throw '归档超过允许大小'}
  } finally { $zip.Dispose() }
  $extractPath=Join-Path $stageRoot 'unpacked'
  [IO.Compression.ZipFile]::ExtractToDirectory($zipPath,$extractPath)
  $repoRoot=Join-Path $extractPath "fluid-ui-skill-v$Version"
  if (-not (Test-Path -LiteralPath (Join-Path $repoRoot 'skills/fluid-ui/SKILL.md'))) { throw 'Release 根目录无效' }
  if((Get-Content -LiteralPath (Join-Path $repoRoot 'VERSION') -Raw).Trim() -ne $Version){throw '归档版本与请求版本不一致'}
  if((Get-Content -LiteralPath (Join-Path $repoRoot 'skills/fluid-ui/VERSION') -Raw).Trim() -ne $Version){throw 'Skill 版本与请求版本不一致'}
 }
 $nodeArgs=@((Join-Path $PSScriptRoot 'manage.mjs'),$Action,'--agent',$Agent,'--source',(Join-Path $repoRoot 'skills/fluid-ui'))
 if($Project){$nodeArgs+=@('--project',$Project)}
 if($ConfirmReplace){$nodeArgs+='--confirm-replace'}
 & node @nodeArgs
 if($LASTEXITCODE -ne 0){throw "安装器失败，退出码 $LASTEXITCODE"}
} finally {
 if($stageRoot -and (Test-Path -LiteralPath $stageRoot)){
  $resolvedStage=[IO.Path]::GetFullPath($stageRoot)
  $tempBase=[IO.Path]::GetFullPath([IO.Path]::GetTempPath())
  if($resolvedStage.StartsWith($tempBase,[StringComparison]::OrdinalIgnoreCase) -and (Split-Path $resolvedStage -Leaf).StartsWith('fluid-ui-download-')){Remove-Item -LiteralPath $resolvedStage -Recurse -Force}
 }
}
