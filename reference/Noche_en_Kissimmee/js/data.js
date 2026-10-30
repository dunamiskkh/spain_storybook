// Story data. Each beat: who speaks, Spanish line (es/en/pron), narration (nar, easy English),
// optional words to learn, optional ask (multiple choice) or act (hands-on action) that must be done to continue.
const SCENES = [
  {
    id: 'street', title: 'Downtown Kissimmee', emoji: '🌆', color: '#ff9f5a', cast: ['me', 'sam'], stamp: '🌴',
    beats: [
      { who: 'sam', es: '¡Buenas noches, {name}!', en: 'Good evening, {name}!', pron: 'BWAY-nahs NOH-chess',
        nar: 'It is evening in downtown Kissimmee, Florida. You and your friend Sam are on a business trip. The street lights glow.',
        words: [{ es: 'Buenas noches', en: 'Good evening / good night', pron: 'BWAY-nahs NOH-chess' }] },
      { who: 'me', es: 'Hola, Sam. ¿Cómo estás?', en: 'Hi, Sam. How are you?', pron: 'OH-lah. KOH-moh ess-TAHS',
        nar: '"Hola" means hello. "¿Cómo estás?" means "How are you?"',
        words: [{ es: 'Hola', en: 'Hello', pron: 'OH-lah' }, { es: '¿Cómo estás?', en: 'How are you?', pron: 'KOH-moh ess-TAHS' }] },
      { who: 'me', nar: 'Sam says he is great. Now tell Sam you are fine too.',
        ask: { q: 'How do you say "I am fine, thank you"?', opts: ['Estoy bien, gracias.', 'Adiós.', 'Por favor.'], ok: 0, good: 'Estoy bien, gracias.', say: 'Estoy bien, gracias.', en: 'I am fine, thank you.',
               hint: '"Bien" means fine. "Gracias" means thank you.' },
        words: [{ es: 'Estoy bien', en: 'I am fine', pron: 'ess-TOY byen' }, { es: 'Gracias', en: 'Thank you', pron: 'GRAH-syahs' }] },
      { who: 'sam', es: '¡Vamos!', en: "Let's go!", pron: 'BAH-mohs',
        nar: 'Sam points at a purple sign: Violet\'s Venom Brewery. The pub looks fun!',
        words: [{ es: 'Vamos', en: "Let's go", pron: 'BAH-mohs' }] }
    ]
  },
  {
    id: 'door', title: 'Hello at the Pub', emoji: '🚪', color: '#b47aff', cast: ['me', 'sam', 'bar'], stamp: '👋',
    beats: [
      { who: 'bar', es: '¡Hola! ¡Bienvenidos!', en: 'Hello! Welcome!', pron: 'OH-lah! byen-beh-NEE-dohs',
        nar: 'You walk in. The bartender smiles and says hello.',
        words: [{ es: 'Bienvenidos', en: 'Welcome (to a group)', pron: 'byen-beh-NEE-dohs' }] },
      { who: 'me', nar: 'It is evening. Greet the bartender nicely.',
        ask: { q: 'Which greeting fits the evening?', opts: ['Buenas noches.', 'Adiós.', 'Por favor.'], ok: 0, good: 'Buenas noches.', say: 'Buenas noches.', en: 'Good evening.',
               hint: '"Adiós" is goodbye. We want to say good evening!' } },
      { who: 'me', es: 'Me llamo {name}. Él es Sam.', en: 'My name is {name}. He is Sam.', pron: 'meh YAH-moh. el ess sam',
        nar: '"Me llamo" means "my name is". "Él es" means "he is".',
        words: [{ es: 'Me llamo', en: 'My name is', pron: 'meh YAH-moh' }, { es: 'Él es', en: 'He is', pron: 'el ess' }] },
      { who: 'bar', es: 'Mucho gusto.', en: 'Nice to meet you.', pron: 'MOO-choh GOOS-toh',
        nar: 'The bartender shakes your hand.', words: [{ es: 'Mucho gusto', en: 'Nice to meet you', pron: 'MOO-choh GOOS-toh' }] }
    ]
  },
  {
    id: 'order', title: 'Ordering', emoji: '🍺', color: '#ffc14d', cast: ['me', 'sam', 'bar'], stamp: '🍺',
    beats: [
      { who: 'bar', es: '¿Qué quieren?', en: 'What do you want?', pron: 'keh KYEH-ren',
        nar: 'You sit at a wooden table. The bartender asks what you would like.',
        words: [{ es: '¿Qué quieren?', en: 'What do you (all) want?', pron: 'keh KYEH-ren' }] },
      { who: 'me', nar: 'Ask politely for one beer. The magic word is "por favor"!',
        ask: { q: 'How do you ask for one beer, politely?', opts: ['Una cerveza, por favor.', 'Buenos días.', 'Dos manzanas, adiós.'], ok: 0, good: 'Una cerveza, por favor.', say: 'Una cerveza, por favor.', en: 'One beer, please.',
               hint: '"Cerveza" is beer, and "por favor" is please.' },
        words: [{ es: 'Una cerveza', en: 'One beer', pron: 'OO-nah sehr-BEH-sah' }, { es: 'Por favor', en: 'Please', pron: 'por fah-BOR' }] },
      { who: 'me', es: 'Dos cervezas, por favor.', en: 'Two beers, please.', pron: 'dohs sehr-BEH-sahs, por fah-BOR',
        nar: 'Sam wants one too, so you say "two". Cerveza becomes cervezas when there is more than one.',
        words: [{ es: 'Dos', en: 'Two', pron: 'dohs' }] },
      { who: 'me', es: 'La comida, por favor.', en: 'Food, please.', pron: 'lah koh-MEE-dah',
        nar: 'Hungry? There is a QR code on your table for food. Tap the QR code to scan it!',
        act: 'qr', words: [{ es: 'La comida', en: 'The food', pron: 'lah koh-MEE-dah' }] },
      { who: 'bar', es: 'Claro. Aquí está la tarjeta.', en: 'Sure. Here is the card.', pron: 'KLAH-roh. ah-KEE ess-TAH lah tar-HEH-tah',
        nar: 'For drinks, you use a special card. It goes with the tap wall. Let us see how!',
        words: [{ es: 'La tarjeta', en: 'The card', pron: 'lah tar-HEH-tah' }] }
    ]
  },
  {
    id: 'tapwall', title: 'The Tap Wall', emoji: '🚰', color: '#5ad1b0', cast: ['me', 'bar'], stamp: '🚰',
    beats: [
      { who: 'bar', es: 'Primero, la tarjeta.', en: 'First, the card.', pron: 'pree-MEH-roh, lah tar-HEH-tah',
        nar: 'At the tap wall you pour your own beer! Step 1: touch your card to the sensor. Tap the card.',
        act: 'card', words: [{ es: 'Primero', en: 'First', pron: 'pree-MEH-roh' }] },
      { who: 'bar', es: 'Abre, sirve y cierra.', en: 'Open, pour and close.', pron: 'AH-breh, SEER-beh, ee SYEH-rrah',
        nar: 'Step 2: open the tap. Step 3: pour. Step 4: close the tap. Do it yourself!',
        act: 'pour', words: [{ es: 'Abre', en: 'Open', pron: 'AH-breh' }, { es: 'Sirve', en: 'Pour / serve', pron: 'SEER-beh' }, { es: 'Cierra', en: 'Close', pron: 'SYEH-rrah' }] },
      { who: 'bar', nar: 'Great pour! One last check.',
        ask: { q: 'What do you do last, after you pour?', opts: ['Cierra', 'Abre', 'Hola'], ok: 0, good: 'Cierra.', say: 'Cierra', en: 'Close it.',
               hint: 'You open first. After the beer is full, you close the tap.' } },
      { who: 'sam', es: '¡Es muy fácil!', en: 'It is very easy!', pron: 'ess mwee FAH-seel',
        nar: 'Sam laughs. Self-serve beer is fun and easy.', words: [{ es: 'Fácil', en: 'Easy', pron: 'FAH-seel' }] }
    ]
  },
  {
    id: 'cheers', title: 'Cheers!', emoji: '🍻', color: '#ffb74d', cast: ['me', 'sam'], stamp: '🍻',
    beats: [
      { who: 'sam', es: '¡Salud!', en: 'Cheers!', pron: 'sah-LOOD',
        nar: '"Salud" means "health" and people say it when they cheer. Tap the glasses to clink!',
        act: 'cheers', words: [{ es: 'Salud', en: 'Cheers (health)', pron: 'sah-LOOD' }] },
      { who: 'sam', nar: 'Sam takes a sip and asks: "¿Te gusta?" That means "Do you like it?"',
        ask: { q: 'How do you answer: "Yes, it is tasty"?', opts: ['Sí, está rico.', 'No, adiós.', 'Por favor.'], ok: 0, good: 'Sí, está rico.', say: 'Sí, está rico.', en: 'Yes, it is tasty.',
               hint: '"Sí" is yes. "Rico" means tasty.' },
        words: [{ es: 'Sí', en: 'Yes', pron: 'see' }, { es: 'Rico', en: 'Tasty', pron: 'REE-koh' }] },
      { who: 'me', es: '¡Está muy rico!', en: 'It is very tasty!', pron: 'ess-TAH mwee REE-koh',
        nar: 'You drink and smile. The beer is cold and good.', sip: true }
    ]
  },
  {
    id: 'karaoke', title: 'Karaoke Night', emoji: '🎤', color: '#ff6fb5', cast: ['me', 'sam'], stamp: '🎤',
    beats: [
      { who: 'all', es: '¡Cantan!', en: 'They sing!', pron: 'KAHN-tahn',
        nar: 'Music! Eight friends in their twenties sing the song "We Are Family" together. Everybody sways and smiles.',
        words: [{ es: 'Cantar', en: 'To sing', pron: 'kahn-TAR' }] },
      { who: 'sam', es: 'Somos una familia.', en: 'We are a family.', pron: 'SOH-mohs OO-nah fah-MEE-lyah',
        nar: 'Sam translates the song title into Spanish: "We are family" = "Somos familia".',
        words: [{ es: 'Familia', en: 'Family', pron: 'fah-MEE-lyah' }, { es: 'Somos', en: 'We are', pron: 'SOH-mohs' }] },
      { who: 'sam', nar: 'Sam asks: "¿Qué es familia?" Pick the Spanish word for family.',
        ask: { q: 'Pick the word for "family":', opts: ['familia', 'cerveza', 'baño'], ok: 0, good: 'Familia.', say: 'familia', en: 'Family.',
               hint: 'Look at the song title: "Somos ___"!' } },
      { who: 'me', es: '¡Cantamos juntos!', en: "Let's sing together!", pron: 'kahn-TAH-mohs HOON-tohs',
        nar: 'Tap the microphone to join the singers!', act: 'mic', words: [{ es: 'Juntos', en: 'Together', pron: 'HOON-tohs' }] }
    ]
  },
  {
    id: 'restroom', title: 'Where is the Restroom?', emoji: '🚻', color: '#7cc4ff', cast: ['me', 'bar'], stamp: '🚻',
    beats: [
      { who: 'me', es: 'Perdón. ¿Dónde está el baño?', en: 'Excuse me. Where is the restroom?', pron: 'pehr-DOHN. DOHN-deh ess-TAH el BAH-nyoh',
        nar: 'Time to find the restroom! Ask the bartender. "Baño" means restroom.',
        words: [{ es: 'Perdón', en: 'Excuse me', pron: 'pehr-DOHN' }, { es: '¿Dónde está?', en: 'Where is?', pron: 'DOHN-deh ess-TAH' }, { es: 'El baño', en: 'The restroom', pron: 'el BAH-nyoh' }] },
      { who: 'bar', es: 'Está a la derecha.', en: 'It is on the right.', pron: 'ess-TAH ah lah deh-REH-chah',
        nar: '"Derecha" means right. The opposite is "izquierda", left.',
        words: [{ es: 'Derecha', en: 'Right', pron: 'deh-REH-chah' }, { es: 'Izquierda', en: 'Left', pron: 'ees-KYEHR-dah' }] },
      { who: 'me', nar: 'Look at the hallway. Tap the door on the RIGHT.', act: 'door' },
      { who: 'me', es: '¡Gracias!', en: 'Thank you!', pron: 'GRAH-syahs',
        nar: 'Found it! The bartender says "De nada", which means "you are welcome".',
        words: [{ es: 'De nada', en: 'You are welcome', pron: 'deh NAH-dah' }] }
    ]
  },
  {
    id: 'kids', title: 'Board Games', emoji: '🎲', color: '#8ee07a', cast: ['me', 'sam'], stamp: '🎲',
    beats: [
      { who: 'kid', es: 'Los niños juegan.', en: 'The kids play.', pron: 'lohs NEE-nyohs HWAY-gahn',
        nar: 'In a corner, kids play board games with their families. Yes, even in a pub! It is a friendly place.',
        words: [{ es: 'Los niños', en: 'The kids', pron: 'lohs NEE-nyohs' }, { es: 'Jugar', en: 'To play', pron: 'hoo-GAR' }] },
      { who: 'kid', es: '¡Uno, dos, tres!', en: 'One, two, three!', pron: 'OO-noh, dohs, trehs',
        nar: 'A kid rolls the dice. Tap the dice and count in Spanish!', act: 'dice',
        words: [{ es: 'Uno', en: 'One', pron: 'OO-noh' }, { es: 'Dos', en: 'Two', pron: 'dohs' }, { es: 'Tres', en: 'Three', pron: 'trehs' }, { es: 'Cuatro', en: 'Four', pron: 'KWAH-troh' }, { es: 'Cinco', en: 'Five', pron: 'SEEN-koh' }, { es: 'Seis', en: 'Six', pron: 'SAYS' }] },
      { who: 'kid', es: '¡Yo gano!', en: 'I win!', pron: 'yoh GAH-noh',
        nar: 'A little girl wins the game and cheers.', words: [{ es: 'Yo gano', en: 'I win', pron: 'yoh GAH-noh' }] },
      { who: 'sam', es: '¡Qué bonito!', en: 'How nice!', pron: 'keh boh-NEE-toh',
        nar: 'Sam smiles. Families, friends and music all in one place.', words: [{ es: 'Bonito', en: 'Nice / pretty', pron: 'boh-NEE-toh' }] }
    ]
  },
  {
    id: 'bye', title: 'Good Night', emoji: '🌙', color: '#9b8cff', cast: ['me', 'sam', 'bar'], stamp: '🌙',
    beats: [
      { who: 'me', es: 'La cuenta, por favor.', en: 'The bill, please.', pron: 'lah KWEN-tah, por fah-BOR',
        nar: 'It is late. You close your tab at the card station and ask for the bill.',
        words: [{ es: 'La cuenta', en: 'The bill', pron: 'lah KWEN-tah' }] },
      { who: 'me', nar: 'Say thanks and good night to the bartender.',
        ask: { q: 'How do you say "Thank you. Good night!"?', opts: ['Gracias. ¡Buenas noches!', 'Hola. ¡Salud!', 'Por favor. ¡Vamos!'], ok: 0, good: 'Gracias. ¡Buenas noches!', say: 'Gracias. Buenas noches', en: 'Thank you. Good night!',
               hint: '"Gracias" = thank you. "Buenas noches" = good night.' } },
      { who: 'bar', es: '¡Adiós! ¡Hasta luego!', en: 'Goodbye! See you later!', pron: 'ah-DYOHS! AHS-tah LWEH-goh',
        nar: 'The bartender waves. You and Sam walk out under the stars.',
        words: [{ es: 'Adiós', en: 'Goodbye', pron: 'ah-DYOHS' }, { es: 'Hasta luego', en: 'See you later', pron: 'AHS-tah LWEH-goh' }] }
    ]
  }
];

const AVATAR_OPTIONS = {
  skin: ['#ffdfc4', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#5c3a21'],
  hair: ['#2b1b10', '#5a3825', '#b5651d', '#e6c15a', '#d94f6a', '#3b6fd4', '#9a9a9a'],
  outfit: ['#e07b39', '#4f9a5f', '#3b82c4', '#d94f6a', '#8a5cc2', '#f2c230'],
  hairStyle: [['short', 'Short'], ['long', 'Long'], ['curly', 'Curly'], ['bun', 'Bun']],
  eyes: [['dot', 'Round'], ['sparkle', 'Sparkly'], ['happy', 'Happy']],
  acc: [['none', 'None'], ['glasses', 'Glasses'], ['cap', 'Cap'], ['beard', 'Beard']]
};
const DEFAULT_AVATAR = { skin: '#f1c27d', hair: '#5a3825', hairStyle: 'short', eyes: 'sparkle', outfit: '#3b82c4', acc: 'none' };

// Fixed characters
const PEOPLE = {
  sam: { skin: '#c68642', hair: '#2b1b10', hairStyle: 'curly', eyes: 'happy', outfit: '#4f9a5f', acc: 'glasses' },
  bar: { skin: '#ffdfc4', hair: '#8a3fc0', hairStyle: 'long', eyes: 'sparkle', outfit: '#2f2540', acc: 'none' },
  kid: { skin: '#e0ac69', hair: '#5a3825', hairStyle: 'bun', eyes: 'sparkle', outfit: '#ff7aa8', acc: 'none' }
};
const SINGERS = [
  { skin: '#ffdfc4', hair: '#d94f6a', hairStyle: 'long', eyes: 'happy', outfit: '#ff6fb5', acc: 'none' },
  { skin: '#8d5524', hair: '#2b1b10', hairStyle: 'curly', eyes: 'sparkle', outfit: '#f2c230', acc: 'none' },
  { skin: '#f1c27d', hair: '#e6c15a', hairStyle: 'short', eyes: 'happy', outfit: '#3b82c4', acc: 'cap' },
  { skin: '#5c3a21', hair: '#2b1b10', hairStyle: 'bun', eyes: 'sparkle', outfit: '#8a5cc2', acc: 'none' },
  { skin: '#e0ac69', hair: '#5a3825', hairStyle: 'short', eyes: 'dot', outfit: '#4f9a5f', acc: 'beard' },
  { skin: '#ffdfc4', hair: '#3b6fd4', hairStyle: 'long', eyes: 'happy', outfit: '#e07b39', acc: 'glasses' },
  { skin: '#c68642', hair: '#2b1b10', hairStyle: 'short', eyes: 'sparkle', outfit: '#d94f6a', acc: 'none' },
  { skin: '#f1c27d', hair: '#b5651d', hairStyle: 'curly', eyes: 'happy', outfit: '#1fb5a8', acc: 'none' }
];
const KIDS = [
  { skin: '#e0ac69', hair: '#5a3825', hairStyle: 'bun', eyes: 'sparkle', outfit: '#ff7aa8', acc: 'none' },
  { skin: '#ffdfc4', hair: '#e6c15a', hairStyle: 'short', eyes: 'happy', outfit: '#4fc3f7', acc: 'none' },
  { skin: '#8d5524', hair: '#2b1b10', hairStyle: 'curly', eyes: 'sparkle', outfit: '#ffd54f', acc: 'none' }
];
