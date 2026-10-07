/* TASK 2: make the buttons work. Read docs/API.md for the agent details.
   The display and accuracy chart are supplied. Keep render unchanged.
*/
window.StudentProgress={
  bind({engine,elements}){
    // TODO: connect run to start/pause, step to step(), reset to reset().
    // TODO: connect cadence to setDelay(). Assign handlers using .onclick/.onchange.
    // Use the supplied engine. It owns the timer, records and model predictions.
  },
  render: LabProgressDisplay.render
};
