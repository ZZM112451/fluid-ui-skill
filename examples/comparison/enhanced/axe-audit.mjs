import AxeBuilder from '@axe-core/playwright';
import {chromium} from '@playwright/test';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
const root=fileURLToPath(new URL('.',import.meta.url));const browser=await chromium.launch({headless:true,...(process.env.FLUID_CHROMIUM?{executablePath:process.env.FLUID_CHROMIUM}:{})});const results=[];
for(const name of ['form','navigation','sheet','data','interactive','../trial/before','../trial/after']){const context=await browser.newContext({viewport:{width:390,height:900}});const page=await context.newPage();await page.goto(pathToFileURL(root+name+'.html').href);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({page:name,violations:result.violations.map(({id,impact,description,nodes})=>({id,impact,description,targets:nodes.map(n=>n.target)})),passes:result.passes.length,incomplete:result.incomplete.length});await context.close()}
await browser.close();writeFileSync(root+'axe-results.json',JSON.stringify({date:'2026-11-04',environment:'Chromium 1223 / axe-core 4.11 / 390x900',results},null,2));console.log(JSON.stringify(results.map(r=>({page:r.page,violations:r.violations.length})),null,2));if(results.some(r=>r.violations.length))process.exitCode=1;
