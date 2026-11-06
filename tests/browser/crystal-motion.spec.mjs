import {test,expect} from '@playwright/test';

test.describe('Crystal Motion reference',()=>{
  test.beforeEach(async({page})=>{await page.goto('/demo/crystal-motion/');await expect(page.locator('#nav .item')).toHaveCount(4);});
  test('shows a single shared lens and updates semantic selection on rapid reversals',async({page})=>{
    const lens=page.locator('#lens');
    await expect(lens).toHaveCount(1);
    for(const index of [1,3,0,2,0,3,1])await page.locator('#nav .item').nth(index).click();
    await expect(page.locator('#nav .item[aria-current="page"]')).toHaveCount(1);
    await expect(page.locator('#nav .item').nth(1)).toHaveAttribute('aria-current','page');
    await expect(page.locator('#status')).toContainText('Explore');
    await expect.poll(async()=>lens.evaluate(el=>{const x=Number(new DOMMatrix(getComputedStyle(el).transform).m41);return Number.isFinite(x)&&el.getBoundingClientRect().width>20})).toBeTruthy();
  });
  test('changes material controls and motion response',async({page})=>{
    await page.locator('#transparency').evaluate(el=>{el.value='90';el.dispatchEvent(new Event('input',{bubbles:true}))});await expect(page.locator('#transparency-value')).toHaveText('90%');
    await page.locator('#shine').evaluate(el=>{el.value='60';el.dispatchEvent(new Event('input',{bubbles:true}))});await expect(page.locator('#shine-value')).toHaveText('60%');
    await page.locator('#blur').evaluate(el=>{el.value='0';el.dispatchEvent(new Event('input',{bubbles:true}))});await expect(page.locator('#blur-value')).toHaveText('0px');
    await page.getByRole('button',{name:'Snappy'}).click();await expect(page.getByRole('button',{name:'Snappy'})).toHaveAttribute('aria-pressed','true');
  });
  test('supports keyboard arrows',async({page})=>{
    await page.getByRole('button',{name:'Home'}).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('button',{name:'Explore'})).toHaveAttribute('aria-current','page');
    await expect(page.getByRole('button',{name:'Explore'})).toBeFocused();
  });
  test('supports pointer drag and a single selected tab',async({page})=>{
    const nav=page.locator('#nav');const box=await nav.boundingBox();expect(box).not.toBeNull();
    await page.mouse.move(box.x+box.width*.15,box.y+box.height/2);
    await page.mouse.down();await page.mouse.move(box.x+box.width*.8,box.y+box.height/2,{steps:8});await page.mouse.up();
    await expect(page.locator('#nav .item[aria-current="page"]')).toHaveCount(1);
  });
  test.use({reducedMotion:'reduce'});
  test('keeps semantic navigation usable with reduced motion',async({page})=>{
    await page.getByRole('button',{name:'Profile'}).click();
    await expect(page.getByRole('button',{name:'Profile'})).toHaveAttribute('aria-current','page');
  });
});
