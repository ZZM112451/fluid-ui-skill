import {readFileSync} from 'node:fs';import {execFileSync} from 'node:child_process';import {projectFiles} from './manage.mjs';
const patterns=[['private-key',/-----BEGIN [A-Z ]*PRIVATE KEY-----/],['github-token',/gh[pousr]_[A-Za-z0-9]{30,}/],['api-key',/sk-(?:proj-)?[A-Za-z0-9_-]{30,}/],['local-path',/[CD]:[\\/](?:Users|xwechat_files)[\\/]/i],['credential-assignment',/(?:api_key|access_token|client_secret)\s*[:=]\s*["'][A-Za-z0-9_-]{24,}["']/i]];
let count=0;const hits=[];
function scan(data,label){if(data.includes(0))return;const text=data.toString('utf8');for(const [kind,re]of patterns)if(re.test(text))hits.push({label,kind});count++;}
const list=projectFiles().filter(p=>!p.endsWith('.png')&&!p.endsWith('.zip')&&!p.endsWith('.log'));
for(const path of list)scan(readFileSync(path),path);
let commits=0;try{const shas=execFileSync('git',['rev-list','--all'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);commits=shas.length;for(const sha of shas){const paths=execFileSync('git',['ls-tree','-r','--name-only',sha],{encoding:'utf8'}).trim().split('\n').filter(Boolean);for(const path of paths)scan(execFileSync('git',['show',`${sha}:${path}`],{maxBuffer:20*1024*1024}),`${sha.slice(0,8)}:${path}`);}}catch(e){if(!/unknown revision|does not have any commits|not a git repository|bad default revision/.test(String(e.stderr||e.message)))throw e;}
console.log(JSON.stringify({scanner:'内置规则替代扫描，不等同于 gitleaks 全规则集',files:list.length,scannedRecords:count,historyCommits:commits,hits},null,2));if(hits.length)process.exitCode=1;
