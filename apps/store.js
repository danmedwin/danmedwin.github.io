/* Shared data layer for the apps directory.
 *
 * Two interchangeable back ends behind one interface:
 *   mock     - localStorage, so the page is fully clickable before Firebase exists
 *   firebase - Realtime Database + email/password auth
 *
 * Flip USE_FIREBASE once the project is created and CONFIG is filled in.
 */
const USE_FIREBASE = true;

/* Firebase web config is public by design. It identifies the project, it does
 * not grant access. Everything is gated by database.rules.json plus auth. */
const CONFIG = {
  apiKey: "AIzaSyDVNSnYB8KVNFD-4DkQ3oQqsoV_DBcEzSM",
  authDomain: "tech-rabbi-apps.firebaseapp.com",
  databaseURL: "https://tech-rabbi-apps-default-rtdb.firebaseio.com",
  projectId: "tech-rabbi-apps",
  storageBucket: "tech-rabbi-apps.firebasestorage.app",
  messagingSenderId: "352405899450",
  appId: "1:352405899450:web:6d9ca77145302212b15a83",
};

/* Fields where an empty string means "deliberately blank", not "unset". */
const KEEP_EMPTY = new Set(["note"]);

const LS_OVERRIDES = "techrabbi.apps.overrides";
const LS_ADMIN = "techrabbi.apps.admin";

function emit(listeners, value) {
  listeners.forEach((fn) => {
    try { fn(value); } catch (err) { console.error(err); }
  });
}

/* ---------------------------------------------------------------- mock ---- */

function mockStore() {
  const dataListeners = new Set();
  const authListeners = new Set();
  const read = () => {
    try { return JSON.parse(localStorage.getItem(LS_OVERRIDES)) || {}; }
    catch { return {}; }
  };
  const write = (obj) => {
    localStorage.setItem(LS_OVERRIDES, JSON.stringify(obj));
    emit(dataListeners, obj);
  };

  // Another tab edited things: keep this one in step.
  window.addEventListener("storage", (e) => {
    if (e.key === LS_OVERRIDES) emit(dataListeners, read());
    if (e.key === LS_ADMIN) emit(authListeners, currentUser());
  });

  const currentUser = () => {
    const v = localStorage.getItem(LS_ADMIN);
    return v ? { email: v } : null;
  };

  return {
    mode: "mock",
    async init() { return read(); },
    overrides: read,
    onData(fn) { dataListeners.add(fn); fn(read()); return () => dataListeners.delete(fn); },
    async save(id, patch) {
      const all = read();
      const next = { ...(all[id] || {}), ...patch };
      Object.keys(next).forEach((k) => {
        const v = next[k];
        if (v === "" && KEEP_EMPTY.has(k)) return;   // an explicit "no note" is a choice
        if (v === null || v === undefined || v === "" || (Array.isArray(v) && !v.length)) delete next[k];
      });
      if (Object.keys(next).length) all[id] = next; else delete all[id];
      write(all);
    },
    async saveMany(map) {
      const all = read();
      Object.entries(map).forEach(([id, patch]) => {
        all[id] = { ...(all[id] || {}), ...patch };
      });
      write(all);
    },
    async reset() { write({}); },
    onAuth(fn) { authListeners.add(fn); fn(currentUser()); return () => authListeners.delete(fn); },
    user: currentUser,
    async signIn(email) {
      localStorage.setItem(LS_ADMIN, email || "demo@techrabbi.org");
      emit(authListeners, currentUser());
    },
    async signOut() {
      localStorage.removeItem(LS_ADMIN);
      emit(authListeners, null);
    },
  };
}

/* ------------------------------------------------------------ firebase ---- */

async function firebaseStore() {
  const [{ initializeApp }, auth, db] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"),
  ]);

  const app = initializeApp(CONFIG);
  const authRef = auth.getAuth(app);
  const dbRef = db.getDatabase(app);
  const root = db.ref(dbRef, "apps");

  let cache = {};
  const dataListeners = new Set();
  db.onValue(root, (snap) => {
    cache = snap.val() || {};
    emit(dataListeners, cache);
  }, (err) => {
    // Almost always means database.rules.json has not been published yet.
    // The catalog still renders from apps.json, just without any admin edits.
    console.error(
      "Could not read /apps from Firebase (" + err.code + "). " +
      "Publish apps/database.rules.json in the Realtime Database Rules tab.",
    );
    emit(dataListeners, cache);
  });

  return {
    mode: "firebase",
    async init() { return cache; },
    overrides: () => cache,
    onData(fn) { dataListeners.add(fn); fn(cache); return () => dataListeners.delete(fn); },
    async save(id, patch) {
      const next = { ...(cache[id] || {}), ...patch };
      Object.keys(next).forEach((k) => {
        const v = next[k];
        if (v === "" && KEEP_EMPTY.has(k)) return;   // an explicit "no note" is a choice
        if (v === null || v === undefined || v === "" || (Array.isArray(v) && !v.length)) delete next[k];
      });
      await db.set(db.ref(dbRef, "apps/" + id), Object.keys(next).length ? next : null);
    },
    async saveMany(map) {
      const updates = {};
      Object.entries(map).forEach(([id, patch]) => {
        Object.entries(patch).forEach(([k, v]) => { updates[`${id}/${k}`] = v; });
      });
      await db.update(root, updates);
    },
    async reset() { await db.set(root, null); },
    onAuth(fn) { return auth.onAuthStateChanged(authRef, fn); },
    user: () => authRef.currentUser,
    async signIn(email, password) {
      await auth.signInWithEmailAndPassword(authRef, email, password);
    },
    async signOut() { await auth.signOut(authRef); },
  };
}

/* ------------------------------------------------------------- offline ---- */

/* Firebase lives on a CDN, so a captive portal, a blocked host, or plane wifi
 * can leave the import hanging. Rather than stall the page behind it, fall
 * back to this: the committed catalog renders, admin edits are unavailable,
 * and both pages say so. */
function offlineStore(reason) {
  console.warn('Apps directory is running offline: ' + reason);
  return {
    mode: 'offline',
    reason,
    async init() { return {}; },
    overrides: () => ({}),
    onData(fn) { fn({}); return () => {}; },
    async save() { throw new Error('offline'); },
    async saveMany() { throw new Error('offline'); },
    async reset() { throw new Error('offline'); },
    onAuth(fn) { fn(null); return () => {}; },
    user: () => null,
    async signIn() {
      const err = new Error('Cannot reach Firebase. Check the connection and reload.');
      err.code = 'app/offline';
      throw err;
    },
    async signOut() {},
  };
}

const SDK_TIMEOUT_MS = 10000;

function withFallback(promise) {
  const timeout = new Promise((resolve) =>
    setTimeout(() => resolve(offlineStore('Firebase did not load within ' + (SDK_TIMEOUT_MS / 1000) + 's')),
      SDK_TIMEOUT_MS));
  return Promise.race([
    promise.catch((err) => offlineStore(err.message || String(err))),
    timeout,
  ]);
}

export const storeReady = USE_FIREBASE
  ? withFallback(firebaseStore())
  : Promise.resolve(mockStore());

/* Merge the committed catalog with whatever admin has changed. */
export function merge(catalog, overrides) {
  return catalog.apps.map((app, i) => {
    const o = overrides[app.id] || {};
    return {
      ...app,
      ...o,
      labels: o.labels || app.labels || [],
      hidden: o.hidden !== undefined ? o.hidden : !!app.hidden,
      order: o.order !== undefined ? o.order : i,
      // Reordering touches every entry, so it should not flag them all as edited.
      edited: Object.keys(o).some((k) => k !== 'order'),
    };
  }).sort((a, b) => a.order - b.order);
}
