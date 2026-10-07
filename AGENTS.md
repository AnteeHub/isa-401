# Repository Agent Instructions

These instructions apply to work throughout this repository. Follow any more specific instructions in the directory being changed, along with the user's request.

## Git Workflow

- **Inspect before acting.** Check the current branch and working-tree status before changing Git state. Review relevant history and read applicable project instructions before editing.
- **Respect existing work.** Treat pre-existing edits and untracked files as the user's work. Do not discard, overwrite, reset, or stash them unless explicitly asked. Keep changes limited to the requested task.
- **Choose branches deliberately.** Use the branch requested by the user or required by the task. Do not create or switch branches without a clear need or authorization. Follow the branch roles documented in `README.md`: `main` holds the latest lab templates, `preview` supports preview deployments, `dev` accepts development updates, and `dev/{name}` is for an individual student's work.
- **Review before submitting.** Inspect the final diff for accidental or unrelated changes, run relevant tests or checks, and report checks that could not be run.
- **Commit only when requested.** Do not commit or amend unless the user explicitly asks. When authorized, stage only intended files, write a concise descriptive commit message, and report the resulting commit.
- **Publish only when requested.** Push or open a pull request only with explicit authorization. Confirm the remote and target branch first. Never force-push or rewrite shared history unless explicitly authorized.
- **Report Git actions clearly.** Summarize changed files, checks performed, and any commit, push, or pull request created. Disclose blockers or unresolved conflicts.