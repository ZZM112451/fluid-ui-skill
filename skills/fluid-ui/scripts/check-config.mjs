import {readFileSync} from 'node:fs';
import {validateConfig} from './core.mjs';
try { validateConfig(JSON.parse(readFileSync(process.argv[2],'utf8'))); console.log('配置兼容'); }
catch(error){console.error(error.message);process.exitCode=1;}
