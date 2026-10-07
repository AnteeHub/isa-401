/* Task 1 reference. This file reads processed records; it never runs a model. */
window.StudentViews={
  renderMatrix({element,state,selection,onSelect}){
    element.replaceChildren();
    const width=530,height=510,cell=39,left=86,top=60;
    const svg=d3.select(element).append('svg').attr('viewBox',`0 0 ${width} ${height}`).attr('role','group').attr('aria-label','Confusion matrix. Rows are actual digits and columns are predicted digits.');
    svg.append('text').attr('x',left+cell*5).attr('y',17).attr('text-anchor','middle').attr('font-size',14).text('Predicted digit');
    svg.append('text').attr('transform','translate(17,255) rotate(-90)').attr('text-anchor','middle').attr('font-size',14).text('Actual digit');
    svg.selectAll('.column').data(d3.range(10)).join('text').attr('x',d=>left+(d+.5)*cell).attr('y',45).attr('text-anchor','middle').attr('font-size',14).text(d=>d);
    svg.selectAll('.row').data(d3.range(10)).join('text').attr('x',65).attr('y',d=>top+(d+.5)*cell+5).attr('text-anchor','middle').attr('font-size',14).text(d=>d);
    const blue=d3.scaleSqrt().domain([0,80]).range(['#f2f6f8','#166a91']);
    const orange=d3.scaleSqrt().domain([0,80]).range(['#fff7ef','#b65510']);
    const cells=svg.selectAll('.cell').data(state.cells,d=>d.actual+'-'+d.predicted).join('g').attr('class','cell')
      .attr('transform',d=>`translate(${left+d.predicted*cell},${top+d.actual*cell})`).attr('role','button').attr('tabindex',0)
      .attr('aria-label',d=>`Actual ${d.actual}, predicted ${d.predicted}: ${d.count} images`)
      .attr('aria-pressed',d=>!!selection&&selection.actual===d.actual&&selection.predicted===d.predicted)
      .on('click',(_,d)=>onSelect(d.actual,d.predicted)).on('keydown',(event,d)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onSelect(d.actual,d.predicted);}});
    cells.append('rect').attr('width',cell-2).attr('height',cell-2).attr('rx',2).attr('fill',d=>d.count?(d.actual===d.predicted?blue(d.count):orange(d.count)):'#f2f4f5');
    cells.append('text').attr('x',(cell-2)/2).attr('y',24).attr('text-anchor','middle').attr('font-size',13)
      .attr('fill',d=>d.count>=25?'white':d.count?'#20242a':'#a1abb2').text(d=>d.count);
    svg.append('text').attr('x',left).attr('y',485).attr('font-size',12).attr('fill','#5a6872').text('Counts of processed images. Fixed color scale: 0 to 80.');
  },
  renderGallery({element,records,onSelect,selectedId}){
    element.replaceChildren();
    if(!records.length){LabUI.placeholder(element,'No processed images match this filter. Choose another cell or continue evaluation.');return;}
    const buttons=d3.select(element).selectAll('button').data(records,d=>d.id).join('button').attr('class',d=>'sample'+(d.id===selectedId?' selected':''))
      .attr('aria-label',d=>`${d.id}. Actual ${d.label}, predicted ${d.predicted}. Inspect image.`).on('click',(_,d)=>onSelect(d));
    buttons.append('canvas').attr('width',84).attr('height',84).each(function(d){LabUI.drawDigit(this,LabCore.imageAt(d.index));});
    buttons.append('span').text(d=>'Actual '+d.label);
    buttons.append('span').attr('class',d=>d.label!==d.predicted?'wrong':'').text(d=>'Predicted '+d.predicted);
    buttons.append('span').text(d=>'Score '+(d.score*100).toFixed(0)+'%');
  }
};
