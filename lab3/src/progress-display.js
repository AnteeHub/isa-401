/* Supplied display. Task 2 only connects the controls. */
window.LabProgressDisplay={
  render({state,elements}){
    elements.run.disabled=state.completed;elements.run.textContent=state.running?'Pause':state.count?'Continue':'Start';
    elements.step.disabled=state.running||state.completed;elements.reset.disabled=false;elements.cadence.disabled=false;
    elements.progress.value=state.count;elements.progress.max=state.total;
    elements.status.textContent=state.completed?'Complete. All 800 images have been evaluated.':state.running?'Running. New images enter every batch.':'Paused. The current results remain available to inspect.';
    if(!elements.run.onclick){
      for(const name of ['run','step','reset','cadence'])elements[name].disabled=true;
      elements.status.textContent='Task 2: ask your agent to connect the buttons. You can already inspect 80 images.';
    }
    const el=elements.history;el.replaceChildren();
    if(!state.history.length){LabUI.placeholder(el,'Start evaluation to build a history of cumulative accuracy.');return;}
    const w=1050,h=165,left=45,right=20,top=15,bottom=35;
    const x=d3.scaleLinear().domain([0,state.total]).range([left,w-right]);const y=d3.scaleLinear().domain([0,1]).range([h-bottom,top]);
    const svg=d3.select(el).append('svg').attr('viewBox',`0 0 ${w} ${h}`).attr('role','img').attr('aria-label','Cumulative accuracy by number of processed images. Vertical scale zero to one hundred percent.');
    svg.append('g').attr('transform',`translate(0,${h-bottom})`).call(d3.axisBottom(x).ticks(8));
    svg.append('g').attr('transform',`translate(${left},0)`).call(d3.axisLeft(y).tickValues([0,.5,1]).tickFormat(d3.format('.0%')));
    svg.append('path').datum(state.history).attr('class','plotline').attr('d',d3.line().x(d=>x(d.count)).y(d=>y(d.accuracy)));
    svg.selectAll('circle').data(state.history).join('circle').attr('cx',d=>x(d.count)).attr('cy',d=>y(d.accuracy)).attr('r',3).attr('fill','#166a91')
      .append('title').text(d=>`${d.count} processed: ${(d.accuracy*100).toFixed(1)}% correct`);
    svg.append('text').attr('x',w-right).attr('y',h-1).attr('text-anchor','end').attr('font-size',12).attr('fill','#5a6872').text('Processed images');
  }
};
