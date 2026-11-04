import {createHash,randomUUID} from 'node:crypto';
import {existsSync,readdirSync,lstatSync,readFileSync,writeFileSync,mkdirSync,cpSync,renameSync,rmSync} from 'node:fs';
import {resolve,join,dirname,relative} from 'node:path';import {fileURLToPath} from 'node:url';import {homedir} from 'node:os';
const marker='.fluid-ui-install.json';
export function files(root,prefix='',exclude=[]){return readdirSync(join(root,prefix),{withFileTypes:true}).flatMap(e=>{const p=join(prefix,e.name);if(!prefix&&exclude.includes(e.name))return [];if(e.isSymbolicLink())throw Error('拒绝符号链接');return e.isDirectory()?files(root,p,exclude):[p.replaceAll('\\','/')];});}
export const projectFiles=()=>files('.','',['node_modules','.git','.eval-work','dist','.taste-skill','test-results','playwright-report']).filter(p=>!p.startsWith('examples/comparison/enhanced/screenshots/')&&!['examples/comparison/enhanced/browser-results.json','examples/comparison/enhanced/axe-results.json','examples/liquid-generated/ui-verified.png'].includes(p)&&!/^examples\/codex-smoke\/form-.*\.png$/.test(p));
const sha=data=>createHash('sha256').update(data).digest('hex');
function snapshot(root){return Object.fromEntries(files(root).filter(p=>p!==marker).sort().map(p=>[p,sha(readFileSync(join(root,p)))]));}
export function verifyChecksum(data,expected){if(!/^[a-f0-9]{64}$/i.test(expected)||sha(data)!==expected.toLowerCase())throw Error('SHA256 校验失败');return true;}
export function status(target){if(!existsSync(target))return null;if(lstatSync(target).isSymbolicLink())throw Error('拒绝符号链接目标');if(!existsSync(join(target,marker)))throw Error('已有目录不受本安装器管理，存在冲突');const record=JSON.parse(readFileSync(join(target,marker),'utf8'));if(record.name!=='fluid-ui'||record.format!==1)throw Error('安装标记不兼容');return {...record,modified:JSON.stringify(record.files)!==JSON.stringify(snapshot(target))};}
export function install({source,target,confirm=false,failBeforeSwap=false}){
 source=resolve(source);target=resolve(target);if(source===target||relative(source,target)===''||!relative(source,target).startsWith('..'))throw Error('目标不可在源目录内部');
 if(existsSync(source)&&lstatSync(source).isSymbolicLink())throw Error('拒绝链接源');
 if(!readFileSync(join(source,'SKILL.md'),'utf8').includes('name: fluid-ui'))throw Error('Skill 根目录无效');
 const version=readFileSync(join(source,'VERSION'),'utf8').trim();if(!/^\d+\.\d+\.\d+$/.test(version))throw Error('版本无效');
 const sourceFiles=snapshot(source);const prior=status(target);
 if(prior?.modified&&!confirm)throw Error('用户修改冲突，需要备份和明确确认');
 if(prior&&!prior.modified&&prior.version===version&&JSON.stringify(sourceFiles)===JSON.stringify(prior.files))return {result:'unchanged',version};
 if(prior&&!confirm)throw Error('升级、降级或内容改变需要明确确认');
 mkdirSync(dirname(target),{recursive:true});const stage=`${target}.stage-${process.pid}-${Date.now()}`;let backup;
 try{cpSync(source,stage,{recursive:true,errorOnExist:true,force:false});writeFileSync(join(stage,marker),JSON.stringify({format:1,name:'fluid-ui',version,files:sourceFiles},null,2));if(failBeforeSwap)throw Error('暂存失败测试');
 if(prior){backup=`${target}.backup-${Date.now()}-${randomUUID()}`;renameSync(target,backup);}try{renameSync(stage,target);}catch(error){if(backup)renameSync(backup,target);throw error;}
 return {result:'installed',version,backup};
 }finally{if(existsSync(stage))rmSync(stage,{recursive:true});}
}
export function uninstall(target){target=resolve(target);const record=status(target);if(!record) return {result:'absent'};if(record.modified)throw Error('用户修改冲突；备份并人工审查，不删除');rmSync(target,{recursive:true});return {result:'uninstalled'};}
export function targetFor(agent,project){const bases={codex:'.agents',claude:'.claude',cursor:'.cursor',gemini:'.gemini'};if(!bases[agent])throw Error('目标 Agent 无效');return join(project?resolve(project):homedir(),bases[agent],'skills','fluid-ui');}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const [command='status',...args]=process.argv.slice(2);const value=key=>args.includes(key)?args[args.indexOf(key)+1]:undefined;const target=value('--target')||targetFor(value('--agent')||'codex',value('--project'));let result;
 if(command==='install')result=install({source:value('--source')||resolve(dirname(fileURLToPath(import.meta.url)),'../skills/fluid-ui'),target,confirm:args.includes('--confirm-replace')});
 else if(command==='uninstall')result=uninstall(target);else if(command==='status')result=status(target);else throw Error('命令为 install/status/uninstall');console.log(JSON.stringify({target,...result},null,2));
 }catch(error){console.error(error.message);process.exitCode=1;}
}
