window.mountA=function(root,ride){
  const label=document.createElement('label');label.textContent='Cycling speed (0 stops the bike)';
  const slider=document.createElement('input');slider.type='range';slider.min='0';slider.max='3';slider.step='0.1';slider.setAttribute('aria-label','Cycling speed');
  const value=document.createElement('output');value.className='value';
  label.append(slider);root.append(label,value);
  slider.addEventListener('input',()=>ride.setSpeed(slider.value));
  function render(){const speed=ride.getState().speed;slider.value=speed;value.textContent=speed.toFixed(1)+'×';}
  ride.subscribe(render);render();
};
