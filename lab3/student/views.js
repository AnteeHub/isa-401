/* TASK 1: ask your agent to implement these two linked views.
   Read docs/API.md and docs/TASKS.md first. Keep all labels in English.
   state.cells contains {actual, predicted, count}. Zero means no processed match.
   onSelect(actual, predicted) changes the gallery filter.
   The application already handles filtering and pagination for renderGallery.
*/
window.StudentViews={
  renderMatrix({element,state,selection,onSelect}){
    // TODO: draw your chosen D3 overview (grid, ranked error-pair bars, or another view).
    // Use state.cells and call onSelect when an error type is activated.
    LabUI.placeholder(element,'Task 1: ask your agent to add the error distribution and connect error selection to the image gallery.');
  },
  renderGallery({element,records,onSelect,selectedId}){
    // TODO: show records as digit images, with actual and predicted labels.
    // LabUI.drawDigit(canvas, LabCore.imageAt(record.index)) draws real pixels.
    // Call onSelect(record) when the learner inspects a sample.
    LabUI.placeholder(element,'Task 1: the selected records will appear here.');
  }
};
