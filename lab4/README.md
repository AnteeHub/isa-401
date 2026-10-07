# Pelican Ride / Lab 4

[中文步骤：README_ZH.md](README_ZH.md)

**One group, three people, one small interactive scene.** The bicycle scene already works. Ask your own AI agent to add one control. Then combine the three files and try the page together. This is one practice task, ungraded, with no submission required.

## Step 1. Open and try
1. Extract the whole ZIP to a normal local folder.
2. Double-click `reference.html` to try the finished example. Change the speed, rider and view.
3. Open `index.html`. The pelican already cycles. The three controls are your group's work.

No Node, Python, npm, server, API key or installation is needed **for this project**. Your AI agent may need its own account and internet. If HTML opens in an editor, choose Open with your browser. Keep the whole folder together.

## Step 2. Agree on roles and one route

| Member | Add | Agent edits only |
|---|---|---|
| A | Speed slider from 0 to 3 | `features/speed.js` |
| B | Pelican / duck / penguin selector | `features/character.js` |
| C | Wide / close / follow view controls | `features/view.js` |

Choose an integrator from the three members. Each person works in a separate local copy. You can use different AI agents.

**File handoff** is the quickest route: all three extract the same starter, then send their feature file to the integrator. **GitHub or Gitee** is optional if your group can already use a shared repository. Before editing, ask the agent to follow docs/PLATFORMS.md. Choose one platform for the group. One member creates the shared repository and invites the other two. Each member clones it into a local folder and works on their own branch. If setup blocks you, continue with file handoff.

## Make your own version

Do not copy the reference feature code or reproduce its control styling unchanged. Before coding, choose one small difference, such as speed presets alongside the slider, a character button group, or a labelled view selector. Ask your agent to implement that design from the requirements. Reuse the supplied bicycle scene and shared API. You do not need to redraw the scene or invent different JavaScript syntax. Changing names or colors in otherwise copied code is not an independent implementation.

## Step 3. Ask your agent to build your control

Open this whole project folder in your agent. Copy this prompt and replace the role:

> Read README.md and AGENTS.md. I am member [A/B/C]. Follow Step 3 for my role. Implement only my assigned feature file using the supplied ride API. Keep it simple and runnable by opening index.html. Do not change shared code or other members' files. Ask me to choose a small design difference, then implement it independently. Do not copy reference feature code or reproduce its control styling unchanged. Test what you can, tell me what you actually tested, and give me a short handoff message.

**A: speed**
- Use `window.mountA(root, ride)` in features/speed.js.
- Add a labelled range input, min 0, max 3, step 0.1.
- On input, call `ride.setSpeed(value)`. Show the current number.
- Check 0 stops the bike and 3 runs faster than 1.

**B: character**
- Use `window.mountB(root, ride)` in features/character.js.
- Add a labelled select or buttons for `pelican`, `duck`, `penguin`.
- On change, call `ride.setCharacter(name)`. The pictures already exist.
- Check all three characters appear without changing speed or view.

**C: view**
- Use `window.mountC(root, ride)` in features/view.js.
- Add buttons or a select for `wide`, `close`, `follow`.
- On change, call `ride.setView(name)` and show the selected choice.
- Wide shows the coastal route. Close focuses on the rider. Follow tracks the bicycle while scenery moves behind it. The supplied engine handles the camera transition.
- Check all three views change the framing without changing the rider or speed.

For all roles: read `ride.getState()` to update the control. Call `ride.subscribe(render)` once so Reset scene updates your controls too. Never call a setter inside render. More detail is in docs/API.md. The scene and controls must work with keyboard input as well as a mouse.

## Step 4. Try your own change

Save, then refresh `index.html`. Other members' unfinished controls can remain as text. Test your one control. If it fails, send your agent the action, expected result and actual result. For example: “When I choose Duck, the rider stays white. Please fix only features/character.js.”

No need to read or edit code yourself. Check the behavior and the agent's changed-file list. The reference is one possible design, not the only correct design. If the agent gets stuck, ask for an explanation of the relevant concept, then implement the smallest version from the requirements. Do not paste the reference solution into your feature file.

## Step 5. Combine the files with your agent

File handoff: send your assigned feature file plus a message saying what it does and what you tested. The integrator makes a separate copy of the starter and creates a backup before combining work. Keep the names speed.js, character.js and view.js. Do not replace a teammate's entire folder.

Integrator prompt:
> Read docs/INTEGRATE.md. We have three contributions. Help me back up our integration folder, compare the received files and put only the three agreed files in features/. Keep shared code unchanged. After combining, guide us through Step 6. Report any missing files or failing checks.

GitHub/Gitee: ask the agent to help commit and push your role branch. Create a pull request into the actual default branch. A teammate reviews it. The integrator merges the three reviewed contributions and pulls the result locally. Everyone then updates their own local default branch. This combined branch is the next version of the same project. docs/PLATFORMS.md has the step-by-step prompts. You handle account sign-in yourself.

## Step 6. Play together

Open the **combined** `index.html` on the integrator's computer:
1. Set speed to 2.
2. Switch to Duck.
3. Switch to Close view.
4. All three choices should stay active together.
5. Set speed to 0: wheels, pedal, road and camera motion should stop.
6. Reset scene: the pelican and Wide return, and all controls match the scene.

Ask a teammate to operate the page without coaching. Fix any problem in the responsible member's file. You have finished when all three controls work together. Reloading resets the scene. This project combines code, not live data across computers.

## Optional, only after it works
Give your controls a different visual style, rename the display labels, or suggest one small interaction of your own. Agree on the owner and affected file first. Keep the small shared API unchanged for this exercise.

## When something blocks you
- Can't install Git or reach the website? Use file handoff.
- Blank page? Extract the whole ZIP and open index.html in a normal browser. Ask the agent to check the console error.
- Changes missing? Save the assigned file and refresh index.html in the correct folder. reference.html always shows the completed example.
- Agent suggests a framework? Say: “Use the existing local HTML and vanilla JavaScript. Follow AGENTS.md. No installations.”
- Motion starts stopped? Your system may prefer reduced motion. Use the speed control to start it deliberately.

For formal coursework, use the submission platform required by the module brief. These practice choices do not change assessment rules.
