// SVG backdrops (viewBox 800x450). Optional real photos: put images/<backdrop>.jpg next to index.html and they overlay automatically.
const win = (x, y, d) => `<rect x="${x}" y="${y}" width="26" height="34" rx="3" fill="#ffd978" style="animation:flick 4s ${d}s infinite"/>`;
const palm = (x, s = 1) => `<g transform="translate(${x} 330) scale(${s})"><path d="M0 0 Q6 -70 -4 -130" stroke="#5b3b22" stroke-width="9" fill="none" stroke-linecap="round"/>
  <g class="sway" fill="#2f8a52"><path d="M-4 -130 Q-50 -150 -70 -120 Q-40 -140 -4 -126Z"/><path d="M-4 -130 Q40 -158 70 -128 Q36 -144 -4 -126Z"/><path d="M-4 -130 Q-30 -170 -62 -166 Q-30 -160 -4 -128Z"/><path d="M-4 -130 Q24 -172 58 -164 Q26 -158 -4 -126Z"/></g></g>`;
const stars = Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 97) % 800}" cy="${(i * 53) % 150 + 6}" r="${i % 3 ? 1.2 : 2}" fill="#fff" style="animation:twinkle ${2 + (i % 4)}s ${i % 5 * .4}s infinite"/>`).join('');
const bulbs = (y, n = 14) => `<path d="M0 ${y} Q400 ${y + 40} 800 ${y}" stroke="#2b1b3a" stroke-width="2" fill="none"/>` +
  Array.from({ length: n }, (_, i) => { const x = 30 + i * (740 / (n - 1)); const yy = y + 40 * (1 - Math.pow((x - 400) / 400, 2)) * 1 - 0; return `<circle cx="${x}" cy="${yy + 4}" r="5" fill="#ffd36e" style="animation:flick 3s ${i * .2}s infinite"/>`; }).join('');
const tapSvg = (x, y, c) => `<g transform="translate(${x} ${y})"><rect x="-4" y="-16" width="8" height="22" rx="3" fill="#d9dde3"/><rect x="-10" y="-22" width="20" height="9" rx="4" fill="${c}"/><rect x="-3" y="6" width="6" height="12" fill="#aab1ba"/></g>`;

const BACKDROPS = {
  street: () => `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1646"/><stop offset=".55" stop-color="#8a3d7a"/><stop offset="1" stop-color="#ff9a5c"/></linearGradient></defs>
    <rect width="800" height="450" fill="url(#sk)"/>${stars}<circle cx="660" cy="80" r="26" fill="#fff6d6" opacity=".9"/>
    <g fill="#3a2350"><rect x="20" y="170" width="150" height="190"/><rect x="190" y="130" width="130" height="230"/><rect x="560" y="150" width="120" height="210"/><rect x="690" y="190" width="110" height="170"/></g>
    ${[0, 1, 2, 3].map((i) => win(40 + i * 34, 190, i * .5) + win(40 + i * 34, 240, i * .7 + 1)).join('')}${[0, 1, 2].map((i) => win(205 + i * 36, 150, i) + win(205 + i * 36, 210, i + .3)).join('')}
    <rect x="340" y="190" width="200" height="170" fill="#4a2a66"/><rect x="340" y="190" width="200" height="22" fill="#6b3fa0"/>
    <g class="glow"><rect x="352" y="140" width="176" height="40" rx="10" fill="#7a2fd0"/><text x="440" y="158" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="600" font-size="15" fill="#fff">VIOLET'S VENOM</text><text x="440" y="174" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="12" fill="#e9c9ff">BREWERY</text></g>
    <rect x="410" y="250" width="60" height="110" rx="4" fill="#2a1646"/><rect x="418" y="258" width="44" height="94" fill="#ffcf73" opacity=".85" class="glow"/>
    <rect x="356" y="236" width="40" height="46" fill="#ffcf73" opacity=".8"/><rect x="484" y="236" width="40" height="46" fill="#ffcf73" opacity=".8"/>
    ${bulbs(100)}${palm(120, 1)}${palm(700, 1.1)}
    <rect y="360" width="800" height="90" fill="#37283f"/><rect y="360" width="800" height="10" fill="#554463"/><path d="M0 410 H800" stroke="#6b5a77" stroke-width="3" stroke-dasharray="40 30"/></svg>`,

  pub: () => `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2c3f"/><stop offset="1" stop-color="#2a1830"/></linearGradient></defs>
    <rect width="800" height="450" fill="url(#wl)"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 100}" y="0" width="98" height="300" fill="#5a3548" opacity=".35"/>`).join('')}
    <g class="glow"><circle cx="150" cy="60" r="60" fill="#ffcf73" opacity=".18"/><circle cx="650" cy="60" r="60" fill="#ffcf73" opacity=".18"/></g>
    <path d="M150 0 V40 M650 0 V40" stroke="#2b1b3a" stroke-width="3"/><path d="M130 40 H170 L162 70 H138Z M630 40 H670 L662 70 H638Z" fill="#ffb347"/>
    <rect x="240" y="40" width="320" height="30" rx="8" fill="#7a2fd0"/><text x="400" y="62" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="600" font-size="19" fill="#fff">VIOLET'S VENOM BREWERY</text>
    <rect x="60" y="110" width="680" height="100" rx="8" fill="#2a1a22"/><rect x="60" y="205" width="680" height="12" fill="#8a5a38"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => tapSvg(110 + i * 95, 150, ['#ffc14d', '#ff6f91', '#5ad1b0', '#b47aff', '#7cc4ff', '#ff9f5a', '#8ee07a'][i])).join('')}
    <rect y="320" width="800" height="130" fill="#6b4226"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M0 ${340 + i * 26} H800" stroke="#54321b" stroke-width="2"/>`).join('')}
    <g><ellipse cx="400" cy="380" rx="120" ry="14" fill="#000" opacity=".25"/><rect x="290" y="340" width="220" height="14" rx="5" fill="#a56a3c"/><rect x="380" y="354" width="40" height="46" fill="#7e4f2c"/></g></svg>`,

  tapwall: () => `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"><rect width="800" height="450" fill="#2a1830"/>
    <rect x="30" y="50" width="740" height="250" rx="14" fill="#1c1020" stroke="#7a2fd0" stroke-width="4"/>
    <g class="glow"><rect x="50" y="62" width="700" height="26" rx="6" fill="#7a2fd0"/><text x="400" y="81" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="600" font-size="16" fill="#fff">TAP WALL · SELF-SERVE</text></g>
    <rect y="330" width="800" height="120" fill="#6b4226"/></svg>`,

  karaoke: () => `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"><rect width="800" height="450" fill="#1b0f2e"/>
    <path d="M0 0 H800 V40 Q400 70 0 40Z" fill="#7a1f4d"/><path d="M0 0 H110 V320 Q60 300 0 320Z" fill="#8f2a5e"/><path d="M800 0 H690 V320 Q740 300 800 320Z" fill="#8f2a5e"/>
    <g class="spots"><path d="M200 0 L60 330 L340 330Z" fill="#ff6fb5" opacity=".18"/><path d="M400 0 L270 330 L530 330Z" fill="#ffd36e" opacity=".16"/><path d="M600 0 L460 330 L740 330Z" fill="#7cc4ff" opacity=".18"/></g>
    <rect x="260" y="70" width="280" height="64" rx="10" fill="#0d0718" stroke="#ff6fb5" stroke-width="3"/><text x="400" y="110" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="600" font-size="26" fill="#ff9ed2" class="glow">♪ We Are Family ♪</text>
    <rect y="330" width="800" height="120" fill="#3a1f4d"/><rect y="330" width="800" height="12" fill="#ff6fb5" class="glow"/></svg>`,

  restroom: () => `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"><rect width="800" height="450" fill="#3a2a4a"/><rect y="340" width="800" height="110" fill="#26182f"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${i * 100} 340 L${i * 100 - 40} 450" stroke="#4a3560" stroke-width="2"/>`).join('')}
    <g class="glow"><circle cx="400" cy="30" r="46" fill="#ffcf73" opacity=".18"/></g></svg>`,

  kids: () => `<svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"><rect width="800" height="450" fill="#463052"/>
    <rect x="40" y="60" width="150" height="130" rx="6" fill="#5a4066"/><rect x="50" y="70" width="130" height="110" fill="#ffcf73" opacity=".8"/><path d="M115 70 V180 M50 125 H180" stroke="#5a4066" stroke-width="4"/>
    <g class="glow"><circle cx="560" cy="50" r="50" fill="#ffcf73" opacity=".2"/></g><path d="M560 0 V30" stroke="#2b1b3a" stroke-width="3"/><path d="M540 30 H580 L572 58 H548Z" fill="#ffb347"/>
    <rect x="460" y="90" width="270" height="110" fill="#2f2040"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${470 + i * 42}" y="100" width="34" height="${30 + (i % 3) * 14}" fill="${['#ff6f91', '#7cc4ff', '#8ee07a', '#ffc14d', '#b47aff', '#5ad1b0'][i]}" opacity=".85"/>`).join('')}
    <rect y="330" width="800" height="120" fill="#6b4226"/></svg>`
};

// Which backdrop each scene uses
const SCENE_BG = { street: 'street', door: 'pub', order: 'pub', tapwall: 'tapwall', cheers: 'pub', karaoke: 'karaoke', restroom: 'restroom', kids: 'kids', bye: 'street' };
