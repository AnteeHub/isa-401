/* Complete reference interactions. This file is NOT supplied in TASK2/optional-starter. */
window.installReference=function(app){
 const $=s=>document.querySelector(s),{W,H,ctx,canvas,stage,scene}=app;
 let mode='overview',active=false,tracking=null,groups=[],groupCount=0,currentGroup=null;
 let camera={x:0,y:0,w:W,h:H};const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const background=document.createElement('canvas');background.width=W;background.height=H;background.className='blur-background';background.setAttribute('aria-hidden','true');stage.insertBefore(background,canvas);const bg=background.getContext('2d');
 function setMode(next){mode=next;active=false;tracking=null;currentGroup=null;
  for(const b of document.querySelectorAll('[data-mode]')){b.setAttribute('aria-pressed',String(b.dataset.mode===mode));b.classList.toggle('active',b.dataset.mode===mode);}
  $('#compare-action').hidden=mode!=='compare';$('#save-group').hidden=mode!=='compare';$('#groups').hidden=mode!=='compare';update();
 }
 function update(){const n=app.getSelection().length;$('#compare-action').disabled=n<2;$('#compare-action').textContent=active?'Edit selection':'Compare selected ('+n+')';$('#exit').hidden=!(tracking!==null||active||mode==='highlight'&&n>0);
  $('#save-group').disabled=n<2;$('#status').textContent=mode==='track'?'Select a lane to follow':mode==='compare'?'Select two or more lanes':mode==='highlight'?'Select lanes to emphasize':'';
 }
 function exit(){tracking=null;active=false;app.select([]);setMode('overview');}
 for(const b of document.querySelectorAll('[data-mode]'))b.onclick=()=>setMode(b.dataset.mode);
 $('#exit').onclick=exit;app.on('escape',exit);
 app.on('selection',()=>{if(!app.getSelection().length){active=false;tracking=null;}update();});
 app.on('pick',id=>{
  const selected=app.getSelection();
  if(mode==='track'){tracking=id;app.select([id]);}
  else if(mode==='compare'||mode==='highlight'){app.select(selected.includes(id)?selected.filter(x=>x!==id):[...selected,id]);if(mode==='compare')active=false;}
  else app.select(selected.includes(id)?[]:[id]);update();
 });
 $('#compare-action').onclick=()=>{active=!active;update();};
 $('#save-group').onclick=()=>{const ids=app.getSelection();if(ids.length<2)return;groups.push({name:'Group '+(++groupCount),ids:[...ids]});renderGroups();};
 function renderGroups(){const bar=$('#groups');bar.replaceChildren();for(const g of groups){const b=document.createElement('button');b.type='button';b.textContent=g.name+' · '+g.ids.join(', ');b.setAttribute('aria-label','Compare '+g.name);b.onclick=()=>{app.select(g.ids);active=true;currentGroup=g.name;update();};bar.append(b);}const clear=document.createElement('button');clear.type='button';clear.textContent='Clear groups';clear.onclick=()=>{groups=[];bar.replaceChildren();};if(groups.length)bar.append(clear);}
 app.setHitMapper(p=>(mode==='compare'&&active||mode==='highlight'&&app.getSelection().length)?p:({x:camera.x+p.x/W*camera.w,y:camera.y+p.y/H*camera.h}));
 app.setDraw((snapshot,delta)=>{
  let goal={x:0,y:0,w:W,h:H};const sel=app.getSelection();
  if(mode==='track'&&tracking!==null){const athlete=snapshot.athletes.find(a=>a.id===tracking),cx=app.worldX(athlete),cy=app.worldY(app.race.lane(tracking));const w=W/2.6,h=H/2.6;goal={x:Math.max(0,Math.min(W-w,cx-w*.5)),y:Math.max(0,Math.min(H-h,cy-h*.5)),w,h};}
  const alpha=reduced?1:1-Math.exp(-delta*10);for(const k of ['x','y','w','h'])camera[k]+=(goal[k]-camera[k])*alpha;
  ctx.clearRect(0,0,W,H);background.hidden=true;
  if(mode==='compare'&&active&&sel.length>=2){
   background.hidden=false;bg.clearRect(0,0,W,H);bg.drawImage(scene,0,0);ctx.fillStyle='rgba(241,247,249,.34)';ctx.fillRect(0,0,W,H);
   for(const id of sel){const r=app.region(id);ctx.save();ctx.beginPath();ctx.rect(r.x,r.y,r.w,r.h);ctx.clip();ctx.drawImage(scene,0,0);ctx.restore();ctx.strokeStyle='#12a4b4';ctx.lineWidth=2;ctx.strokeRect(1,r.y+1,W-2,r.h-2);}
  }else if(mode==='highlight'&&sel.length){
   ctx.globalAlpha=.2;ctx.drawImage(scene,0,0);ctx.globalAlpha=1;
   for(const id of sel){const r=app.region(id);ctx.save();ctx.beginPath();ctx.rect(r.x,r.y,r.w,r.h);ctx.clip();ctx.drawImage(scene,0,0);ctx.restore();}
  }else ctx.drawImage(scene,camera.x,camera.y,camera.w,camera.h,0,0,W,H);
 });
 setMode('overview');
};
