# Dataset and processing

Exercise time 0 is original video time 5.00 s. The displayed segment runs 0–15.98 s (800 samples at 50 Hz). The original video is retained; the example player seeks to 5 s before showing it and maps all controls to exercise time. It does not display the dive phase. The source clip ends near the pool wall; this is not an official complete race/results record.

race.json and race-data.js are identical representations. times[] is exercise seconds. series[laneId][sampleIndex] contains [distanceM, videoX, sourceRank]. lanes.json provides IDs, names, centerlines and four-point regions. Source IDs are used as classroom lane labels, without independently authenticating official lane assignments.

Distance uses a centered Gaussian smoother (sigma 0.60 s), and screen x uses sigma 0.16 s. Distance additionally uses a nondecreasing clamp to avoid backwards jitter in the schematic. The browser uses shape-preserving cubic interpolation. These are processed demonstration estimates, not new measurements. Raw detected y is intentionally omitted from the teaching API; every videoPoint is fixed to the lane centerline. Source ranks are nearest-sample values and may differ from ranks calculated from smoothed distance. Do not present either as official results.

Provenance hashes and all transformations are recorded in provenance.json. LICENSE and NOTICE.txt preserve source attribution. Code licensing does not grant new rights to footage. The Task 1 photo comes from a different clip and does not share these coordinates.
