import {chromium} from '@playwright/test';
import {mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1150,height:1800},deviceScaleFactor:1,reducedMotion:'no-preference'});
await page.goto('http://127.0.0.1:4173/demo/approved-interactions/');
await page.locator('#navigation .lens').waitFor();
mkdirSync('docs/images/approved-gifs',{recursive:true});
const actions=[
['navigation',async()=>{await page.locator('#navigation nav button').nth(2).click()}],
['theme',async()=>{await page.locator('#theme-btn').click()}],
['timer',async()=>{await page.locator('#timer-open').click()}],
['sheet',async()=>{await page.locator('#task-name').fill('阅读一本书');await page.locator('#sheet-next').click()}],
['scroll-fab',async()=>{await page.locator('#fab-scroll').evaluate(el=>el.scrollTop=200)}],
['clipboard',async()=>{await page.context().grantPermissions(['clipboard-read','clipboard-write']);await page.locator('#copy-btn').click()}],
['validation',async()=>{await page.locator('#validate-btn').click()}],
['dropdown-demo',async()=>{await page.locator('#dropdown-trigger').click()}]
];
for(const [slug,action] of actions){
 const card=page.locator('#'+slug);await card.scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 const paths=[];for(let i=0;i<2;i++){const p='/tmp/fluid-'+slug+'-'+i+'.png';await card.screenshot({path:p,animations:'allow'});paths.push(p)}
 await action();await page.waitForTimeout(550);
 for(let i=2;i<4;i++){const p='/tmp/fluid-'+slug+'-'+i+'.png';await card.screenshot({path:p,animations:'allow'});paths.push(p)}
 const py='from PIL import Image\nimport sys\nimgs=[Image.open(p).convert("RGB").resize((500,370)) for p in sys.argv[2:]]\nimgs[0].save(sys.argv[1],save_all=True,append_images=imgs[1:],duration=[650,450,700,1050],loop=0,optimize=True)\n';
 const output='docs/images/approved-gifs/'+slug+'.gif';const run=spawnSync('python3',['-c',py,output,...paths],{encoding:'utf8'});if(run.status!==0)throw Error(slug+': '+run.stderr);console.log(output);
}
await browser.close();
