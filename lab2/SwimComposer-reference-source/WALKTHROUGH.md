# Exploring the SwimComposer reference

Use this system to understand how video, changing information and viewer attention can work together. It is an authoring environment; the Task 3 target is a general viewer. You may borrow an interaction idea without copying the authoring interface.

## A few minutes with the complete system

1. Run `python3 ../serve.py` on macOS, or `py -3 ../serve.py` on Windows, from this reference folder. Open the printed URL, then **Open SwimComposer**. Python 3.10+ must be installed. Windows has not been tested on a real machine.
2. Press Play. The original preset changes views near 10 s (Comparison) and 12 s (Tracking), then returns to Overview later. The timeline already contains a designed sequence; this is deliberately richer than the earlier classroom preset with only two layers.
3. Pause before exploring a view manually. In Overview, try highlight styles. In Tracking, inspect following/camera controls. In Comparison, inspect the swimmer comparison and layout options. The exact available settings depend on the current view and selection. Confirming Compare can resume playback; pause again before inspecting the layout.
4. Select a layer name in the left sidebar to inspect it on the right; its toggle controls visibility. The timeline controls when a layer appears and how the view changes. Start with Athlete Name, Rank or Current Speed to keep the exploration manageable.
5. Choose one behaviour worth adapting for a general viewer. For example: how can a viewer keep track of a chosen swimmer; request a comparison; reveal an explanation without covering the race? These are examples, not a mandatory feature list.

## Save and restore

Use the gear next to Export → **Current State JSON**, then click **Export JSON**. The classroom copy downloads a JSON settings file in the browser's download location. This saves authoring settings, not source-code changes or a video. To restore, click a layer name such as **Rank** in the left sidebar, scroll to the bottom of the right **Layer Settings** panel and choose **Import JSON Settings**. Confirm replacing the current authoring state if prompted. With Video Only selected, the EXPORT button instead starts the rendered-video workflow; that is not needed for the lab.

A page refresh loads the bundled preset again. Save settings first if you want to keep them. To share a code modification, keep the complete project folder as well. Do not overwrite the source preset just to try an idea; you can always reload the original reference.

## Code and data map

Paths below are relative to this reference folder.

| Area | File | What to inspect |
|---|---|---|
| Interface and layout | swimcomposer/index.html | Panels, controls, CSS and the module entry point |
| Interaction and timeline logic | swimcomposer/src/app/main.js | Selection, view switching, layer controls, timeline and JSON import/export |
| Rendering | swimcomposer/src/app/pixiApp.js | PixiJS canvas setup |
| Video | swimcomposer/src/app/videoFactory.js | Video element setup |
| Race loading | swimcomposer/src/app/competitionManager.js | Competition assets and metadata |
| Metric definitions | swimcomposer/src/app/vis/metricDefinitions.js | Metric names, units and available representations |
| Metric evaluation | swimcomposer/src/app/vis/metricRuntime.js | Derived values during playback |
| Visual representations | swimcomposer/src/app/vis/representationRenderers.js | How information layers are drawn |
| Original authored sequence | swimcomposer/assets/presets/swimming_competition2.json | Layers and view/speed timeline settings |
| Original compact race assets | swimcomposer/assets/competitions/swimming_competition2/ | Video, overlays, click zones and source metadata |

The full SwimComposer uses PixiJS and ES modules. It does **not** expose the starter's `mountStudentDesign(api, panel)` API. If extending the full system, open the whole context-references folder and read its code before editing. Keep the scope to one interaction; main.js is a large research implementation. The separate student resource pack also supports working with normalized data or the lightweight starter.

## Interpreting the source material

The full system retains upstream demonstration content, including test insights and unverified athlete/result metadata. For example, source insight.json contains `TEST ID 4` and `RESULT TEST`. These are not verified event facts. The classroom normalized data omit these placeholder insights. Data metrics are estimated; 0–4 s are invalid for numerical live metrics, and screen-space lane guides are approximate. This reference is for interaction design, not checking official sporting results.

## Relating exploration to Task 3

Exploring or configuring the system can inform a design. The coding exercise still asks you to implement or refine one usable interaction for a general viewer, demonstrate it with video and gather partner feedback. You can continue Task 2. No complete system rebuild, particular control layout or mandatory AI feature is required.