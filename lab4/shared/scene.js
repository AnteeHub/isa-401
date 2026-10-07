// Supplied scene engine. Students implement controls using the small Ride API.
(function () {
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state={speed:reduced?0:1,character:'pelican',view:'wide'};
  const shots={
    wide:{box:[0,0,1000,470],name:'Wide',kicker:'01 / COASTAL ROUTE',description:'The whole ride, in context.'},
    close:{box:[330,48,460,216.2],name:'Close',kicker:'02 / RIDER DETAIL',description:'A closer look at the rider.'},
    follow:{box:[170,60,760,357.2],name:'Follow',kicker:'03 / TRACKING SHOT',description:'Stay with the rider. Watch the coast move.'}
  };
  const el=id=>document.getElementById(id),listeners=[];
  let angle=0,travel=0,rideTime=0,previous=0;
  let camera=shots.wide.box.slice();
  function notify(){
    el('scene-status').textContent=state.character[0].toUpperCase()+state.character.slice(1)+' / '+state.speed.toFixed(1)+'× / '+state.view;
    el('scene').setAttribute('aria-label','A '+state.character+' riding a bicycle. View: '+state.view+'. Speed: '+state.speed.toFixed(1));
    const shot=shots[state.view];
    el('view-kicker').textContent=shot.kicker;el('view-name').textContent=shot.name;el('view-description').textContent=shot.description;
    listeners.forEach(fn=>fn({...state}));
  }
  function paint(dt,snap){
    const bikeX=Math.sin(rideTime*.22)*62;
    el('rider').setAttribute('transform','translate('+bikeX+' 0)');
    el('rear-spokes').setAttribute('transform','rotate('+angle+' 358 335)');
    el('front-spokes').setAttribute('transform','rotate('+angle+' 626 335)');
    el('pedal').setAttribute('transform','rotate('+angle+' 483 335)');
    const rad=angle*Math.PI/180;
    el('leg').setAttribute('points','423,198 451,261 '+(483+24*Math.cos(rad))+','+(335+24*Math.sin(rad)));
    el('road').setAttribute('patternTransform','translate('+(-travel%160)+' 0)');
    el('water-lines').setAttribute('patternTransform','translate('+(-travel*.12%230)+' 0)');
    el('posts').setAttribute('patternTransform','translate('+(-travel*.62%230)+' 0)');
    el('clouds').setAttribute('transform','translate('+(-Math.sin(rideTime*.035)*26)+' 0)');
    const target=shots[state.view].box.slice();
    // Close and Follow track the rider. Wide stays fixed to show the route.
    if(state.view!=='wide')target[0]+=bikeX;
    const blend=snap||reduced||state.speed===0?1:1-Math.exp(-dt*9);
    camera=camera.map((value,i)=>value+(target[i]-value)*blend);
    el('scene').setAttribute('viewBox',camera.map(n=>n.toFixed(3)).join(' '));
  }
  window.Ride={
    getState:()=>({...state}),
    setSpeed(value){const n=Number(value);if(!Number.isFinite(n))return;state.speed=Math.max(0,Math.min(3,n));paint(0,state.speed===0);notify();},
    setCharacter(name){
      if(!['pelican','duck','penguin'].includes(name))return;state.character=name;
      ['pelican','duck','penguin'].forEach(c=>el(c+'-head').style.display=c===name?'':'none');
      el('bird-body').setAttribute('fill',name==='duck'?'#f2cf70':name==='penguin'?'#293e48':'#fffdf5');
      el('bird-neck').setAttribute('fill',name==='duck'?'#f2cf70':'#fffdf5');
      el('bird-wing').setAttribute('fill',name==='duck'?'#dfb553':name==='penguin'?'#52646b':'#e3e9e4');notify();
    },
    setView(name){if(!Object.hasOwn(shots,name))return;state.view=name;paint(0,false);notify();},
    subscribe(fn){listeners.push(fn);return()=>{const i=listeners.indexOf(fn);if(i>=0)listeners.splice(i,1);};}
  };
  function frame(time){
    const dt=previous?Math.min((time-previous)/1000,.05):0;previous=time;
    rideTime+=dt*state.speed;angle=(angle+dt*state.speed*210)%360;travel+=dt*state.speed*96;
    paint(dt,false);requestAnimationFrame(frame);
  }
  el('pause').addEventListener('click',()=>Ride.setSpeed(0));
  el('reset').addEventListener('click',()=>{Ride.setCharacter('pelican');Ride.setView('wide');Ride.setSpeed(reduced?0:1);paint(0,true);});
  notify();paint(0,true);requestAnimationFrame(frame);
})();
