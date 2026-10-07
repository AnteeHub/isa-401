/* Provided UI utilities shared by the starter and checkpoints. */
window.LabUI={
  drawDigit(canvas,pixels){
    const ctx=canvas.getContext('2d');const small=document.createElement('canvas');small.width=28;small.height=28;const c=small.getContext('2d');const im=c.createImageData(28,28);
    for(let i=0;i<784;i++){const v=Math.round(pixels[i]*255);im.data[i*4]=v;im.data[i*4+1]=v;im.data[i*4+2]=v;im.data[i*4+3]=255;}c.putImageData(im,0,0);ctx.imageSmoothingEnabled=false;ctx.drawImage(small,0,0,canvas.width,canvas.height);
  },
  pct(value){return value===null?'—':(value*100).toFixed(1)+'%';},
  placeholder(element,text){element.replaceChildren();const p=document.createElement('p');p.className='empty';p.textContent=text;element.append(p);},
  scoreText(result){return 'Predicted '+result.predicted+' / top score '+(result.score*100).toFixed(1)+'%';}
};
