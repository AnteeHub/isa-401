window.mountB=function(root,ride){
  const label=document.createElement('label');label.textContent='Who is riding?';
  const select=document.createElement('select');select.setAttribute('aria-label','Rider');
  ['pelican','duck','penguin'].forEach(name=>{const option=document.createElement('option');option.value=name;option.textContent=name[0].toUpperCase()+name.slice(1);select.append(option);});
  label.append(select);root.append(label);
  select.addEventListener('change',()=>ride.setCharacter(select.value));
  function render(){select.value=ride.getState().character;}ride.subscribe(render);render();
};
