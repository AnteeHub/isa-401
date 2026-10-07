# API contracts

All APIs are browser globals loaded by ordinary script tags. The page loads exactly one implementation of each student module. Do not import npm modules or fetch model assets. Use D3 7.9.0 and TensorFlow.js 4.22.0 from vendor/.

## Task 1: window.StudentViews

Implement `renderMatrix({element, state, selection, onSelect})` and `renderGallery({element, records, onSelect, selectedId})` in student/views.js.

- `element`: an existing DOM container. Replace or update its children. Preserve the host element and app IDs when changing layout.
- `state.cells`: all 100 `{actual, predicted, count}` cells, including zero counts. `actual` is the row, `predicted` the column. Counts refer only to evaluated images.
- `selection`: null or `{actual, predicted}`. Indicate the active cell.
- Matrix `onSelect(actual, predicted)`: supplied callback. It filters the gallery by BOTH fields and clears the errors-only toggle so diagonal cells work too.
- Gallery `records`: the current filtered page, at most 12 records. Pagination is already handled. Never refilter this list using full data.
- Gallery `onSelect(record)`: supplied callback. It opens that record in the input experiment.
- `selectedId`: null or the currently selected record ID.

A processed record contains `{id, index, label, predicted, score, scores}`. `label` is the original MNIST label. `score` is the largest softmax output. `scores` contains 10 outputs summing approximately to 1. Each id is unique. Records and score arrays are frozen.

`LabCore.imageAt(record.index)` returns a NEW Float32Array of 784 pixel values in [0,1]. `LabUI.drawDigit(canvas, pixels)` paints those pixels. The image is black with white strokes. Give the canvas explicit width/height attributes, e.g. 84 by 84. Label each sample with actual and predicted digits. Handle an empty list with a readable message.

## Task 2: window.StudentProgress

Start by implementing `bind({engine,elements})` in student/progress.js. Reuse `render: LabProgressDisplay.render` by default; small display changes are allowed for the learner’s requested design. src/progress-display.js already supplies button labels, disabled states, status, progress and the optional history chart.

`elements` contains real DOM nodes: run, step, reset, cadence (select), progress (HTML progress), status (text), history (container).

Engine methods:

- `start()`: starts evaluation if paused and incomplete. Calling it twice does not start another timer.
- `pause()`: cancels the scheduled next batch. The current synchronous batch finishes before browser events run. No later batch enters after pause.
- `step()`: performs actual inference for the next 40 images, then commits those records once. Disable the step UI while running.
- `reset()`: cancels execution, clears records/history and emits an empty state. Model weights and image order remain unchanged.
- `setDelay(value)`: accepts 250, 750 or 1500 milliseconds. A scheduled wait may finish at its old interval; subsequent waits use the new setting.
- `getState()`: returns the latest snapshot.
- `subscribe(callback)`: calls immediately and after changes. The app already subscribes for rendering; you do not need another subscription.

State fields:

- `count`, `total` (800), `correct`, `errors`, `accuracy` (null if empty, otherwise 0–1).
- `records`: processed records only. `cells`: confusion counts.
- `history`: cumulative snapshots `{count, accuracy}` after each committed batch, including the initial 80.
- `running`, `completed`, `batchSize` (40), `delay`.

Assign `elements.run.onclick`, `elements.step.onclick`, `elements.reset.onclick` and `elements.cadence.onchange` to the matching engine actions. The run action checks `engine.running` to choose pause or start. The supplied display detects an unconnected run button and keeps controls disabled until it is connected. It handles completed, running and empty states and draws the optional history with fixed axes. The first 80 records are evaluated by the app at startup for Task 1. Do not create data, timers, predictions or training code in the student module.

## Supplied image experiment: window.StudentProbe

reference/probe.js already implements `mount({element,core,ui})` and loads on every project page. No student implementation is required. It returns `select(record)`, called when a learner chooses an image. The following details describe the supplied behavior for debugging.

- `core.imageAt(index)`: a copy of original normalized pixels.
- `core.predict(pixels)`: synchronous local inference. Returns `{predicted,score,scores}`. Accepts exactly 784 finite values in [0,1]. Does not train or modify the model.
- `ui.drawDigit(canvas,pixels)`: paints the digit without changing it.
- `ui.scoreText(result)`: accessible text containing prediction and top score.
- `createPixelEditor(canvas,onChange)`: supplied drag-to-erase editor. Returns `set(pixels)`, `get()` (a copy), and `eraseCenter()` (a keyboard-accessible alternative when wired to a button).

Store the original separately. Show original and modified canvases, original prediction, modified prediction, a Predict button, Reset and a changed-pixel count. On edit, mark the last modified prediction stale. Predict again only when the learner requests it. Reset restores the pixels of the selected original, not the first image in the dataset. Switching samples must replace both views. Modified images are NOT assigned a new ground-truth label and must never enter the evaluation records. Explain that a large edit can change the digit's meaning.

## Error handling and inspection

The app exposes `window.errorLab` after loading, with `engine`, `core`, `getState()`, `selectCell(actual,predicted)` and `getProbe()`. This supports browser verification. If a student view throws, the app pauses evaluation and displays an error. Fix the module and refresh. The base project never uploads images or code.

## Design freedom

The function name renderMatrix is retained for compatibility, but its output need not be a matrix. It owns the overview container. You can use state.cells to draw error-pair bars or another view, and call onSelect(actual, predicted) to show matching images. Keep the renderMatrix and renderGallery signatures unchanged. Display actual/predicted labels and truthful counts. If showing a subset, label its scope. Do not change the engine, model, original images or global statistics. The reference is one design, not an appearance requirement.

The agent can adjust CSS and page presentation for the learner's design while preserving element IDs and the supplied app API. For Task 2 reuse LabProgressDisplay.render unless the learner explicitly requests a display change. The agent writes and saves files; the learner evaluates the interface in the browser.
