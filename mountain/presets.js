// Mountain Tefillah presets: services that come with the page, picked from the Preset menu at the top of the Prayer List.
// Each has its own address, so a bookmark opens straight into it:  .../mountain/?mk
// A preset names only what it changes; everything else (views, text edits, script box places) is as defaults.js has it.
//   label   the name in the menu, and under the title on the opening screen
//   only    the prayers that are ticked, by id (the ids are listed in build.py's MANIFEST); every other prayer is unticked
//   mel     the melody or version for a prayer, by its key in build.py's MELODIES ("first" = First line only)
//   script  false = the guide's script starts off
//   pace    how long the walks take against the planned time: 2 = twice as long (Walk time, in the Prayer List)
//   autoText  true = at the end of a walk the stop's first prayer comes up by itself, with no click (Text on arrival, in the Prayer List)
//   start   the stop the service opens at and walks on from, though nothing is prayed there
//   moves   a prayer's move turned off: { shma: false };  moveAll: false turns every move off
//   sheet   false = led without the school Google Sheet (no names to share)
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
    only: ["mahtovu", "elohai", "barchu", "shma", "michamocha", "sfatai", "avot", "silent", "oseh", "song", "closing"],
    mel: { avot: "first" },
    script: false,
    pace: 2,
    autoText: true,
    start: "woods",
    sheet: false
  }
};
