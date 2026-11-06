import test from 'node:test';
import assert from 'node:assert/strict';
import {decide,validateConfig} from '../skills/fluid-ui/scripts/core.mjs';

test('Crystal Motion preset is accepted with Glass',()=>{
 const result=decide({requestedStyle:'Glass',requestedPreset:'Crystal Motion',mode:'Preset'});
 assert.equal(result.style,'Glass');assert.equal(result.preset,'Crystal Motion');
 assert.equal(validateConfig({schemaVersion:1,skillVersion:'1.2.0',style:'Glass',preset:'Crystal Motion',mode:'Preset',intensity:'Balanced'}).preset,'Crystal Motion');
});
test('Crystal Motion cannot be combined with Material 3',()=>{
 assert.throws(()=>decide({requestedStyle:'Material 3',requestedPreset:'Crystal Motion'}));
});
test('existing Liquid Glass preset remains accepted',()=>{
 assert.equal(decide({requestedStyle:'Glass',requestedPreset:'Liquid Glass'}).preset,'Liquid Glass');
});
