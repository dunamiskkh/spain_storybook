# Noche en Kissimmee: Spanish storybook

Read this first when continuing the work in another Claude session.

## What it is
- A very-basic Spanish learning web app, set in a story. Plain HTML/CSS/JS, no build step.
- Story: two young friends (the player + Sam) on a business trip visit Violet's Venom Brewery, 413 Broadway, Kissimmee, FL, in the evening.
- Explanations are in easy English. Spanish phrases are read aloud (Web Speech API, es-MX preferred).
- Learning happens inside the story: multiple-choice questions and hands-on actions must be done before "Next" unlocks. There are no separate quizzes.
- Inspired by themagicalpantry.com (storybook feel, avatar, animation). No assets copied; everything is drawn in SVG/CSS.
- The user (Kyunghwan, "Kay") talks in Korean.

## Scenes (js/data.js, `SCENES`)
1. street: greetings, "Buenas noches", "¿Cómo estás?"
2. door: greet the bartender, "Me llamo", "Mucho gusto"
3. order: "Una cerveza, por favor"; QR-code food menu (act `qr`)
4. tapwall: tap card on sensor (act `card`), Abre / Sirve / Cierra (act `pour`)
5. cheers: "Salud" (act `cheers`), "Está rico"
6. karaoke: 8 animated singers, "We Are Family" title only (no lyrics, copyright), "Somos familia", mic (act `mic`)
7. restroom: "¿Dónde está el baño?", derecha/izquierda, pick the right door (act `door`)
8. kids: kids play board games, dice counting uno–seis (act `dice`)
9. bye: "La cuenta, por favor", "Adiós", "Hasta luego"

A beat can have `ask` (multiple choice) or `act` (see `js/acts.js`). `Next` stays disabled until it is done.

## Files
- `index.html`: shell, loads scripts in order
- `js/data.js`: story text, avatar options, fixed characters (Sam, bartender, kid, 8 singers)
- `js/avatar.js`: SVG avatar generator (`avatarSVG`), `singing` option animates the mouth
- `js/scenes.js`: SVG backdrops per scene (`BACKDROPS`, `SCENE_BG`)
- `js/acts.js`: HTML for each hands-on action (`ACTS`)
- `js/app.js`: state, views (home, avatar, map, story, phrasebook), sound, action handlers
- `css/style.css`: all styling and animation
- `tests/test.js`: jsdom flow test (plays every scene)

## Photos
Real venue photos are not included (copyright). To use your own, put JPGs in `images/` named
`street.jpg`, `pub.jpg`, `tapwall.jpg`, `karaoke.jpg`, `restroom.jpg`, `kids.jpg`. A photo covers the drawn backdrop automatically; without it the drawing shows.

## Run and test
- Preview: `python3 -m http.server 8000` in this folder, then open http://127.0.0.1:8000 (on WSL, `localhost` can time out; use 127.0.0.1).
- Test: `npm i jsdom` in this folder, then `node tests/test.js` (expects 162 passing checks).
- Deploy: drag this whole folder onto a Netlify site's Deploys page.

## Status
- Logic tested with jsdom only. Not yet checked in a real browser: layout, animation feel, mobile view.
- Ideas: stronger drinking animation, more per-scene motion, walking transitions between scenes, more words per scene.
