import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const failures=[];
const pages=['index.html','student.html','reference.html','checkpoints/task1.html','checkpoints/task2.html'];
const required=[...pages,'vendor/d3.min.js','vendor/tf.min.js','vendor/D3-LICENSE.txt','vendor/TFJS-LICENSE.txt','src/engine.js','src/app.js','src/progress-display.js','src/pixel-editor.js','src/ui.js','data/model.js','data/digits.js','data/model-card.json','student/views.js','student/progress.js','reference/views.js','reference/progress.js','reference/probe.js','docs/GUIDE.html','docs/PROMPTS.html','docs/API.md','docs/TASKS.md','docs/AGENT_SETUP.md','docs/ACCEPTANCE.md','AGENTS.md','README.md','serve.py','scripts/serve.mjs','readings/Steering-the-Craft.pdf','readings/Progressive-Bar-Charts.pdf'];
for(const name of required)if(!fs.existsSync(path.join(root,name)))failures.push('Missing '+name);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const file of walk(root)){
 const rel=path.relative(root,file);if(rel.startsWith('vendor/'))continue;
 if(/\.(js|mjs|html|md|css|py)$/.test(file)){
  const text=fs.readFileSync(file,'utf8');if(/[\u3400-\u9fff]/.test(text))failures.push('Non-English content in '+rel);
  if(file.endsWith('.js'))try{new vm.Script(text);}catch(e){failures.push(rel+': '+e.message)}
  if(file.endsWith('.html')){
   if(/<script[^>]+src=["']https?:/.test(text))failures.push('Remote runtime script in '+rel);
   for(const match of text.matchAll(/(?:src|href)=["']([^"']+)["']/g)){
    const ref=match[1];if(/^(https?:|data:|mailto:|#)/.test(ref))continue;
    const target=decodeURIComponent(ref.split(/[?#]/)[0]);
    if(target&&!fs.existsSync(path.resolve(path.dirname(file),target)))failures.push('Broken local path '+rel+': '+ref);
   }
  }
 }
}
for(const name of pages){const p=path.join(root,name);if(fs.existsSync(p)&&!fs.readFileSync(p,'utf8').includes('No submission required'))failures.push('Missing notice in '+name);}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('PASS: required assets, JavaScript syntax, English content, task notices and local links. Runtime scripts are bundled. Browser behavior requires separate verification.');
