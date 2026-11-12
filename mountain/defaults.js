// Mountain Tefillah design: prayer choices, camera views and script box places.
// Open it from the Prayer List (folder icon). A file named defaults.js next to index.html is what every computer starts from.
window.DEFAULTS = {
  "name": "default",
  "sel": {
    "elohai": true
  },
  "text": {
    "s-opening-1": "<div class=\"box h-he he\">קְרִיאָה</div><div class=\"box h-en\"><span style=\"font-weight:700\">Opening Reading</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">All I have to offer in prayer is myself.<br><br><span class=\"hw\" style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Sometimes I cannot find the ‎רוּחַ‎ to pray alone.</span></div><div class=\"box dots\">●○○○○○○</div>",
    "s-opening-2": "<div class=\"box h-he he\">קְרִיאָה</div><div class=\"box h-en\"><span style=\"font-weight:700\">Opening Reading</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">As two people walking together through a dark wood <br>feel stronger and braver for each other’s presence,<br><br><span class=\"hw\" style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; so I find spiritual strength in communal ‎תְּפִלָּה‎.</span></div><div class=\"box dots\">○●○○○○○</div>",
    "s-opening-3": "<div class=\"box h-he he\">קְרִיאָה</div><div class=\"box h-en\"><span style=\"font-weight:700\">Opening Reading</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">We want to stand here, ready in body and mind, <br>to take upon ourselves the mitzvah, <br>“You shall love your fellow human being as yourself.” <br><br><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; We want to take upon ourselves the mitzvah, </span><br><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; “You shall not separate yourself from the community.” </span></div><div class=\"box dots\">○○●○○○○</div>",
    "s-opening-4": "<div class=\"box h-he he\">קְרִיאָה</div><div class=\"box h-en\"><span style=\"font-weight:700\">Opening Reading</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">I enter ‎<span class=\"hw\" style=\"font-size:calc(var(--pt)*48)\">תְּפִלָּה</span>‎ as an individual, <br>but I become a part of a ‎<span class=\"hw\" style=\"font-size:calc(var(--pt)*48)\">קְהִלָּה</span>‎ ‎<span class=\"hw\" style=\"font-size:calc(var(--pt)*48)\">קְדוֹשָׁה</span>‎.<br><br><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; As a ‎</span><span class=\"hw\" style=\"font-size:calc(var(--pt)*48);font-style:italic;font-weight:700\">קְהִלָּה</span><span style=\"font-style:italic;font-weight:700\">‎ ‎</span><span class=\"hw\" style=\"font-size:calc(var(--pt)*48);font-style:italic;font-weight:700\">קְדוֹשָׁה</span><span style=\"font-style:italic;font-weight:700\">‎</span><span style=\"font-style:italic;font-weight:700\">, we will be&nbsp;</span><span style=\"font-style:italic;font-weight:700\">a welcoming<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; and friendly place, f</span><span style=\"font-style:italic;font-weight:700\">illed with enthusiastic song </span><br><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; and intentional silence.</span></div><div class=\"box dots\">○○○●○○○</div>",
    "s-opening-5": "<div class=\"box h-he he\">קְרִיאָה</div><div class=\"box h-en\"><span style=\"font-weight:700\">Opening Reading</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">May our communal ‎<span class=\"hw\" style=\"font-size:calc(var(--pt)*48)\">תְּפִלָּה</span>‎<br>illuminate all that is awesome <br>within and around us.<br><br><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; May our communal ‎</span><span class=\"hw\" style=\"font-size:calc(var(--pt)*48);font-style:italic;font-weight:700\">תְּפִלָּה</span><span style=\"font-style:italic;font-weight:700\">‎ <br></span><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; strengthen the ties <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; that bind us together.</span></div><div class=\"box dots\">○○○○●○○</div>",
    "s-opening-6": "<div class=\"box h-he he\">קְרִיאָה</div><div class=\"box h-en\"><span style=\"font-weight:700\">Opening Reading</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Let us rejoice together in times of joy.<br><br><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Let us support one another <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; in times of sorrow.</span></div><div class=\"box dots\">○○○○○●○</div>",
    "s-opening-7": "<div class=\"box h-he he\">קְרִיאָה</div><div class=\"box h-en\"><span style=\"font-weight:700\">Opening Reading</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Help us find holiness in our lives and wholeness in our world.<br><br><span style=\"font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; And may our ‎</span><span class=\"hw\" style=\"font-size:calc(var(--pt)*48);font-style:italic;font-weight:700\">תְּפִלָּה</span><span style=\"font-style:italic;font-weight:700\">‎&nbsp;</span><span style=\"font-style:italic;font-weight:700\">demonstrate ‎<br></span><span class=\"hw\" style=\"font-size:calc(var(--pt)*48);font-style:italic;font-weight:700\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; כָּבוֹד</span><span style=\"font-style:italic;font-weight:700\">‎ </span><span style=\"font-style:italic;font-weight:700\">to ourselves,&nbsp;</span><span style=\"font-style:italic;font-weight:700\">to one another, <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; and to God.</span></div><div class=\"box dots\">○○○○○○●</div>",
    "s-rocks-1": "<div class=\"box h-he he\">אֲבָנִים</div><div class=\"box h-en\"><span style=\"font-weight:700\">Rock Counting</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Limnot yameinu<br>kein hoda,<br>v’navi l’vav chochmah.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">לִמְנוֹת יָמֵינוּ</span><br><span class=\"hw\">כֵּן הוֹדַע,</span><br><span class=\"hw\">וְנָבִא לְבַב חָכְמָה.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*.45);right:calc(var(--in)*.45);text-align:center;top:calc(var(--in)*3.96)\">Teach us to count our days,<br>so that we may acquire a<br>wise and loving heart.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; — Psalm 90:12</div>",
    "s-yotzeir-2": "<div class=\"box h-en\">Yotzeir Or</div><div class=\"box h-he he\">יוֹצֵר אוֹר</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\"><span class=\"hl\">Mah rabu maasecha, Adonai!</span><br><br>Kulam b'chochmah asita,<br>mal'ah haaretz kinyanecha.<br><br>Baruch atah, Adonai,<br>yotzeir ham’orot.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw hl\">מָה רַבּוּ מַעֲשֶׂיךָ יְיָ!</span><br><br><span class=\"hw\">כֻּלָּם בְּחָכְמָה עָשִׂיתָ,</span><div><span class=\"hw\">מָלְאָה הָאָרֶץ קִנְיָנֶךָ.</span></div><div><span class=\"hw\"><br>בָּרוּךְ אַתָּה יְיָ,</span><br><span class=\"hw\">יוֹצֵר הַמְּאוֹרוֹת.</span></div></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.5);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*.85)\">How great are the things You have made, Adonai! In wisdom You made them all; the earth is full of Your creations. Blessed are You, Adonai, Creator of the lights.</div><div class=\"box dots\">○●</div>",
    "s-vahavta-2": "<div class=\"box h-he he\">וְאָהַבְתָּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">V’ahavta</span></div><div class=\"box\" style=\"font-size: calc(var(--pt)*44); line-height: calc(var(--pt)*60); left: calc(var(--in)*0.45); top: calc(var(--in)*1.21);\"><span>V’shinantam l’vanecha</span><br>v’dibarta bam<br>b’shivt’cha b’veitecha<br>uv’lecht’cha vaderech<br><span>uv’shochb’cha uv’kumecha</span>.<br><span>Uk’shartam l’ot al yadecha</span>,<br><span>v’hayu l’totafot bein einecha</span>.<br><span>Uch’tavtam al m’zuzot</span><br><span>beitecha uvisharecha</span>.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">וְשִׁנַּנְתָּם לְבָנֶיךָ</span><br><span class=\"hw\">וְדִבַּרְתָּ בָּם</span><br><span class=\"hw\">בְּשִׁבְתְּךָ בְּבֵיתֶךָ</span><br><span class=\"hw\">וּבְלֶכְתְּךָ בַדֶּרֶךְ</span><br><span class=\"hw\">וּבְשׇׁכְבְּךָ וּבְקוּמֶךָ</span>.<br><span class=\"hw\">וּקְשַׁרְתָּם לְאוֹת עַל־יָדֶךָ</span><br><span class=\"hw\">וְהָיוּ לְטֹטָפֹת בֵּין עֵינֶיךָ</span>.<br><span class=\"hw\">וּכְתַבְתָּם עַל־מְזֻזוֹת</span><br><span class=\"hw\">בֵּיתֶךָ וּבִשְׁעָרֶיךָ</span>.</div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*.85)\">Repeat them to your children and speak them when you sit at home and when you walk on the street, when you lie down and when you get up. Tie them as a sign on your hand, and let them be a symbol between your eyes. Write them on the doorposts of your house and on your gates.</div><div class=\"box dots\">○●○</div>",
    "s-vahavta-1": "<div class=\"box h-he he\">וְאָהַבְתָּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">V’ahavta</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">V’ahavta et Adonai Elohecha<br>b’chol l’vav’cha,<br>uv’chol nafsh’cha,<br>uv’chol m’odecha.<br>V’hayu had’varim ha-eileh<br>asher anochi m’tzav’cha hayom<br>al l’vavecha.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\" style=\"\">וְאָהַבְתָּ אֵת יְיָ אֱלֹהֶיךָ</span><br><span class=\"hw\">בְּכׇל־לְבָבְךָ</span><br><span class=\"hw\">וּבְכׇל־נַפְשְׁךָ</span><br><span class=\"hw\">וּבְכׇל־מְאֹדֶךָ.</span><br><span class=\"hw\">וְהָיוּ הַדְּבָרִים הָאֵלֶּה</span><br><span class=\"hw\">אֲשֶׁר אָנֹכִי מְצַוְּךָ הַיּוֹם</span><br><span class=\"hw\">עַל־לְבָבֶךָ.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*.85)\">You shall love Adonai your God with all your heart, with all your soul, and with all your might. Place the words I command you today on your heart.</div><div class=\"box dots\">●○○</div>"
  },
  "script": false,
  "guide": {
    "start": {
      "x": 7.4,
      "y": 5.31,
      "w": 12.2,
      "fs": 25,
      "yb": 10.4
    },
    "stop:cairn": {
      "x": 7.4,
      "y": 5.95,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:tents": {
      "x": 7.4,
      "y": 2.7,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:climb": {
      "x": 7.4,
      "y": 4.58,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:gate": {
      "x": 7.4,
      "y": 5.62,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:ridge": {
      "x": 7.4,
      "y": 5.08,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:overlook": {
      "x": 7.4,
      "y": 4.62,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:bridge": {
      "x": 7.4,
      "y": 3.47,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:summit": {
      "x": 7.4,
      "y": 3.98,
      "w": 12.2,
      "fs": 30,
      "yb": 10.4
    },
    "stop:shoulder": {
      "x": 7.4,
      "y": 4.6,
      "yb": 10.4,
      "w": 12.2,
      "fs": 30
    },
    "stop:stones": {
      "x": 7.36,
      "y": 0.39,
      "w": 12.2,
      "fs": 30
    },
    "stop:trailhead": {
      "x": 0.43,
      "y": 0.41,
      "w": 12.2,
      "fs": 30
    },
    "stop:lower": {
      "x": 7.36,
      "y": 0.39,
      "w": 12.2,
      "fs": 30
    },
    "pop:shma": {
      "x": 4.5,
      "y": 7.29,
      "w": 11,
      "fs": 24
    }
  },
  "views": {
    "tents/modeh": {
      "y": 0.457,
      "p": 0.211,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "tents/asher": {
      "y": 0.618,
      "p": -0.241,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "tents/elohai": {
      "y": 0.645,
      "p": 0.231,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "climb/psalm150": {
      "y": 1.156,
      "p": -0.041,
      "z": 1,
      "dx": -0.023,
      "dz": 0.147,
      "dh": 0
    },
    "ridge/yotzeir": {
      "y": -0.43,
      "p": -0.19,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "overlook/shma": {
      "y": -0.006,
      "p": 0.014,
      "z": 1.027,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "overlook/vahavta": {
      "y": 0.051,
      "p": -0.455,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "bridge/michamocha": {
      "y": 0.097,
      "p": 0.013,
      "z": 0.931,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "summit/avot": {
      "y": -1.494,
      "p": 0.094,
      "z": 1,
      "dx": -8.103,
      "dz": 53.379,
      "dh": 0
    },
    "summit/gvurot": {
      "y": -0.068,
      "p": 0.035,
      "z": 1,
      "dx": 5.488,
      "dz": 28.453,
      "dh": 0
    },
    "summit/kedushah": {
      "y": 0.594,
      "p": -0.354,
      "z": 1,
      "dx": 2.062,
      "dz": 18.916,
      "dh": 0
    },
    "summit/oseh": {
      "y": 0.001,
      "p": 0.145,
      "z": 1,
      "dx": 7.809,
      "dz": -5.723,
      "dh": 0
    },
    "shoulder/dvar": {
      "y": 0.25,
      "p": -0.296,
      "z": 1,
      "dx": -32.393,
      "dz": 37.266,
      "dh": 0
    },
    "stones/kaddish": {
      "y": 0.038,
      "p": 0.099,
      "z": 1,
      "dx": 9.128,
      "dz": -5.752,
      "dh": 0
    },
    "gate/barchu": {
      "y": -0.001,
      "p": -0.057,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "summit/silent": {
      "y": -0.567,
      "p": 0.091,
      "z": 1,
      "dx": 23.219,
      "dz": 2.107,
      "dh": 0
    },
    "woods/opening": {
      "y": 0.035,
      "p": -0.105,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "summit/sfatai": {
      "y": 0.987,
      "p": 0.718,
      "z": 1,
      "dx": -0.611,
      "dz": 55.844,
      "dh": 0
    },
    "trailhead/announcements": {
      "y": 0.292,
      "p": -0.075,
      "z": 1.05,
      "dx": -1.886,
      "dz": -0.666,
      "dh": 0
    },
    "trailhead/song": {
      "y": 0.906,
      "p": -0.385,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "trailhead/closing": {
      "y": 2.302,
      "p": -0.537,
      "z": 1,
      "dx": 6.055,
      "dz": 3.255,
      "dh": 0
    },
    "lower/aleinu": {
      "y": 0.27,
      "p": 0.016,
      "z": 1,
      "dx": 3.448,
      "dz": 2.659,
      "dh": 0
    }
  }
};
