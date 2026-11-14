import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'tests/site',workers:1,outputDir:'test-results/site/artifacts',
  reporter:[['list'],['json',{outputFile:'test-results/site/results.json'}]],
  use:{baseURL:'http://127.0.0.1:4174/fluid-ui-skill/',headless:true,
    launchOptions:process.env.FLUID_CHROMIUM?{executablePath:process.env.FLUID_CHROMIUM}:{}},
  webServer:{command:'node scripts/serve.mjs',env:{PORT:'4174',FLUID_SERVE_ROOT:'_site',FLUID_SERVE_BASE:'/fluid-ui-skill/'},
    url:'http://127.0.0.1:4174/fluid-ui-skill/',reuseExistingServer:false}
});
