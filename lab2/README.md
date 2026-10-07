# ISA401 Lab 2 — How to prototype interactions?

**Ungraded lab. No submission required.** Work in pairs and try each other's ideas.

## Choose your material

| Folder | Use |
| --- | --- |
| TASK1 | TASK1-materials.pdf: A4 landscape photo for sketching. A whiteboard, PowerPoint or another drawing tool is also fine. |
| TASK2/optional-starter | Optional digital route: basic eight-lane replay and click selection. Develop your own low-fidelity interaction. |
| TASK2/optional-reference | Optional digital examples: Track, Compare and Highlight. |
| TASK3/video and data-api | Real video, data, JavaScript API and a minimal preview. Implement at least one interaction for a general viewer. |
| TASK3/reference | Complete reference interactions on the real video. |
| SwimComposer-reference-source | Full research system source and assets for exploration. |

**Task 2 can be completed entirely with translucent paper overlays on the printed photo. Both digital folders are optional.** Reference features are examples, not a checklist you must reproduce. Task 4 is an open future scenario; no code or files are required.

## Run the coding materials

1. Extract the entire ZIP. Do not run files from inside the archive.
2. With Python 3.10+ installed, double-click Start_Mac.command or Start_Windows.cmd. If the shortcut does not open, run the command below from this folder. No pip/npm packages or API keys are needed.
3. Open the task URL printed in the terminal. Keep the terminal open while working. The root address shows the folder listing, not a separate resource portal.

macOS: `python3 serve.py`

Windows: `py -3 serve.py` (or `python serve.py`)

Default URL: `http://127.0.0.1:8000/`. If the port is busy, use the actual address printed in the terminal. Ctrl+C stops the server.

For starter work, edit `src/student.js` or make your own app. Save, then refresh the browser. Read the chosen folder's README.md and API.md. The starter folders do not include the reference interaction code. Agent context files are included for coding tools, but using an agent is not required.

## Try a reference

- Track: choose Track, then click a lane. Exit focus or Escape returns to the overview.
- Compare: choose two or more lanes, then Compare selected. Other lanes become blurred. Save group lets you keep multiple lane sets during the current page session.
- Highlight: choose lanes to emphasize; unselected lanes are dehighlighted.

## Data and compatibility

Playback begins 5 seconds into the supplied video, after the dive; exercise time is reset to zero. Athlete y positions stay on fixed lane centerlines. Distance and ranks are estimates, and lane regions are approximate. Read API.md before mapping data to video coordinates. The Task 1 photo comes from a different clip and has no shared tracking coordinates.

The local HTTP route and primary interactions were checked on macOS in Chromium. Windows, Linux and native Safari/Firefox have not been tested for this release. Direct file opening is designed to work for the four classroom pages but has not been browser-tested; use the HTTP route above. Full SwimComposer requires HTTP. Group selections reset when you refresh. No work is uploaded or collected.

Online SwimComposer: http://swimcomposer.visualization.cc
