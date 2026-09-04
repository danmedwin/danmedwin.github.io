/**
 * What Makes Davis, Davis?  -  faculty meeting activity, September 8, 2026
 *
 * Backend for the group activity (Index.html) and the results board (Board.html).
 * Deploy as a web app from a davisstudent.org account:
 *   Execute as: Me   ·   Who has access: Anyone with a Google account
 * Google requires a sign-in before the page loads. getSession() then admits
 * davisstudent.org accounts (Google reveals those emails to a same-domain
 * script) and, for outside testers, anyone who arrives with the tester key
 * in the link (?key=...). The key is generated once and stored as a script
 * property; owners see it on the results board.
 *
 * All responses land in a Google Sheet that this script creates on first use
 * (run setup() once from the editor to create it and grant permissions).
 */

const ALLOWED_DOMAIN = 'davisstudent.org';
const OWNERS = ['dmedwin@davisstudent.org'];     // see the tester link on the board
const APP_TITLE = 'What Makes Davis, Davis?';
const SHEET_TITLE = 'What Makes Davis, Davis - responses (Sept 8, 2026)';

const PHRASES = [
  'Reform Jewish Day School',
  'Academically challenging environment',
  'Enriched curricula',
  'Integration of general academics and Judaic studies',
  'Nurturing environment',
  'Secure environment',
  'Faculty dedicated to excellence',
  'Children encouraged to reach their highest potential',
  'Lifelong love of learning',
  'Commitment to Jewish life',
  'Morals, values, and ethics',
  'Grounded in Torah'
];

const COLUMNS = [
  'groupId', 'createdAt', 'updatedAt', 'email', 'lastEditor', 'groupName', 'room', 'members',
  'part', 'submittedAt', 'six', 'three', 'pitch', 'shadow1', 'shadow2', 'shadow3',
  'unique', 'essential', 'aspirational', 'missing', 'state'
];
const EDITABLE = [
  'groupName', 'room', 'members', 'part', 'six', 'three', 'pitch', 'shadow',
  'unique', 'essential', 'aspirational', 'missing', 'submittedAt', 'partStarted'
];
const TEXT_MAX = { groupName: 80, room: 40, members: 300, pitch: 2000, unique: 2000, essential: 2000, aspirational: 2000, missing: 2000 };

/* ------------------------------------------------------------------ routing */

function doGet(e) {
  const view = (e && e.parameter && e.parameter.view) || 'app';
  const session = getSession(e && e.parameter && e.parameter.key);
  let out;
  if (!session.ok) {
    out = HtmlService.createTemplateFromFile('Denied');
  } else {
    out = HtmlService.createTemplateFromFile(view === 'board' ? 'Board' : 'Index');
  }
  out.session = session;
  out.phrases = PHRASES;
  return out.evaluate()
    .setTitle(APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ------------------------------------------------------------------ session */

function getTesterKey_() {
  const props = PropertiesService.getScriptProperties();
  let key = props.getProperty('TESTER_KEY');
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '').slice(0, 12);
    props.setProperty('TESTER_KEY', key);
  }
  return key;
}

/** Who is this? Domain accounts are recognized by email; outsiders only with the tester key. */
function getSession(key) {
  let email = '';
  try { email = Session.getActiveUser().getEmail() || ''; } catch (err) { email = ''; }
  email = String(email).trim().toLowerCase();
  const inDomain = !!email && email.endsWith('@' + ALLOWED_DOMAIN);
  const tester = !inDomain && !!key && String(key) === getTesterKey_();
  const owner = OWNERS.indexOf(email) >= 0;
  const s = { email: inDomain ? email : (tester ? 'tester' : email), ok: inDomain || tester, domain: ALLOWED_DOMAIN, tester: tester, owner: owner };
  if (tester) s.key = String(key);
  if (owner) s.testerKey = getTesterKey_();
  return s;
}

function requireUser_(key) {
  const s = getSession(key);
  if (!s.ok) throw new Error('Please sign in with your ' + ALLOWED_DOMAIN + ' Google account.');
  return s;
}

/* ------------------------------------------------------------------ sheet */

function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SHEET_ID');
  let ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (err) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_TITLE);
    props.setProperty('SHEET_ID', ss.getId());
  }
  let groups = ss.getSheetByName('Groups');
  if (!groups) {
    groups = ss.getSheets()[0];
    groups.setName('Groups');
    groups.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]).setFontWeight('bold');
    groups.setFrozenRows(1);
  }
  if (!ss.getSheetByName('Log')) {
    const log = ss.insertSheet('Log');
    log.getRange(1, 1, 1, 5).setValues([['time', 'email', 'groupId', 'event', 'detail']]).setFontWeight('bold');
    log.setFrozenRows(1);
  }
  return ss;
}

/** Run once from the editor: creates the Sheet and triggers the permission prompt. */
function setup() {
  const ss = getSpreadsheet_();
  Logger.log('Responses sheet: ' + ss.getUrl());
  return ss.getUrl();
}

function getSheetUrl(key) {
  requireUser_(key);
  return getSpreadsheet_().getUrl();
}

function log_(email, groupId, event, detail) {
  try {
    getSpreadsheet_().getSheetByName('Log').appendRow([new Date(), email, groupId, event, detail || '']);
  } catch (err) { /* logging must never break a save */ }
}

function readGroups_() {
  const sh = getSpreadsheet_().getSheetByName('Groups');
  const last = sh.getLastRow();
  if (last < 2) return [];
  const stateCol = COLUMNS.indexOf('state');
  const rows = sh.getRange(2, 1, last - 1, COLUMNS.length).getValues();
  const out = [];
  rows.forEach(function (r, i) {
    if (!r[0]) return;
    let state = {};
    try { state = JSON.parse(r[stateCol]) || {}; } catch (err) { state = {}; }
    state.groupId = String(r[0]);
    state._row = i + 2;
    out.push(state);
  });
  return out;
}

function phraseList_(idxs) {
  return (idxs || []).map(function (i) { return PHRASES[i]; }).join(' | ');
}

function shadowCell_(state, n) {
  const idx = (state.three || [])[n];
  if (idx === undefined) return '';
  const text = (state.shadow || {})[idx] || '';
  return text ? PHRASES[idx] + ': ' + text : '';
}

function rowFor_(s) {
  return COLUMNS.map(function (c) {
    switch (c) {
      case 'six': return phraseList_(s.six);
      case 'three': return phraseList_(s.three);
      case 'shadow1': return shadowCell_(s, 0);
      case 'shadow2': return shadowCell_(s, 1);
      case 'shadow3': return shadowCell_(s, 2);
      case 'state': {
        const copy = {};
        Object.keys(s).forEach(function (k) { if (k !== '_row') copy[k] = s[k]; });
        return JSON.stringify(copy);
      }
      default: return s[c] == null ? '' : s[c];
    }
  });
}

function writeGroup_(state, rowIndex) {
  const sh = getSpreadsheet_().getSheetByName('Groups');
  const row = rowFor_(state);
  if (rowIndex) sh.getRange(rowIndex, 1, 1, COLUMNS.length).setValues([row]);
  else sh.appendRow(row);
}

/* ------------------------------------------------------------------ sanitizing */

/** Plain text only: drops control characters (keeps newlines and tabs), trims, caps length. */
function text_(v, max) {
  const s = String(v == null ? '' : v);
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if (code >= 32 || code === 10 || code === 9) out += s[i];
  }
  return out.slice(0, max || 2000).trim();
}

function idxList_(v, max) {
  if (!Array.isArray(v)) return [];
  const seen = {};
  const out = [];
  v.forEach(function (x) {
    const n = parseInt(x, 10);
    if (isNaN(n) || n < 0 || n >= PHRASES.length || seen[n]) return;
    seen[n] = true;
    out.push(n);
  });
  return out.slice(0, max);
}

function sanitize_(key, v) {
  switch (key) {
    case 'six': return idxList_(v, 6);
    case 'three': return idxList_(v, 3);
    case 'part': { const n = parseInt(v, 10); return isNaN(n) ? 1 : Math.min(5, Math.max(1, n)); }
    case 'shadow': {
      const out = {};
      if (v && typeof v === 'object') {
        Object.keys(v).forEach(function (k) {
          const n = parseInt(k, 10);
          if (!isNaN(n) && n >= 0 && n < PHRASES.length) out[n] = text_(v[k], 1000);
        });
      }
      return out;
    }
    case 'partStarted': {
      const out = {};
      if (v && typeof v === 'object') {
        Object.keys(v).forEach(function (k) { out[k] = text_(v[k], 40); });
      }
      return out;
    }
    case 'submittedAt': return text_(v, 40);
    default: return text_(v, TEXT_MAX[key] || 2000);
  }
}

/* ------------------------------------------------------------------ API used by Index.html */

function startGroup(info, key) {
  const s = requireUser_(key);
  info = info || {};
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const now = new Date().toISOString();
    const state = {
      groupId: Utilities.getUuid().replace(/-/g, '').slice(0, 10),
      createdAt: now, updatedAt: now,
      email: s.email, lastEditor: s.email,
      groupName: sanitize_('groupName', info.groupName),
      room: sanitize_('room', info.room),
      members: sanitize_('members', info.members),
      part: 1, submittedAt: '',
      six: [], three: [], pitch: '', shadow: {},
      unique: '', essential: '', aspirational: '', missing: '',
      partStarted: { 1: now }
    };
    writeGroup_(state, null);
    log_(s.email, state.groupId, 'start', state.groupName + ' / ' + state.room);
    return state;
  } finally {
    lock.releaseLock();
  }
}

function saveGroup(groupId, patch, key) {
  const s = requireUser_(key);
  patch = patch || {};
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const cur = readGroups_().filter(function (g) { return g.groupId === groupId; })[0];
    if (!cur) throw new Error('That group was not found. Please start a new group.');
    const row = cur._row;
    delete cur._row;
    EDITABLE.forEach(function (k) {
      if (patch[k] !== undefined) cur[k] = sanitize_(k, patch[k]);
    });
    cur.updatedAt = new Date().toISOString();
    cur.lastEditor = s.email;
    writeGroup_(cur, row);
    log_(s.email, groupId, text_(patch.event || 'save', 40), 'part ' + cur.part);
    return { updatedAt: cur.updatedAt };
  } finally {
    lock.releaseLock();
  }
}

function getGroup(groupId, key) {
  requireUser_(key);
  const g = readGroups_().filter(function (x) { return x.groupId === groupId; })[0];
  if (!g) return null;
  delete g._row;
  return g;
}

function listOpenGroups(key) {
  requireUser_(key);
  return readGroups_()
    .filter(function (g) { return !g.submittedAt; })
    .map(function (g) {
      return { groupId: g.groupId, groupName: g.groupName, room: g.room, part: g.part, updatedAt: g.updatedAt };
    });
}

/* ------------------------------------------------------------------ API used by Board.html */

function getBoard(key) {
  requireUser_(key);
  const groups = readGroups_().map(function (g) { delete g._row; return g; });
  return { groups: groups, phrases: PHRASES, sheetUrl: getSpreadsheet_().getUrl(), now: new Date().toISOString() };
}
