(() => {
  const $app = document.getElementById('app');
  const $top = document.getElementById('topbar');
  const $title = document.getElementById('topTitle');
  const $sound = document.getElementById('soundBtn');
  const $toast = document.getElementById('toast');
  const KEY = 'nk-v1';

  // ---------- state ----------
  const blank = () => ({ name: '', avatar: null, sound: true, done: [], learned: [] });
  const load = () => { try { return { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return blank(); } };
  const S = { view: 'home', sc: null, beat: 0, dir: '', act: null, answered: false, wrong: -1, draft: null, draftName: '', data: load() };
  const save = () => localStorage.setItem(KEY, JSON.stringify(S.data));
  const scene = (id) => SCENES.find((s) => s.id === id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fill = (s) => String(s || '').replace(/\{name\}/g, S.data.name || 'friend');
  const myAv = () => S.data.avatar || DEFAULT_AVATAR;
  const myAvatar = (o) => avatarSVG(myAv(), o);

  // ---------- sound ----------
  let voices = [], warned = false;
  if ('speechSynthesis' in window) { const lv = () => { voices = speechSynthesis.getVoices(); }; lv(); speechSynthesis.onvoiceschanged = lv; }
  const pickVoice = () => { for (const l of ['es-MX', 'es-US', 'es-ES']) { const v = voices.find((x) => x.lang.replace('_', '-') === l); if (v) return v; } return voices.find((x) => x.lang.toLowerCase().startsWith('es')) || null; };
  function speak(text, { rate = 0.85, force = false } = {}) {
    if (!('speechSynthesis' in window)) { toast('This browser cannot speak. Try Chrome or Edge.'); return; }
    if (!force && !S.data.sound) return;
    const v = pickVoice();
    if (!v && !warned && voices.length) { warned = true; toast('No Spanish voice found, using the default voice.'); }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(fill(text).replace(/[¿¡]/g, ''));
    u.lang = v ? v.lang : 'es-ES'; if (v) u.voice = v; u.rate = rate;
    speechSynthesis.speak(u);
  }
  let actx;
  function tone(f, d, type = 'sine', vol = 0.15, delay = 0) {
    if (!S.data.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime + delay, o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d);
    } catch { /* no audio */ }
  }
  const sfx = {
    ok() { tone(660, 0.12); tone(880, 0.2, 'sine', 0.15, 0.1); },
    bad() { tone(200, 0.28, 'triangle', 0.18); },
    flip() { tone(320, 0.06, 'square', 0.04); tone(220, 0.08, 'square', 0.04, 0.05); },
    pop() { tone(520, 0.08); },
    beep() { tone(1200, 0.12, 'square', 0.06); tone(1600, 0.16, 'square', 0.06, 0.12); },
    clink() { tone(2400, 0.2, 'sine', 0.12); tone(3100, 0.25, 'sine', 0.08, 0.04); },
    pour() { for (let i = 0; i < 10; i++) tone(180 + (i % 3) * 40, 0.18, 'sawtooth', 0.02, i * 0.17); },
    win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.25, 'sine', 0.15, i * 0.12)); }
  };
  let toastT;
  function toast(m) { $toast.textContent = m; $toast.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => $toast.classList.remove('show'), 2400); }
  function confetti() {
    const cols = ['#ff9f5a', '#b47aff', '#ffc14d', '#5ad1b0', '#ff6fb5', '#7cc4ff'];
    for (let i = 0; i < 46; i++) {
      const d = document.createElement('i'); d.className = 'confetti';
      d.style.cssText = `left:${Math.random() * 100}vw;background:${cols[i % cols.length]};animation-delay:${Math.random() * .6}s;animation-duration:${2 + Math.random() * 1.6}s`;
      document.body.appendChild(d); setTimeout(() => d.remove(), 4200);
    }
  }

  // ---------- chrome ----------
  function go(view, extra = {}) { Object.assign(S, { view }, extra); render(); window.scrollTo(0, 0); }
  function setTop(t) {
    document.body.classList.toggle('has-top', S.view !== 'home');
    $top.classList.toggle('hidden', S.view === 'home');
    $title.textContent = t; $sound.textContent = S.data.sound ? '🔊' : '🔇';
  }

  // ---------- home ----------
  function viewHome() {
    setTop('');
    const has = !!S.data.avatar;
    return `<section class="home">
      <div class="home-bg">${BACKDROPS.street()}</div>
      <div class="home-card">
        <div class="kicker">Learn easy Spanish inside a story</div>
        <h1 class="logo">Noche en<br>Kissimmee</h1>
        <p class="sub">Two friends. One evening. One friendly pub.<br>Say hello, order a drink, find the restroom, and sing along.</p>
        <div class="home-cast"><div class="hc hop">${myAvatar({ label: 'You' })}</div><div class="hc hop" style="--d:.25s">${avatarSVG(PEOPLE.sam, { label: 'Sam' })}</div></div>
        ${has ? `<p class="hello">¡Hola, ${esc(S.data.name)}!</p><button class="btn btn-primary big" data-action="goMap">▶ Continue</button><button class="btn btn-ghost" data-action="editAvatar">🎭 Change my look</button>`
              : `<button class="btn btn-primary big" data-action="editAvatar">✨ Start the story</button>`}
        <p class="tip">🔊 Turn your sound on. Spanish is read out loud.</p>
      </div></section>`;
  }

  // ---------- avatar ----------
  const swatches = (key, list) => `<div class="swatches">${list.map((c) => `<button class="sw ${S.draft[key] === c ? 'on' : ''}" style="background:${c}" data-action="pick" data-key="${key}" data-val="${c}" aria-label="${c}"></button>`).join('')}</div>`;
  const choices = (key, list) => `<div class="choices">${list.map(([v, l]) => `<button class="pill ${S.draft[key] === v ? 'on' : ''}" data-action="pick" data-key="${key}" data-val="${v}">${l}</button>`).join('')}</div>`;
  function viewAvatar() {
    setTop('Create your character');
    const o = AVATAR_OPTIONS;
    return `<section class="view avatar-view">
      <div class="panel preview"><div class="av-big">${avatarSVG(S.draft, { label: 'Your character' })}</div>
        <label class="name-field">Your name<input id="nameInput" maxlength="12" placeholder="Type your name" value="${esc(S.draftName)}" autocomplete="off"></label>
        <p class="hint">Your friend Sam will travel with you.</p></div>
      <div class="panel options">
        <h3>Skin</h3>${swatches('skin', o.skin)}<h3>Hair color</h3>${swatches('hair', o.hair)}
        <h3>Hair style</h3>${choices('hairStyle', o.hairStyle)}<h3>Eyes</h3>${choices('eyes', o.eyes)}
        <h3>Shirt</h3>${swatches('outfit', o.outfit)}<h3>Extras</h3>${choices('acc', o.acc)}
        <button class="btn btn-primary big" data-action="saveAvatar">✅ Let's go!</button></div></section>`;
  }

  // ---------- map ----------
  function viewMap() {
    setTop('Story map');
    const next = SCENES.find((s) => !S.data.done.includes(s.id));
    const n = S.data.done.length;
    return `<section class="view map">
      <div class="hero-line"><b>¡Hola, ${esc(S.data.name || 'friend')}!</b> Where shall we go tonight?</div>
      <div class="progress-bar"><i style="width:${(n / SCENES.length) * 100}%"></i></div>
      <p class="hint" style="margin:4px 0 12px">${n}/${SCENES.length} scenes done${n === SCENES.length ? ' · You finished the story! 🎉' : ''}</p>
      <div class="nodes">${SCENES.map((s, i) => {
        const d = S.data.done.includes(s.id);
        return `<div class="node-row ${i % 2 ? 'right' : 'left'}">${next && next.id === s.id ? `<div class="here">${myAvatar({ label: 'You are here' })}</div>` : ''}
          <button class="node ${d ? 'done' : ''}" style="--c:${s.color}" data-action="openScene" data-id="${s.id}">
            <span class="node-emoji">${s.emoji}</span><span class="node-txt"><b>${i + 1}. ${s.title}</b><small>${d ? '✓ Done ' + s.stamp : s.beats.length + ' short steps'}</small></span></button></div>`;
      }).join('')}</div>
      <div class="map-actions"><button class="btn btn-accent" data-action="phrasebook">📒 My phrasebook (${S.data.learned.length})</button><button class="btn btn-ghost" data-action="editAvatar">🎭 Change look</button></div>
    </section>`;
  }

  // ---------- story ----------
  const who = (k) => ({ me: { av: myAv(), nm: S.data.name || 'You' }, sam: { av: PEOPLE.sam, nm: 'Sam' }, bar: { av: PEOPLE.bar, nm: 'Bartender' }, kid: { av: PEOPLE.kid, nm: 'Kid' } }[k]);
  const person = (k, talking, extra = '') => { const w = who(k); return `<div class="char ${k} ${talking ? 'talk' : ''} ${extra}">${avatarSVG(w.av, { singing: talking, label: w.nm })}<span class="nm">${esc(w.nm)}</span></div>`; };

  function stage(sc, beat) {
    const sp = beat.who;
    if (sc.id === 'karaoke') {
      const sing = sp === 'all' || (S.act && S.act.step) || sp === 'sam';
      return `<div class="stage chorus">${SINGERS.map((a, i) => `<div class="char singer ${sing ? 'talk' : ''}" style="--i:${i}">${avatarSVG(a, { singing: sing, label: 'Singer ' + (i + 1) })}</div>`).join('')}</div>
        <div class="stage front">${person('me', sp === 'me')}${person('sam', sp === 'sam')}</div>
        <div class="notes-float"><i>♪</i><i>♫</i><i>♬</i><i>♪</i></div>`;
    }
    if (sc.id === 'kids') {
      return `<div class="stage"><div class="side">${person('me', sp === 'me')}</div>
        <div class="kidtable"><div class="kids">${KIDS.map((a, i) => `<div class="char kid ${sp === 'kid' ? 'talk' : ''}" style="--i:${i}">${avatarSVG(a, { singing: sp === 'kid' && i === 0, label: 'Kid ' + (i + 1) })}</div>`).join('')}</div><div class="board"><i></i><i></i><i></i><i></i></div></div>
        <div class="side">${person('sam', sp === 'sam')}</div></div>`;
    }
    const cast = sc.cast.filter((k) => k !== 'kid');
    const sip = beat.sip ? 'sip' : '';
    return `<div class="stage">${cast.map((k) => person(k, sp === k, k === 'me' ? sip : '')).join('')}${beat.sip ? '<div class="sipglass"><div class="beer"></div><div class="foam"></div></div>' : ''}</div>`;
  }

  function bubble(beat) {
    const showAsked = beat.ask && S.answered;
    const es = showAsked ? beat.ask.good : beat.es, en = showAsked ? beat.ask.en : beat.en, pr = showAsked ? '' : beat.pron;
    if (!es) return '';
    const say = esc(showAsked ? beat.ask.say : beat.es);
    return `<div class="bubble from-${beat.who}">
      <div class="b-es">${esc(fill(es))}</div>${pr ? `<div class="b-pr">${esc(pr)}</div>` : ''}<div class="b-en">${esc(fill(en))}</div>
      <div class="b-btns"><button class="mini" data-action="say" data-text="${say}" aria-label="Listen">🔊</button><button class="mini" data-action="slow" data-text="${say}" aria-label="Listen slowly">🐢</button></div></div>`;
  }

  const beatDone = (b) => (b.ask ? S.answered : b.act ? !!(S.act && S.act.done) : true);

  function interactive(b) {
    if (b.ask) {
      return `<div class="ask"><p class="q">${esc(b.ask.q)}</p><div class="opts">${b.ask.opts.map((o, i) => `<button class="opt ${S.answered && i === b.ask.ok ? 'correct' : ''} ${S.wrong === i ? 'wrong' : ''}" data-action="answer" data-k="${i}" ${S.answered ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>
        <p class="fb">${S.answered ? '¡Correcto! 👏' : S.wrong >= 0 ? esc(b.ask.hint) : ''}</p></div>`;
    }
    if (b.act) {
      const a = ACTS[b.act], st = S.act;
      const pr = Array.isArray(a.prompt) ? a.prompt[Math.min(st.step, a.prompt.length - 1)] : a.prompt;
      return `<div class="actbox"><p class="q">${st.done ? '✅ Nice work!' : esc(pr)}</p>${a.html(st)}</div>`;
    }
    return '';
  }

  function pagerHTML(sc, b) {
    const last = S.beat === sc.beats.length - 1, ok = beatDone(b);
    return `<nav class="pager"><button class="btn btn-ghost" data-action="prevPage" ${S.beat === 0 ? 'disabled' : ''}>◀ Back</button>
      <div class="dots">${sc.beats.map((_, i) => `<i class="${i === S.beat ? 'on' : i < S.beat ? 'past' : ''}"></i>`).join('')}</div>
      <button class="btn btn-primary ${ok ? 'ready' : ''}" data-action="nextPage" ${ok ? '' : 'disabled'}>${last ? '🎉 Finish' : 'Next ▶'}</button></nav>`;
  }

  function viewStory() {
    const sc = scene(S.sc), b = sc.beats[S.beat], bg = SCENE_BG[sc.id];
    setTop(`${sc.title} · ${S.beat + 1}/${sc.beats.length}`);
    const chips = (b.words || []).map((w) => `<button class="chip" data-action="say" data-text="${esc(w.es)}"><b>${esc(w.es)}</b><small>${esc(w.en)} · ${esc(w.pron)}</small></button>`).join('');
    return `<section class="view story" style="--c:${sc.color}"><div class="book">
      <div class="page scene ${S.dir ? 'turn-' + S.dir : ''}" id="scene">
        <div class="backdrop">${BACKDROPS[bg]()}<img class="photo" src="images/${bg}.jpg" alt="" onerror="this.remove()"></div>
        ${bubble(b)}${stage(sc, b)}<div class="vignette"></div>
      </div>
      <div class="textbox"><p class="nar">${esc(b.nar || '')}</p>${chips ? `<div class="chips">${chips}</div>` : ''}${interactive(b)}</div></div>
      <div id="pager">${pagerHTML(sc, b)}</div></section>`;
  }

  // ---------- phrasebook ----------
  function viewBook() {
    setTop('My phrasebook');
    const all = [];
    SCENES.forEach((s) => s.beats.forEach((b) => (b.words || []).forEach((w) => { if (S.data.learned.includes(w.es) && !all.find((x) => x.es === w.es)) all.push({ ...w, scene: s }); })));
    return `<section class="view book-view">
      <div class="me-card">${myAvatar({ label: 'You' })}<div><b>${esc(S.data.name || 'friend')}</b><small>${all.length} words · ${S.data.done.length}/${SCENES.length} stamps</small></div></div>
      <div class="stamps">${SCENES.map((s) => `<div class="stamp ${S.data.done.includes(s.id) ? 'got' : ''}"><span>${S.data.done.includes(s.id) ? s.stamp : '❔'}</span><small>${s.title}</small></div>`).join('')}</div>
      <h3 class="sec">Words you met</h3>
      ${all.length ? `<div class="word-list">${all.map((w) => `<button class="wrow" data-action="say" data-text="${esc(w.es)}"><b>${esc(w.es)}</b><em>${esc(w.en)}</em><small>${esc(w.pron)}</small><span class="sp">🔊</span></button>`).join('')}</div>` : '<p class="hint">Play a scene and your words will appear here.</p>'}
      <div class="center"><button class="btn btn-ghost" data-action="resetAll">🗑️ Start over (erase progress)</button></div></section>`;
  }

  function render() {
    const fn = { home: viewHome, avatar: viewAvatar, map: viewMap, story: viewStory, book: viewBook }[S.view];
    $app.innerHTML = fn(); S.dir = '';
  }

  // ---------- beat flow ----------
  function enterBeat() {
    const sc = scene(S.sc), b = sc.beats[S.beat];
    S.answered = false; S.wrong = -1;
    S.act = b.act ? { type: b.act, step: 0, done: false, val: 0 } : null;
    (b.words || []).forEach((w) => { if (!S.data.learned.includes(w.es)) S.data.learned.push(w.es); });
    save();
    if (b.es) setTimeout(() => S.view === 'story' && S.beat === sc.beats.indexOf(b) && speak(b.es), 450);
  }
  function refreshInteractive() {
    const sc = scene(S.sc), b = sc.beats[S.beat];
    const box = document.querySelector('.ask, .actbox');
    if (box) box.outerHTML = interactive(b);
    document.getElementById('pager').innerHTML = pagerHTML(sc, b);
  }
  function finishAct(msg) { S.act.done = true; sfx.ok(); if (msg) toast(msg); refreshInteractive(); }

  // ---------- actions ----------
  const A = {
    editAvatar() { S.draft = { ...myAv() }; S.draftName = S.data.name; go('avatar'); },
    pick(el) { S.draft[el.dataset.key] = el.dataset.val; sfx.pop(); render(); },
    saveAvatar() {
      const name = (document.getElementById('nameInput').value || '').trim();
      if (!name) { toast('Please type your name first 😊'); document.getElementById('nameInput').focus(); return; }
      S.data.name = name; S.data.avatar = { ...S.draft }; save(); sfx.ok(); go('map');
    },
    goMap() { 'speechSynthesis' in window && speechSynthesis.cancel(); if (!S.data.avatar) return A.editAvatar(); go('map'); },
    openScene(el) { S.sc = el.dataset.id; S.beat = 0; enterBeat(); go('story'); },
    nextPage() {
      const sc = scene(S.sc), b = sc.beats[S.beat];
      if (!beatDone(b)) return;
      if (S.beat < sc.beats.length - 1) { S.beat++; S.dir = 'next'; sfx.flip(); enterBeat(); render(); }
      else {
        if (!S.data.done.includes(sc.id)) S.data.done.push(sc.id);
        save(); sfx.win(); confetti();
        toast(`Scene complete! You earned a stamp ${sc.stamp}`); go('map');
      }
    },
    prevPage() { if (S.beat > 0) { S.beat--; S.dir = 'prev'; sfx.flip(); enterBeat(); render(); } },
    say(el) { speak(el.dataset.text, { force: true }); },
    slow(el) { speak(el.dataset.text, { force: true, rate: 0.5 }); },
    answer(el) {
      if (S.answered) return;
      const b = scene(S.sc).beats[S.beat], k = +el.dataset.k;
      if (k === b.ask.ok) { S.answered = true; S.wrong = -1; sfx.ok(); render(); speak(b.ask.say); }
      else { S.wrong = k; sfx.bad(); refreshInteractive(); }
    },
    actDo(el) {
      const st = S.act; if (!st || st.done) return;
      const d = el.dataset.do;
      if (st.type === 'qr' && d === 'scan') { sfx.beep(); st.step = 1; finishAct('Menu opened! Food is on its way.'); }
      else if (st.type === 'card' && d === 'tap') { sfx.beep(); st.step = 1; finishAct('Card ready. The taps are unlocked!'); }
      else if (st.type === 'cheers' && d === 'clink') { sfx.clink(); st.step = 1; speak('Salud'); finishAct(); }
      else if (st.type === 'mic' && d === 'sing') { st.step = 1; sfx.win(); speak('Somos familia'); render(); finishAct(); }
      else if (st.type === 'door') {
        if (d === 'R') { st.step = 1; sfx.ok(); finishAct('Found the restroom!'); } else { st.wrong = 'L'; sfx.bad(); refreshInteractive(); st.wrong = null; }
      }
      else if (st.type === 'pour') {
        if (d === 'open' && st.step === 0) { st.step = 1; sfx.pop(); speak('Abre'); refreshInteractive(); }
        else if (d === 'pour' && st.step === 1) { st.step = 2; sfx.pour(); speak('Sirve'); refreshInteractive(); }
        else if (d === 'close' && st.step === 2) { st.step = 3; speak('Cierra'); finishAct('Perfect pour! 🍺'); }
      }
      else if (st.type === 'dice' && d === 'roll') {
        if (st.rolling) return;
        st.rolling = true; sfx.pop(); refreshInteractive();
        setTimeout(() => {
          if (S.act !== st) return;
          st.rolling = false; st.val = 1 + Math.floor(Math.random() * 6); st.step++; speak(NUMS_ES[st.val]);
          if (st.step >= 3) finishAct(); else refreshInteractive();
        }, 650);
      }
    },
    phrasebook() { go('book'); },
    toggleSound() { S.data.sound = !S.data.sound; save(); $sound.textContent = S.data.sound ? '🔊' : '🔇'; if (!S.data.sound && 'speechSynthesis' in window) speechSynthesis.cancel(); toast(S.data.sound ? 'Sound on' : 'Sound off (🔊 buttons still play)'); },
    resetAll() { if (confirm('This erases your name, character and progress. Continue?')) { localStorage.removeItem(KEY); S.data = load(); go('home'); } }
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    const fn = A[el.dataset.action]; if (fn) fn(el, e);
  });
  document.addEventListener('input', (e) => { if (e.target.id === 'nameInput') S.draftName = e.target.value; });
  document.addEventListener('keydown', (e) => {
    if (S.view !== 'story' || e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight') A.nextPage();
    if (e.key === 'ArrowLeft') A.prevPage();
  });
  render();
})();
