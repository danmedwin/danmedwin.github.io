// The guides' script for Mountain Tefillah. Edit in any text editor, save, reload the page.
// A guide says these lines while we walk; the prayer text comes up on the next click.
// A plain line is always used. { if: "id", t: "..." } is used only when that prayer is ticked in the control panel.
// Prayer ids: opening rocks modeh mahtovu asher elohai laasok eilu psalm150 barchu yotzeir shma vahavta
//             michamocha avot gvurot kedushah silent oseh conversation dvar aleinu kaddish announcements song closing
window.SCRIPT = {
  // On the title card, before the first click.
  start: [
    "Every morning our tefillah has a shape. It warms up, it climbs, it reaches a high point, and it brings us back. Today we get to see that shape.",
    "The prayers are the ones in our siddur. The mountain is our kavanah (intention). Each place we stop tells us something about the prayer we pray there.",
    "We begin at the bottom, before sunrise. Keep an eye on the light, and on the map in the corner.",
    "When a guide is speaking, we listen. When the words come up, we pray.",
    { if: "opening", t: "It is dark in these woods, and nobody hikes in the dark alone. Our opening readings say the same thing." }
  ],

  // Said while we walk to each stop.
  stops: {
    cairn: [
      "Up ahead is a pile of stones beside the trail. Hikers call it a cairn.",
      "A cairn tells you two things. You are on the right path, and someone was here before you.",
      "Each hiker who passes adds one stone. Nobody builds a cairn alone, and nobody builds it in one day.",
      "We add today to the pile. Let's count."
    ],
    tents: [
      "Look ahead: there are lights on in those tents. People are waking up.",
      { if: "modeh", t: "The first words a Jew says in the morning are Modeh Ani, \"I give thanks.\" We say thank you before we do anything else." },
      { if: "mahtovu", t: "Mah Tovu means \"How good are your tents.\" Those words were first said by someone looking at the camp of Israel from a distance, the way we are looking at this one." },
      { if: "asher", t: "Asher Yatzar thanks God for a body that works. We slept all night, and this morning everything opened and closed the way it should." },
      { if: "elohai", t: "It is cold enough to see your breath. Elohai N'shamah says the soul God breathed into us is pure, and every morning we get it back that way." }
    ],
    garden: [                       // the stone garden is under construction; for now this is a clearing beside the trail
      "Before the climb gets steep, we stop in a clearing to pack what we will need.",
      { if: "laasok", t: "Our blessing here is for Torah study. The word la'asok means to be busy with something, to work at it." },
      { if: "eilu", t: "Eilu D'varim is a list of ten things we can never do too much of: honoring parents, welcoming guests, visiting the sick, making peace, and more." },
      { if: "eilu", t: "The last one is the study of Torah. The prayer says it is equal to all the others, because it leads to all the others." },
      { if: "eilu", t: "Pick one that is yours to work on today." }
    ],
    climb: [
      "Now the trail gets steeper. This is the part of a hike where you start to feel it.",
      "Hikers sing to keep each other going. Our psalm says to praise God with every instrument there is: horn, harp, drum, and cymbals.",
      "Its last line says that everything that breathes can praise God. On a climb like this, breathing counts.",
      "See the two lights up ahead? That is where we are headed. Let's sing our way there."
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
      "In the middle of the prayer is a line of pure amazement: Mah rabu ma'asecha, \"How many are the things You have made!\"",
      "As the light comes up, look for how many things you can see now that you could not see before."
    ],
    overlook: [
      "Now there is enough light to see, and we are high enough to see far.",
      "Down in the woods, everything looked separate: this tree, that rock, the next turn in the trail. From up here it is all one mountain.",
      { if: "shma", t: "The Sh'ma says that God is one. It begins with the word \"listen,\" so before we say it, we get quiet." },
      { if: "vahavta", t: "The V'ahavta tells us to carry these words everywhere, at home and when we walk on the way. Today we are on the way." }
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
      { if: "aleinu", t: "Aleinu means \"it is upon us.\" Look at the valley below: that is the world we are going back to, and repairing it is our job." }
    ],
    stones: [
      "Beside the trail are small piles of stones, like the cairn we passed on the way up.",
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

  // At the summit the view turns before each part of the Amidah. These lines are in the printed script only:
  // on screen there is no pause, so a guide says them before clicking on from the prayer before.
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

  // After the last slide.
  end: [
    "Thank you to our guides.",
    "We climbed in the dark, watched the sun come up, crossed a narrow bridge, stood at the top, and came back down. We do that every morning. Today we could see it.",
    "Tomorrow there is no mountain on the screen. The climb is still there in the prayers.",
    "One thing to carry with you: at which stop did a prayer feel different to you today?"
  ]
};
