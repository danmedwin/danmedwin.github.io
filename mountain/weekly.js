// The parts of Mountain Tefillah that change week to week. Edit in any text editor, save, reload the page.
window.WEEKLY = {
  title: "Tefillah on the Mountain",
  line1: "",                         // e.g. the Hebrew date
  line2: "",                         // e.g. the parashah
  conversation: [                    // one line per prompt
    "What did you notice on the way up?",
    "What will you carry back down?"
  ],
  dvarTorah: "",                     // who is giving it (leave empty for none)
  song: "",                          // the closing song's name (a placeholder slide until its words are added)
  closing: "Have a great day!",

  // Leaders and notes shared through a Google Sheet (school sign-in). Leave out, or empty, to keep names on each computer only.
  // clientId: the "OAuth client ID" of the Mountain Tefillah project in the school's Google Cloud Console (Internal, so only school accounts can sign in).
  // id: the long part of the Sheet's address, between /d/ and /edit.
  sheet: {
    clientId: "41018332882-m6avctv7lo5um1ua921i5scb43jckufh.apps.googleusercontent.com",
    id: "1WSMKRYjcWDcSiECtVL--1rB45e4g4qYImFpMGa1alAU"
  }
};
