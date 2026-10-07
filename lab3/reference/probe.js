/* Provided image experiment. An edited image is a separate experiment, outside evaluation. */
window.StudentProbe={
  mount({element,core,ui}){
    element.innerHTML=`<div class="probe-grid"><div><h3>Original image</h3><canvas id="originalImage" width="196" height="196"></canvas><output id="originalResult">Choose a sample above.</output></div><div><h3>Modified image</h3><canvas class="editable" id="editedImage" width="196" height="196" aria-label="Drag to erase pixels. The Erase center button is an alternative."></canvas><output id="modifiedResult">Choose a sample above.</output></div><div><p id="sampleIdentity" class="meta">No sample selected.</p><p>Drag on the modified image to erase a small part of a stroke. Then run the same frozen model again.</p><div class="controls"><button class="primary" id="predictEdit" disabled>Predict modified image</button><button id="resetEdit" disabled>Reset image</button><button id="eraseCentre" disabled>Erase center</button></div><p id="changedPixels" class="small">0 pixels changed.</p><p class="small">The original label belongs to the original image. A large edit may change the digit's meaning. Modified images never enter the evaluation statistics.</p></div></div>`;
    const get=id=>element.querySelector('#'+id);let selected=null,original=null;
    const editor=createPixelEditor(get('editedImage'),()=>{
      if(!original)return;const changed=editor.get().reduce((sum,v,i)=>sum+(Math.abs(v-original[i])>1e-6?1:0),0);
      get('changedPixels').textContent=changed+' pixels changed.';get('modifiedResult').textContent='Image changed. Predict again to update the result.';
    });
    function select(record){selected=record;original=core.imageAt(record.index);ui.drawDigit(get('originalImage'),original);editor.set(original);get('sampleIdentity').textContent=record.id+' / original label '+record.label;get('originalResult').textContent=ui.scoreText(core.predict(original));get('modifiedResult').textContent='Identical to original. Erase pixels or predict as-is.';for(const id of ['predictEdit','resetEdit','eraseCentre'])get(id).disabled=false;}
    get('predictEdit').onclick=()=>{if(selected){const result=core.predict(editor.get());get('modifiedResult').textContent=ui.scoreText(result);element.lastPrediction=result;}};
    get('resetEdit').onclick=()=>{if(selected)select(selected);};get('eraseCentre').onclick=()=>{if(selected)editor.eraseCenter();};
    return {select,getPixels:()=>editor.get()};
  }
};
