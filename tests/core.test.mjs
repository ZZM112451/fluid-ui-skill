import {test} from 'node:test';
import assert from 'node:assert/strict';
import {decide, validateConfig, createAsyncTask} from '../skills/fluid-ui/scripts/core.mjs';

test('用户风格优先，强度独立',()=>{ assert.equal(decide({requestedStyle:'Tech',existingStyle:'Minimal',intensity:'Subtle'}).style,'Tech'); assert.equal(decide({requestedStyle:'Tech',intensity:'Subtle'}).intensity,'Subtle'); });
test('Auto 保留现有设计系统',()=>assert.equal(decide({existingStyle:'Glass',product:'dashboard'}).style,'Glass'));
test('密集工具采用 Minimal，Android 默认 Material 3',()=>{assert.equal(decide({product:'dashboard'}).style,'Minimal');assert.equal(decide({platform:'android'}).style,'Material 3');});
test('配置拒绝未知主版本与不兼容 Skill，不修改输入',()=>{const c={schemaVersion:2,skillVersion:'1.0.0'}; assert.throws(()=>validateConfig(c));assert.equal(c.schemaVersion,2);assert.throws(()=>validateConfig({schemaVersion:1,skillVersion:'2.0.0',style:'Minimal',intensity:'Balanced',mode:'Auto'}));});
test('非法风格不得静默忽略',()=>assert.throws(()=>decide({requestedStyle:'Rainbow'})));
test('请求失败不显示成功',async()=>{const task=createAsyncTask();await task.run(async()=>{throw Error('offline')});assert.equal(task.state.status,'error');});
test('取消屏蔽迟到的成功响应',async()=>{let done;const task=createAsyncTask();const p=task.run(()=>new Promise(r=>done=r));task.cancel();done('late');await p;assert.equal(task.state.status,'cancelled');});
test('竞态只接受最新请求',async()=>{let old;const task=createAsyncTask();const first=task.run(()=>new Promise(r=>old=r));await task.run(async()=> 'new');old('old');await first;assert.equal(task.state.value,'new');});
test('销毁后禁止新任务及回调',async()=>{let count=0;const task=createAsyncTask(()=>count++);task.dispose();await task.run(async()=>1);assert.equal(count,0);});
