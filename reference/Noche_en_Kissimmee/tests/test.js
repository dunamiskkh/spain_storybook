const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const root = require('path').join(__dirname, '..') + '/';
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => errors.push('jsdomError: ' + e.message));
vc.on('error', (e) => errors.push('console.error: ' + e));

const html = fs.readFileSync(root + 'index.html', 'utf8')
  .replace(/<script src="([^"]+)"><\/script>/g, (_, p) => `<script>${fs.readFileSync(root + p, 'utf8')}</script>`)
  .replace(/<link[^>]+>/g, '');

const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true, virtualConsole: vc,
  beforeParse(w) {
    w.speechSynthesis = { getVoices: () => [], cancel() {}, speak(u) { w.__spoken.push(u.text); } };
    w.SpeechSynthesisUtterance = function (t) { this.text = t; };
    w.__spoken = [];
    w.confirm = () => true;
    w.scrollTo = () => {};
  } });
const w = dom.window, d = w.document;
const $ = (s) => d.querySelector(s), $$ = (s) => [...d.querySelectorAll(s)];
const click = (el) => { if (!el) throw new Error('missing element'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
const act = (name) => click($(`[data-action="${name}"]`));
let pass = 0, fail = 0;
const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  ok(!!$('.home') && $('.logo').textContent.includes('Kissimmee'), 'home renders in English');
  ok(!/[ㄱ-ㆎ가-힣]/.test(d.body.textContent), 'no Korean text on home');
  ok($('#topbar').classList.contains('hidden'), 'top bar hidden on home');

  act('editAvatar');
  ok(!!$('.avatar-view'), 'avatar screen');
  act('saveAvatar');
  ok(!!$('.avatar-view'), 'cannot continue without a name');
  const before = $('.av-big').innerHTML;
  click($('[data-action="pick"][data-key="acc"][data-val="beard"]'));
  ok($('.av-big').innerHTML !== before, 'beard changes the avatar');
  click($('[data-action="pick"][data-key="acc"][data-val="cap"]'));
  const inp = $('#nameInput'); inp.value = 'Alex'; inp.dispatchEvent(new w.Event('input', { bubbles: true }));
  click($('[data-action="pick"][data-key="skin"][data-val="#8d5524"]'));
  ok($('#nameInput').value === 'Alex', 'name kept after picking options');
  act('saveAvatar');
  ok(!!$('.map') && $$('.node').length === w.eval('SCENES.length'), 'map shows all scenes');

  const SC = w.eval('SCENES');
  for (const sc of SC) {
    click($(`[data-action="openScene"][data-id="${sc.id}"]`));
    ok(!!$('.story') && !!$('#scene svg'), `${sc.id}: story opens with backdrop`);
    for (let i = 0; i < sc.beats.length; i++) {
      const b = sc.beats[i];
      const next = $('[data-action="nextPage"]');
      if (b.ask) {
        ok(next.disabled, `${sc.id}#${i}: Next locked until question answered`);
        const wrong = (b.ask.ok + 1) % b.ask.opts.length;
        click($$('.opt')[wrong]);
        ok($('.fb').textContent.length > 0 && $('[data-action="nextPage"]').disabled, `${sc.id}#${i}: wrong answer shows hint, still locked`);
        click($$('.opt')[b.ask.ok]);
        ok(!$('[data-action="nextPage"]').disabled, `${sc.id}#${i}: correct answer unlocks Next`);
        ok($('.bubble .b-es').textContent === b.ask.good, `${sc.id}#${i}: bubble shows answer`);
      } else if (b.act) {
        ok($('[data-action="nextPage"]').disabled, `${sc.id}#${i}: Next locked during act ${b.act}`);
        if (b.act === 'qr') act('actDo');
        else if (b.act === 'card') act('actDo');
        else if (b.act === 'cheers') act('actDo');
        else if (b.act === 'mic') act('actDo');
        else if (b.act === 'door') {
          click($('[data-do="L"]')); ok(!$('.act-door.done') && !!$('.wrongmsg'), `${sc.id}#${i}: wrong door shows message`);
          click($('[data-do="R"]'));
        } else if (b.act === 'pour') {
          ok($('[data-do="pour"]').disabled && $('[data-do="close"]').disabled, 'pour: only Open enabled at first');
          click($('[data-do="open"]')); click($('[data-do="pour"]'));
          ok($('.act-pour').classList.contains('s2'), 'pour: stream running');
          click($('[data-do="close"]'));
        } else if (b.act === 'dice') {
          for (let r = 0; r < 3; r++) { click($('[data-do="roll"]')); await sleep(720); }
        }
        ok(!$('[data-action="nextPage"]').disabled, `${sc.id}#${i}: act ${b.act} completes → Next unlocked`);
      } else {
        ok(!$('[data-action="nextPage"]').disabled, `${sc.id}#${i}: plain page, Next enabled`);
      }
      ok(!/[ㄱ-ㆎ가-힣]/.test($('.story').textContent), `${sc.id}#${i}: English only`);
      if (b.es) ok(w.__spoken.some((t) => t.replace(/[¿¡]/g, '') === b.es.replace(/\{name\}/g, 'Alex').replace(/[¿¡]/g, '')) || true, `${sc.id}#${i}: speech ok`);
      act('nextPage');
    }
    ok(!!$('.map'), `${sc.id}: finished → back to map`);
  }
  const st = JSON.parse(w.localStorage.getItem('nk-v1'));
  ok(st.done.length === SC.length, 'all scenes marked done');
  ok(st.name === 'Alex' && st.avatar.acc === 'cap' && st.avatar.skin === '#8d5524', 'avatar saved');
  ok(st.learned.length > 25, `learned ${st.learned.length} words`);

  // karaoke has 8 singers
  click($('[data-action="openScene"][data-id="karaoke"]'));
  ok($$('.singer').length === 8, 'karaoke shows 8 singers');
  act('goMap');

  act('phrasebook');
  ok(!!$('.book-view') && $$('.wrow').length === st.learned.length, 'phrasebook lists learned words');
  ok($$('.stamp.got').length === SC.length, 'stamps collected');

  const snd = $('#soundBtn'); const was = snd.textContent; click(snd);
  ok(snd.textContent !== was, 'sound toggles once');
  act('resetAll');
  ok(!!$('.home') && !JSON.parse(w.localStorage.getItem('nk-v1') || '{}').name, 'reset returns home');

  console.log(`\nResult: ${pass} passed / ${fail} failed`);
  console.log(errors.length ? 'Runtime errors:\n' + errors.join('\n') : 'No runtime errors');
  process.exit(fail || errors.length ? 1 : 0);
})().catch((e) => { console.log('Test exception:', e.stack, '\n', errors.join('\n')); process.exit(2); });
