// Mountain Tefillah design: prayer choices, camera views and script box places.
// Open it from the Prayer List (folder icon). A file named defaults.js next to index.html is what every computer starts from.
window.DEFAULTS = {
  "name": "default",
  "sel": {
    "elohai": true
  },
  "mel": {
    "modeh": "cowboy",
    "mahtovu": "morning",
    "barchu": "awake",
    "psalm150": "kolhan",
    "song": "shabbat"
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
    "s-yotzeir-2": "<div class=\"box h-en\">Yotzeir Or</div><div class=\"box h-he he\">יוֹצֵר אוֹר</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\"><span class=\"hl\">Mah rabu maasecha, Adonai!</span><br><br>Kulam b'chochmah asita,<br>mal'ah haaretz kinyanecha.<br><br>Baruch atah, Adonai,<br>yotzeir ham’orot.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw hl\">מָה רַבּוּ מַעֲשֶׂיךָ יְיָ!</span><br><br><span class=\"hw\">כֻּלָּם בְּחָכְמָה עָשִׂיתָ,</span><div><span class=\"hw\">מָלְאָה הָאָרֶץ קִנְיָנֶךָ.</span></div><div><span class=\"hw\"><br>בָּרוּךְ אַתָּה יְיָ,</span><br><span class=\"hw\">יוֹצֵר הַמְּאוֹרוֹת.</span></div></div><div class=\"box\" style=\"font-size: calc(var(--pt)*28); line-height: calc(var(--pt)*33.6); left: calc(var(--in)*0.5); right: calc(var(--in)*0.45); white-space: normal; bottom: calc(var(--in)*1.08);\">How great are the things You have made, Adonai! In wisdom You made them all; <br>the earth is full of Your creations. Blessed are You, Adonai, Creator of the lights.</div><div class=\"box dots\">○●</div>",
    "s-vahavta-2": "<div class=\"box h-he he\">וְאָהַבְתָּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">V’ahavta</span></div><div class=\"box\" style=\"font-size: calc(var(--pt)*44); line-height: calc(var(--pt)*60); left: calc(var(--in)*0.45); top: calc(var(--in)*1.21);\"><span>V’shinantam l’vanecha</span><br>v’dibarta bam<br>b’shivt’cha b’veitecha<br>uv’lecht’cha vaderech<br><span>uv’shochb’cha uv’kumecha</span>.<br><span>Uk’shartam l’ot al yadecha</span>,<br><span>v’hayu l’totafot bein einecha</span>.<br><span>Uch’tavtam al m’zuzot</span><br><span>beitecha uvisharecha</span>.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">וְשִׁנַּנְתָּם לְבָנֶיךָ</span><br><span class=\"hw\">וְדִבַּרְתָּ בָּם</span><br><span class=\"hw\">בְּשִׁבְתְּךָ בְּבֵיתֶךָ</span><br><span class=\"hw\">וּבְלֶכְתְּךָ בַדֶּרֶךְ</span><br><span class=\"hw\">וּבְשׇׁכְבְּךָ וּבְקוּמֶךָ</span>.<br><span class=\"hw\">וּקְשַׁרְתָּם לְאוֹת עַל־יָדֶךָ</span><br><span class=\"hw\">וְהָיוּ לְטֹטָפֹת בֵּין עֵינֶיךָ</span>.<br><span class=\"hw\">וּכְתַבְתָּם עַל־מְזֻזוֹת</span><br><span class=\"hw\">בֵּיתֶךָ וּבִשְׁעָרֶיךָ</span>.</div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*.85)\">Repeat them to your children and speak them when you sit at home and when you walk on the street, <br>when you lie down and when you get up. Tie them as a sign on your hand, and let them be a symbol <br>between your eyes. Write them on the doorposts of your house and on your gates.</div><div class=\"box dots\">○●○</div>",
    "s-vahavta-1": "<div class=\"box h-he he\">וְאָהַבְתָּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">V’ahavta</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">V’ahavta et Adonai Elohecha<br>b’chol l’vav’cha,<br>uv’chol nafsh’cha,<br>uv’chol m’odecha.<br>V’hayu had’varim ha-eileh<br>asher anochi m’tzav’cha hayom<br>al l’vavecha.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\" style=\"\">וְאָהַבְתָּ אֵת יְיָ אֱלֹהֶיךָ</span><br><span class=\"hw\">בְּכׇל־לְבָבְךָ</span><br><span class=\"hw\">וּבְכׇל־נַפְשְׁךָ</span><br><span class=\"hw\">וּבְכׇל־מְאֹדֶךָ.</span><br><span class=\"hw\">וְהָיוּ הַדְּבָרִים הָאֵלֶּה</span><br><span class=\"hw\">אֲשֶׁר אָנֹכִי מְצַוְּךָ הַיּוֹם</span><br><span class=\"hw\">עַל־לְבָבֶךָ.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*.85)\">You shall love Adonai your God with all your heart, with all your soul, and with all your might. <br>Place the words I command you today on your heart.</div><div class=\"box dots\">●○○</div>",
    "s-mahtovu-1": "<div class=\"box h-en\">Mah Tovu</div><div class=\"box h-he he\">מַה טֹּבוּ</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\">Mah tovu ohalecha, Ya’akov,<br>mishk’notecha, Yisrael!</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw\">מַה־טֹּבוּ אֹהָלֶיךָ יַעֲקֹב,</span><br><span class=\"hw\">מִשְׁכְּנֹתֶיךָ יִשְׂרָאֵל!</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.5);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">How good are your tents, O Jacob, <br>your dwelling places, O Israel!</div>",
    "s-asher-1": "<div class=\"box h-he he\">אֲשֶׁר יָצַר</div><div class=\"box h-en\"><span style=\"font-weight:700\">Asher Yatzar</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Baruch atah, Adonai,<br>Eloheinu Melech haolam,<br><br>asher yatzar et ha-adam<br>b’chochmah,<br>uvara vo <br>n’kavim n’kavim,<br>chalulim chalulim.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">בָּרוּךְ אַתָּה יְיָ,</span><br><span class=\"hw\">אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם,</span><br><br><span class=\"hw\">אֲשֶׁר </span><span class=\"hw\">יָצַר אֶת הָאָדָם</span><br><span class=\"hw\">בְּחָכְמָה</span>,<br><span class=\"hw\">וּבָרָא בוֹ </span><br><span class=\"hw\">נְקָבִים נְקָבִים,</span><br><span class=\"hw\">חֲלוּלִים חֲלוּלִים.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">Blessed are You, Adonai our God, Sovereign of the universe, <br>who formed the human body with wisdom, <br>creating within it openings upon openings, hollows upon hollows.</div><div class=\"box dots\">●○</div>",
    "s-psalm150-1": "<div class=\"box h-he he\">הַלְלוּיָהּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">Halleluyah (Psalm 150)</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Hallelu El b’kodsho,<br>halleluhu birkia uzo.<br>Halleluhu bigvurotav,<br>halleluhu k’rov gudlo.<br>Halleluhu b’teika shofar,<br>halleluhu b’neivel v’chinor.<br>Halleluyah, Halleluyah,<br>Halleluyah, Hallelu-yah!</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">הַלְלוּ אֵל בְּקׇדְשׁוֹ,</span><br><span class=\"hw\">הַלְלוּהוּ בִּרְקִיעַ עֻזּוֹ.</span><br><span class=\"hw\">הַלְלוּהוּ בִגְבוּרֹתָיו,</span><br><span class=\"hw\">הַלְלוּהוּ כְּרֹב גֻּדְלוֹ.</span><br><span class=\"hw\">הַלְלוּהוּ בְּתֵקַע שׁוֹפָר,</span><br><span class=\"hw\">הַלְלוּהוּ בְּנֵבֶל וְכִנּוֹר.</span><br><span class=\"hw\">הַלְלוּיָהּ, הַלְלוּיָהּ,</span><br><span class=\"hw\">הַלְלוּיָהּ, הַלְלוּיָהּ!</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">Halleluyah! Praise God in the sanctuary; <br>praise God in the mighty heavens.<br>Praise God for mighty deeds and surpassing greatness.<br>Praise with shofar blasts, with harp and lyre.</div><div class=\"box\" style=\"font-size:calc(var(--pt)*14);line-height:calc(var(--pt)*16.8);text-align:right;right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*10.55)\"><br></div><div class=\"box dots\">●○</div>",
    "s-psalm150-2": "<div class=\"box h-he he\">הַלְלוּיָהּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">Halleluyah (Psalm 150)</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Halleluhu b’tof umachol,<br>halleluhu b’minim v’ugav.<br>Halleluhu b’tziltz’lei shama,<br>halleluhu b’tziltz’lei t’ruah.<br>Kol han’shamah t’hallel Yah,<br>Halleluyah!<br>Halleluyah, Halleluyah,<br>Halleluyah, Hallelu-yah!</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">הַלְלוּהוּ בְּתֹף וּמָחוֹל,</span><br><span class=\"hw\">הַלְלוּהוּ בְּמִנִּים וְעֻגָב.</span><br><span class=\"hw\">הַלְלוּהוּ בְצִלְצְלֵי שָׁמַע,</span><br><span class=\"hw\">הַלְלוּהוּ בְּצִלְצְלֵי תְרוּעָה.</span><br><span class=\"hw\">כֹּל הַנְּשָׁמָה תְּהַלֵּל יָהּ,</span><br><span class=\"hw\">הַלְלוּיָהּ!</span><br><span class=\"hw\">הַלְלוּיָהּ, הַלְלוּיָהּ,</span><br><span class=\"hw\">הַלְלוּיָהּ, הַלְלוּיָהּ!</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">Praise with drum and dance, with strings and flute.<br>Praise with resounding cymbals, with clashing cymbals.<br>Let every breath praise God. Halleluyah!</div><div class=\"box\" style=\"font-size:calc(var(--pt)*14);line-height:calc(var(--pt)*16.8);text-align:right;right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*10.55)\"><br></div><div class=\"box dots\">○●</div>",
    "s-yotzeir-1": "<div class=\"box h-en\">Yotzeir Or</div><div class=\"box h-he he\">יוֹצֵר אוֹר</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\">Baruch atah, Adonai,<br>Eloheinu Melech haolam,<br>yotzeir or uvorei choshech,<br>oseh shalom uvorei et hakol.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw\">בָּרוּךְ אַתָּה יְיָ,</span><br><span class=\"hw\">אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם,</span><br><span class=\"hw\">יוֹצֵר אוֹר וּבוֹרֵא חֹשֶׁךְ,</span><br><span class=\"hw\">עֹשֶׂה שָׁלוֹם וּבוֹרֵא אֶת הַכֹּל.</span></div><div class=\"box\" style=\"font-size: calc(var(--pt)*28); line-height: calc(var(--pt)*33.6); left: calc(var(--in)*0.51); right: calc(var(--in)*0.44); white-space: normal; bottom: calc(var(--in)*1.42);\">Blessed are You, Adonai our God, Sovereign of the universe, <br>Creator of light and darkness, who makes peace and fashions all things.</div><div class=\"box dots\">●○</div>",
    "s-shma-1": "<div class=\"box h-he he\">שְׁמַע</div><div class=\"box h-en\"><span style=\"font-weight:700\">Sh’ma</span></div><div class=\"box he\" style=\"font-size: calc(var(--pt)*60); line-height: calc(var(--pt)*72); left: calc(var(--in)*0.46); right: calc(var(--in)*0.44); text-align: center; top: calc(var(--in)*1.34);\"><span class=\"hw\">שְׁמַע יִשְׂרָאֵל, יְיָ אֱלֹהֵינוּ, יְיָ אֶחָד!</span></div><div class=\"box\" style=\"font-size: calc(var(--pt)*48); line-height: calc(var(--pt)*60); left: calc(var(--in)*0.47); right: calc(var(--in)*0.43); text-align: center; top: calc(var(--in)*2.6);\">Sh’ma Yisrael, Adonai Eloheinu, Adonai Echad!</div><div class=\"box he\" style=\"font-size: calc(var(--pt)*44); line-height: calc(var(--pt)*60); left: calc(var(--in)*0.45); right: calc(var(--in)*0.45); text-align: center; top: calc(var(--in)*4.22);\"><span class=\"hw\">בָּרוּךְ שֵׁם כְּבוֹד מַלְכוּתוֹ לְעוֹלָם וָעֶד.</span></div><div class=\"box\" style=\"font-size: calc(var(--pt)*36); line-height: calc(var(--pt)*43.2); left: calc(var(--in)*0.45); right: calc(var(--in)*0.45); text-align: center; top: calc(var(--in)*5.26);\">Baruch shem k’vod malchuto l’olam va-ed.</div><div class=\"box\" style=\"font-size: calc(var(--pt)*28); line-height: calc(var(--pt)*33.6); left: calc(var(--in)*0.6); right: calc(var(--in)*0.3); text-align: center; bottom: calc(var(--in)*3.24);\">Listen, Israel: Adonai is our God, Adonai is One! <br>Blessed is the name of God’s glorious kingdom, forever and ever.</div>",
    "s-vahavta-3": "<div class=\"box h-he he\">וְאָהַבְתָּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">V’ahavta</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">L’maan tizk’ru vaasitem<br>et kol mitzvotai,<br>vih’yitem k’doshim<br>l’Eloheichem.<br>Ani Adonai Eloheichem,<br>asher hotzeiti etchem<br>mei-eretz Mitzrayim<br>lih’yot lachem l’Elohim.<br>Ani Adonai Eloheichem.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">לְמַעַן תִּזְכְּרוּ וַעֲשִׂיתֶם</span><br><span class=\"hw\">אֶת־כׇּל־מִצְוֹתָי,</span><br><span class=\"hw\">וִהְיִיתֶם קְדֹשִׁים</span><br><span class=\"hw\">לֵאלֹהֵיכֶם.</span><br><span class=\"hw\">אֲנִי יְיָ אֱלֹהֵיכֶם,</span><br><span class=\"hw\">אֲשֶׁר הוֹצֵאתִי אֶתְכֶם</span><br><span class=\"hw\">מֵאֶרֶץ מִצְרַיִם</span><br><span class=\"hw\">לִהְיוֹת לָכֶם לֵאלֹהִים.</span><br><span class=\"hw\">אֲנִי יְיָ אֱלֹהֵיכֶם.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">In this way, you will remember and do all My mitzvot, and you will be holy to your God. <br>I am Adonai your God who brought you out of the land of Egypt to be your God. I am Adonai your God.</div><div class=\"box dots\">○○●</div>",
    "s-avot-2": "<div class=\"box h-he he\">אָבוֹת וְאִמָּהוֹת</div><div class=\"box h-en\"><span style=\"font-weight:700\">Amidah: Avot v’Imahot</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">HaEl hagadol hagibor<br>v’hanora, El elyon,<br>gomeil chasadim tovim,<br>v’koneih hakol,<br>v’zocheir chasdei avot v’imahot,<br>umeivi g’ulah livnei v’neihem<br>l’maan sh’mo b’ahavah.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">הָאֵל הַגָּדוֹל הַגִּבּוֹר</span><br><span class=\"hw\">וְהַנּוֹרָא, אֵל עֶלְיוֹן,</span><br><span class=\"hw\">גּוֹמֵל חֲסָדִים טוֹבִים,</span><br><span class=\"hw\">וְקוֹנֵה הַכֹּל,</span><br><span class=\"hw\">וְזוֹכֵר חַסְדֵי אָבוֹת וְאִמָּהוֹת,</span><br><span class=\"hw\">וּמֵבִיא גְאֻלָּה לִבְנֵי בְנֵיהֶם</span><br><span class=\"hw\">לְמַעַן שְׁמוֹ בְּאַהֲבָה.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">You are a great, mighty, powerful, and supreme God who acts with lovingkindness, creates everything, <br>remembers the good deeds of our fathers and mothers, and with love brings redemption to their children’s <br>children for the sake of God’s name.</div><div class=\"box dots\">○●○</div>",
    "s-gvurot-1": "<div class=\"box h-he he\">גְּבוּרוֹת</div><div class=\"box h-en\"><span style=\"font-weight:700\">Amidah: G’vurot</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Atah gibor l’olam, Adonai,<br>m’chayeih hakol/meitim <br>atah, rav l’hoshia.<br><br>Mashiv haruach<br>umorid hagashem.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">אַתָּה גִּבּוֹר לְעוֹלָם אֲדֹנָי,</span><br><span class=\"hw\">מְחַיֵּה הַכֹּל/</span><span class=\"hw\">מֵתִים</span> <br><span class=\"hw\">אַתָּה,</span> <span class=\"hw\">רַב לְהוֹשִׁיעַ.</span><br><br><span class=\"hw\">מַשִּׁיב הָרוּחַ</span><br><span class=\"hw\">וּמוֹרִיד הַגֶּשֶׁם.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">You are a hero forever, God: You give life to everything and have a great ability to save. <br>You cause wind to blow and rain to fall.</div><div class=\"box dots\">●○○</div>",
    "s-kedushah-1": "<div class=\"box h-en\">Amidah: K’dushah</div><div class=\"box h-he he\">קְדֻשָּׁה</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\">N’kadeish et shimcha baolam,<br>k’shem shemakdishim oto<br>bishmei marom,<br>kakatuv al yad n’vi-echa,<br>v’kara zeh el zeh v’amar:</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw\">נְקַדֵּשׁ אֶת שִׁמְךָ בָּעוֹלָם,</span><br><span class=\"hw\">כְּשֵׁם שֶׁמַּקְדִּישִׁים אוֹתוֹ</span><br><span class=\"hw\">בִּשְׁמֵי מָרוֹם,</span><br><span class=\"hw\">כַּכָּתוּב עַל יַד נְבִיאֶךָ,</span><br><span class=\"hw\">וְקָרָא זֶה אֶל זֶה וְאָמַר:</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.5);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">Let us make Your name holy on earth, as it is made holy in the heavens above. <br>As Your prophet wrote: One called to another and said:</div><div class=\"box dots\">●○○</div>",
    "s-kedushah-2": "<div class=\"box h-en\">Amidah: K’dushah</div><div class=\"box h-he he\">קְדֻשָּׁה</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\">Kadosh, kadosh, kadosh<br>Adonai tz’vaot,<br>m’lo chol haaretz k’vodo.<br><br>Baruch k’vod Adonai mim’komo.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw\">קָדוֹשׁ, קָדוֹשׁ, קָדוֹשׁ</span><br><span class=\"hw\">יְיָ צְבָאוֹת,</span><br><span class=\"hw\">מְלֹא כָל הָאָרֶץ כְּבוֹדוֹ.</span><br><br><span class=\"hw\">בָּרוּךְ כְּבוֹד יְיָ מִמְּקוֹמוֹ.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.5);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">Holy, holy, holy is Adonai of all that exists! The whole earth is full of God’s glory. <br>Blessed is the glory of Adonai, from God’s place.</div><div class=\"box dots\">○●○</div>",
    "s-kedushah-3": "<div class=\"box h-en\">Amidah: K’dushah</div><div class=\"box h-he he\">קְדֻשָּׁה</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\">Yimloch Adonai l’olam,<br>Elohayich Tziyon, l’dor vador,<br>hal’luyah!<br><br>Baruch atah, Adonai,<br>haEl hakadosh.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw\">יִמְלֹךְ יְיָ לְעוֹלָם,</span><br><span class=\"hw\">אֱלֹהַיִךְ צִיּוֹן, לְדֹר וָדֹר,</span><br><span class=\"hw\">הַלְלוּיָהּ!</span><br><br><span class=\"hw\">בָּרוּךְ אַתָּה יְיָ,</span><br><span class=\"hw\">הָאֵל הַקָּדוֹשׁ.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.5);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">Adonai will reign forever, your God, O Zion, from generation to generation. <br>Halleluyah! Blessed are You, Adonai, the holy God.</div><div class=\"box dots\">○○●</div>",
    "s-oseh-1": "<div class=\"box h-he he\">עֹשֶׂה שָׁלוֹם</div><div class=\"box h-en\"><span style=\"font-weight:700\">Oseh Shalom</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Oseh shalom bimromav,<br>hu yaaseh shalom aleinu,<br>v’al kol Yisrael,<br>v’imru: Amen.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">עֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו,</span><br><span class=\"hw\">הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ,</span><br><span class=\"hw\">וְעַל כׇּל־יִשְׂרָאֵל,</span><br><span class=\"hw\">וְאִמְרוּ: אָמֵן.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">May the One who makes peace above in heaven make peace for us, for all of Israel, for all who live on earth, <br>and let us say: Amen.</div>",
    "s-kaddish-3": "<div class=\"box h-he he\">קַדִּישׁ יָתוֹם</div><div class=\"box h-en\"><span style=\"font-weight:700\">Mourner’s Kaddish</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*0.96)\">l’eila min kol<br>birchata v’shirata,<br>tushb’chata v’nechemata,<br>daamiran b’alma,<br>v’imru: Amen.<br>Y’hei sh’lama raba min sh’maya<br>v’chayim aleinu<br>v’al kol Yisrael,<br>v’imru: Amen.</div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.45);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">far above any blessing or song, any praise or comfort that can be spoken in the world. And let us say: Amen. <br>May great peace from heaven, and life, be ours and all Israel’s. And let us say: Amen.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*0.96)\"><span class=\"hw\">לְעֵלָּא מִן כָּל</span><br><span class=\"hw\">בִּרְכָתָא וְשִׁירָתָא,</span><br><span class=\"hw\">תֻּשְׁבְּחָתָא וְנֶחֱמָתָא,</span><br><span class=\"hw\">דַּאֲמִירָן בְּעָלְמָא,</span><br><span class=\"hw\">וְאִמְרוּ אָמֵן.</span><br><span class=\"hw\">יְהֵא שְׁלָמָא רַבָּא מִן שְׁמַיָּא</span><br><span class=\"hw\">וְחַיִּים עָלֵינוּ</span><br><span class=\"hw\">וְעַל כָּל יִשְׂרָאֵל,</span><br><span class=\"hw\">וְאִמְרוּ אָמֵן.</span></div><div class=\"box dots\">○○●○</div>",
    "s-mahtovu-morning-1": "<div class=\"box h-he he\">מַה טֹּבוּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">Mah Tovu</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Mah tovu ohalecha, Ya’akov,<br>mishk’notecha, Yisrael!</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.21)\"><span class=\"hw\">מַה־טֹּבוּ אֹהָלֶיךָ יַעֲקֹב,</span><br><span class=\"hw\">מִשְׁכְּנֹתֶיךָ יִשְׂרָאֵל!</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*3.23)\">Mah tovu: It’s the morning.<br>Mah tovu: Bless us this morning.<br>Ohalecha: Let us enter<br>Ya’akov: our heritage.<br>Mishk’notecha: We are searching; <br>Will you show us?<br>Yisrael: We are Yisrael.</div><div class=\"box dots\">●○</div>",
    "s-mahtovu-morning-2": "<div class=\"box h-he he\">מַה טֹּבוּ</div><div class=\"box h-en\"><span style=\"font-weight:700\">Mah Tovu</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.21)\">Born to sing your praises<br>In these holy holy spaces<br>Mah Tovu: Bless the morning.<br>Mah Tovu<br><br>Mah Tovu Ohalaiyich, <br>Sarah Mishk’notaiyich<br>Rivkah, Rachel, v’Leah</div><div class=\"box dots\">○●</div>",
    "s-song-shabbat-1": "<div class=\"box h-en\">Shir HaMaalot</div><div class=\"box h-he he\">שִׁיר הַמַּעֲלוֹת</div><div class=\"box\" style=\"font-size:calc(var(--pt)*44);line-height:calc(var(--pt)*60);left:calc(var(--in)*0.45);top:calc(var(--in)*1.2)\">Shabbat shalom! (4x)<br>Shabbat shalom um’vorach (2x)<br><br>Shir hamaalot, b’shuv Adonai<br>et shivat Tziyon,<br>hayinu k’cholmim.</div><div class=\"box he\" style=\"font-size:calc(var(--pt)*48);line-height:calc(var(--pt)*60);right:calc(var(--in)*.45);text-align:right;top:calc(var(--in)*1.2)\"><span class=\"hw\">שַׁבָּת שָׁלוֹם!</span><br><span class=\"hw\">שַׁבָּת שָׁלוֹם וּמְבֹרָךְ.</span><br><br><span class=\"hw\">שִׁיר הַמַּעֲלוֹת,&nbsp;</span><span class=\"hw\">בְּשׁוּב יְיָ</span><br><span class=\"hw\">אֶת שִׁיבַת צִיּוֹן,</span><br><span class=\"hw\">הָיִינוּ כְּחֹלְמִים.</span></div><div class=\"box\" style=\"font-size:calc(var(--pt)*28);line-height:calc(var(--pt)*33.6);left:calc(var(--in)*0.5);right:calc(var(--in)*.45);white-space:normal;bottom:calc(var(--in)*0.85)\">A peaceful and blessed Shabbat! A song of ascents: when Adonai brought the exiles back to Zion, we were like dreamers.</div>"
  },
  "lines": {
    "pop:shma": [
      "The Sh'ma says that God is one. It begins with",
      "the word \"listen,\" so before we say it, we get quiet."
    ],
    "pop:vahavta": [
      "The V'ahavta tells us to carry these words everywhere,",
      "at home and when we walk on the way. Today we are on the way."
    ]
  },
  "script": true,
  "guide": {
    "start": {
      "x": 7.4,
      "y": 5.41,
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
      "y": 4.59,
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
      "x": 8.82,
      "y": 6.81,
      "w": 9.77,
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
      "x": 8.15,
      "y": 5.88,
      "w": 10.76,
      "fs": 30,
      "yb": 10.4
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
      "x": 6.19,
      "y": 8.51,
      "w": 7.66,
      "fs": 24
    },
    "pop:mahtovu": {
      "x": 0.39,
      "y": 6.2,
      "w": 6.95,
      "fs": 24
    },
    "pop:mahtovu~morning": {
      "x": 8.5,
      "yb": 10.4,
      "w": 11,
      "fs": 24
    },
    "pop:asher": {
      "x": 11.74,
      "y": 8.51,
      "w": 7.73,
      "fs": 24
    },
    "pop:elohai": {
      "x": 11.46,
      "y": 5.72,
      "w": 8,
      "fs": 24
    },
    "pop:vahavta": {
      "x": 5.43,
      "y": 7.23,
      "w": 11,
      "fs": 24
    },
    "turn:gvurot": {
      "x": 9.32,
      "y": 0.3,
      "w": 10.35,
      "fs": 30
    },
    "turn:oseh": {
      "x": 9.24,
      "y": 0.39,
      "w": 10.25,
      "fs": 30
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
      "y": -0.425,
      "p": -0.145,
      "z": 1,
      "dx": 0,
      "dz": 0,
      "dh": 0
    },
    "overlook/shma": {
      "y": -0.006,
      "p": -0.017,
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
      "y": -0.018,
      "p": 0.002,
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
      "y": -0.336,
      "p": 0.079,
      "z": 1.25,
      "dx": 44,
      "dz": -32,
      "dh": 8
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
