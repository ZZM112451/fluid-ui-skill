import {cpSync, mkdirSync, rmSync, writeFileSync, readFileSync, statSync} from 'node:fs';
import {resolve, dirname, sep} from 'node:path';
import {files} from './manage.mjs';

// Keep this assembly shared by local tests and the Pages deployment.
const output=resolve('_site');
rmSync(output,{recursive:true,force:true});
mkdirSync(output,{recursive:true});
cpSync('site',output,{recursive:true});
for(const directory of ['demo','docs'])cpSync(directory,resolve(output,directory),{recursive:true});
const core='skills/fluid-ui/scripts/core.mjs';
mkdirSync(dirname(resolve(output,core)),{recursive:true});
cpSync(core,resolve(output,core));
writeFileSync(resolve(output,'.nojekyll'),'');

// Check nested HTML, stylesheets and ES module imports, not only the landing page.
let checked=0;
for(const file of files(output).filter(p=>/\.(html|css|mjs|js)$/.test(p))){
  const text=readFileSync(resolve(output,file),'utf8');
  const references=[...text.matchAll(/(?:href|src)=["']([^"']+)["']/g),
    ...text.matchAll(/\b(?:from\s*|import\s*)["']([^"']+)["']/g),
    ...text.matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)];
  for(const match of references){
    const reference=match[1];
    if(/^(?:[a-z]+:|#|\/\/)/i.test(reference))continue;
    const target=resolve(dirname(resolve(output,file)),decodeURIComponent(reference.split(/[?#]/)[0]));
    if(!target.startsWith(output+sep)&&target!==output)throw Error(`${file}: reference escapes site: ${reference}`);
    let info;
    try{info=statSync(target);if(info.isDirectory())info=statSync(resolve(target,'index.html'));}
    catch{throw Error(`${file}: missing reference: ${reference}`);}
    if(!info.isFile())throw Error(`${file}: not a file: ${reference}`);
    checked++;
  }
}
console.log(`Assembled _site; ${checked} local references resolved, including module imports.`);
