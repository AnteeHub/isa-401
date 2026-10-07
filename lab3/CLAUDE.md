# Agent instructions for AI Error Explorer

Read README.md, docs/API.md and the requested task in docs/TASKS.md before editing. All practice is ungraded. No submission required. Preserve these notices. Keep all interface text, teaching documentation and comments in English.

## Scope

Use the learner's current task. Do not solve every task automatically. There are two task files: student/views.js and student/progress.js. Task 2 starts with bind; src/progress-display.js supplies the display and optional history. The learner may choose a grid, ranked error-pair bars, or another linked view. Do not force the reference layout. For a requested design, you may also make small presentation changes in src/style.css, HTML, or src/progress-display.js; preserve IDs and API contracts. Reuse the supplied display by default. reference/probe.js supplies the image experiment on every page. Do not turn the image experiment into a third coding task. Complete the two tasks incrementally in one project. Preserve earlier work. Ask what observation the learner wants to investigate if their design request is unclear. Give a short explanation of the code change and browser evidence.

The provided engine, model and data already work. Do not replace data with invented examples, simulate predictions, edit original pixels, retrain the model, install an ML stack, call a remote model, add a framework, or start a second evaluation timer. Use LabCore and the Engine instance in the supplied APIs. User requests take precedence over these default project constraints.

## Runtime

Try double-clicking index.html first. Classic local scripts support file://. If blocked, follow docs/AGENT_SETUP.md using an existing Python or Node runtime. No third-party server package is needed. Bind only to localhost. Do not publish, create paid services or upload data without explicit authorization. The agent itself may require network access, but the teaching project does not.

## Data semantics

In a matrix, rows = actual labels and columns = model predictions. Other views must label the actual/predicted pair clearly. Counts and accuracy use only processed ORIGINAL records. If filtering or ranking the overview, label its scope (for example, Top 5 error types). Match galleries by both label and prediction. Show counts and denominator clearly. Keep global statistics independent of gallery filters. Preserve stable identities and fixed axis/color meanings. Progress is count/800, not accuracy. Handle zero processed images without NaN. Modified-image predictions must not mutate original records or model weights. Mark edited predictions stale until the user predicts again.

Use keyboard-accessible controls, readable labels and numerical counts in addition to color. The user should be able to understand what a control does without knowing implementation details.

## Completion and recovery

Verify the learner's current task against docs/ACCEPTANCE.md in an actual browser. Check errors. A syntax check alone is insufficient. Preserve browser and platform limitations in your report. If browser automation is unavailable, provide exact manual checks and do not claim they passed.

Checkpoints provide completed earlier tasks while loading the learner's current student file. Do not edit reference/ or checkpoints/ to make student.html appear fixed. If the learner requests recovery, back up the overwritten student files before copying reference modules. scripts/restore_checkpoint.py performs that backup when Python is present. Do not automatically reveal reference code when the learner only asks for a hint.
