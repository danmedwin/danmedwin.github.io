# Screenshot capture

Re-shoots the card images for `/apps/`. Uses the copy of Google Chrome already
installed on the Mac, so there is no browser download.

```bash
cd apps/tools
npm install
node capture.js                # every app in ../apps.json
node capture.js blacktop       # just one, or a list of ids
```

Output lands in `../shots/<id>.webp`, 1200px wide, around 30kb each.

## Warm-ups

Games open on a title screen, which makes a dull card. `WARMUPS` in
`capture.js` holds the clicks and keypresses that get each one into actual
play before the shutter fires. Add an entry there when a new game is added,
and `WAIT` if a page needs longer to settle.

## Apps that cannot be captured

Siddur OCR, Torah Navigator, and Family Dinner Planner sit behind a login or
an API key, so the script only ever sees the gate. Drop a hand-made image at
`../shots/<id>.webp`, or point the entry somewhere else with the screenshot
field in admin.
