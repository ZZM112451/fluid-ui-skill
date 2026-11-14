import {defineConfig} from '@playwright/test';
import {resolve} from 'node:path';
const evidence=resolve(process.env.FLUID_EVIDENCE_DIR||'test-results/browser');
export default defineConfig({testDir:'tests/browser',workers:1,outputDir:resolve(evidence,'artifacts'),reporter:[['list'],['json',{outputFile:resolve(evidence,'results.json')}]],use:{baseURL:'http://127.0.0.1:4173',headless:true,launchOptions:process.env.FLUID_CHROMIUM?{executablePath:process.env.FLUID_CHROMIUM}:{}},webServer:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:4173/demo/',reuseExistingServer:!process.env.CI}});
