param([switch]$AllowRepositoryCreation)
$ErrorActionPreference='Stop'
function CheckExit([string]$Step){if($LASTEXITCODE -ne 0){throw "$Step 失败"}}
$repo='ZZM112451/fluid-ui-skill'
$version=(Get-Content -LiteralPath VERSION -Raw).Trim()
& gh auth status; CheckExit 'GitHub 认证'
$login=& gh api user --jq .login; CheckExit '账号核验'
if($login -ne 'ZZM112451'){throw '当前账号不是已授权 owner'}
if((& git status --porcelain)){throw '请先提交已审查的文件'}
& npm.cmd test; CheckExit '核心测试'
& npm.cmd run validate; CheckExit '结构校验'
& npm.cmd run scan; CheckExit '工作区与历史规则扫描'
& npm.cmd audit --audit-level=moderate; CheckExit '依赖审计'
$repoInfo=& gh repo view $repo --json nameWithOwner,visibility,isEmpty,defaultBranchRef 2>$null
if($LASTEXITCODE -ne 0){
 if(-not $AllowRepositoryCreation){throw '目标仓库无法读取；用户已授权创建时用 -AllowRepositoryCreation，网络/认证问题先诊断'}
 & gh repo create $repo --public --description 'Multi-style UI design and interaction skill for OpenAI Codex';CheckExit '创建仓库'
}else{
 $metadata=$repoInfo|ConvertFrom-Json
 if($metadata.nameWithOwner -ne $repo -or $metadata.visibility -ne 'PUBLIC'){throw '仓库身份或可见性冲突'}
 if(-not $metadata.isEmpty){throw '仓库非空，停止自动发布；请审查远程历史并制定安全合并方案'}
}
$origin=& git remote get-url origin 2>$null
if($LASTEXITCODE -ne 0){& git remote add origin "https://github.com/$repo.git";CheckExit '配置远程'}
elseif($origin -notin @("https://github.com/$repo.git","git@github.com:$repo.git")){throw '远程 URL 冲突'}
& git push -u origin main;CheckExit '推送'
$sha=& git rev-parse HEAD
& gh repo view $repo --json visibility,defaultBranchRef,url;CheckExit '远程元数据核验'
& gh api "repos/$repo/contents/skills/fluid-ui/SKILL.md?ref=$sha" --jq .sha;CheckExit '远程 Skill 核验'
& gh api "repos/$repo/contents/docs/verification/report.md?ref=$sha" --jq .sha;CheckExit '远程报告核验'
Write-Output '等待本次提交的 CI；请先读取 gh run list，确认 run id 后 gh run watch <id> --exit-status。CI 通过后才创建正式 Release。'
Write-Output "待发布版本 v$version，提交 $sha。运行 npm run package 后，以 gh release create 上传 dist ZIP 和 SHA256SUMS；核对下载校验后才报告已发布。"
