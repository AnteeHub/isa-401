# Lab 3-How to visualize the AI “black box”?

**Ungraded. No submission required.**

This AI reads handwritten digits. Sometimes it gets them wrong. Build a page that lets someone find and inspect those mistakes. You choose the design. Your agent writes and saves the code; you try the result in the browser. The reference is one possible design, not a template you must copy.

## Start in four steps

1. Extract the whole ZIP. Double-click **index.html**.
2. Open this extracted folder in your agent tool.
3. Ask: **“Read README.md and AGENTS.md. Help me open this project. Wait for my task choice.”**
4. Choose one prompt from **docs/PROMPTS.html** and describe your idea. Ask the agent to implement it and open **student.html**. After the agent saves a change, reload the page and try it. No manual coding is required.

The browser project works offline with no installation. The libraries, model and images are included. Your agent service may need its own internet connection and account.

## Two design tasks with your agent

| Task | What you design | Where your agent starts |
|---|---|---|
| 1: Design your error view | A chart linked to the matching digit images | student/views.js |
| 2: Watch, pause and inspect | Clear controls for checking more images | student/progress.js |

The starter checks 80 images automatically. Its missing views and disabled controls are intentional. The model, prediction engine, progress display and optional history chart are supplied. The image eraser is already built: try it after the two tasks.

## If you get stuck

- **checkpoints/task1.html** supplies Task 1 and loads your Task 2 code.
- **reference.html** and **checkpoints/task2.html** show the complete example.
- **docs/GUIDE.html** gives short instructions and things to try.

Checkpoint pages never overwrite your files. Keep the checkpoint page open when editing the remaining task. Optional recovery: `python3 scripts/restore_checkpoint.py --after 1` restores Task 1, or `--after 2` restores both tasks. On Windows use `py -3`. The script backs up existing student files first. The source solutions are in reference/.

You have finished when you can show one wrong answer and explain how the interface helped you inspect it. There is nothing to submit.

## Details for your agent

Students can begin with the steps above. The remaining sections cover deployment and model details when an agent needs them.

## Deployment and troubleshooting

Direct file opening is the intended route. Ordinary scripts and embedded assets avoid local fetch restrictions. If your browser or institution blocks local scripts, use a local server:

- macOS/Linux: `python3 serve.py`
- Windows: `py -3 serve.py` (or `python serve.py`)

Run from this folder. No pip packages are needed. Open the printed localhost URL and keep the terminal running. The server chooses a free port from 8033–8053 and binds to localhost only. Stop it with Ctrl+C.

An existing Node installation can alternatively run `node scripts/serve.mjs`. No npm install is needed. If neither runtime exists, your agent should follow **docs/AGENT_SETUP.md** and try another allowed desktop browser before installing anything.

To deploy on an existing static web host, upload this complete directory preserving paths and case, and use index.html as the entry point. No backend, environment variables or cloud model endpoint are required. Do not publish the project or create paid hosting unless explicitly requested. A school-managed content security policy must permit the local scripts and styles.

If the page still shows old code, ask the agent to check that it saved the correct student file, then reload. Verify you are on the intended page, not reference.html. Keep vendor/, data/ and src/ together. Read the visible error and browser console before asking the agent to change unrelated files.

## Model and data

The frozen MLP has 784 inputs, one ReLU hidden layer with 48 units and 10 softmax outputs. It has 38,170 parameters. It was trained on 20,000 MNIST training images. The classroom set contains 800 held-out test images, 80 per digit, in a fixed shuffled order. See **docs/MODEL_CARD.md** and data/model-card.json for provenance and measured performance.

The browser performs real inference, including for modified images. It does not replay stored prediction labels. The engine evaluates 40 new images per step. A visible teaching interval slows updates; this is not a computation-speed benchmark. The first 80 images are evaluated at page load, and Reset evaluation clears all records.

Global statistics always refer to all processed original images. Filtering changes only the evidence gallery. Modified images never enter evaluation statistics or replace originals. A high softmax score does not guarantee a correct prediction. A stable partial result does not guarantee a stable final result. This project inspects model behavior and local sensitivity; it does not establish a complete causal explanation.

## Agent and verification resources

- AGENTS.md and CLAUDE.md: project instructions for agents.
- docs/API.md: stable interfaces and expected data shapes.
- docs/ACCEPTANCE.md: browser checks for each task.
- scripts/check-package.mjs: optional Node syntax, links and package checks.
- reference/: complete implementations for comparison after attempting a task.
- readings/: original paper PDFs and a focused reading guide.
- NOTICE.md: sources and third-party licenses.

If Node is installed, run `node scripts/check-package.mjs`. This checks packaging only. Your agent must also exercise changed behavior in a real browser and report what it actually checked.
