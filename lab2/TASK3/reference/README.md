# TASK3/reference

Start the root server as described in the main README.md, then open this task URL. All assets are local; no npm installation. Ungraded lab, no submissions.

## Complete interactions

- Track: choose Track, then click a lane or its button. The camera zooms and follows that athlete along a stable lane center. Exit focus or Escape returns to Overview.
- Compare: choose two or more lane buttons, then Compare selected. Selected lanes remain sharp; other lanes form a blurred, dim background. Save group stores that lane set for this page session. Create multiple groups and click a group to compare it. Edit selection changes the set. Exit focus clears it.
- Highlight: choose one or more lanes. Other lanes are dehighlighted; chosen lanes retain full contrast. Exit focus restores all lanes.
- Playback and seeking work during each mode. Groups and selection reset on refresh. Keep code files if you want to retain edits; nothing is collected.

Reference interaction source: src/interactions.js. Rendering/player: src/player.js. Data sampling: src/api.js. This is a purpose-built vanilla-JS teaching implementation of the view interactions, not a verbatim extraction of the full SwimComposer engine.
