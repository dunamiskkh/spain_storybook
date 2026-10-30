// In-scene hands-on activities. Each act renders HTML into the stage; progress lives in S.act = {type, step, ...}.
const NUMS_ES = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'];
const pips = (n) => ({ 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] }[n] || []);
const dieHTML = (n) => `<div class="die">${Array.from({ length: 9 }, (_, i) => `<i class="${pips(n).includes(i) ? 'pip' : ''}"></i>`).join('')}</div>`;

const ACTS = {
  qr: {
    need: 1, prompt: 'Tap the QR code on the table',
    html: (a) => `<div class="act act-qr ${a.step ? 'done' : ''}">
      <button class="qr-card" data-action="actDo" data-do="scan" aria-label="Scan the QR code">
        <svg viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="#fff"/>${Array.from({ length: 49 }, (_, i) => (((i * 7 + (i >> 3)) % 3) !== 0 || [0, 6, 42, 48].includes(i)) ? `<rect x="${8 + (i % 7) * 12}" y="${8 + Math.floor(i / 7) * 12}" width="10" height="10" fill="#2a1646"/>` : '').join('')}</svg>
        <span class="scanline"></span></button>
      <div class="menu-pop ${a.step ? 'show' : ''}">📱 Menu opened!<br><b>Una pizza</b> · <b>Alitas</b> · <b>Ensalada</b></div></div>`
  },
  card: {
    need: 1, prompt: 'Tap the card to touch the sensor',
    html: (a) => `<div class="act act-card ${a.step ? 'done' : ''}">
      <div class="sensor"><span>Sensor</span><i class="wave"></i></div>
      <button class="rfid" data-action="actDo" data-do="tap" aria-label="Tap your card on the sensor"><b>VENOM</b><small>tap card</small></button>
      <div class="ok-badge">✓ ¡Listo!</div></div>`
  },
  pour: {
    need: 3, prompt: ['Step 1: tap OPEN (Abre)', 'Step 2: tap POUR (Sirve)', 'Step 3: tap CLOSE (Cierra)', 'Done!'],
    html: (a) => `<div class="act act-pour s${a.step}">
      <div class="tap-body"><div class="handle"></div><div class="spout"></div><div class="stream"></div></div>
      <div class="glass"><div class="beer"></div><div class="foam"></div></div>
      <div class="pour-btns">
        <button data-action="actDo" data-do="open" ${a.step !== 0 ? 'disabled' : ''}>🔓 Abre</button>
        <button data-action="actDo" data-do="pour" ${a.step !== 1 ? 'disabled' : ''}>🍺 Sirve</button>
        <button data-action="actDo" data-do="close" ${a.step !== 2 ? 'disabled' : ''}>🔒 Cierra</button></div></div>`
  },
  cheers: {
    need: 1, prompt: 'Tap the glasses to clink',
    html: (a) => `<div class="act act-cheers ${a.step ? 'done' : ''}">
      <button class="clink" data-action="actDo" data-do="clink" aria-label="Clink glasses"><div class="g g1"><div class="beer"></div><div class="foam"></div></div><div class="g g2"><div class="beer"></div><div class="foam"></div></div><span class="spark">✨</span></button></div>`
  },
  mic: {
    need: 1, prompt: 'Tap the microphone',
    html: (a) => `<div class="act act-mic ${a.step ? 'on' : ''}"><button class="mic" data-action="actDo" data-do="sing" aria-label="Join the singers">🎤</button>
      <div class="notes"><i>♪</i><i>♫</i><i>♪</i><i>♬</i><i>♫</i></div></div>`
  },
  door: {
    need: 1, prompt: 'Tap the RIGHT door (derecha)',
    html: (a) => `<div class="act act-door ${a.step ? 'done' : ''}">
      <button class="door ${a.wrong === 'L' ? 'shake' : ''}" data-action="actDo" data-do="L"><b>Izquierda</b><small>left</small><span>🍽️ Kitchen</span></button>
      <button class="door right ${a.step ? 'open' : ''}" data-action="actDo" data-do="R"><b>Derecha</b><small>right</small><span>🚻 Baño</span></button>
      ${a.wrong ? '<p class="wrongmsg">That is the kitchen. Try the other door!</p>' : ''}</div>`
  },
  dice: {
    need: 3, prompt: 'Roll the dice 3 times',
    html: (a) => `<div class="act act-dice"><button class="dice-btn ${a.rolling ? 'rolling' : ''}" data-action="actDo" data-do="roll" aria-label="Roll the dice">${dieHTML(a.val || 1)}</button>
      <div class="dice-say">${a.val ? `<b>${NUMS_ES[a.val]}</b> = ${a.val}` : 'Tap to roll'}</div><div class="dice-count">${a.step}/3</div></div>`
  }
};
