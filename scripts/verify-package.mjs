import {readFileSync,writeFileSync,mkdirSync,rmSync,readdirSync} from 'node:fs';
import {resolve,dirname,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {unzipSync} from 'fflate';

const repository=resolve('.'),version=readFileSync('VERSION','utf8').trim();
const name=`fluid-ui-skill-v${version}`,archive=resolve('dist',name+'.zip');
const bytes=readFileSync(archive),sha256=createHash('sha256').update(bytes).digest('hex');
const expected=readFileSync('dist/SHA256SUMS','utf8').trim();
if(expected!==`${sha256}  ${name}.zip`)throw Error('Package checksum mismatch');
const destination=resolve('test-results/package'),root=resolve(destination,name);
rmSync(destination,{recursive:true,force:true});mkdirSync(destination,{recursive:true});
for(const [file,content] of Object.entries(unzipSync(bytes))){
  const target=resolve(destination,file);
  if(file.includes('\\')||!file.startsWith(name+'/')||!target.startsWith(root+sep))throw Error(`Unsafe archive entry: ${file}`);
  mkdirSync(dirname(target),{recursive:true});writeFileSync(target,content);
}
const run=args=>execFileSync(process.execPath,args,{cwd:root,stdio:'inherit',env:{...process.env,
  CI:'true',FLUID_EVIDENCE_DIR:resolve('test-results/package-browser')}});
run(['--test',...readdirSync(resolve(root,'tests')).filter(file=>file.endsWith('.test.mjs')).map(file=>'tests/'+file)]);
run(['scripts/validate.mjs']);
run([resolve(repository,'node_modules/@playwright/test/cli.js'),'test','--config',resolve(root,'playwright.config.mjs')]);
if(createHash('sha256').update(readFileSync(archive)).digest('hex')!==sha256)throw Error('Archive changed during tests');
const results=JSON.parse(readFileSync('test-results/package-browser/results.json','utf8'));
writeFileSync('test-results/package-verification.json',JSON.stringify({version,sha256,bytes:bytes.length,
  source:'dist/'+name+'.zip',browser:results.stats,coreAndValidation:'passed',
  dependencies:'Repository npm ci dependencies, with the same package-lock.json'},null,2)+'\n');
console.log(`Verified extracted release archive: ${name}.zip (${sha256})`);
