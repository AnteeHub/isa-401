window.mountC=function(root,ride){
  const choices=[['wide','Wide','See the whole route'],['close','Close','Focus on the rider'],['follow','Follow','Track the bicycle']];
  const row=document.createElement('div');row.className='view-options';
  const buttons=choices.map(([name,title,hint],index)=>{
    const button=document.createElement('button');button.className='view-option';button.setAttribute('aria-label',title);
    const number=document.createElement('span');number.className='view-number';number.textContent='0'+(index+1);
    const heading=document.createElement('strong');heading.textContent=title;
    const detail=document.createElement('small');detail.textContent=hint;
    button.append(number,heading,detail);button.addEventListener('click',()=>ride.setView(name));row.append(button);return [name,button];
  });
  root.append(row);
  function render(){buttons.forEach(([name,button])=>button.setAttribute('aria-pressed',String(ride.getState().view===name)));}ride.subscribe(render);render();
};
