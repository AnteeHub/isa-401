# Small scene API

The scene engine is supplied. Your module receives `root` (an empty div for your controls) and `ride` (the shared API):

```js
window.mountA = function(root, ride) {
  // Create a labelled control, append it to root, and connect it to ride.
};
```
Use mountB or mountC in B/C's file. The shell calls each mount function once.

| Call | Meaning |
|---|---|
| `ride.getState()` | Copy of `{speed: 1, character: 'pelican', view: 'wide'}` |
| `ride.setSpeed(number)` | Clamp speed to 0–3. 0 stops motion. Default 1. |
| `ride.setCharacter(name)` | `pelican`, `duck` or `penguin` |
| `ride.setView(name)` | `wide`, `close` or `follow` |
| `ride.subscribe(render)` | Call render after a setting changes. Returns unsubscribe. |

Character and view assets already exist. Views are 2D framing choices, not real 3D cameras. Wide shows the entire coastal route. Close gives a clear rider-detail crop. Follow keeps the moving bicycle in frame while scenery moves at different speeds. The supplied engine smoothly changes the SVG viewBox. At speed 0 or with reduced-motion preference, an explicit view change cuts directly without animation. Stop motion sets speed to zero. Reset scene restores the pelican and wide view, with speed 1 (or 0 if reduced-motion preference is active).

Call your render function once when mounted, then subscribe once. In render, update your control from getState(). Do not call a setter from render. Listeners run synchronously. Setting another member's field is out of scope. Local controls do not synchronize across computers, and reloading starts a fresh scene. No persistent storage or network is needed.
