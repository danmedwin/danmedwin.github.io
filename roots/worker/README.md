# Hebrew Roots Explorer: Cloudflare Worker

The page at techrabbi.org/roots/ is static. This Worker sits between it and the
Claude API so the API key never reaches a visitor's browser.

What it does:

- Accepts only three kinds of request (words from a root, words with a gematria
  value, more words with that value). The prompts live here, so nobody can use
  your key for anything else.
- Only answers requests from techrabbi.org (set in `wrangler.toml`).
- Limits each visitor to 20 fresh lookups a minute.
- Caches root and gematria answers for 30 days, so popular roots like שלם cost
  nothing after the first visitor.
- Recomputes the gematria of every companion word and drops any the model
  counted wrong.

## One-time setup (about 10 minutes)

1. Make a free Cloudflare account at dash.cloudflare.com if you do not have one.
2. In a terminal, from this folder:

   ```bash
   cd roots/worker
   npx wrangler login
   npx wrangler deploy
   npx wrangler secret put ANTHROPIC_API_KEY
   ```

   Paste your Claude API key when it asks. Make a fresh key for this app in
   console.anthropic.com so you can see its usage on its own.

3. `wrangler deploy` prints the Worker's address, something like
   `https://shoresh-explorer.yourname.workers.dev`. Put it in
   `API_URL` near the top of the script in `roots/index.html` (currently https://shoresh-explorer.dan-medwin.workers.dev).

4. In console.anthropic.com, set a monthly spend limit on the workspace that
   holds this key. That is the backstop if the site ever gets popular.

## Changing things later

- Model: `MODEL` in `wrangler.toml`, then `npx wrangler deploy`.
- Rate limit: the `simple = { limit = 20, period = 60 }` line.
- Testing from your own machine: add `http://localhost:8000` (or whatever port
  you serve on) to `ALLOWED_ORIGINS` and deploy.
- Logs: `npx wrangler tail` shows requests live, including any API errors.
