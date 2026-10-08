// Member C: view controls and a local, background-only daylight preview.
window.mountC = function (root, ride) {
  const scene = document.getElementById('scene');
  const times = [
    ['06:00', 'Sunrise', '#886887', '#ffd0a0', 120, 220],
    ['08:00', 'Early morning', '#9bcbdc', '#ffe5b4', 240, 155],
    ['10:00', 'Morning', '#78c4e4', '#e9f5eb', 365, 95],
    ['12:00', 'Noon', '#60b9e4', '#e4f6ff', 500, 55],
    ['16:00', 'Afternoon', '#86b9d4', '#ffe1a4', 665, 115],
    ['18:00', 'Sunset', '#826183', '#ffb178', 830, 220],
    ['00:00', 'Midnight', '#101b3d', '#46547d', 780, 85]
  ];
  let selected = 0, hovered = null, focused = null;
  let zoom = 0, tracking = false;
  let apiView = null;
  root.innerHTML = `<style>
    #controls-C .day-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:3px;margin:18px 0 10px}
    #controls-C .day-cell{position:relative;min-width:0;padding:7px 2px;border-radius:0;border:0;border-bottom:3px solid transparent;background:#edf1f2;color:#526277}
    #controls-C .day-cell[aria-pressed=true]{background:#fff0d4;color:#68451c;border-bottom-color:#c77728}
    #controls-C .day-cell:hover,#controls-C .day-cell:focus-visible{background:#dce9f4}
    #controls-C .day-cell svg{width:26px;height:26px;margin:auto}
    #controls-C .day-tip{display:none;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);padding:5px 7px;background:#263d46;color:white;border-radius:4px;font-size:12px;pointer-events:none;z-index:2}
    #controls-C .day-cell:hover .day-tip,#controls-C .day-cell:focus-visible .day-tip{display:block}
    #controls-C .day-note{font-size:12px;line-height:1.5;margin:8px 0}
    #controls-C .camera-stops{display:flex;justify-content:space-between;font-size:12px;margin-top:-10px;margin-bottom:12px}
    #controls-C .camera-follow{display:flex;align-items:center;gap:8px}
    #controls-C .scene-label{display:block;font-size:14px;margin-top:20px}
  </style>
  <label for="camera-framing">Camera framing</label>
  <input id="camera-framing" type="range" min="0" max="6" step="1" value="0" list="camera-steps" aria-describedby="camera-help">
  <datalist id="camera-steps"><option value="0" label="Wide"></option><option value="1"></option><option value="2"></option><option value="3"></option><option value="4"></option><option value="5"></option><option value="6" label="Close"></option></datalist>
  <div class="camera-stops" aria-hidden="true"><span>Wide</span><span>Close</span></div>
  <label class="camera-follow"><input type="checkbox" id="camera-follow">Follow rider</label>
  <p class="day-note" id="camera-help">Slide to zoom in or out. Turn on Follow to keep the rider in the same spot.</p>
  <span class="scene-label" id="daylight-label">Scene time — switch the background</span>
  <div class="day-grid" role="group" aria-labelledby="daylight-label"></div>
  <p class="day-note" role="status" aria-live="polite"></p>
  <p class="day-note">Hover to preview, click to select. Keyboard: Tab to preview, Enter or Space to select.</p>`;
  const grid = root.querySelector('.day-grid'), note = root.querySelector('[role=status]');
  const view = root.querySelector('#camera-framing');
  const follow = root.querySelector('#camera-follow');
  const sky = scene.querySelectorAll('#sky stop');
  // These two direct children are the supplied sun and its halo, never the rider.
  const [sun, halo] = scene.querySelectorAll(':scope > circle');
  const moon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  moon.setAttribute('d', 'M18 -38 A42 42 0 1 0 18 38 A35 35 0 0 1 18 -38Z');
  moon.setAttribute('fill', '#f5f0cf');
  moon.setAttribute('pointer-events', 'none');
  halo.after(moon);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function background(index) {
    const [, , top, bottom, x, y] = times[index];
    const duration = reduced.matches ? '0s' : '900ms';
    sky.forEach((stop, i) => {
      stop.style.transition = `stop-color ${duration} ease`;
      stop.style.stopColor = i ? bottom : top;
    });
    [sun, halo, moon].forEach(body => {
      body.style.transition = `transform ${duration} ease, opacity ${duration} ease`;
      body.style.transform = body === moon ? `translate(${x}px, ${y}px)` : `translate(${x - 843}px, ${y - 99}px)`;
      body.style.opacity = body === moon ? (index === 6 ? '1' : '0') : (index === 6 ? '0' : body === halo ? '.18' : '1');
    });
  }
  function render() {
    const currentView = ride.getState().view;
    if (currentView !== apiView) {
      zoom = currentView === 'close' ? 6 : currentView === 'follow' ? 3 : 0;
      tracking = currentView === 'follow';
      apiView = currentView;
    }
    follow.checked = tracking;
    view.value = String(zoom);
    view.setAttribute('aria-valuetext', `${zoom === 0 ? 'Wide' : zoom === 6 ? 'Close' : 'Zoom'} — level ${zoom + 1} of 7`);
    const preview = hovered ?? focused ?? selected;
    Array.from(grid.children).forEach((button, i) => button.setAttribute('aria-pressed', String(i === selected)));
    note.textContent = `Selected ${times[selected][0]} · ${times[selected][1]}` + (preview !== selected ? ` | Preview ${times[preview][0]}` : '');
    background(preview);
  }
  times.forEach(([time, label], index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'day-cell';
    button.setAttribute('aria-label', `${label} ${time}`);
    const height = [17, 13, 9, 7, 11, 17][index];
    const icon = index === 6
      ? '<path d="M19 4A10 10 0 1 0 22 21A10 10 0 0 1 19 4Z" fill="currentColor"/>'
      : `<circle cx="14" cy="${height}" r="5" fill="currentColor"/><path d="M3 24H25M14 ${height - 9}v2M5 ${height}H2M23 ${height}h3" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
    button.innerHTML = `<svg viewBox="0 0 28 28" aria-hidden="true">${icon}</svg><span class="day-tip" aria-hidden="true">${time}</span>`;
    button.addEventListener('pointerenter', () => { hovered = index; render(); });
    button.addEventListener('pointerleave', () => { hovered = null; render(); });
    // Pointer clicks should not leave a keyboard preview active after mouse exit.
    button.addEventListener('focus', () => { if (button.matches(':focus-visible')) focused = index; render(); });
    button.addEventListener('blur', () => { focused = null; render(); });
    button.addEventListener('click', () => { selected = index; render(); });
    grid.append(button);
  });
  view.addEventListener('input', () => {
    zoom = Number(view.value);
    render();
  });
  follow.addEventListener('change', () => { tracking = follow.checked; render(); });
  document.getElementById('reset').addEventListener('click', () => {
    selected = 0; hovered = null; focused = null; zoom = 0; tracking = false; render();
  });
  // The supplied API combines framing and tracking into three presets. This
  // feature owns the final viewBox to make zoom and tracking independent.
  // Its frame runs after the supplied engine, reading (never changing) the rider.
  const rider = document.getElementById('rider');
  let displayedZoom = 0, previousTime = null;
  let followBlend = 0, followFrom = 0, followTarget = 0, followElapsed = 0;
  function cameraFrame(time) {
    const dt = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, .05);
    previousTime = time;
    const target = zoom / 6;
    displayedZoom = reduced.matches ? target : displayedZoom + (target - displayedZoom) * (1 - Math.exp(-dt * 10));
    if (Math.abs(displayedZoom - target) < .0001) displayedZoom = target;
    const width = 1000 - 540 * displayedZoom;
    const height = width * .47;
    const riderX = rider.transform.baseVal.consolidate()?.matrix.e || 0;
    if (Number(tracking) !== followTarget) {
      followFrom = followBlend;
      followTarget = Number(tracking);
      followElapsed = 0;
    }
    followElapsed = Math.min(followElapsed + dt, .45);
    const progress = reduced.matches ? 1 : followElapsed / .45;
    const eased = progress * progress * (3 - 2 * progress);
    followBlend = followFrom + (followTarget - followFrom) * eased;
    const x = (1000 - width) / 2 + followBlend * riderX;
    const y = 48 * displayedZoom;
    scene.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
    requestAnimationFrame(cameraFrame);
  }
  requestAnimationFrame(cameraFrame);
  ride.subscribe(render);
  render();
};
