/**
 * Hebrew Roots Explorer: API proxy for techrabbi.org/roots/
 *
 * Holds the Anthropic API key as a secret so it never reaches the browser.
 * The prompts live here, not in the page, so this Worker can only answer
 * three narrow questions about Hebrew words. It is not a general Claude proxy.
 *
 * Secrets / vars (see wrangler.toml and README.md):
 *   ANTHROPIC_API_KEY  secret, set with `wrangler secret put ANTHROPIC_API_KEY`
 *   ALLOWED_ORIGINS    comma separated list of sites allowed to call this Worker
 *   MODEL              Claude model id
 *   LIMITER            rate limit binding (per visitor IP)
 */

const HEB_LETTERS = /^[א-ת]+$/;
const NIKUD = /[֑-ׇ]/g;
const CACHE_DAYS = 30;

const G = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40, 'נ': 50, 'ן': 50,
  'ס': 60, 'ע': 70, 'פ': 80, 'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100, 'ר': 200,
  'ש': 300, 'ת': 400,
};
const strip = (s) => String(s || '').replace(NIKUD, '');
const lettersOnly = (s) => strip(s).replace(/[^א-ת]/g, '');
const gematria = (s) => [...lettersOnly(s)].reduce((n, c) => n + (G[c] || 0), 0);

/* ── Prompts ── */

const ROOT_PROMPT = `You are a Hebrew language expert and scholar of Jewish liturgy and texts. Given a Hebrew root (shoresh), return a list of 8-12 words derived from it. For EACH word include:
- "hebrew": the Hebrew word, with nikud
- "transliteration": English transliteration
- "meaning": concise English meaning
- "partOfSpeech": noun, verb, adjective, or adverb
- "binyan": for a verb, its binyan (Pa'al, Pi'el, Hif'il, etc.), otherwise null
- "context": a substantive 1-2 sentence note on where this word appears in Jewish liturgy, Torah, Talmud, modern Hebrew, or Jewish life. Be specific: name the prayer, parashah, tractate, or setting. This is the most important field.

If the input is not a real Hebrew root, report an empty list.
`;

const GEMATRIA_PROMPT = `You are a Hebrew language and gematria expert. Given a numerical value and a source word, return a list of 10-12 notable Hebrew words whose standard gematria (mispar hechrachi, final letters count the same as regular letters) equals the given value exactly. Add up each word letter by letter before including it. Do NOT include the source word or trivial spelling variations of it. For each word include:
- "hebrew": the Hebrew word
- "transliteration": English transliteration
- "meaning": concise English meaning
- "shoresh": the Hebrew root of this word (root letters only, no nikud)
- "context": the most important field. 1-2 sentences on how THIS word might connect thematically, spiritually, or conceptually to the SOURCE word, drawing on Jewish thought, midrash, liturgy, or language.

Prioritize words well known in Jewish liturgy, Torah, or tradition.
`;

const MORE_PROMPT = `You are a Hebrew language and gematria expert. Given a numerical value and a source word, return a list of 8-10 MORE notable Hebrew words whose standard gematria (mispar hechrachi, final letters count the same as regular letters) equals that value exactly. Add up each word letter by letter before including it. EXCLUDE the source word and every word already listed. For each word include:
- "hebrew": the Hebrew word
- "transliteration": English transliteration
- "meaning": concise English meaning
- "shoresh": the Hebrew root of this word (root letters only, no nikud)
- "context": 1-2 sentences on how THIS word might connect to the SOURCE word, drawing on Jewish thought, midrash, liturgy, or language.

`;

/* ── Helpers ── */

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(origin) },
  });
}

function originAllowed(origin, env) {
  if (!origin) return false;
  const list = String(env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return list.includes(origin);
}

const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');

function cleanWord(w) {
  return {
    hebrew: str(w.hebrew, 40),
    transliteration: str(w.transliteration, 60),
    meaning: str(w.meaning, 160),
    partOfSpeech: str(w.partOfSpeech, 30),
    binyan: str(w.binyan, 30) || null,
    shoresh: lettersOnly(str(w.shoresh, 12)).slice(0, 5),
    context: str(w.context, 600),
  };
}

// Claude reports its answer through a tool call, so the API hands back
// structured data. Hebrew abbreviations with a plain " (like רבש"ע) used to
// break hand-parsed JSON; this way there is nothing to parse.
const WORD_FIELDS = {
  hebrew: { type: 'string' },
  transliteration: { type: 'string' },
  meaning: { type: 'string' },
  partOfSpeech: { type: 'string' },
  binyan: { type: ['string', 'null'] },
  shoresh: { type: 'string' },
  context: { type: 'string' },
};
const REPORT_TOOL = {
  name: 'report_words',
  description: 'Report the list of Hebrew words requested.',
  input_schema: {
    type: 'object',
    properties: {
      words: { type: 'array', items: { type: 'object', properties: WORD_FIELDS, required: ['hebrew', 'meaning'] } },
    },
    required: ['words'],
  },
};

async function askClaude(env, system, user) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: env.MODEL || 'claude-sonnet-5-5',
      max_tokens: 4000,
      system: system + '\n\nGive your answer by calling the report_words tool.',
      tools: [REPORT_TOOL],
      tool_choice: { type: 'tool', name: 'report_words' },
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) {
    console.log('Anthropic error', res.status, await res.text());
    throw new Error('upstream');
  }
  const data = await res.json();
  const call = (data.content || []).find((b) => b.type === 'tool_use');
  const words = call && call.input && call.input.words;
  if (!Array.isArray(words)) {
    console.log('No word list in reply. stop_reason:', data.stop_reason, JSON.stringify(data.content).slice(0, 1500));
    throw new Error('format');
  }
  return words.filter((w) => w && typeof w === 'object');
}

/* ── Request handling ── */

function parseRequest(body) {
  const mode = body && body.mode;
  if (mode === 'root') {
    const root = lettersOnly(body.root);
    if (root.length < 2 || root.length > 4) return { error: 'Send a root of two to four Hebrew letters.' };
    return { mode, root, cacheKey: `root/${root}` };
  }
  if (mode === 'gematria' || mode === 'more') {
    const value = Number(body.value);
    const source = strip(body.source).trim().slice(0, 30);
    if (!Number.isInteger(value) || value < 1 || value > 5000) return { error: 'Send a whole number value from 1 to 5000.' };
    if (!HEB_LETTERS.test(lettersOnly(source)) ) return { error: 'Send the source word in Hebrew letters.' };
    let exclude = [];
    if (mode === 'more') {
      if (!Array.isArray(body.exclude)) return { error: 'Send the words already shown.' };
      exclude = body.exclude.slice(0, 60).map((w) => strip(w).trim().slice(0, 30)).filter(Boolean);
    }
    return { mode, value, source, exclude, cacheKey: mode === 'gematria' ? `gematria/${value}/${lettersOnly(source)}` : null };
  }
  return { error: 'Unknown request.' };
}

async function answer(req, env) {
  if (req.mode === 'root') {
    const arr = await askClaude(env, ROOT_PROMPT, `Hebrew root: ${req.root}`);
    return arr.map(cleanWord).filter((w) => w.hebrew);
  }

  const sourceLetters = lettersOnly(req.source);
  const user = req.mode === 'gematria'
    ? `Gematria value: ${req.value}\nSource word (EXCLUDE it, but use it for the connection notes): ${req.source}`
    : `Gematria value: ${req.value}\nSource word (EXCLUDE it, but use it for the connection notes): ${req.source}\nAlready listed (EXCLUDE all): ${req.exclude.join(', ')}`;
  const arr = await askClaude(env, req.mode === 'gematria' ? GEMATRIA_PROMPT : MORE_PROMPT, user);

  const seen = new Set([sourceLetters, ...req.exclude.map(lettersOnly)]);
  return arr
    .map(cleanWord)
    .filter((w) => {
      const letters = lettersOnly(w.hebrew);
      // The model often miscounts; keep only words whose value really matches.
      if (!letters || gematria(letters) !== req.value || seen.has(letters)) return false;
      seen.add(letters);
      return true;
    });
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const allowed = originAllowed(origin, env);

    if (request.method === 'OPTIONS') {
      return allowed ? new Response(null, { status: 204, headers: corsHeaders(origin) }) : new Response(null, { status: 403 });
    }
    if (!allowed) return new Response('Forbidden', { status: 403 });
    if (request.method !== 'POST') return json({ error: 'Use POST.' }, 405, origin);

    let body;
    try { body = await request.json(); } catch { return json({ error: 'Send JSON.' }, 400, origin); }
    const req = parseRequest(body);
    if (req.error) return json({ error: req.error }, 400, origin);

    // Cached answers cost nothing and do not count against the rate limit.
    const cache = caches.default;
    const cacheUrl = req.cacheKey ? new Request(`https://cache.shoresh.internal/${encodeURI(req.cacheKey)}`) : null;
    if (cacheUrl) {
      const hit = await cache.match(cacheUrl);
      if (hit) return json({ words: await hit.json(), cached: true }, 200, origin);
    }

    if (env.LIMITER) {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await env.LIMITER.limit({ key: ip });
      if (!success) return json({ error: 'Too many lookups in a short time. Wait a minute and try again.' }, 429, origin);
    }

    let words;
    try {
      words = await answer(req, env);
    } catch (e) {
      return json({ error: 'The word service did not answer cleanly. Try again in a moment.' }, 502, origin);
    }

    if (cacheUrl && words.length) {
      ctx.waitUntil(cache.put(cacheUrl, new Response(JSON.stringify(words), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_DAYS * 86400}` },
      })));
    }
    return json({ words }, 200, origin);
  },
};
