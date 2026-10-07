/* Provided model and evaluation engine. No training occurs in the browser. */
(function () {
  'use strict';
  function decode(base64) { return Uint8Array.from(atob(base64), c => c.charCodeAt(0)); }
  const pixels = decode(DIGIT_ASSET.pixels);
  const data = DIGIT_ASSET.ids.map((id, index) => Object.freeze({id:'mnist-test-'+id, index, label:DIGIT_ASSET.labels[index]}));
  let weights;
  const ready = tf.setBackend('cpu').then(() => tf.ready()).then(() => {
    const bytes=decode(MODEL_ASSET.weights); const values=new Float32Array(bytes.buffer); let offset=0;
    weights=MODEL_ASSET.shapes.map(shape=>{const size=shape.reduce((a,b)=>a*b,1);const tensor=tf.tensor(values.slice(offset,offset+size),shape);offset+=size;return tensor;});
  });
  function imageAt(index) { return Float32Array.from(pixels.subarray(index*784,(index+1)*784),v=>v/255); }
  function inferBatch(inputs) {
    if (!weights) throw Error('Model is still loading.');
    if (!inputs.length) return [];
    for (const input of inputs) if(input.length!==784||Array.from(input).some(v=>!Number.isFinite(v)||v<0||v>1)) throw Error('Expected 784 pixel values in [0, 1].');
    return tf.tidy(()=>{
      const x=tf.tensor2d(inputs.map(x=>Array.from(x)),[inputs.length,784]);
      return x.matMul(weights[0]).add(weights[1]).relu().matMul(weights[2]).add(weights[3]).softmax().arraySync();
    });
  }
  function predict(input) { const scores=inferBatch([input])[0];const predicted=scores.indexOf(Math.max(...scores));return {predicted,score:scores[predicted],scores}; }
  function summarize(records) {
    const cells=Array.from({length:100},(_,i)=>({actual:Math.floor(i/10),predicted:i%10,count:0}));let correct=0;
    for(const r of records){cells[r.label*10+r.predicted].count++;if(r.label===r.predicted)correct++;}
    return {cells,correct,errors:records.length-correct,accuracy:records.length?correct/records.length:null,count:records.length};
  }
  class Engine {
    constructor(){this.records=[];this.history=[];this.running=false;this.batchSize=40;this.delay=750;this.timer=null;this.listeners=new Set();}
    getState(){const summary=summarize(this.records);return {...summary,total:data.length,running:this.running,completed:this.records.length===data.length,records:this.records.slice(),history:this.history.map(h=>({...h})),batchSize:this.batchSize,delay:this.delay};}
    subscribe(callback){this.listeners.add(callback);callback(this.getState());return()=>this.listeners.delete(callback);}
    emit(){for(const callback of this.listeners)callback(this.getState());}
    step(size=this.batchSize){
      if(!weights)throw Error('Model is still loading.');
      const pending=data.slice(this.records.length,this.records.length+size);if(!pending.length){this.pause();return;}
      const results=inferBatch(pending.map(d=>imageAt(d.index)));
      pending.forEach((d,i)=>{const scores=results[i];const predicted=scores.indexOf(Math.max(...scores));this.records.push(Object.freeze({...d,predicted,score:scores[predicted],scores:Object.freeze(scores)}));});
      const s=summarize(this.records);this.history.push({count:s.count,accuracy:s.accuracy});
      if(this.records.length===data.length){this.running=false;clearTimeout(this.timer);this.timer=null;}
      this.emit();
    }
    start(){if(this.running||this.records.length===data.length)return;this.running=true;this.emit();const tick=()=>{if(!this.running)return;this.step();if(this.running)this.timer=setTimeout(tick,this.delay);};this.timer=setTimeout(tick,0);}
    pause(){this.running=false;clearTimeout(this.timer);this.timer=null;this.emit();}
    reset(){this.running=false;clearTimeout(this.timer);this.timer=null;this.records=[];this.history=[];this.emit();}
    setDelay(value){const v=Number(value);if(![250,750,1500].includes(v))throw Error('Unsupported cadence');this.delay=v;this.emit();}
  }
  window.LabCore={ready,Engine,imageAt,predict,inferBatch,summarize,data,meta:MODEL_ASSET.meta};
})();
