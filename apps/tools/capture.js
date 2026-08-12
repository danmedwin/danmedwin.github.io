/* Re-capture the screenshots for the apps directory.
 *
 *   cd apps/tools && npm install
 *   node capture.js                 all apps in ../apps.json
 *   node capture.js blacktop        just these ids
 *
 * Shoots each live URL in headless Chrome at 2560x1600, runs any warm-up
 * defined in WARMUPS so games show gameplay rather than a title screen,
 * then downscales to a 1200px WebP in ../shots/.
 *
 * Apps behind a login or an API key cannot be captured here. Put a
 * hand-made image in ../shots/<id>.webp instead, or point the entry at a
 * different file with the screenshot field in admin.
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SHOTS = path.join(__dirname, '..', 'shots');
const CATALOG = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'apps.json'), 'utf8'));
const WIDTH = 1200;
const QUALITY = 0.82;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const hold = async (page, key, ms) => {
  await page.keyboard.down(key); await sleep(ms); await page.keyboard.up(key);
};
const clickCanvas = async (page, fx = 0.5, fy = 0.5) => {
  const box = await (await page.$('canvas')).boundingBox();
  await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy);
};

/* How long to let each page settle, and what to do first. */
const WAIT = {
  'alien-world': 1500, 'thread-hiker': 1500, 'blacktop': 1200, 'race-car-simulator': 1200,
  'glyphrush': 2500, 'threads': 2500, 'palimpsest': 22000, 'streams': 6000, 'mailbox-lab': 5000,
  'cosmic-drift': 5000, 'cosmic-workshop': 4000, 'latent-sky': 6000,
};

const WARMUPS = {
  'alien-world': async (page) => {
    await page.click('#startBtn'); await sleep(4000);
    await hold(page, 'w', 1800); await sleep(600);
  },
  'threads': async (page) => {
    const tabs = await page.$$('.tab-btn');
    if (tabs[1]) await tabs[1].click();            // BROWSE shows the colour grid
  },
  'race-car-simulator': async (page) => {
    await clickCanvas(page, 0.29, 0.44);           // "Click Here to Start"
    await sleep(1400);
    await page.mouse.click(484, 475);              // keyboard controls (modern)
    await page.mouse.click(841, 509);              // Race
    await sleep(1800); await hold(page, 'ArrowUp', 4000);
  },
  'blacktop': async (page) => {
    const tracks = await page.$$('.track-btn');
    if (tracks[1]) await tracks[1].click();
    await sleep(2000); await hold(page, 'ArrowUp', 3500);
  },
  'thread-hiker': async (page) => {
    await clickCanvas(page); await sleep(2500);
    await hold(page, 'w', 2500); await sleep(800);
  },
  'glyphrush': async (page) => {
    await page.click('#playBtn'); await sleep(1400);
    await page.click('#helpGo'); await sleep(1200);
  },
};

(async () => {
  const only = process.argv.slice(2);
  const targets = CATALOG.apps.filter((a) => !only.length || only.includes(a.id));
  if (!targets.length) {
    console.error('No matching ids. Known:', CATALOG.apps.map((a) => a.id).join(', '));
    process.exit(1);
  }

  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--mute-audio', '--autoplay-policy=no-user-gesture-required', '--hide-scrollbars'],
    defaultViewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
  });

  const raw = [];
  for (const app of targets) {
    const page = await browser.newPage();
    try {
      await page.goto(app.url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.evaluate(() => {
        document.querySelectorAll('audio,video').forEach((m) => { m.muted = true; m.pause?.(); });
      }).catch(() => {});
      if (WARMUPS[app.id]) await WARMUPS[app.id](page);
      await sleep(WAIT[app.id] || 3500);
      const png = await page.screenshot({ encoding: 'base64' });
      raw.push({ id: app.id, png });
      console.log(`shot  ${app.id}`);
    } catch (e) {
      console.log(`FAIL  ${app.id}  ${e.message.slice(0, 80)}`);
    }
    await page.close();
  }

  // Chrome encodes the WebP for us, so there is no image library to install.
  const enc = await browser.newPage();
  await enc.goto('about:blank');
  for (const { id, png } of raw) {
    const out = await enc.evaluate(async (b64, W, Q) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await img.decode();
      const scale = Math.min(1, W / img.width);
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL('image/webp', Q).split(',')[1];
    }, png, WIDTH, QUALITY);

    const dest = path.join(SHOTS, id + '.webp');
    fs.writeFileSync(dest, Buffer.from(out, 'base64'));
    console.log(`write ${id}.webp  ${(fs.statSync(dest).size / 1024 | 0)}kb`);
  }

  await browser.close();
})();
