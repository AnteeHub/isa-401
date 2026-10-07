/* Provided eraser. Stores a copy of 784 normalized pixels, never the dataset image. */
window.createPixelEditor=function(canvas,onChange){
  let values=new Float32Array(784),active=false,last=null;
  function set(pixels){values=Float32Array.from(pixels);LabUI.drawDigit(canvas,values);onChange?.();}
  function erase(x,y){for(let row=0;row<28;row++)for(let col=0;col<28;col++)if(Math.hypot(col-x,row-y)<=1.65)values[row*28+col]=0;}
  function point(event){const r=canvas.getBoundingClientRect();return {x:(event.clientX-r.left)*28/r.width,y:(event.clientY-r.top)*28/r.height};}
  function apply(p){if(last){const n=Math.max(1,Math.ceil(Math.hypot(p.x-last.x,p.y-last.y)*2));for(let i=1;i<=n;i++)erase(last.x+(p.x-last.x)*i/n,last.y+(p.y-last.y)*i/n);}else erase(p.x,p.y);last=p;LabUI.drawDigit(canvas,values);onChange?.();}
  canvas.onpointerdown=e=>{e.preventDefault();active=true;last=null;canvas.setPointerCapture(e.pointerId);apply(point(e));};
  canvas.onpointermove=e=>{if(active)apply(point(e));};
  canvas.onpointerup=()=>{active=false;last=null;};canvas.onpointercancel=canvas.onpointerup;
  return {set,get:()=>Float32Array.from(values),eraseCenter(){erase(14,14);LabUI.drawDigit(canvas,values);onChange?.();}};
};
