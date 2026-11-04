import {readFileSync,existsSync,readdirSync} from 'node:fs';import {resolve,dirname} from 'node:path';import {projectFiles} from './manage.mjs';import {validateConfig} from '../skills/fluid-ui/scripts/core.mjs';
const failures=[];const check=(ok,message)=>{if(!ok)failures.push(message);};
const skill=readFileSync('skills/fluid-ui/SKILL.md','utf8');check(/^---\nname: fluid-ui\ndescription: .+\n/.test(skill),'frontmatter');check(skill.split('\n').length<500,'SKILL.md 上下文预算');
check(readdirSync('skills/fluid-ui/references/patterns').length===20,'20 个模式');check(readdirSync('skills/fluid-ui/references/styles').length===4,'4 种风格');
for(const file of projectFiles().filter(p=>p.endsWith('.md'))){const text=readFileSync(file,'utf8');for(const m of text.matchAll(/\]\(([^)]+)\)/g)){const link=m[1];if(/^(https?:|#|mailto:)/.test(link))continue;check(existsSync(resolve(dirname(file),decodeURIComponent(link.split('#')[0]))),`${file} 死链接 ${link}`);}}
for(const file of ['LICENSE','README.md','README.zh-CN.md','CHANGELOG.md','docs/compatibility.md','docs/verification/report.md','docs/verification/comparison.md'])check(existsSync(file),`缺少 ${file}`);
validateConfig(JSON.parse(readFileSync('skills/fluid-ui/assets/fluid-ui.config.json','utf8')));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('结构、引用、配置校验通过');
