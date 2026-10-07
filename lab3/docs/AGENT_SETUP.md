# Agent deployment guide

## Default: no installation

Open the extracted folder containing index.html, README.md and student/. Read AGENTS.md. Open index.html in a recent desktop browser. This project uses bundled ordinary script tags, embedded model weights and embedded image data. No fetch, ES modules, build step or remote inference is required.

Your agent account may need internet access. That does not mean the browser project needs internet. Do not add a cloud model endpoint or upload images.

## Optional local server

Detect the operating system and existing runtimes. Try `python3 --version` on macOS/Linux, or `py -3 --version` / `python --version` on Windows. If Python exists, run the supplied serve.py from this folder. It uses only the standard library. Do not pip install anything.

Alternatively, if `node --version` works, run `node scripts/serve.mjs`. This uses only Node built-ins. Do not npm install a web framework.

Both servers bind to 127.0.0.1, try ports 8033 through 8053 and print the URL. Keep the process running. If all ports are occupied, identify the old process or choose a different approved local port. Do not terminate unrelated processes.

If neither runtime exists and institutional restrictions prevent file:// execution, follow the user's agent-tool permission policy for installing Python 3. Examples are Homebrew `brew install python` on macOS, winget `winget install -e --id Python.Python.3.12` on Windows, or the distribution package manager on Linux. Do not use sudo silently or replace a working environment. Runtime installation is a fallback, not a classroom prerequisite.

## Static hosting

The whole folder can be served by an existing static host. Keep relative paths, lowercase names and vendor/data files intact. Use index.html as the entry point. There is no backend, database or secret configuration. Do not publish or create paid infrastructure unless the user asks. Test locally first.

## Editing workflow

Ask for the learner's current task. Edit only the corresponding student module unless the requested change requires more. Save, refresh the current starter/checkpoint page and verify the task's acceptance checks. If viewing a checkpoint, confirm which student module it loads. See README.md.

## Browser validation

Use the agent's existing browser tool. No test dependency is required for students. If Node is available, `node scripts/check-package.mjs` verifies syntax and packaging, but you must also test actual interactions described in docs/ACCEPTANCE.md. Do not treat a successful build as a successful browser test.

If browser automation is absent, say what you could verify and provide precise manual steps. Install separate test tooling only if requested, in a separate tooling directory. Never make Playwright or another test tool a prerequisite for using the lab.
