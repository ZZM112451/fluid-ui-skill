const {chromium}=require('playwright');
const http=require('http');
const fs=require('fs');
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync('ui.html'));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const url=`http://localhost:${server.address().port}`;
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 let passed=0;
 const check=(v,m)=>{if(!v)throw Error(m);passed++;console.log('通过：'+m)};
 try{
 const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();await page.goto(url);
 await page.locator('button').click();await page.waitForFunction(()=>document.querySelector('button').dataset.state==='success');
 check(await page.evaluate(()=>navigator.clipboard.readText())==='把灵感留在此刻。','真实剪贴板写入');
 await page.waitForTimeout(550);check(await page.locator('button').evaluate(b=>b.getBoundingClientRect().width)>51.9 && await page.locator('button').evaluate(b=>b.getBoundingClientRect().width)<52.1,'同一按钮成功圆形');
 await page.waitForTimeout(1800);check(await page.locator('button').getAttribute('data-state')==='idle','约 2.2 秒恢复');
 await page.evaluate(()=>{window.originalButton=document.querySelector('button');Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>new Promise((resolve,reject)=>{window.resolveWrite=resolve;window.rejectWrite=reject})}})});
 await page.locator('button').click();check(await page.locator('button').getAttribute('data-state')==='copying','await 完成前无成功');
 await page.evaluate(()=>rejectWrite(Error('denied')));await page.waitForTimeout(30);check(await page.locator('button').getAttribute('data-state')==='error','拒绝写入不显示成功');
 await page.evaluate(()=>{window.jobs=[];navigator.clipboard.writeText=()=>new Promise((resolve,reject)=>jobs.push({resolve,reject}))});
 for(let i=0;i<10;i++)await page.locator('button').click();
 await page.evaluate(()=>{jobs[9].reject(Error('denied'));for(let i=0;i<9;i++)jobs[i].resolve()});await page.waitForTimeout(30);
 check(await page.locator('button').getAttribute('data-state')==='error','十次连点旧成功不覆盖最新失败');
 check(await page.evaluate(()=>originalButton===document.querySelector('button')),'按钮节点保持身份');
 await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>{navigator.clipboard.writeText=async()=>{}});await page.locator('button').click();await page.waitForTimeout(30);
 check(await page.locator('button').evaluate(b=>getComputedStyle(b).transitionDuration)==='0s','减少动态效果取消过渡');
 await page.setViewportSize({width:320,height:640});check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'320px 无横向溢出');
 await page.screenshot({path:'ui-verified.png'});
 await context.close();console.log(`结果：${passed} 通过，0 失败`);
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});


