// The guides' script for Mountain Tefillah. Edit in any text editor, save, reload the page.
// A guide says these lines while we walk; the prayer text comes up on the next click.
// A plain line is always used. { if: "id", t: "..." } is used only when that prayer is ticked in the control panel.
// Prayer ids: opening rocks modeh mahtovu asher elohai laasok eilu psalm150 barchu yotzeir shma vahavta
//             michamocha sfatai avot gvurot kedushah silent oseh conversation dvar aleinu kaddish announcements song closing
window.SCRIPT = {
  // On the title card, before the first click.
  start: [
    "Our tefillah practice is supposed to bring us on a spiritual adventure. When it works well, we are different people on the other side, with a different perspective or insight.",
    "It has been taught that our tefillah experience can be thought of as a hike up a mountain. We start off slow and warm up.",
    "Our momentum and energy builds as we reach the real beginning of the climb, the Barchu.",
    "The ancient words guide us along this well worn path, that we can see anew each time.",
    "Before each of our prayers on our journey, a guide will share some insight or perspective."
  ],

  // Said while we walk to each stop.
  stops: {
    cairn: [                        // a line that starts with "– " is shown as a sub-point under the line before it
      "Up ahead is a pile of stones beside the trail that tells you two things:",
      "– You are on the right path.",
      "– Others have been here before you.",
      "Each hiker that passes may add a stone. It is always in process and involves others you do not know.",
      "Let's add our stone to the pile, through our counting."
    ],
    tents: [
      "Looks like there are lights on in those tents up ahead. People are waking up.",
      "The first prayers of the morning help us get warmed up. They help us be present to this time and place before us."
    ],
    garden: [                       // the stone garden is under construction; for now this is a clearing beside the trail
      "Before the climb gets steep, we stop in a clearing to pack what we will need.",
      { if: "laasok", t: "Our blessing here is for Torah study. The word la'asok means to be busy with something, to work at it." },
      { if: "eilu", t: "Eilu D'varim is a list of ten things we can never do too much of: honoring parents, welcoming guests, visiting the sick, making peace, and more." },
      { if: "eilu", t: "The last one is the study of Torah. The prayer says it is equal to all the others, because it leads to all the others." },
      { if: "eilu", t: "Pick one that is yours to work on today." }
    ],
    climb: [
      "The trail is starting to get steeper and our prayer has momentum.",
      "Kol Hanshama teaches that each breath is an act of prayer, bringing us closer to God.",
      "Halleluyah lists instruments we can use: horn, harp, drum, and cymbals."
    ],
    gate: [
      "Everything so far has been the warm-up. We said thank you, we woke up, and we got moving.",
      "Now there is a gate across the trail. On the other side, the main part of our service begins.",
      "The Bar'chu is the call to prayer. The leader asks, \"Are you ready?\" and the community answers together.",
      "Please rise. We go through this gate together."
    ],
    ridge: [
      "We are through the gate and out of the trees. Look east. The sky is starting to change.",
      "Yotzeir Or thanks God for creating light, and for making the world new every single day.",
      "In the middle of the prayer is a line of pure amazement: Mah rabu ma'asecha, \"How great are the things You have made!\"",
      "As the light comes up, look for how many things you can see now that you could not see before."
    ],
    overlook: [
      "Now there is enough light to see, and we are high enough to see far.",
      "Down in the woods, everything looked separate: this tree, that rock, the next turn in the trail. From up here it is all one mountain."
    ],
    bridge: [
      "The trail ends at a deep canyon. The only way across is a narrow bridge, and the wind is blowing.",
      "Look at the spray rising on both sides. Our ancestors stood in a place like this, with the sea in front of them and Egypt behind them.",
      "They walked through with walls of water on their right and on their left. On the far side they sang Mi Chamochah: \"Who is like You?\"",
      "Rabbi Nachman taught that the whole world is a very narrow bridge, and the most important thing is not to be afraid.",
      "We sing as we cross."
    ],
    summit: [
      "This is the top. Everything we have done this morning was the way up to here.",
      "In our service this is the Amidah, the standing prayer. At the top of a mountain you can look in every direction, and so will we.",
      { if: "avot", t: "First we look back the way we came. Far below are the woods where we started." },
      { if: "avot", t: "Avot v'Imahot names our ancestors: Abraham and Sarah, Isaac and Rebecca, Jacob, Rachel, and Leah. They walked this trail before us, and we are standing here because they did." },
      "Please rise."
    ],
    shoulder: [
      "Nobody lives on a summit. The view matters because of what we do with it when we go back down.",
      "Moses climbed a mountain too, and the most important part was what he carried down to the people.",
      { if: "dvar", t: "Partway down, we stop to think about what we learned up there. That is what a d'var Torah is for." },
    ],
    lower: [
      "We keep going down. The valley is closer now.",
      "Aleinu means \"it is upon us.\" Look at the valley below: that is the world we are going back to, and repairing it is our job."
    ],
    stones: [
      "Beside the trail are small piles of stones, like the pile we passed on the way up.",
      "When Jews visit a grave, we leave a stone. A stone does not fade, and it says, \"Someone was here, and someone remembers.\"",
      "The Mourner's Kaddish does not mention death at all. It praises God, and we say it together so that no one who is remembering has to stand alone.",
      "If you are remembering someone, please rise. The rest of us will answer \"Amen.\""
    ],
    trailhead: [
      "Do you recognize this place? We are almost back where we started.",
      "This morning it was dark, and we could only see a few steps ahead. Now we can see all of it.",
      "The woods are the same. The light is different, and so are we.",
      "That is what tefillah is for. We come back to the same day we were going to have anyway, and we see it better."
    ]
  },

  // At the summit the view turns before each part of the Amidah. With the script on screen, the view turns and waits
  // for a click while a guide says these lines. With it off, the next prayer's text comes up by itself.
  // A card can also be turned off by itself ("Off" on its box; back on from the Prayer List). G'vurot and K'dushah start off: the view still turns.
  turns: {
    gvurot: [
      "Now we turn and look down at the last stretch of the climb, and the bridge we crossed.",
      "That was hard, and we got through it. G'vurot is the prayer about strength.",
      "It says God lifts up those who fall, heals the sick, and frees those who are stuck. Strength, in this prayer, is what you use to help someone else up."
    ],
    kedushah: [
      "Now we look up.",
      "K'dushah means holiness. The prophet Isaiah heard the angels calling to one another: \"Kadosh, kadosh, kadosh,\" holy, holy, holy.",
      "Each time we say \"kadosh,\" we rise up on our toes and reach a little higher."
    ],
    silent: [
      "Find the view you like best and stay with it.",
      "There are no words on the screen for this one. The words are yours: a thank you, a hope, something you are carrying, or just the view."
    ],
    oseh: [
      "Our prayer for peace begins Oseh shalom bimromav: \"May the One who makes peace in the high places.\"",
      "We are standing in a high place. The prayer asks for that peace to come down to us and to everyone.",
      "So as we sing, we take our first steps down, and we bring it with us."
    ]
  },

  // Pop-ups: a note that comes up beside one prayer's text (with its first slide) when the script is on screen.
  // Any prayer can have one: add its id here. The note has its own box, which can be dragged like the others.
  // Notes under "pops" that are there to be seen, not read aloud: they get no reader.
  quiet: ["shma", "vahavta"],

  pops: {
    modeh: [
      "The first words we traditionally say in the morning are Modeh (or Modah) ani. \"I give thanks.\"",
      "We say thank you and appreciate our lives before we do anything else."
    ],
    mahtovu: [
      "Mah Tovu means \"How good are your tents.\"",
      "These words were first said looking out over the Israelite camp from a distance."
    ],
    asher: ["Asher Yatzar thanks God for a body that works. We slept all night, and this morning everything opened and closed the way it should."],
    shma: ["The Sh'ma says that God is one. It begins with the word \"listen,\" so before we say it, we get quiet."],
    vahavta: ["The V'ahavta tells us to carry these words everywhere, at home and when we walk on the way. Today we are on the way."],
    elohai: [
      "When it's cold outside in the morning, you can see your breath.",
      "Elohai N'shamah thanks God for breathing into us a pure soul, and returning it to us each and every morning."
    ]
  },

  // After the last slide.
  end: [
    "Thank you to our guides.",
    "We climbed in the dark, watched the sun come up, crossed a narrow bridge, stood at the top, and came back down. We do that every morning. Today we could see it.",
    "Tomorrow there is no mountain on the screen. The climb is still there in the prayers.",
    "One thing to carry with you: at which stop did a prayer feel different to you today?"
  ]
};
