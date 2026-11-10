(() => {
  // ================= Data =================
  const OPEN = [67, 60, 64, 69]; // G4 C4 E4 A4, standard reentrant tuning
  const STRINGS = ['G', 'C', 'E', 'A'];
  const FINGER = { 1: 'index', 2: 'middle', 3: 'ring', 4: 'pinky' };
  const CHORDS = {
    C:  { frets: [0,0,0,3], fingers: [0,0,0,3], tip: 'Ring finger alone on the A string, 3rd fret.' },
    G:  { frets: [0,2,3,2], fingers: [0,1,3,2], tip: 'A small triangle. Index on C, middle on A, ring on E.' },
    Am: { frets: [2,0,0,0], fingers: [2,0,0,0], tip: 'Middle finger on the G string, 2nd fret.' },
    F:  { frets: [2,0,1,0], fingers: [2,0,1,0], tip: 'Am plus your index on the E string, 1st fret.' },
    D:  { frets: [2,2,2,0], fingers: [1,2,3,0], tip: 'Three fingers in a row on the 2nd fret. Leave the A string open.' },
    Em: { frets: [0,4,3,2], fingers: [0,3,2,1], tip: 'A diagonal line: index on A, middle on E, ring on C.' }
  };

  const GOALS = [
    ['Clean first', 'Every string rings before speed matters. A slow clean change beats a fast muddy one.'],
    ['Small moves', 'Keep fingers hovering just above the strings between shapes instead of flying off.'],
    ['Light grip', 'Press just behind the fret with only as much pressure as it takes to stop the buzz.'],
    ['Tempo second', 'Turn the metronome on only after one calm pass with no stops.']
  ];

  const PROGS = {
    'c-g-am-f': {
      chords: ['C','G','Am','F'], level: 'Beginner progression', hard: ['C','G'],
      watch: 'G',
      answer: 'Practice C to G to Am to F on ukulele by landing each shape once at your own pace, giving G a little extra time, and turning on the metronome only after one calm pass. On uke this is a friendly progression: C, Am and F use one or two fingers, and G is the only shape that asks for three.',
      why: 'C uses only your ring finger, and then G immediately asks for three fingers in a small triangle. After that the work gets lighter: G to Am clears the triangle, and Am to F just adds one finger. Almost all the difficulty lives in the C to G change, so that is where your practice time goes.',
      tips: [
        'C to G: your ring finger slides across from the A string to the E string and stays on the 3rd fret. Let it lead, then drop index and middle around it.',
        'Set the three G fingers down together as one shape rather than one at a time.',
        'Am to F: leave your middle finger planted on the G string and add your index finger. Do not lift what can stay.',
        'F back to C: lift both fingers and drop your ring finger on the A string, 3rd fret.'
      ],
      mistake: 'Strumming through the G change before all three fingers have landed. Beginners learn faster when the first strum of each chord is clean, even if that means a short pause, and tempo comes second.',
      plan: ['Spend 30 seconds placing G and lifting it off, without strumming.', 'Spend 45 seconds moving from C to G only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'c-g': {
      chords: ['C','G'], level: 'First-week beginner', hard: ['C','G'], watch: 'G',
      answer: 'Practice C to G on ukulele by sliding your ring finger from the A string to the E string, building the G triangle around it, and repeating the change slowly before adding the metronome. It is the first real chord change most uke players learn.',
      why: 'C is one finger. G is three. Going from one to the other means your hand has to wake up two fingers that were resting, and land them in a small space on the 2nd fret.',
      tips: [
        'Your ring finger stays on the 3rd fret for both chords. Slide it from the A string to the E string instead of lifting it.',
        'For G, think of the shape as a triangle pointing toward the headstock and place it all at once.',
        'G back to C: lift index and middle, and slide the ring finger back to the A string.'
      ],
      mistake: 'Looking at the fretboard for every finger. Look once, then try to feel the triangle. Your eyes should be free to read the next chord.',
      plan: ['Spend 30 seconds sliding your ring finger between the A and E strings on the 3rd fret.', 'Spend 45 seconds building G around that ring finger and lifting it off.', 'Spend 45 seconds switching C to G only after your fingers land.']
    },
    'g-d-em-c': {
      chords: ['G','D','Em','C'], level: 'Beginner progression', hard: ['D','Em'], watch: 'D to Em',
      answer: 'Practice G to D to Em to C on ukulele by learning D and Em as whole shapes first, giving the D to Em change extra time, and saving the metronome for after one calm pass. Three of the four chords use three fingers, so this is a good workout for your fretting hand.',
      why: 'D squeezes three fingers side by side onto the 2nd fret, and Em spreads three fingers across three different frets. Going straight from one to the other asks your hand to change from a tight line into a long diagonal.',
      tips: [
        'G to D: all three fingers end up on the 2nd fret. Think of flattening the G triangle into a straight line.',
        'If D feels cramped, angle your fingers diagonally, or lay your index finger across the G, C and E strings as a mini barre.',
        'For Em, place your ring finger on the C string first. The other two fingers fall into place below it.',
        'Em to C: lift everything and drop just your ring finger on the A string, 3rd fret.'
      ],
      mistake: 'Trying to fix D at full tempo. If the D sounds muted, stop the loop, press each string one at a time to find the buzz, and only then speed back up.',
      plan: ['Spend 30 seconds placing D and checking that each string rings.', 'Spend 45 seconds moving from D to Em only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'am-f-c-g': {
      chords: ['Am','F','C','G'], level: 'Beginner progression', hard: ['C','G'], watch: 'G',
      answer: 'Practice Am to F to C to G on ukulele by keeping your middle finger planted for Am to F, sliding your ring finger for C to G, and adding the metronome only after one calm pass. The first half is easy, so save your focus for the second half.',
      why: 'Am to F is one added finger, which feels like nothing. Then C to G asks for three fingers at once, and G back to Am has to clear all three away again before the loop restarts.',
      tips: [
        'Am to F: keep your middle finger on the G string and add your index finger on the E string.',
        'F to C: lift both and drop your ring finger on the A string, 3rd fret.',
        'C to G: slide the ring finger from the A string to the E string, then add index and middle.',
        'G back to Am: lift all three and set just your middle finger on the G string, 2nd fret.'
      ],
      mistake: 'Rushing the easy changes and arriving late to G. Keep the same calm pace through the whole loop so the hard change gets the same time as the easy ones.',
      plan: ['Spend 30 seconds placing G and lifting it off.', 'Spend 45 seconds moving from C to G only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'em-c-g-d': {
      chords: ['Em','C','G','D'], level: 'Beginner progression', hard: ['D','Em'], watch: 'D back to Em',
      answer: 'Practice Em to C to G to D on ukulele by learning Em and D as whole shapes, giving the loop back from D to Em extra time, and adding the metronome only after one calm pass.',
      why: 'Every chord here except C uses three fingers, so your hand gets very little rest. The hardest moment is the loop back from D to Em, where a tight line of fingers on the 2nd fret has to stretch into a diagonal across three frets.',
      tips: [
        'Em to C: lift everything and drop just your ring finger on the A string, 3rd fret.',
        'C to G: slide your ring finger from the A string to the E string, then add index and middle.',
        'G to D: flatten the triangle into a straight line on the 2nd fret.',
        'D to Em: lead with your ring finger on the C string, 4th fret.'
      ],
      mistake: 'Squeezing hard to make three-finger chords ring. Most buzz comes from where your fingertips land, not how hard you press. Move closer to the fret before pressing harder.',
      plan: ['Spend 30 seconds placing Em and lifting it off.', 'Spend 45 seconds moving from D to Em only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'c-am-f-g': {
      chords: ['C','Am','F','G'], level: 'Beginner progression', hard: ['F','G'], watch: 'F to G',
      answer: 'Practice C to Am to F to G on ukulele by enjoying the easy first three chords, giving the F to G change extra time, and adding the metronome only after one calm pass. This is the classic 1950s progression.',
      why: 'C, Am and F are light shapes with one or two fingers. F to G is the big move: your middle finger leaves the G string and your hand has to rebuild the whole G triangle in a different spot.',
      tips: [
        'C to Am: lift your ring finger and place your middle finger on the G string, 2nd fret.',
        'Am to F: keep the middle finger planted and add your index finger on the E string.',
        'F to G: move your index from the E string 1st fret to the C string 2nd fret, then bring middle and ring into place.',
        'G back to C: lift index and middle, and slide your ring finger from the E string to the A string.'
      ],
      mistake: 'Letting the easy changes set a tempo the F to G change cannot keep. Pick a tempo where F to G lands on time, even if C, Am and F feel too slow.',
      plan: ['Spend 30 seconds placing G and lifting it off.', 'Spend 45 seconds moving from F to G only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    }
  };
  const ORDER = ['c-g-am-f', 'c-g', 'g-d-em-c', 'am-f-c-g', 'em-c-g-d', 'c-am-f-g'];
  const urlFor = slug => slug === 'c-g-am-f' ? '/uke/' : `/uke/${slug}/`;

  const PATTERNS = {
    downs:   ['D','','D','','D','','D',''],
    du:      ['D','U','D','U','D','U','D','U'],
    island:  ['D','','D','U','','U','D','U'],
    calypso: ['D','','D','U','D','U','D','U'],
    off:     ['','','','','','','','']
  };
  const COUNTS = ['1','&','2','&','3','&','4','&'];
  const PRESETS = [['Slow', 50], ['Steady', 65], ['Fast', 80]];

  const SLUG = document.body.dataset.prog in PROGS ? document.body.dataset.prog : 'c-g-am-f';
  const P = PROGS[SLUG];
  const SEQ = P.chords;
  const N = SEQ.length;
  const UNIQUE = [...new Set(SEQ)];

  // Pairs for one-minute changes: each neighbouring change in the loop, no repeats
  const PAIRS = [];
  for (let i = 0; i < N; i++) {
    const a = SEQ[i], b = SEQ[(i + 1) % N];
    if (a !== b && !PAIRS.some(p => p.includes(a) && p.includes(b))) PAIRS.push([a, b]);
  }
  const scoreKey = (a, b) => [a, b].sort().join('-');

  // ================= Storage =================
  const store = {
    get(k, d) { try { const v = localStorage.getItem('uke:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('uke:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  const S = {
    bpm: store.get('bpm', 65),
    beats: store.get('beats', 4),
    pattern: store.get('pattern', 'downs'),
    sound: store.get('sound', 'both'),
    shuffle: store.get('shuffle', false),
    lefty: store.get('lefty', false),
    pair: Math.min(store.get('pair:' + SLUG, 0), PAIRS.length - 1),
    scores: store.get('scores', {}),
    phase: 'idle',          // idle | step | ready | loop
    stepIndex: 0,           // position in SEQ during the tap-through
    view: { cur: SEQ[0], next: SEQ[1 % N] },
    changes: 0
  };

  // ================= Helpers =================
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const dots = arr => arr.map(c => `<span>${c}</span>`).join('<span class="dot">·</span>');
  const arrows = arr => arr.join(' → ');

  function diagram(name) {
    const c = CHORDS[name];
    const idx = S.lefty ? [3,2,1,0] : [0,1,2,3];
    const x0 = 20, dx = 26, y0 = 34, dy = 26, nF = 4;
    const color = `var(--c-${name})`;
    const label = `${name} chord: ` + idx.map(i => `${STRINGS[i]} string ${c.frets[i] ? 'fret ' + c.frets[i] + ', ' + FINGER[c.fingers[i]] + ' finger' : 'open'}`).join('; ');
    let s = `<svg class="diagram" viewBox="0 0 118 172" role="img" aria-label="${label}">`;
    s += `<rect x="${x0}" y="${y0}" width="${dx*3}" height="${dy*nF}" fill="var(--wood)"/>`;
    for (let f = 1; f <= nF; f++) s += `<line x1="${x0}" x2="${x0+dx*3}" y1="${y0+f*dy}" y2="${y0+f*dy}" stroke="var(--fret)" stroke-width="2"/>`;
    s += `<rect x="${x0-1}" y="${y0-5}" width="${dx*3+2}" height="6" rx="1.5" fill="var(--nut)"/>`;
    idx.forEach((si, col) => {
      const x = x0 + col * dx, f = c.frets[si];
      s += `<line x1="${x}" x2="${x}" y1="${y0}" y2="${y0+dy*nF}" stroke="var(--string)" stroke-width="1.4"/>`;
      if (f === 0) s += `<circle cx="${x}" cy="${y0-15}" r="5.5" fill="none" stroke="var(--muted)" stroke-width="1.8"/>`;
      else {
        const y = y0 + (f - .5) * dy;
        s += `<circle cx="${x}" cy="${y}" r="10.5" fill="${color}"/>`;
        s += `<text x="${x}" y="${y+4.6}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="Open Sans,Arial,sans-serif">${c.fingers[si]}</text>`;
      }
      s += `<text x="${x}" y="${y0+dy*nF+20}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--muted)" font-family="Open Sans,Arial,sans-serif">${STRINGS[si]}</text>`;
    });
    return s + '</svg>';
  }

  // ================= Page =================
  function buildPage() {
    const app = $('app');
    const related = ORDER.filter(s => s !== SLUG).map(s => {
      const r = PROGS[s];
      return `<a class="card rel" href="${urlFor(s)}"><div class="chords">${r.chords.join('<i>→</i>')}</div><h3>${r.chords.join(' ')} on ukulele</h3><div class="lvl">${r.level}</div></a>`;
    }).join('');

    app.innerHTML = `
<div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Tech Rabbi</a><span>/</span><a href="/uke/">Uke practice</a><span>/</span>${SEQ.join(' ')}</nav>
  <header>
    <p class="eyebrow">Ukulele chord change practice</p>
    <h1>${dots(SEQ)}</h1>
    <p class="lede">Practice the ${SEQ.join(' ')} progression on ukulele without panic. Tap through one clean pass at your own pace, then connect the loop with a metronome.</p>
  </header>

  <main>
    <section class="card tool" aria-label="Practice">
      <div class="coach">
        <div class="status" aria-live="polite">
          <span class="pill" id="pill">Ready</span>
          <h2 id="statusHead"></h2>
          <p id="statusText"></p>
        </div>
        <div class="box">
          <div class="tempo-head"><span class="label">Metronome</span><span class="tempo-now"><span id="bpmNow"></span> bpm</span></div>
          <div class="presets" role="group" aria-label="Preset tempo">
            ${PRESETS.map(([n, v]) => `<button class="preset" data-bpm="${v}"><span>${n}</span><b>${v}</b></button>`).join('')}
          </div>
          <details class="custom" id="custom">
            <summary>Custom tempo</summary>
            <div class="custom-row">
              <button class="step" id="slower" aria-label="Slower">−</button>
              <output id="bpmOut"></output>
              <button class="step" id="faster" aria-label="Faster">+</button>
              <input type="range" id="bpmRange" min="40" max="180" step="1" aria-label="Tempo in beats per minute">
            </div>
          </details>
        </div>
        <div class="moves">
          <div class="box"><span class="label">First move</span><b>${SEQ[0]} to ${SEQ[1]}</b></div>
          <div class="box"><span class="label">Watch out for</span><b>${P.watch}</b></div>
        </div>
      </div>

      <div class="stage">
        <div class="now-head">
          <span class="label">Current chord</span>
          <span class="now-name" id="nowName"></span>
        </div>
        <div class="now-diagram" id="nowDiagram"></div>
        <div class="next-bar">
          <span class="label">Next</span>
          <span id="nextDiagram"></span>
          <span class="next-name" id="nextName"></span>
        </div>
        <div class="pulse" id="pulse" hidden>
          <div class="beats" id="beats" aria-hidden="true"></div>
          <div class="strum" id="strum" aria-label="Strum pattern"></div>
        </div>
        <p class="calm" id="calm">No clock is running. Move on when your fingers are ready.</p>
        <div>
          <div class="progress-row"><span class="label" id="progLabel">Progress</span><b id="progValue"></b></div>
          <div class="bar"><i id="progBar"></i></div>
        </div>
        <button class="primary" id="primary"></button>
        <div class="secondary">
          <button class="ghost" id="playChord">Play chord</button>
          <button class="ghost quiet" id="endPractice" disabled>End practice</button>
        </div>
      </div>
    </section>

    <section class="card settings" aria-label="Loop settings">
      <div class="selected">
        <div><span class="label">Selected chords</span><br><b>${arrows(SEQ)}</b></div>
        <a href="#more">Change progression ↓</a>
      </div>
      <div class="field">
        <span class="label">Beats per chord</span>
        <div class="seg" id="beatsSeg" role="group" aria-label="Beats per chord">
          ${[1,2,4,8].map(v => `<button data-v="${v}">${v}</button>`).join('')}
        </div>
      </div>
      <label class="field">
        <span class="label">Strum pattern</span>
        <select id="pattern">
          <option value="downs">All downs</option>
          <option value="du">Down up</option>
          <option value="island">Island strum</option>
          <option value="calypso">Calypso</option>
          <option value="off">Hide pattern</option>
        </select>
      </label>
      <label class="field">
        <span class="label">Sound</span>
        <select id="sound">
          <option value="both">Click and strum</option>
          <option value="click">Click only</option>
          <option value="strum">Strum only</option>
          <option value="mute">Silent</option>
        </select>
      </label>
      <div class="field">
        <span class="label">Options</span>
        <div class="toggles">
          ${N > 2 ? '<button class="toggle" id="shuffle" aria-pressed="false"><span class="knob"></span>Shuffle loop</button>' : ''}
          <button class="toggle" id="lefty" aria-pressed="false"><span class="knob"></span>Lefty diagrams</button>
        </div>
      </div>
    </section>
    <p class="kbd-hint"><kbd>Space</kbd> presses the big button. <kbd>↑</kbd> <kbd>↓</kbd> change the tempo.</p>

    <section class="section" aria-labelledby="shapesTitle">
      <h2 id="shapesTitle">The shapes</h2>
      <p class="section-note">Standard GCEA tuning. Numbers in the dots are fingers: 1 index, 2 middle, 3 ring. Read each diagram as if the uke is standing up facing you.</p>
      <div class="strip${UNIQUE.length === 2 ? ' n2' : ''}" id="strip"></div>
    </section>

    <section class="section card omc" aria-labelledby="omcTitle">
      <h2 id="omcTitle">One-minute changes</h2>
      <p class="section-note">Pick two chords. For sixty seconds, switch back and forth as fast as you can while still sounding clean. Tap the button (or press <kbd>Space</kbd>) each time you land a chord. Your best score for each pair is saved on this device.</p>
      <div class="pairs" id="pairs" role="group" aria-label="Chord pair"></div>
      <div class="omc-body">
        <div class="ring">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle class="track" cx="50" cy="50" r="44" fill="none" stroke-width="8"/>
            <circle class="fill" id="ringFill" cx="50" cy="50" r="44" fill="none" stroke-width="8" stroke-linecap="round" stroke-dasharray="276.46" stroke-dashoffset="0"/>
          </svg>
          <div class="ring-inner">
            <div class="ring-count" id="omcCount" aria-live="polite">0</div>
            <div class="ring-sub" id="omcTime">60 seconds</div>
          </div>
        </div>
        <div class="omc-side">
          <div class="omc-pair" id="omcPair"></div>
          <div class="omc-buttons">
            <button class="tap" id="omcTap" disabled>Changed</button>
            <button class="ghost" id="omcStart">Start</button>
          </div>
          <p class="result" id="omcResult"></p>
          <div>
            <div class="history-label" id="historyLabel"></div>
            <div class="history" id="history" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="howTitle">
      <h2 id="howTitle">How to practice ${SEQ.join(' to ')} on ukulele</h2>
      <div class="guide">
        <div>
          <p class="answer">${esc(P.answer)}</p>
          <ol>
            <li>Press Start practice and put your fingers on ${SEQ[0]}.</li>
            <li>Tap Next chord only after your fingers land and the strum sounds clean.</li>
            <li>After the last chord, start the loop and follow the metronome.</li>
          </ol>
          <h3>Tips for ${SEQ.join(' ')}</h3>
          <ul>${P.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          <h3>Why ${P.hard[0]} to ${P.hard[1]} feels hard on uke</h3>
          <p>${esc(P.why)}</p>
          <h3>Common mistake</h3>
          <p>${esc(P.mistake)}</p>
          <h3>Two-minute practice plan</h3>
          <ol>${P.plan.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
        </div>
        <aside class="card goals-card">
          <table class="goals">
            <thead><tr><th>Goal</th><th>What to watch</th></tr></thead>
            <tbody>${GOALS.map(([g, w]) => `<tr><td>${g}</td><td>${w}</td></tr>`).join('')}</tbody>
          </table>
        </aside>
      </div>
    </section>

    <section class="section" id="more" aria-labelledby="relTitle">
      <h2 id="relTitle">More uke progressions</h2>
      <p class="section-note">Each page opens straight into the same practice tool with a different set of chords.</p>
      <div class="related">${related}</div>
    </section>

    <section class="section faq" aria-labelledby="faqTitle">
      <h2 id="faqTitle">FAQ</h2>
      <details><summary>Does this page need my microphone?</summary><p>No. Nothing listens to you. You decide when a change is clean and press the button yourself.</p></details>
      <details><summary>Where does my progress go?</summary><p>Your tempo, settings and one-minute scores are saved in this browser on this device. Nothing is sent anywhere, and clearing your browser data clears them.</p></details>
      <details><summary>What tuning do the diagrams use?</summary><p>Standard GCEA tuning for soprano, concert and tenor ukuleles. The shapes are the same whether your G string is high or low. A baritone uke is tuned DGBE like the top four guitar strings, so these shapes will sound different on it.</p></details>
      <details><summary>I play left-handed. Can I flip the diagrams?</summary><p>Yes. Turn on Lefty diagrams in the settings and every chord shape is mirrored so the strings read A E C G from left to right.</p></details>
      <details><summary>Why does a string buzz or sound dead?</summary><p>Usually a fingertip is too far from the fret or is leaning on the next string. Play the chord one string at a time to find the culprit, then curl that finger so only the tip touches.</p></details>
    </section>
  </main>

  <footer>Made for <a href="https://techrabbi.org">Tech Rabbi</a>. Practice slowly first. Speed comes from clean changes.</footer>
</div>`;
  }

  // ================= Render =================
  function renderChord() {
    const { cur, next } = S.view;
    $('nowName').textContent = cur; $('nowName').style.color = `var(--c-${cur})`;
    $('nextName').textContent = next; $('nextName').style.color = `var(--c-${next})`;
    $('nowDiagram').innerHTML = diagram(cur);
    $('nextDiagram').innerHTML = diagram(next);
    document.querySelectorAll('.chip').forEach(el => el.classList.toggle('current', el.dataset.chord === cur));
  }
  function renderStatus() {
    const p = S.phase;
    const pill = $('pill');
    pill.classList.toggle('loop', p === 'loop');
    const btn = $('primary');
    btn.classList.toggle('go', p === 'ready');
    if (p === 'idle') {
      pill.textContent = 'Ready';
      $('statusHead').textContent = `Ready: ${SEQ[0]} to ${SEQ[1]}`;
      $('statusText').textContent = 'First tap through each chord at your own pace. Then connect the whole progression with the metronome.';
      btn.textContent = 'Start practice';
    } else if (p === 'step') {
      pill.textContent = 'Step 1 of 2';
      $('statusHead').textContent = `${S.view.cur} to ${S.view.next}`;
      $('statusText').textContent = 'Press Next chord only after your fingers land and the strum sounds clean.';
      btn.textContent = 'Next chord';
    } else if (p === 'ready') {
      pill.textContent = 'Step 2 of 2';
      $('statusHead').textContent = 'Now connect the loop';
      $('statusText').textContent = `You landed every change. Start the loop at ${S.bpm} bpm and switch on beat one.`;
      btn.textContent = 'Start the loop';
    } else {
      pill.textContent = 'Looping';
      $('statusHead').textContent = `${S.bpm} bpm, ${S.beats} ${S.beats === 1 ? 'beat' : 'beats'} per chord`;
      $('statusText').textContent = 'Watch the next chord and start moving on the last beat. If it gets messy, stop and pick a slower tempo.';
      btn.textContent = 'Stop loop';
    }
    $('endPractice').disabled = p === 'idle';
    $('pulse').hidden = p !== 'loop';
    $('calm').hidden = p === 'loop';
    $('calm').textContent = p === 'ready' ? 'Your fingers know the way. Time to add the beat.' : 'No clock is running. Move on when your fingers are ready.';
    renderProgress();
  }
  function renderProgress(frac) {
    let label = 'Progress', value, pct;
    if (S.phase === 'loop') {
      label = 'Changes made';
      value = String(S.changes);
      pct = (frac || 0) * 100;
    } else {
      const total = N - 1;
      const done = S.phase === 'ready' ? total : S.phase === 'step' ? S.stepIndex : 0;
      value = `${done} / ${total}`;
      pct = done / total * 100;
    }
    $('progLabel').textContent = label;
    $('progValue').textContent = value;
    $('progBar').style.width = pct + '%';
  }
  function renderTempo() {
    $('bpmNow').textContent = S.bpm;
    $('bpmOut').textContent = S.bpm;
    $('bpmRange').value = S.bpm;
    let preset = false;
    document.querySelectorAll('.preset').forEach(b => {
      const on = +b.dataset.bpm === S.bpm; preset = preset || on;
      b.setAttribute('aria-pressed', String(on));
    });
    if (!preset) $('custom').open = true;
    if (S.phase === 'loop' || S.phase === 'ready') renderStatusText();
  }
  function renderStatusText() {
    if (S.phase === 'loop') $('statusHead').textContent = `${S.bpm} bpm, ${S.beats} ${S.beats === 1 ? 'beat' : 'beats'} per chord`;
    if (S.phase === 'ready') $('statusText').textContent = `You landed every change. Start the loop at ${S.bpm} bpm and switch on beat one.`;
  }
  function renderSettings() {
    document.querySelectorAll('#beatsSeg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === S.beats)));
    $('pattern').value = S.pattern;
    $('sound').value = S.sound;
    if ($('shuffle')) $('shuffle').setAttribute('aria-pressed', String(S.shuffle));
    $('lefty').setAttribute('aria-pressed', String(S.lefty));
  }
  function renderBeats() {
    $('beats').innerHTML = Array.from({ length: S.beats }, (_, i) => `<span class="beat${i === 0 ? ' first' : ''}"></span>`).join('');
  }
  function renderStrum() {
    const p = PATTERNS[S.pattern];
    $('strum').hidden = S.pattern === 'off';
    $('strum').innerHTML = p.map((d, i) =>
      `<div class="slot"><span class="arrow${d ? '' : ' rest'}">${d === 'D' ? '↓' : d === 'U' ? '↑' : '·'}</span><span class="count">${COUNTS[i]}</span></div>`).join('');
  }
  function renderStrip() {
    $('strip').innerHTML = UNIQUE.map(n =>
      `<div class="card chip" data-chord="${n}" style="--chord:var(--c-${n})"><h3>${n}</h3>${diagram(n)}<p>${CHORDS[n].tip}</p></div>`).join('');
    document.querySelectorAll('.chip').forEach(el => el.classList.toggle('current', el.dataset.chord === S.view.cur));
  }

  // ================= Audio =================
  let ctx = null;
  const pluckCache = {};
  function audio() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function pluckBuffer(midi) { // Karplus-Strong plucked string
    if (pluckCache[midi]) return pluckCache[midi];
    const sr = ctx.sampleRate, freq = 440 * Math.pow(2, (midi - 69) / 12);
    const len = Math.floor(sr * 1.4), period = Math.round(sr / freq);
    const buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0);
    const ring = new Float32Array(period);
    for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
    let p = 0;
    for (let i = 0; i < len; i++) {
      const nx = (p + 1) % period, v = ring[p];
      ring[p] = 0.996 * 0.5 * (ring[p] + ring[nx]);
      d[i] = v * 0.5; p = nx;
    }
    return (pluckCache[midi] = buf);
  }
  function playStrum(name, dir, t) {
    const notes = CHORDS[name].frets.map((f, i) => OPEN[i] + f);
    const order = dir === 'U' ? [3,2,1,0] : [0,1,2,3];
    const vol = dir === 'U' ? 0.22 : 0.32;
    order.forEach((si, k) => {
      const at = t + k * 0.014;
      const src = ctx.createBufferSource(); src.buffer = pluckBuffer(notes[si]);
      const g = ctx.createGain();
      g.gain.setValueAtTime(vol, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 1.3);
      src.connect(g).connect(ctx.destination);
      src.start(at); src.stop(t + 1.4);
    });
  }
  function playClick(t, accent) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = accent ? 1600 : 1050;
    g.gain.setValueAtTime(accent ? 0.35 : 0.2, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + 0.06);
  }
  const strumNow = name => { if (S.sound === 'mute') return; audio(); playStrum(name, 'D', ctx.currentTime + 0.02); };

  // ================= Step mode =================
  function startStep() {
    S.phase = 'step'; S.stepIndex = 0;
    S.view = { cur: SEQ[0], next: SEQ[1 % N] };
    renderChord(); renderStatus();
    strumNow(SEQ[0]);
  }
  function nextStep() {
    S.stepIndex++;
    if (S.stepIndex >= N - 1) {
      S.view = { cur: SEQ[N - 1], next: SEQ[0] };
      S.stepIndex = N - 1;
      S.phase = 'ready';
    } else {
      S.view = { cur: SEQ[S.stepIndex], next: SEQ[S.stepIndex + 1] };
    }
    renderChord(); renderStatus();
    strumNow(S.view.cur);
  }
  function endPractice() {
    if (S.phase === 'loop') stopLoop(false);
    S.phase = 'idle'; S.stepIndex = 0;
    S.view = { cur: SEQ[0], next: SEQ[1 % N] };
    renderChord(); renderStatus();
  }

  // ================= Loop mode (eighth-note scheduler) =================
  const sched = { cur: SEQ[0], next: SEQ[1 % N], seqPos: 0, changes: 0 };
  function pickNext(from) {
    if (S.shuffle && N > 2) {
      const opts = UNIQUE.filter(c => c !== from);
      return opts[Math.floor(Math.random() * opts.length)];
    }
    sched.seqPos = (sched.seqPos + 1) % N;
    return SEQ[sched.seqPos];
  }
  let timer = null, nextTime = 0, eighth = 0, inChord = 0, raf = 0;
  const queue = [];
  function schedule() {
    while (nextTime < ctx.currentTime + 0.12) {
      const per = S.beats * 2;
      if (inChord === 0 && eighth > 0) {
        sched.cur = sched.next;
        sched.next = pickNext(sched.cur);
        sched.changes++;
      }
      const slot = eighth % 8, onBeat = inChord % 2 === 0, dir = PATTERNS[S.pattern][slot], snd = S.sound;
      if (onBeat && (snd === 'both' || snd === 'click')) playClick(nextTime, inChord === 0);
      if (dir && (snd === 'both' || snd === 'strum')) playStrum(sched.cur, dir, nextTime);
      queue.push({ t: nextTime, cur: sched.cur, next: sched.next, changes: sched.changes, beat: onBeat ? inChord / 2 : -1, slot, frac: (inChord + 1) / per });
      nextTime += 60 / S.bpm / 2;
      eighth++;
      inChord = (inChord + 1) % per;
    }
  }
  function draw() {
    if (S.phase !== 'loop') return;
    while (queue.length && queue[0].t <= ctx.currentTime) {
      const ev = queue.shift();
      if (ev.cur !== S.view.cur || ev.next !== S.view.next || ev.changes !== S.changes) {
        S.view = { cur: ev.cur, next: ev.next };
        S.changes = ev.changes;
        renderChord();
      }
      if (ev.beat >= 0) document.querySelectorAll('.beat').forEach((b, i) => b.classList.toggle('on', i === ev.beat));
      document.querySelectorAll('.slot').forEach((s, i) => s.classList.toggle('on', i === ev.slot && !!PATTERNS[S.pattern][i]));
      renderProgress(ev.frac);
    }
    raf = requestAnimationFrame(draw);
  }
  function startLoop() {
    audio();
    if (omc.running) omcCancel();
    S.phase = 'loop'; S.changes = 0;
    sched.seqPos = 0; sched.cur = SEQ[0]; sched.changes = 0;
    sched.next = (S.shuffle && N > 2) ? pickNext(SEQ[0]) : SEQ[1 % N];
    if (!(S.shuffle && N > 2)) sched.seqPos = 1 % N;
    S.view = { cur: sched.cur, next: sched.next };
    renderChord(); renderBeats(); renderStrum(); renderStatus();
    eighth = 0; inChord = 0; queue.length = 0;
    nextTime = ctx.currentTime + 0.08;
    schedule();
    timer = setInterval(schedule, 25);
    raf = requestAnimationFrame(draw);
  }
  function stopLoop(backToReady = true) {
    clearInterval(timer); cancelAnimationFrame(raf);
    queue.length = 0;
    document.querySelectorAll('.beat.on,.slot.on').forEach(el => el.classList.remove('on'));
    S.phase = backToReady ? 'ready' : 'idle';
    S.view = { cur: SEQ[0], next: SEQ[1 % N] };
    renderChord(); renderStatus();
  }

  function primary() {
    if (S.phase === 'idle') startStep();
    else if (S.phase === 'step') nextStep();
    else if (S.phase === 'ready') startLoop();
    else stopLoop(true);
  }

  // ================= One-minute changes =================
  const CIRC = 276.46;
  const omc = { running: false, count: 0, end: 0, raf: 0 };
  function renderPairs() {
    $('pairs').innerHTML = PAIRS.map((p, i) => {
      const best = (S.scores[scoreKey(...p)] || {}).best;
      return `<button class="pair" data-i="${i}" aria-pressed="${i === S.pair}">${p[0]} ↔ ${p[1]}${best ? `<span class="best">best ${best}</span>` : ''}</button>`;
    }).join('');
  }
  function renderOmcPair() {
    const [a, b] = PAIRS[S.pair];
    $('omcPair').innerHTML = `${diagram(a)}<span class="swap" aria-hidden="true">⇄</span>${diagram(b)}`;
  }
  function renderHistory() {
    const rec = S.scores[scoreKey(...PAIRS[S.pair])];
    const hist = rec ? rec.history : [];
    if (!hist.length) { $('historyLabel').textContent = 'No scores yet for this pair.'; $('history').innerHTML = ''; return; }
    const max = Math.max(...hist, 1);
    $('historyLabel').textContent = `Best ${rec.best} changes. Your last ${hist.length} ${hist.length === 1 ? 'try' : 'tries'}:`;
    $('history').innerHTML = hist.map((v, i) =>
      `<div class="b${i === hist.length - 1 ? ' last' : ''}" style="height:${Math.max(6, v / max * 100)}%" title="${v}"></div>`).join('');
  }
  function renderOmc() { renderPairs(); renderOmcPair(); renderHistory(); }
  function omcTick() {
    const left = Math.max(0, omc.end - performance.now());
    $('ringFill').style.strokeDashoffset = String(CIRC * (1 - left / 60000));
    $('omcTime').textContent = `${Math.ceil(left / 1000)} seconds`;
    if (left <= 0) return omcFinish();
    omc.raf = requestAnimationFrame(omcTick);
  }
  function omcStart() {
    if (S.phase === 'loop') stopLoop(true);
    Object.assign(omc, { running: true, count: 0, end: performance.now() + 60000 });
    $('omcCount').textContent = '0';
    $('omcResult').textContent = '';
    $('omcTap').disabled = false; $('omcTap').focus();
    $('omcStart').textContent = 'Cancel';
    if (S.sound !== 'mute') { audio(); playClick(ctx.currentTime + 0.01, true); }
    omcTick();
  }
  function omcReset() {
    cancelAnimationFrame(omc.raf);
    omc.running = false;
    $('omcTap').disabled = true;
    $('omcStart').textContent = 'Start';
    $('ringFill').style.strokeDashoffset = '0';
    $('omcTime').textContent = '60 seconds';
  }
  function omcCancel() { omcReset(); $('omcCount').textContent = '0'; $('omcResult').textContent = 'Cancelled.'; }
  function omcFinish() {
    const n = omc.count;
    omcReset();
    $('omcCount').textContent = n;
    const key = scoreKey(...PAIRS[S.pair]);
    const rec = S.scores[key] || { best: 0, history: [] };
    const isBest = n > rec.best;
    rec.best = Math.max(rec.best, n);
    rec.history = [...rec.history, n].slice(-12);
    S.scores[key] = rec; store.set('scores', S.scores);
    $('omcResult').textContent = isBest && n > 0 ? `${n} changes. A new best!` : `${n} changes. Your best is ${rec.best}.`;
    if (S.sound !== 'mute') { audio(); playClick(ctx.currentTime + 0.01, true); playClick(ctx.currentTime + 0.15, true); }
    renderPairs(); renderHistory();
  }
  function omcTap() { if (omc.running) $('omcCount').textContent = ++omc.count; }

  // ================= Wiring =================
  function setBpm(v) {
    S.bpm = Math.max(40, Math.min(180, Math.round(v)));
    store.set('bpm', S.bpm);
    renderTempo();
  }
  function wire() {
    $('primary').onclick = primary;
    $('playChord').onclick = () => { audio(); playStrum(S.view.cur, 'D', ctx.currentTime + 0.02); };
    $('endPractice').onclick = endPractice;
    document.querySelectorAll('.preset').forEach(b => b.onclick = () => setBpm(+b.dataset.bpm));
    $('slower').onclick = () => setBpm(S.bpm - 1);
    $('faster').onclick = () => setBpm(S.bpm + 1);
    $('bpmRange').oninput = e => setBpm(+e.target.value);
    $('beatsSeg').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      S.beats = +b.dataset.v; store.set('beats', S.beats);
      renderSettings(); renderBeats();
      if (S.phase === 'loop') { stopLoop(true); startLoop(); }
    };
    $('pattern').onchange = e => { S.pattern = e.target.value; store.set('pattern', S.pattern); renderStrum(); };
    $('sound').onchange = e => { S.sound = e.target.value; store.set('sound', S.sound); };
    if ($('shuffle')) $('shuffle').onclick = () => {
      S.shuffle = !S.shuffle; store.set('shuffle', S.shuffle); renderSettings();
      if (S.phase === 'loop') { stopLoop(true); startLoop(); }
    };
    $('lefty').onclick = () => {
      S.lefty = !S.lefty; store.set('lefty', S.lefty);
      renderSettings(); renderStrip(); renderChord(); renderOmcPair();
    };
    $('pairs').onclick = e => {
      const b = e.target.closest('.pair'); if (!b || omc.running) return;
      S.pair = +b.dataset.i; store.set('pair:' + SLUG, S.pair);
      $('omcResult').textContent = ''; $('omcCount').textContent = '0';
      renderOmc();
    };
    $('omcStart').onclick = () => omc.running ? omcCancel() : omcStart();
    $('omcTap').addEventListener('pointerdown', e => { e.preventDefault(); omcTap(); });
    $('omcTap').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); omcTap(); } });

    document.addEventListener('keydown', e => {
      if (e.target.matches('select,input,summary,a')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (e.repeat) return;
        omc.running ? omcTap() : primary();
      } else if (e.key === 'ArrowUp') { e.preventDefault(); setBpm(S.bpm + 1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setBpm(S.bpm - 1); }
    });
    // Stop a focused button from also firing its click when Space is released
    document.addEventListener('keyup', e => { if (e.code === 'Space' && e.target.matches('button')) e.preventDefault(); });
  }

  buildPage();
  wire();
  renderSettings(); renderTempo(); renderStrip(); renderChord(); renderBeats(); renderStrum(); renderStatus(); renderOmc();
})();
