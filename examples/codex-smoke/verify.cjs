const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true,channel:'msedge'});
 const page = await browser.newPage();
 await page.route('http**/*', route => route.abort());
 await page.goto(pathToFileURL(require('node:path').resolve('index.html')).href);
 let passed=0;
 async function check(name, fn) { await fn(); passed++; console.log('PASS '+name); }
 const state = () => page.locator('#feedback').getAttribute('data-state');
 await check('无效输入与焦点', async()=>{await page.locator('#submit').click(); assert.equal(await page.locator('#email').getAttribute('aria-invalid'),'true'); assert.equal(await page.locator('#email').evaluate(e=>e===document.activeElement),true);});
 await page.locator('#email').fill('reader@example.com');
 await check('失败与保留输入',async()=>{await page.locator('#simulate').check();await page.locator('#submit').click();await page.waitForFunction(()=>document.querySelector('#feedback').dataset.state==='error');assert.equal(await page.locator('#email').inputValue(),'reader@example.com');});
 await check('错误恢复成功',async()=>{await page.locator('#simulate').uncheck();await page.locator('#submit').click();await page.waitForFunction(()=>document.querySelector('#feedback').dataset.state==='success');});
 await check('快速十次提交与取消迟到响应',async()=>{await page.locator('form').evaluate(f=>{for(let i=0;i<10;i++)f.requestSubmit()});assert.equal(await state(),'loading');await page.locator('#cancel').click();await page.waitForTimeout(1400);assert.equal(await state(),'cancelled');});
 await check('键盘取消与重新提交',async()=>{await page.locator('#submit').click();await page.keyboard.press('Escape');assert.equal(await state(),'cancelled');await page.locator('#submit').click();await page.waitForFunction(()=>document.querySelector('#feedback').dataset.state==='success');});
 await check('离开页面清理',async()=>{await page.locator('#submit').click();await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await page.waitForTimeout(1400);assert.equal(await state(),'cancelled');});
 await check('320px、200%字体与RTL无溢出',async()=>{await page.setViewportSize({width:320,height:800});await page.evaluate(()=>{document.documentElement.style.fontSize='200%';document.documentElement.dir='rtl'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);});
 await page.evaluate(()=>{document.documentElement.style.fontSize='';document.documentElement.dir='ltr'});
 await check('减少动态效果',async()=>{await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('#submit').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');});
 await page.screenshot({path:'form-mobile.png',fullPage:true});
 await page.setViewportSize({width:1100,height:800});
 await page.emulateMedia({colorScheme:'dark'});
 await check('暗色主题',async()=>{assert.equal(await page.locator('main').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(25, 37, 30)');});
 await page.screenshot({path:'form-dark.png',fullPage:true});
 await page.emulateMedia({colorScheme:'light'});
 await page.screenshot({path:'form-desktop.png',fullPage:true});
 console.log(`RESULT ${passed} passed, 0 failed; Chromium ${browser.version()}`);
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});

