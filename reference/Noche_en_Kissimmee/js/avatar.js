function avatarSVG(a, opts = {}) {
  const { skin, hair, hairStyle, eyes, outfit, acc } = a;
  const cls = opts.className || '';
  const label = opts.label || 'Character';
  const hairBack = {
    short: '',
    long: `<path d="M22 56 Q22 20 60 20 Q98 20 98 56 L98 100 Q98 108 90 108 L30 108 Q22 108 22 100Z" fill="${hair}"/>`,
    curly: `<g fill="${hair}"><circle cx="26" cy="46" r="14"/><circle cx="94" cy="46" r="14"/><circle cx="34" cy="28" r="14"/><circle cx="86" cy="28" r="14"/><circle cx="60" cy="22" r="16"/></g>`,
    bun: `<circle cx="60" cy="12" r="12" fill="${hair}"/>`
  }[hairStyle] || '';
  const hairFront = {
    short: `<path d="M28 52 Q26 22 60 22 Q94 22 92 52 Q76 36 60 40 Q44 36 28 52Z" fill="${hair}"/>`,
    long: `<path d="M28 52 Q26 22 60 22 Q94 22 92 52 Q76 38 60 40 Q44 38 28 52Z" fill="${hair}"/>`,
    curly: `<path d="M30 50 Q30 28 60 28 Q90 28 90 50 Q76 38 60 40 Q44 38 30 50Z" fill="${hair}"/>`,
    bun: `<path d="M28 52 Q26 22 60 22 Q94 22 92 52 Q76 36 60 40 Q44 36 28 52Z" fill="${hair}"/>`
  }[hairStyle] || '';
  const eyeSvg = {
    dot: `<circle class="eye" cx="47" cy="58" r="4" fill="#2b1b10"/><circle class="eye" cx="73" cy="58" r="4" fill="#2b1b10"/>`,
    sparkle: `<circle class="eye" cx="47" cy="58" r="5" fill="#2b1b10"/><circle class="eye" cx="73" cy="58" r="5" fill="#2b1b10"/><circle cx="48.8" cy="56" r="1.8" fill="#fff"/><circle cx="74.8" cy="56" r="1.8" fill="#fff"/>`,
    happy: `<path d="M41 60 Q47 52 53 60" stroke="#2b1b10" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M67 60 Q73 52 79 60" stroke="#2b1b10" stroke-width="3" fill="none" stroke-linecap="round"/>`
  }[eyes] || '';
  const accSvg = {
    none: '',
    glasses: `<g fill="none" stroke="#333" stroke-width="2.5"><circle cx="47" cy="58" r="9"/><circle cx="73" cy="58" r="9"/><path d="M56 58 H64"/></g>`,
    cap: `<g><path d="M26 44 Q28 14 60 14 Q92 14 94 44Z" fill="#d94f3a"/><path d="M26 44 Q60 36 112 46 Q96 52 26 48Z" fill="#b53a2a"/><circle cx="60" cy="14" r="3" fill="#fff"/></g>`,
    beard: `<path d="M30 66 Q32 100 60 102 Q88 100 90 66 Q80 84 60 84 Q40 84 30 66Z" fill="${hair}"/>`
  }[acc] || '';
  const mouth = opts.singing
    ? `<ellipse class="mouth-open" cx="60" cy="77" rx="7" ry="6" fill="#7a2e2e"/><ellipse cx="60" cy="80" rx="4" ry="2.5" fill="#ff8a80"/>`
    : `<path d="M51 74 Q60 83 69 74" stroke="#7a2e2e" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return `<svg class="avatar ${cls}" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
    ${hairBack}
    <path d="M30 140 Q30 98 60 98 Q90 98 90 140Z" fill="${outfit}"/>
    <rect x="52" y="86" width="16" height="16" rx="6" fill="${skin}"/>
    <ellipse cx="60" cy="58" rx="33" ry="36" fill="${skin}"/>
    <circle cx="27" cy="60" r="5" fill="${skin}"/><circle cx="93" cy="60" r="5" fill="${skin}"/>
    ${acc === 'beard' ? accSvg : ''}
    ${hairFront}
    ${eyeSvg}
    <ellipse cx="38" cy="70" rx="6" ry="3.5" fill="#ff8a80" opacity=".35"/><ellipse cx="82" cy="70" rx="6" ry="3.5" fill="#ff8a80" opacity=".35"/>
    ${mouth}
    ${acc !== 'beard' ? accSvg : ''}
  </svg>`;
}
