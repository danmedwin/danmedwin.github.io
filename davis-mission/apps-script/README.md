# What Makes Davis, Davis? · deployment notes

The activity runs as a Google Apps Script web app so that Google enforces the
davisstudent.org sign-in, exactly like Davis Today. The page at
https://techrabbi.org/davis-mission/ is the front door: the QR code and the
printed packets point there, and it forwards to the web app.

## Files

| File | What it is |
| --- | --- |
| `Code.gs` | Backend: sign-in check, the responses Sheet, save/load for groups, data for the board |
| `Index.html` | The group activity (phone or smart board) |
| `Board.html` | The results board for the Media Center, at `…/exec?view=board` |
| `Denied.html` | Shown to anyone not signed in with a davisstudent.org account |
| `appsscript.json` | Manifest: time zone, and the web app set to run as you, for the domain |

## Deploy (about ten minutes, from a davisstudent.org account)

1. Signed in as your **davisstudent.org** account, open https://script.google.com and create a new project. Name it `What Makes Davis, Davis`.
2. Replace the default `Code.gs` with this folder's `Code.gs`. Add three HTML files (File > New > HTML) named exactly `Index`, `Board`, `Denied` and paste the matching files.
3. Project Settings (gear icon) > check **Show "appsscript.json" manifest file in editor**, then paste this folder's `appsscript.json` over it.
4. In the editor, choose the function `setup` and click Run. Approve the permissions. This creates the responses spreadsheet in your Drive (the URL prints in the log).
5. Deploy > New deployment > type **Web app**. Execute as: **Me**. Who has access: **Anyone with a Google account**. Deploy, and copy the web app URL (ends in `/exec`).
6. Paste that URL into `APP_URL` at the top of `../index.html` and push. From then on techrabbi.org/davis-mission forwards to the app.

To change the code later: paste the new file, then Deploy > Manage deployments > edit > New version. The URL stays the same.

## Useful URLs

Deployed 2026-09-03 from dmedwin@davisstudent.org with clasp (`.clasp.json` holds the script id).
Web app: `https://script.google.com/macros/s/AKfycbzig5xOzFHtwgDAkowIsErteeH6JnHEEXVR5UQSXJDnBSD9BmGg3LKq06kS04jBAN57/exec`
To ship a code change: `clasp push -f` then `clasp deploy -i AKfycbzig5xOzFHtwgDAkowIsErteeH6JnHEEXVR5UQSXJDnBSD9BmGg3LKq06kS04jBAN57 -d "v2 ..."` (same URL).

- Activity: `https://techrabbi.org/davis-mission/` (forwards to the `/exec` URL)
- Results board: `https://techrabbi.org/davis-mission/?board` (forwards to `/exec?view=board`)
- Front door without forwarding, for the smart board with the QR: `https://techrabbi.org/davis-mission/?stay`
- Printable packets: `https://techrabbi.org/davis-mission/cards.html?sets=10`

## Who can get in

- The deployment is open to anyone with a Google account, so Google always asks for a sign-in first.
- `getSession()` in `Code.gs` then admits davisstudent.org accounts (Google reveals a visitor's email to a script owned by the same Workspace domain, and not otherwise).
- Outside testers (a Gmail address, say) get in only with the tester key in the link: `https://techrabbi.org/davis-mission/?key=XXXX` (add `&board` for the results board). The key is generated on first use and stored as a script property; accounts listed in `OWNERS` see the link in the board's footer. To revoke it, delete the `TESTER_KEY` script property in Project Settings and a new one is generated.
- Deploy from the Davis account. From a personal Gmail account Google would not reveal any visitor's email, and only the tester key would work.

## Where the data goes

A spreadsheet named *What Makes Davis, Davis - responses (Sept 8, 2026)* in the deploying account's Drive.

- **Groups**: one row per group, updated in place as they work. Columns for the six, the three, the pitch, the three shadow notes, and the four questions, plus a `state` column with the raw JSON.
- **Log**: one line per save (time, who, group, event, part), handy for seeing pacing afterwards.

The board reads the same sheet every eight seconds, so nothing needs exporting on the day. For the later reflection, the Groups sheet is already a frequency table waiting for a pivot.

## Testing without deploying

Open `Index.html` or `Board.html` straight from disk in a browser. Without Apps Script present they run in **Preview mode**, storing groups in the browser's localStorage, so you can click through the whole activity and see the board fill in (open both in the same browser).
