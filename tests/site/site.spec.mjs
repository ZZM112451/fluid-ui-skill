import {test,expect} from '@playwright/test';

test('deployed lab loads its module and supports failure, cancel, recovery and sheets',async({page})=>{
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
  await page.goto('demo/');
  await page.getByLabel('视觉风格').selectOption('Glass');
  await expect(page.locator('html')).toHaveAttribute('data-style','Glass');
  await page.getByLabel('模拟请求失败').check();
  await page.getByRole('button',{name:'保存配置',exact:true}).click();
  await expect(page.locator('#save-state')).toHaveText('保存失败，请重试');
  await page.getByLabel('模拟请求失败').uncheck();
  await page.getByRole('button',{name:'保存配置',exact:true}).click();
  await page.getByRole('button',{name:'取消请求'}).click();
  await expect(page.locator('#save-state')).toHaveText('已取消，配置未保存');
  await page.getByRole('button',{name:'保存配置',exact:true}).click();
  await expect(page.locator('#save-state')).toHaveText('配置已保存');
  await page.getByRole('button',{name:'打开分步弹窗'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button',{name:'打开分步弹窗'})).toBeFocused();
  expect(errors).toEqual([]);
  await page.screenshot({path:'test-results/site/lab-saved.png',fullPage:true});
});

test('Crystal navigation and Liquid Glass timer work from deployed paths',async({page})=>{
  await page.goto('demo/crystal-motion/');
  await page.getByRole('button',{name:'Explore',exact:true}).click();
  await expect(page.locator('#status')).toHaveText('Selected: Explore');
  await expect(page.getByRole('link',{name:'Demo home'})).toHaveAttribute('href','../../');
  await page.screenshot({path:'test-results/site/crystal-explore.png',fullPage:true});
  await page.goto('demo/liquid-glass/');
  await page.getByRole('button',{name:'展开计时器',exact:true}).first().click();
  await expect(page.getByRole('button',{name:'开始计时',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'新建任务',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.screenshot({path:'test-results/site/liquid-sheet.png',fullPage:true});
});

for(const width of [390,1440])test(`landing page images and links at ${width}px`,async({page,request})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('./');
  for(const image of await page.locator('img').all()){
    await image.scrollIntoViewIfNeeded();
    await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
  await expect(page.locator('img')).toHaveCount(21);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const links=await page.locator('a').evaluateAll(elements=>elements.map(el=>el.href));
  for(const link of new Set(links.filter(link=>link.startsWith('http://127.0.0.1:4174/')))){
    expect((await request.get(link)).ok(),link).toBe(true);
  }
});
