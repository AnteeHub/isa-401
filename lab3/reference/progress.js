/* Completed Task 2. The engine and display are supplied. */
window.StudentProgress={
  bind({engine,elements}){
    elements.run.onclick=()=>engine.running?engine.pause():engine.start();
    elements.step.onclick=()=>engine.step();
    elements.reset.onclick=()=>engine.reset();
    elements.cadence.onchange=()=>engine.setDelay(elements.cadence.value);
  },
  render: LabProgressDisplay.render
};
