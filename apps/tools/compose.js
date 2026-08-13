/* Build side-by-side card images for apps that do not suit one wide shot.
 *
 *   cd apps/tools && node compose.js            all composites
 *   cd apps/tools && node compose.js glyphrush  just one
 *
 * A phone-shaped game stranded in a 16:10 frame is mostly empty background.
 * Pairing two panels fills the card and says more about the app: the game
 * beside its level editor, or the menu beside a live round.
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SHOTS = path.join(__dirname, '..', 'shots');
const OUT_W = 1200;
const OUT_H = 750;
const QUALITY = 0.85;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const COMPOSITES = {
  'cosmic-drift': {
    gap: 10,
    panels: [
      { url: 'https://cosmicdriftapp.com/', width: 460, height: 900, wait: 6000 },
      // Anchored left so the panel names survive the crop rather than the save counts.
      { url: 'https://cosmicdriftapp.com/workshop.html', width: 900, height: 900, wait: 5000,
        fit: 'left top' },
    ],
  },
  'glyphrush': {
    gap: 10,
    panels: [
      { url: 'https://techrabbi.org/glyphrush/', width: 620, height: 900, wait: 3000 },
      {
        url: 'https://techrabbi.org/glyphrush/', width: 620, height: 900, wait: 2000,
        warmup: async (page) => {
          await page.click('#playBtn'); await sleep(1400);
          await page.click('#helpGo'); await sleep(1400);
        },
      },
    ],
  },
};

(async () => {
  const only = process.argv.slice(2);
  const ids = Object.keys(COMPOSITES).filter((id) => !only.length || only.includes(id));
  if (!ids.length) {
    console.error('Known composites:', Object.keys(COMPOSITES).join(', '));
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--mute-audio', '--autoplay-policy=no-user-gesture-required', '--hide-scrollbars'],
  });

  for (const id of ids) {
    const spec = COMPOSITES[id];
    const shots = [];

    for (const panel of spec.panels) {
      const page = await browser.newPage();
      await page.setViewport({ width: panel.width, height: panel.height, deviceScaleFactor: 2 });
      await page.goto(panel.url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.evaluate(() => {
        document.querySelectorAll('audio,video').forEach((m) => { m.muted = true; m.pause?.(); });
      }).catch(() => {});
      if (panel.warmup) await panel.warmup(page);
      await sleep(panel.wait || 3000);
      shots.push(await page.screenshot({ encoding: 'base64' }));
      await page.close();
      console.log(`  panel ${shots.length} of ${spec.panels.length} for ${id}`);
    }

    // Lay the panels out in a real page, then shoot that. Cheaper than
    // pulling in an image library, and the CSS does the fitting.
    const stage = await browser.newPage();
    await stage.setViewport({ width: OUT_W, height: OUT_H, deviceScaleFactor: 1 });
    await stage.setContent(`<style>
      html,body{margin:0;height:100%;background:#0b1422}
      .split{display:grid;grid-template-columns:1fr 1fr;gap:${spec.gap}px;height:100%}
      .split div{overflow:hidden;background:#0b1422}
      .split img{width:100%;height:100%;object-fit:cover;display:block}
    </style>
    <div class="split">${shots.map((s, i) =>
      `<div><img style="object-position:${spec.panels[i].fit || 'top center'}"
                 src="data:image/png;base64,${s}"></div>`).join('')}</div>`,
      { waitUntil: 'load' });
    await sleep(600);

    const png = await stage.screenshot({ encoding: 'base64' });
    const webp = await stage.evaluate(async (b64, Q) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      c.getContext('2d').drawImage(img, 0, 0);
      return c.toDataURL('image/webp', Q).split(',')[1];
    }, png, QUALITY);
    await stage.close();

    const dest = path.join(SHOTS, id + '.webp');
    fs.writeFileSync(dest, Buffer.from(webp, 'base64'));
    console.log(`write ${id}.webp  ${(fs.statSync(dest).size / 1024 | 0)}kb`);
  }

  await browser.close();
})();
