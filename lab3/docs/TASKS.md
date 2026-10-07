# Your lab in two tasks

**Ungraded. No submission required.** Work alone or with a partner. You choose the design. Your AI agent writes and saves the code. You try the result in the browser.

## Our setting

MNIST is a classic collection of handwritten digit images. Each image has a label from 0 to 9. Our supplied AI predicts a digit from an image. Sometimes it gets it wrong.

Build a page that helps someone answer: **Which digits does the AI get wrong? Can I inspect the results while more images are being checked?**

The model, images and image eraser are already provided. No model training or manual coding is required. The reference page is one possible design. Your design can look different.

## Start

1. Extract the ZIP. Open index.html and the extracted folder in your agent tool.
2. Ask: “Read README.md and AGENTS.md. Help me open this project.”
3. Choose one task below. Describe your idea using its prompt in docs/PROMPTS.html.
4. Let the agent write and save the code. Open or reload student.html and try the result.

The starter checks 80 images automatically. Missing views and disabled controls are intentional.

## Task 1: Design your error view

**Your agent starts in student/views.js.**

1. Choose a view: an error grid, bars ranked by error type, or your own idea. An error type is a pair such as “actual 3, predicted 8”.
2. Ask your agent to build it with D3. Selecting an error type should show the matching images and both labels.
3. Try your design. Can a partner find a mistake without your help?

Keep the counts accurate and labels clear. You may change the chart, colors and layout. If showing only some errors, say which ones. Describe one image: **“This image is labeled __, but the AI says __.”**

In the reference grid, rows are actual labels and columns are AI answers. The diagonal contains correct answers. Your own view does not need to use a grid.

## Task 2: Watch, pause and inspect

**Your agent starts in student/progress.js. Keep your Task 1 design.**

1. Ask your agent to connect Start/Pause, Next 40 images and Reset. Choose labels and placement that make these actions easy to understand.
2. Start checking more images, then pause. The number checked should stop changing. Make the paused state clear.
3. Inspect an error. Continue, then see whether your early observation still holds.

The progress display and optional history chart are already provided. Reuse them; another chart is not required. Explain: **“Pausing helped me look at __.”**

## Try it: Change one image

**Already built. No additional coding task.**

1. Click a digit image. An original and an editable copy appear below.
2. Erase a small part of the copy. Click Predict modified image.
3. Compare the answers, then click Reset image.

The answer may stay the same. A large edit may change the digit itself. This shows how the model responds to that edit; it does not explain every reason behind the prediction.

## Help

If Task 1 is unfinished, open checkpoints/task1.html and work on Task 2. It still loads your student/progress.js. Reload after the agent saves changes.

For one finished example, open reference.html or checkpoints/task2.html. Checkpoints never overwrite your files. Your agent can also restore completed files with scripts/restore_checkpoint.py, which creates a backup first.

## If there is time

Let a partner find an error without your help. Ask what confused them. Choose one improvement and ask your agent to make it. You can also explore the optional accuracy history or the supplied readings.

## Finish

Show one wrong answer and explain how your interface helped you inspect it. Nothing needs to be submitted.
