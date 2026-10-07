/* Provided page coordinator. Student modules supply two tasks. The image experiment is provided. */
(async function(){
  'use strict';const $=id=>document.getElementById(id);const engine=new LabCore.Engine();
  let selection=null,selectedId=null,page=0,latest=null,probe=null;
  const elements={run:$('run'),step:$('step'),reset:$('reset'),cadence:$('cadence'),progress:$('progress'),status:$('status'),history:$('history')};
  function failure(error){$('failure').hidden=false;$('failure').textContent='The view could not update: '+error.message+'. Ask your agent to check the browser console. Checkpoints remain available from the activity index.';console.error(error);}
  function inspect(record){selectedId=record.id;probe.select(record);render(latest);$('probe').scrollIntoView({behavior:'auto',block:'start'});}
  function selectCell(actual,predicted){selection={actual,predicted};$('errorsOnly').checked=false;page=0;render(latest);}
  function render(state){if(!state)return;latest=state;
    try{
      $('processed').textContent=state.count+' / '+state.total;$('accuracy').textContent=LabUI.pct(state.accuracy);$('errors').textContent=state.count?state.errors:'—';
      StudentProgress.render({state,elements});StudentViews.renderMatrix({element:$('matrix'),state,selection,onSelect:selectCell});
      let matching=state.records.filter(r=>(!selection||(r.label===selection.actual&&r.predicted===selection.predicted))&&(!$('errorsOnly').checked||r.label!==r.predicted));
      const pages=Math.max(1,Math.ceil(matching.length/12));page=Math.min(page,pages-1);
      $('filterLabel').textContent=selection?`Actual ${selection.actual}, predicted ${selection.predicted}`:$('errorsOnly').checked?'All errors':'All processed images';
      $('matches').textContent=matching.length+' matching images / '+state.count+' processed overall';
      StudentViews.renderGallery({element:$('gallery'),records:matching.slice(page*12,page*12+12),onSelect:inspect,selectedId});
      $('pageLabel').textContent=`Page ${page+1} of ${pages}`;$('previous').disabled=page===0;$('next').disabled=page>=pages-1;
      $('failure').hidden=true;
    }catch(e){engine.running=false;clearTimeout(engine.timer);failure(e);}
  }
  $('errorsOnly').onchange=()=>{page=0;render(latest);};$('clearFilter').onclick=()=>{selection=null;page=0;render(latest);};$('previous').onclick=()=>{page--;render(latest);};$('next').onclick=()=>{page++;render(latest);};
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&engine.running)engine.pause();});
  try{
    await LabCore.ready;probe=StudentProbe.mount({element:$('probeContent'),core:LabCore,ui:LabUI});StudentProgress.bind({engine,elements});
    engine.step(80);engine.subscribe(render);
    window.errorLab={engine,core:LabCore,ready:true,selectCell,inspect,getState:()=>engine.getState(),getSelection:()=>selection,getProbe:()=>probe};
    $('modelInfo').textContent=`Frozen MLP: 784 inputs, 48 hidden units, 10 outputs. ${LabCore.meta.parameters.toLocaleString()} learned parameters. 800 held-out MNIST images, 80 per digit. No training takes place here.`;
  }catch(e){failure(e);}
})();
