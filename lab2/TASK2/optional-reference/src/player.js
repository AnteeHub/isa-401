/* Minimal player: playback, interpolated drawing and one selected lane. */
'use strict';
window.createSwimPlayer=function({videoMode=false}={}){
 const race=SwimAPI.create(SWIM_DATA),$=s=>document.querySelector(s),canvas=$('#pool'),ctx=canvas.getContext('2d'),stage=$('#stage'),video=$('#video');
 const scene=document.createElement('canvas');scene.width=1280;scene.height=720;const sc=scene.getContext('2d');
 const W=1280,H=720,selected=new Set(),listeners=new Map();let t=0,playing=false,previous=performance.now(),ready=!videoMode,drawExtension=null;
 let isScrubbing=false,closed=false,frameId=0;
 const emit=(name,value)=>{for(const f of listeners.get(name)||[])f(value);};
 function error(message){$('#error').hidden=false;$('#error').textContent=message;}
 function playLabel(){ $('#play').textContent=playing?'Pause':'Play';$('#play').setAttribute('aria-label',playing?'Pause':'Play'); }
 function seek(value){const v=Math.max(0,Math.min(race.duration,Number(value)||0));t=v;if(videoMode&&ready)video.currentTime=race.toVideoTime(v);emit('seek',v);}
 async function play(){try{if(t>=race.duration-.015)seek(0);if(videoMode){if(!ready)return;await video.play();}playing=true;previous=performance.now();playLabel();}catch(e){error('Playback could not start. Check data/video.mp4 and reopen the full folder.');}}
 function pause(){if(videoMode)video.pause();playing=false;playLabel();}
 function select(ids){selected.clear();for(const id of ids)if(race.ids.includes(Number(id)))selected.add(Number(id));syncSelection();emit('selection',[...selected]);}
 function syncSelection(){for(const b of document.querySelectorAll('[data-lane]')){b.classList.toggle('selected',selected.has(Number(b.dataset.lane)));b.setAttribute('aria-pressed',String(selected.has(Number(b.dataset.lane))));}}
 function pick(id){if(id===null)return;if(listeners.get('pick')?.size)emit('pick',id);else select(selected.has(id)?[]:[id]);}
 function worldY(l){return videoMode?l.centerline[0][1]*H:42+race.ids.indexOf(l.id)*82+41;}
 function worldX(a){return videoMode?a.videoPoint.x*W:98+a.progress*1090;}
 function region(id){const l=race.lane(id);return videoMode?{x:0,y:l.region[0][1]*H,w:W,h:(l.region[2][1]-l.region[0][1])*H}:{x:0,y:42+race.ids.indexOf(id)*82,w:W,h:82};}
 function drawScene(snapshot){
  sc.clearRect(0,0,W,H);
  if(videoMode){
   sc.fillStyle='#152c34';sc.fillRect(0,0,W,H);
   if(ready&&video.readyState>=2&&video.currentTime>=race.sourceStart-.01)sc.drawImage(video,0,0,W,H);
   for(const a of snapshot.athletes){const x=worldX(a),y=worldY(race.lane(a.id));sc.beginPath();sc.arc(x,y,selected.has(a.id)?15:10,0,Math.PI*2);sc.fillStyle=selected.has(a.id)?'#ffd95b':'rgba(255,255,255,.88)';sc.fill();sc.lineWidth=2;sc.strokeStyle='#234d59';sc.stroke();sc.fillStyle='#183d48';sc.font='bold 13px Arial';sc.textAlign='center';sc.textBaseline='middle';sc.fillText(String(a.id),x,y);}
  }else{
   sc.fillStyle='#f7fafb';sc.fillRect(0,0,W,H);sc.fillStyle='#ebf5f6';sc.fillRect(88,42,1110,656);
   for(let i=0;i<9;i++){const y=42+i*82;sc.strokeStyle='#c1d9dd';sc.lineWidth=1;sc.beginPath();sc.moveTo(88,y);sc.lineTo(1198,y);sc.stroke();}
   for(const a of snapshot.athletes){const y=worldY(race.lane(a.id)),x=worldX(a),sel=selected.has(a.id);
    sc.fillStyle='#536e76';sc.font='15px Arial';sc.textAlign='right';sc.textBaseline='middle';sc.fillText(String(a.id),65,y);
    sc.strokeStyle='#d5e8ea';sc.lineWidth=1;sc.setLineDash([3,7]);sc.beginPath();sc.moveTo(98,y);sc.lineTo(1188,y);sc.stroke();sc.setLineDash([]);
    sc.strokeStyle=sel?'#3290a1':'#9cc4ca';sc.lineWidth=3;sc.lineCap='round';sc.beginPath();sc.moveTo(Math.max(98,x-100),y);sc.lineTo(x-14,y);sc.stroke();
    sc.beginPath();sc.arc(x,y,sel?13:10,0,Math.PI*2);sc.fillStyle=sel?'#087d93':'#668f99';sc.fill();sc.lineWidth=sel?4:2;sc.strokeStyle='#fff';sc.stroke();
   }
   sc.textAlign='center';sc.font='13px Arial';sc.fillStyle='#748b91';for(const d of [0,10,20,30,40,50])sc.fillText(d+' m',98+d/50*1090,21);
  }
 }
 const api={race,canvas,ctx,scene,stage,video,videoMode,W,H,region,worldX,worldY,select,getSelection:()=>[...selected],seek,play,pause,getTime:()=>t,getPlaying:()=>playing,
  on:(event,fn)=>{if(!listeners.has(event))listeners.set(event,new Set());listeners.get(event).add(fn);return()=>listeners.get(event).delete(fn);},
  setDraw:fn=>{drawExtension=fn;},renderBase:()=>{ctx.clearRect(0,0,W,H);ctx.drawImage(scene,0,0);},
  setHitMapper:fn=>{api.hitMapper=fn;},destroy:()=>{closed=true;pause();cancelAnimationFrame(frameId);listeners.clear();}};
 canvas.onclick=e=>{const rect=canvas.getBoundingClientRect();let p={x:(e.clientX-rect.left)/rect.width*W,y:(e.clientY-rect.top)/rect.height*H};if(api.hitMapper)p=api.hitMapper(p);const id=race.ids.find(id=>{const a=region(id);return p.y>=a.y&&p.y<a.y+a.h;});pick(id??null);};
 for(const l of race.lanes){const b=document.createElement('button');b.type='button';b.dataset.lane=l.id;b.textContent=l.id+' '+l.name.split(' ')[0];b.setAttribute('aria-label','Lane '+l.id+' '+l.name);b.setAttribute('aria-pressed','false');b.onclick=()=>pick(l.id);$('#lanes').append(b);}
 $('#play').onclick=()=>playing?pause():play();$('#restart').onclick=()=>seek(0);$('#seek').max=race.duration;$('#seek').oninput=e=>seek(e.target.value);
 $('#clear').onclick=()=>select([]);
 if(videoMode){
  $('#play').disabled=true;$('#seek').disabled=true;$('#restart').disabled=true;
  video.addEventListener('loadedmetadata',()=>{if(video.duration<race.toVideoTime(race.duration)-.15){error('The video is shorter than the supplied data.');return;}video.currentTime=race.sourceStart;});
  video.addEventListener('seeked',()=>{if(video.currentTime>=race.sourceStart-.01){ready=true;for(const id of ['play','seek','restart'])$('#'+id).disabled=false;}});
  video.addEventListener('error',()=>error('Missing or unsupported video. Keep data/video.mp4 next to this project.'));
  video.addEventListener('ended',pause);video.addEventListener('pause',()=>{playing=false;playLabel();});
  if(video.readyState>=1)video.currentTime=race.sourceStart;
 }
 function tick(now){if(closed)return;const delta=Math.min(.1,Math.max(0,(now-previous)/1000));previous=now;
  if(playing){t=videoMode?race.fromVideoTime(video.currentTime):Math.min(race.duration,t+delta);if(t>=race.duration-.002)pause();}
  else if(videoMode&&ready)t=race.fromVideoTime(video.currentTime);
  const snapshot=race.sample(t);$('#clock').textContent=t.toFixed(1)+' / '+race.duration.toFixed(1)+' s';$('#seek').value=t;
  drawScene(snapshot);if(drawExtension)drawExtension(snapshot,delta);else api.renderBase();emit('frame',snapshot);frameId=requestAnimationFrame(tick);
 }
 document.addEventListener('keydown',e=>{if(e.key==='Escape')emit('escape');});
 frameId=requestAnimationFrame(tick);return api;
};
