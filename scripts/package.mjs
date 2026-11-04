import {zipSync,unzipSync} from 'fflate';import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';import {createHash} from 'node:crypto';import {projectFiles} from './manage.mjs';
const version=readFileSync('VERSION','utf8').trim();const root=`fluid-ui-skill-v${version}`;
if(readFileSync('skills/fluid-ui/VERSION','utf8').trim()!==version)throw Error('仓库与 Skill 版本不一致');
const allowed=['VERSION','LICENSE','README.md','README.zh-CN.md','CHANGELOG.md','THIRD_PARTY_NOTICES.md','package.json','package-lock.json','playwright.config.mjs','.gitignore','.gitattributes'];
const paths=projectFiles().filter(p=>!p.endsWith('.log'))
 .filter(p=>allowed.includes(p)||['skills/','scripts/','demo/','docs/','tests/','examples/','.github/','fluid-ui-v5-handoff/'].some(prefix=>p.startsWith(prefix)));
const content=Object.fromEntries(paths.sort().map(p=>[`${root}/${p}`,readFileSync(p)]));const bytes=zipSync(content,{level:6,mtime:new Date('2026-11-04T00:00:00Z')});
const check=unzipSync(bytes);if(!check[`${root}/skills/fluid-ui/SKILL.md`]||!check[`${root}/LICENSE`])throw Error('包结构无效');
mkdirSync('dist',{recursive:true});const name=`${root}.zip`;writeFileSync(`dist/${name}`,bytes);const hash=createHash('sha256').update(bytes).digest('hex');writeFileSync('dist/SHA256SUMS',`${hash}  ${name}\n`);console.log(JSON.stringify({name,sha256:hash,files:paths.length,bytes:bytes.length},null,2));
