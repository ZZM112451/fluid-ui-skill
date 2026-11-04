#!/usr/bin/env bash
set -euo pipefail
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(dirname -- "$script_dir")"
action=install agent=codex project='' version='' checksum='' archive='' confirm=false
while (($#)); do
 case "$1" in
 --action) action="$2"; shift 2;; --agent) agent="$2"; shift 2;;
 --project) project="$2"; shift 2;; --version) version="$2"; shift 2;;
 --sha256) checksum="$2"; shift 2;; --archive) archive="$2"; shift 2;;
 --confirm-replace) confirm=true; shift;; *) echo "未知参数: $1" >&2; exit 2;;
 esac
done
command -v node >/dev/null || { echo '需要 Node.js 22+' >&2; exit 2; }
node -e 'if(Number(process.versions.node.split(".")[0])<22)process.exit(1)'
if [[ -n "$version" ]]; then
 [[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ && "$checksum" =~ ^[a-fA-F0-9]{64}$ ]] || { echo '固定版本与 SHA256 必填' >&2; exit 2; }
 stage="$(mktemp -d -t fluid-ui-download.XXXXXXXX)"
 trap 'rm -rf -- "$stage"' EXIT
 if [[ -n "$archive" ]]; then cp -- "$archive" "$stage/release.zip";
 else curl --fail --location --proto '=https' --tlsv1.2 "https://github.com/ZZM112451/fluid-ui-skill/releases/download/v$version/fluid-ui-skill-v$version.zip" -o "$stage/release.zip"; fi
 node --input-type=module - "$stage/release.zip" "$checksum" <<'JS'
import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
if(createHash('sha256').update(readFileSync(process.argv[2])).digest('hex')!==process.argv[3].toLowerCase())throw Error('SHA256 校验失败');
JS
 command -v unzip >/dev/null || { echo '需要 unzip 与 zipinfo' >&2; exit 2; }
 command -v zipinfo >/dev/null || { echo '需要 zipinfo' >&2; exit 2; }
 unzip -Z1 "$stage/release.zip" > "$stage/entries"
 if grep -Eq '(^/|^[a-zA-Z]:|\\|(^|/)\.\.(/|$))' "$stage/entries"; then echo '不安全归档路径' >&2; exit 2; fi
 zipinfo -l "$stage/release.zip" > "$stage/entry-modes"
 if grep -Eq '^l' "$stage/entry-modes"; then echo '拒绝归档符号链接' >&2; exit 2; fi
 zipinfo -t "$stage/release.zip" > "$stage/size"
 node --input-type=module - "$stage/size" <<'JS'
import {readFileSync} from 'node:fs';const text=readFileSync(process.argv[2],'utf8');
const count=text.match(/(\d+) files?/);const size=text.match(/(\d+) bytes uncompressed/);
if(!count||!size||Number(count[1])>1000||Number(size[1])>50*1024*1024)throw Error('归档大小或条目数无效');
JS
 unzip -q "$stage/release.zip" -d "$stage/unpacked"
 repo_root="$stage/unpacked/fluid-ui-skill-v$version"
 [[ -f "$repo_root/skills/fluid-ui/SKILL.md" ]] || { echo 'Release 根目录无效' >&2; exit 2; }
 [[ "$(tr -d '\r\n' < "$repo_root/VERSION")" == "$version" ]] || { echo '版本不符' >&2; exit 2; }
 [[ "$(tr -d '\r\n' < "$repo_root/skills/fluid-ui/VERSION")" == "$version" ]] || { echo 'Skill 版本不符' >&2; exit 2; }
fi
args=("$script_dir/manage.mjs" "$action" --agent "$agent" --source "$repo_root/skills/fluid-ui")
[[ -z "$project" ]] || args+=(--project "$project")
[[ "$confirm" == false ]] || args+=(--confirm-replace)
node "${args[@]}"
