// Mountain Tefillah presets: services that come with the page, picked from the Preset menu at the top of the Prayer List.
// Each has its own address, so a bookmark opens straight into it:  .../mountain/?mk
// A preset names only what it changes; everything else (views, text edits, script box places) is as defaults.js has it.
//   label   the name in the menu, and under the title on the opening screen
//   only    the prayers that are ticked, by id (the ids are listed in build.py's MANIFEST); every other prayer is unticked
//   mel     the melody or version for a prayer, by its key in build.py's MELODIES ("first" = First line only)
//   script  false = the guide's script starts off
//   walkPace  how briskly we walk between stops: 10 is the planned pace (and what a preset has if it does not say); a higher number
//           is quicker, a lower one slower (Walking pace, in the Prayer List)
//   autoText  true = at the end of a walk the stop's first prayer comes up by itself, with no click (Text on arrival, in the Prayer List)
//   start   the stop the service opens at and walks on from, though nothing is prayed there
//   visit   stops we stop at though no prayer is ticked there: { cairn: true }. Nothing comes up on screen; the leader speaks, and a
//           click walks on. (The pill on a stop's row in the Prayer List. The stop names are in build.py's MANIFEST.)
//   moves   a prayer's move turned off: { shma: false };  moveAll: false turns every move off
//   sheet   false = led without the school Google Sheet (no names to share; the ticks and readings stay as the preset has them)
// Also allowed, as in a saved design: sel, langs, off, lines, guide, views, text, notes.
//   base    true = this is the service at the plain address (.../mountain/), defaults.js just as it is. It only names that service;
//           to change what it holds, change defaults.js. One preset has it.
window.PRESETS = {
  ms: {
    label: "Middle School",
    base: true
  },
  mk: {
    label: "Mechina & Kindergarten",
    only: ["mahtovu", "elohai", "barchu", "shma", "michamocha", "sfatai", "avot", "silent", "oseh", "dvar", "song", "closing"],
    mel: { avot: "first", song: "chaverim" },
    script: false,
    autoText: true,
    start: "woods",
    visit: { cairn: true },
    sheet: false
  },
  // 5th grade (11/18/2026): every prayer on the trail in its traditional setting, and every reading of the guide's script on, including the
  // four the Middle School defaults turn off. A starting point for Dan to trim. Left out: the Conversation, and La'asok and Eilu D'varim
  // (the stone garden stop is hidden in every service until it is built: HIDDEN_STOPS in index.html).
  "5th": {
    label: "5th Grade",
    only: ["opening", "rocks", "modeh", "mahtovu", "asher", "elohai", "psalm150", "barchu", "yotzeir", "shma", "vahavta",
           "michamocha", "sfatai", "avot", "gvurot", "kedushah", "silent", "oseh", "dvar", "aleinu", "kaddish", "announcements", "song", "closing"],
    mel: { modeh: "trad", mahtovu: "trad", asher: "trad", elohai: "trad", psalm150: "trad", barchu: "trad", yotzeir: "trad",
           vahavta: "trad", michamocha: "trad", avot: "trad", oseh: "trad", song: "trad" },
    script: true,
    off: { "turn:gvurot": false, "turn:kedushah": false, "pop:shma": false, "pop:vahavta": false },
    sheet: false
  }
};
