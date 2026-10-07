/* TASK 2: make the buttons work. Read docs/API.md for the agent details.
   The display and accuracy chart are supplied. Keep render unchanged.
*/
// Member B: original SVG portraits and a native, mutually exclusive selector.
window.mountB = function(root, ride) {
  const portraits = {
    pelican: '<path d="M22 65Q13 46 30 42L36 26Q38 15 47 20Q53 25 47 36L43 48Q56 55 49 66Z" fill="#fffdf5"/><path d="M47 27L77 32Q64 47 47 37Z" fill="#efbd78"/><path d="M22 51Q30 46 37 57L27 61" fill="#dce5df"/><circle cx="44" cy="25" r="2" fill="#263d46"/>',
    duck: '<path d="M17 48L26 51Q32 39 43 43L42 33Q34 18 47 17Q64 18 59 35L55 47Q66 66 42 68Q20 68 17 48Z" fill="#f2cf70"/><path d="M58 27Q77 24 73 35L58 36Z" fill="#ee9d46"/><path d="M29 51Q42 43 49 55Q41 65 29 57Z" fill="#dfb553"/><circle cx="53" cy="25" r="2" fill="#263d46"/>',
    penguin: '<path d="M26 64Q21 47 30 32Q28 15 43 14Q60 14 58 33Q70 52 60 65Z" fill="#293e48"/><ellipse cx="44" cy="48" rx="13" ry="18" fill="#fffdf5"/><path d="M49 28L65 33L49 37Z" fill="#e8a453"/><path d="M29 38L20 54M58 39L67 54" fill="none" stroke="#52646b" stroke-width="6" stroke-linecap="round"/><circle cx="47" cy="24" r="2" fill="#fffdf5"/><path d="M30 67H40M49 67H59" stroke="#e8a453" stroke-width="5" stroke-linecap="round"/>'
  };
  const hats = [
    {name:'Baseball cap', color:'#357da8', shape:'<path d="M5 16V13a7 7 0 0 1 14 0v3Z"/><path d="M4 16h18v2H4Z"/>'},
    {name:'Beanie', color:'#c66648', shape:'<path d="M5 16V12a7 7 0 0 1 14 0v4Z"/><circle cx="12" cy="4" r="2"/><rect x="4" y="15" width="16" height="4" rx="1"/>'},
    {name:'Bucket hat', color:'#719479', shape:'<path d="M7 6h10l2 10H5Z"/><path d="M5 15h14l3 4H2Z"/>'},
    {name:'Top hat', color:'#454d68', shape:'<path d="M6 3h12v15H6Z"/><path d="M2 18h20v2H2Z"/><path d="M7 14h10" stroke="#fff" opacity=".6"/>'},
    {name:'Beret', color:'#a65366', shape:'<path d="M3 13Q1 6 12 6q10 0 10 6l-5 5H6Z"/><path d="M12 6l2-3M6 18h11" fill="none"/>'},
    {name:'Cowboy hat', color:'#a4774b', shape:'<path d="M7 16L8 5l4 3 4-3 2 11Z"/><path d="M2 13q2 5 10 4 8 1 10-4v5q-10 5-20 0Z"/>'},
    {name:'Straw hat', color:'#d9b663', shape:'<path d="M7 15V10a5 5 0 0 1 10 0v5Z"/><ellipse cx="12" cy="17" rx="10" ry="3"/><path d="M7 13h10" stroke="#795c3d"/>'},
    {name:'No hat', empty:true, color:'#64757b', shape:'<g fill="none" stroke="#64757b" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M5 19L19 5"/></g>'}
  ];
  const defaults = hats.map(hat => hat.color);
  let selectedHat = 0;
  root.innerHTML = `<style>
    .bird-selector{border:0;margin:0;padding:0;min-width:0}
    .bird-selector legend{font-size:14px;margin-bottom:12px;padding:0}
    .bird-segments{display:flex;background:#eef3f2;border:1px solid #d6dedd;border-radius:10px;padding:4px;gap:4px}
    .bird-selector .bird-option{position:relative;flex:1;min-width:0;margin:0;cursor:pointer}
    .bird-option input{position:absolute;width:1px;height:1px;opacity:0}
    .bird-option span{display:flex;flex-direction:column;align-items:center;padding:8px 2px 10px;border-radius:6px;border-bottom:3px solid transparent;color:#52666d;font-size:13px;gap:4px}
    .bird-option svg{width:72px;max-width:100%;height:72px}
    .bird-option:hover span{background:#e3ecea}
    .bird-option input:checked+span{background:#fffdf8;border-bottom-color:#166a91;color:#164e68;font-weight:700}
    .bird-option input:focus-visible+span{outline:3px solid #166a91;outline-offset:2px}
    @media(forced-colors:active){.bird-option input:checked+span{border-bottom-color:Highlight}}
    .hat-controls{border:0;padding:0;margin:20px 0 0;min-width:0}
    .hat-controls legend{padding:0;margin-bottom:10px;font-size:14px}
    .hat-grid{display:grid;grid-template-columns:repeat(4,minmax(44px,1fr));gap:8px}
    .hat-grid button{position:relative;display:grid;place-items:center;min-height:44px;padding:9px;border-radius:8px;background:#f4f7f6;color:#263d46}
    .hat-grid button[aria-pressed=true]{background:#e1eef2;border-color:#166a91;box-shadow:inset 0 0 0 1px #166a91}
    .hat-grid svg{width:24px;height:24px;overflow:visible}
    .hat-tooltip{position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);padding:5px 8px;border-radius:5px;background:#263d46;color:white;font-size:12px;white-space:nowrap;z-index:5;pointer-events:none;visibility:hidden}
    .hat-grid button:hover .hat-tooltip,.hat-grid button:focus-visible .hat-tooltip{visibility:visible}
    .hat-controls .hat-color-label{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:14px 0 0}
    .hat-color-label input{width:44px;height:34px;padding:2px;border:1px solid #bbcaca;border-radius:5px;background:white;cursor:pointer}
  </style><fieldset class="bird-selector"><legend>Choose your rider</legend><div class="bird-segments"></div></fieldset>`;
  const group = root.querySelector('.bird-segments');
  Object.entries(portraits).forEach(([name, drawing]) => {
    const label = document.createElement('label');
    label.className = 'bird-option';
    label.innerHTML = `<input type="radio" name="${root.id}-character" value="${name}"><span><svg viewBox="0 0 88 80" aria-hidden="true" focusable="false"><circle cx="44" cy="40" r="36" fill="#dcebec"/>${drawing}</svg>${name[0].toUpperCase() + name.slice(1)}</span>`;
    label.querySelector('input').addEventListener('change', event => {
      if (event.target.checked) ride.setCharacter(name);
    });
    group.appendChild(label);
  });
  const controls = document.createElement('fieldset');
  controls.className = 'hat-controls';
  controls.innerHTML = '<legend>Choose your hat</legend><div class="hat-grid" role="group" aria-label="Hat styles"></div><label class="hat-color-label">Hat color<input type="color" aria-label="Hat color"></label>';
  root.appendChild(controls);
  const grid = controls.querySelector('.hat-grid');
  const colorPicker = controls.querySelector('input');
  // The shared API has no accessory setter: keep the extra SVG layer owned by B.
  const hatLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  hatLayer.setAttribute('data-member-b-hat', '');
  hatLayer.setAttribute('transform', 'translate(455 35) scale(2.2)');
  hatLayer.setAttribute('aria-hidden', 'true');
  document.getElementById('bird').appendChild(hatLayer);
  const drawing = hat => `<g fill="${hat.color}" stroke="#354c54" stroke-width=".7" stroke-linejoin="round">${hat.shape}</g>`;
  hats.forEach((hat, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', hat.name);
    button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${drawing(hat)}</svg><span class="hat-tooltip" aria-hidden="true">${hat.name}</span>`;
    button.addEventListener('click', () => { selectedHat = index; renderHat(); });
    grid.appendChild(button);
  });
  function renderHat() {
    const hat = hats[selectedHat];
    colorPicker.disabled = Boolean(hat.empty);
    if (!hat.empty) colorPicker.value = hat.color;
    hatLayer.innerHTML = hat.empty ? '' : drawing(hat);
    Array.from(grid.children).forEach((button, index) => {
      button.setAttribute('aria-pressed', String(index === selectedHat));
      button.querySelector('svg').innerHTML = drawing(hats[index]);
    });
  }
  colorPicker.addEventListener('input', () => {
    if (hats[selectedHat].empty) return;
    hats[selectedHat].color = colorPicker.value;
    renderHat();
  });
  document.getElementById('reset').addEventListener('click', () => {
    selectedHat = 0;
    hats.forEach((hat, index) => { hat.color = defaults[index]; });
    renderHat();
  });
  renderHat();
  const render = () => root.querySelectorAll('.bird-option input').forEach(input => {
    input.checked = input.value === ride.getState().character;
  });
  render();
  ride.subscribe(render);
};

