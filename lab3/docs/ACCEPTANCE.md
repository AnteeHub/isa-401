# Browser acceptance checks

These are ungraded self-checks, not a submission rubric. Syntax and local-link checks alone do not establish correct behavior.

## Task 1

- At startup, 80 images are processed. Every displayed count matches its actual/predicted pair in engine state.
- For a full grid: all cells sum to processed count; diagonal sums to correct count; off-diagonal sums to errors. For an error-only view: all error types sum to errors. A top-N view must clearly label that it shows only a subset.
- Select a nonzero error type. Every gallery record matches BOTH the actual and predicted labels selected.
- If the design includes correct pairs, selecting one must allow its correct examples to appear even when Errors only was checked.
- If a zero-count pair is selectable, show a clear empty state. Always handle Reset with no records.
- Pagination includes all matching records with no duplicate records per page.
- Selection does not change global processed count, accuracy or errors.
- Keyboard focus and activation work. Labels and counts supplement color.

## Task 2

- Start, wait for a new batch, Pause, then wait longer than the selected interval. Count remains unchanged after pause.
- Next 40 images adds exactly 40 until fewer remain. Each record ID occurs once.
- Press Start twice or resume after pause. No second timer or duplicate record appears.
- At completion, count is 800. Further start/step cannot add images.
- Reset while running cancels further updates and yields zero records, empty history and no NaN.
- A complete rerun with the same model and dataset gives the same predictions and final metrics.
- Supplied history x-axis is 0–800 and y-axis is 0–100%. Accuracy values are cumulative, not per-batch accuracy mislabeled as cumulative.
- Filters do not change global statistics. History covers all processed originals.

## Supplied image experiment (regression checks)

- Select a record. Original pixels match its MNIST image.
- Predict an unchanged copy. Class matches and score matches within floating-point tolerance.
- Erasing changes only the editable copy. Clear or mark the old modified result stale.
- Predict edited pixels using the real frozen model. Do not require the class to change.
- Reset restores the selected original. Switching records replaces both images.
- Original data, global counts, the overview and frozen model weights remain unchanged through editing.
- Explain that an original label is not necessarily valid after a large edit.

## Package and runtime

- No unhandled JavaScript errors or required remote runtime requests.
- Core pages work from the full extracted package offline. Test reference, starter and both checkpoints.
- All required assets and English instructions are present. README and AGENTS.md explain deployment.
- If using the optional server, verify its startup URL and localhost binding.
- Report actual browser/OS coverage. Do not claim cross-platform testing from one machine.
