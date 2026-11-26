// Widths for Arial Regular, normalized to 1000-unit em
const arialWidths = new Map([
    // Uppercase
    ['A', 667], ['B', 667], ['C', 722], ['D', 722],
    ['E', 667], ['F', 611], ['G', 778], ['H', 722],
    ['I', 278], ['J', 500], ['K', 667], ['L', 556],
    ['M', 833], ['N', 722], ['O', 778], ['P', 667],
    ['Q', 778], ['R', 722], ['S', 667], ['T', 611],
    ['U', 722], ['V', 667], ['W', 944], ['X', 667],
    ['Y', 667], ['Z', 611],

    // Lowercase
    ['a', 556], ['b', 556], ['c', 500], ['d', 556],
    ['e', 556], ['f', 333], ['g', 556], ['h', 556],
    ['i', 278], ['j', 278], ['k', 556], ['l', 278],
    ['m', 833], ['n', 556], ['o', 556], ['p', 556],
    ['q', 556], ['r', 444], ['s', 500], ['t', 333],
    ['u', 556], ['v', 500], ['w', 722], ['x', 500],
    ['y', 500], ['z', 500],

    // Digits
    ['0', 556], ['1', 556], ['2', 556], ['3', 556],
    ['4', 556], ['5', 556], ['6', 556], ['7', 556],
    ['8', 556], ['9', 556],

    // Space
    [' ', 278]
]);

// Function to approximate width
function approximateStringWidth(text, fontSizePts)
{
    // Scale factor: 1000 units in the table = 1 em
    const scale = fontSizePts / 1000.0;
    let totalUnits = 0;

    for (const c of text)
    {
        if (arialWidths.has(c))
        {
            totalUnits += arialWidths.get(c);
        }
        else
        {
            // Fallback for unsupported characters
            totalUnits += 500;
        }
    }

    return totalUnits * scale;
}

class GenericDebrief
{
	capitalizeSentences(text)
	{
		let capitalizeNext = true; // Start by capitalizing the first letter

		for (let i = 0; i < text.length; i++)
		{
			if (capitalizeNext && /[a-zA-Z]/.test(text[i]))
			{
				text = text.substring(0, i) +
					text[i].toUpperCase() +
					text.substring(i + 1);

				capitalizeNext = false;
			}
			else if (text[i] === '.' || text[i] === '!' || text[i] === '?')
			{
				capitalizeNext = true;
			}
		}

		return text;
	}

	getUniqueGoodWord()
	{
		let goodWords = [ "exceptional", "good", "great", "excellent", "superb", "outstanding" ];

		let index = rand() % goodWords.length;
		let cur = goodWords[index];

		return cur;
	}

	getUniqueJobWord()
	{
		let jobWords = [ "job", "flying", "work", "piloting", "flying skills", "piloting skills" ];

		let index = rand() % jobWords.length;
		let cur = jobWords[index];

		return cur;
	}

	intro()
	{
		let str = "";
		str += this.getUniqueGoodWord() + " " + this.getUniqueJobWord() + "! " + "\n";
		return str;
	}

	completed()
	{
		let completed_1 = [ 
			"Mission completed.",
			"Mission objectives accomplished.",
			"Mission objectives achieved.",
			"We accomplished what we could today.",
			"You completed all assigned objectives.",
			"Primary objectives achieved.",
			"Mission accomplished.",
		];

		return(completed_1[rand() % completed_1.length]);
	}
	
	part2()
	{
		let part2 = "";

		{
			let strings = [ "You took the fight to the Empire.",
				"Your skill and bravery has won the day.",
				"Another victory for the Alliance.",
				"You have won the day.",
				"You have done your squadron proud.",
				"You have brought honor to your squadron.",
				"You have brought glory to your squadron.",
				"You brought the fight to Emperor Palpatine's forces.",
			];

			let index = rand() % strings.length;
			let cur = strings[index];

			part2 += cur;
		}

		return part2;
	}

	wellDone()
	{
		//ToDo: Shorter more concise so they're 'forgettable' more generic
		let wellDone_1 = [
			"Alliance command is impressed with your results.",
			"Your actions today made a difference.",
			"Keep up the momentum.",
			"Alliance command appreciates your continued dedication.",
			"Alliance command is impressed with the performance of our Starfighters.",
			"Red squadron has redefined space superiority today.",
			"Textbook space dominance.",
			"You've given our forces the edge they needed.",
			"Every victory like this pushes us closer to ending this conflict.",
			"That's how it's done, textbook space dominance.",
			"Another day, another victory for Red squadron.",
			"Outstanding performance. you owned the battle space.",
			"Good work out there, you've done the squadron proud.",
			"Solid flying and good discipline.",
			"You've helped tip the balance in this sector.",
			"Our starfighters can outfly anything the Imperials can throw at them.",
			"Our pilots are more than a match for the Imperial forces!",
			"Another successful sortie.",
		];

		return(wellDone_1[rand() % wellDone_1.length]);
	}

	compile(TIE_Level, reenforcement_Level, missionType)
	{
		let str = "";

		//Choose length of debrief
		let lengths = [ 0, 1 ];
		let sz = lengths[rand() % lengths.length];

		if (sz == 1)//Long
		{
			{
				let rand1 = rand() % 100;

				if (rand1 < 33)
				{
					str += this.intro() + "\n";

					if (rand() % 100 < 50)
					{
						str += this.part2();
					}
				}
				else if (rand1 >= 33 && rand1 < 66)
				{
					str += this.part2();
				}
				else if (rand1 >= 66 && rand1 < 100)
				{
					str += this.completed();
				}

				str += " " + this.wellDone() + "\n\n";
			}
			
			str += this.missionAchievements(missionType) + "\n\n";

			str += this.evaluation(0, 0) + "\n\n";

			if (rand() % 100 < 50)
			{
				str +=  this.admin() + "\n\n";
			}

			str += this.closingRemarks() + "\n\n";
		
			//str = this.capitalizeSentences(str);

		}

		if (sz == 0)//Short debrief
		{
			str = "";
			let txts = [ "Excellent job pilot! \n", "Good work!  \n", "Well done! \n" ];
			let txt = this.missionAchievements(missionType) + "\n\n" + this.completed() + "\n\n" + txts[rand() % txts.length];
			str += txt + "\n";
		}

		if (tourMission == totalMissions)
		{
			let txts = [ "This concludes your tour of duty. Excellent job.", "This concludes your tour of duty.", "Your tour of duty is up. Well done." ];
			let txt = txts[rand() % txts.length];

			str += "\n" + txt;
		}

		return " " + this.capitalizeSentences(str);
	}

	missionAchievements(missionType)
	{
		if (missionType == MISSION_TYPE_AWAIT)
		{
			let achievements = [
				"You secured the area until our taskforce arrived.",
				"You secured the area around our commandship until the taskforce arrived.",
				"You bought time for our taskforce to arrive.",
			];

			let achievements_pt_2 =
			[
				"We have dealt a blow against the Empire in this sector.",
				"A significant victory for the Alliance.",
				"This result ought to shake the Empire's confidence."
			];

			if (rand() % 100 < 50)
			{
				let part2 = achievements_pt_2[rand() % achievements_pt_2.length];
				return(achievements[rand() % achievements.length] + " " + part2);
			}

			return(achievements[rand() % achievements.length]);
		}

		if (missionType == MISSION_TYPE_RESCUE)
		{
			let achievements =
			[
				"Agent successfully rescued.",
				"Most importantly we freed our man.",
				"The rescue mission was a success.",
				"We rescued a vital agent from right under the Imperial's noses.",
				"We saved vital personnel from Imperial interrogation.",
				"We saved a key operative just as the Imperials were unaware."
			];

			let achievements_pt_2 =
			[
				"A heavy blow against Palpatine.",
				"A heavy blow against the Empire.",
				"This mission dealt a blow to the Empire.",
				"We've prevented vital intelligence from falling into Imperial hands.",
				"A victory snatched from defeat.",
			];

			if (rand() % 100 < 50)
			{
				let part2 = achievements_pt_2[rand() % achievements_pt_2.length];
				return(achievements[rand() % achievements.length] + " " + part2);
			}

			return(achievements[rand() % achievements.length]);
		}

		if (missionType == MISSION_TYPE_BASE_ATTACK)
		{
			let achievements =
			[
				"Primary target destroyed.",
				"The Imperial facility was neutralized.",
				"The Imperial base was neutralized.",
				"The Imperial base was destroyed.",
				"The Imperial base was completely destroyed.",
				"The Imperial facility was completely destroyed.",
				"Recon confirms the Imperial facility had been completely neutralized.",
				"The enemy facility was completely destroyed.",
				"The enemy base was successfully neutralized.",
				"Intelligence confirms the Imperial base had been completely destroyed.",
				"The strike achieved total destruction of the Imperial facility.",
				"You destroyed the Imperial base."
			];

			let achievements_pt_2 =
			[
				"A heavy blow against Palpatine.",
				"A heavy blow against the Empire.",
				"We have dealt a severe blow against the Empire in this sector.",
				"A significant victory for the Alliance.",
				"A great victory for the Rebellion.",
				"This mission dealt a blow to the Empire.",
				"This mission hit the Empire hard.",
				"This victory disrupted the Empire's key operations.",
				"This result ought to shake the Empire's confidence."
			];

			if (rand() % 100 < 50)
			{
				let part2 = achievements_pt_2[rand() % achievements_pt_2.length];
				return(achievements[rand() % achievements.length] + " " + part2);
			}

			return(achievements[rand() % achievements.length]);
		}

		if (missionType == MISSION_TYPE_STAGING_AREA)
		{
			let achievements =
			[
				"We did much damage to the staging area.",
				"The strike took out many of the Empire's TIE Fighters.",
				"Our assault hammered the Imperial base.",
				"Multiple enemy targets destroyed."
			];

			let achievements_pt_2 =
			[
				"A heavy blow against Palpatine.",
				"A heavy blow against the Empire.",
				"We have dealt a severe blow against the Empire in this sector.",
				"A significant victory for the Alliance.",
				"A great victory for the Rebellion.",
				"This mission dealt a blow to the Empire.",
				"This mission hit the Empire hard.",
				"This victory disrupted the Empire's key operations.",
				"This result ought to shake the Empire's confidence."
			];

			if (rand() % 100 < 50)
			{
				let part2 = achievements_pt_2[rand() % achievements_pt_2.length];
				return(achievements[rand() % achievements.length] + " " + part2);
			}

			return(achievements[rand() % achievements.length]);
		}

		if (missionType == MISSION_TYPE_SEIZE_CONTAINER)
		{
		    let achievements_1 =
			[
				"You helped seize the enemy supplies. ",
				"You protected the capture operation. ",
				"You held off the Imperials long enough for recovery craft to complete its mission. "
			];

			let achievements =
			[
				"The supplies were captured.",
				"The supplies were seized.",
				"The cargo was successfully seized.",
				"Cargo in hand.",
				"Cargo bagged.",
				"The cargo is in alliance hands.",
				"The supplies are now safely in alliance hands.",
				"Cargo captured. Mission success confirmed.",
				"Capture operation successful."
			];

			let achievements_pt_2 =
			[
				"This operation represents both a tactical and strategic victory.",
				"We've shown the empire we can strike anywhere, anytime."
			];

			let part1 = "";

			if (rand() % 100 < 50)
			{
				part1 += achievements_1[rand() % achievements_1.length];
			}

			part1 += achievements[rand() % achievements.length];

			if (rand() % 100 < 50)
			{
				let part2 = achievements_pt_2[rand() % achievements_pt_2.length];

				return(part1 + " " + part2);
			}

			return(achievements[rand() % achievements.length]);
		}

		if (missionType == MISSION_TYPE_SS_RECOVERY)
		{
			let achievements =
			[
				"Capture operation successful.",
				"Target vessel secured.",
				"Vessel secured: storm unit completed its mission.",
				"Storm Unit's mission was a success.",
				"Target ship secured.",
				"Target ship seized.",
				"Vessel recovery operation successful.",
				"Ship under our control.",
				"Recovery and capture completed.",
				"Boarding party deployed successfully. ship's crew detained or neutralized.",
				"You ensured the success of the capture operation."
			];

			let achievements_pt_2 =
			[
				"This operation is both a tactical and strategic victory.",
				"We've shown the Emperor we can strike anywhere, anytime.",
				"Crew of the recovery ship sends its thanks."
			];

			if (rand() % 100 < 50)
			{
				let part2 = achievements_pt_2[rand() % achievements_pt_2.length];
				return(achievements[rand() % achievements.length] + " " + part2);
			}

			return(achievements[rand() % achievements.length]);
		}

		return "";
	}

	closingRemarks()
	{	
		let closingRemarks_1 =
		[
			"debriefing complete. await next assignment.",
			"future missions will incorporate lessons learned from this operation.",
			"you are cleared for downtime until further orders.",
			"stand by for reassignment once intelligence confirms next target.",
			"excellent work today, pilot. you've earned some rest.",
			"mission observations logged and analyzed. debrief complete.",
			"rest and refocus; we'll need you back in space soon.",
			"operation classified as successful. awaiting next orders.",
			"all objectives met. squadron status: combat ready.",
			"mission report forwarded to Alliance command. well done.",
			"results logged. pilots dismissed pending further briefing.",
			"we've covered all key points. let's carry these lessons forward into our next operation.",
			"good hunting out there. we'll take what we've learned and fly smarter next time.",
			"that concludes the debrief. review your notes and prep for tomorrows mission.",
			"intel recorded, squadron ready. debrief done.",
			"stand by for next assignment.",
			"briefing complete. be sure to spend some time in the simulator."
		];

		return(closingRemarks_1[rand() % closingRemarks_1.length]);
	}


	admin()
	{
		let misc_1 =
		[
			"Mission objectives have been reviewed and logged.",
			"Mission data has been logged and submitted to command for review.",
			"All flight data has been uploaded for command analysis.",
			"Flight data uploaded for Alliance command.",
			"Flight data uploaded for analysis.",
			"Objectives noted in the log.",
			"Engagement report complete.",
			"Action report logged and forwarded.",
			"Mission notes filed.",
		];

		return(misc_1[rand() % misc_1.length]);
	}

	evaluation(TIE_Level, reenforcement_Level)
	{
		let evaluation_easy =
		[
			"All objectives secured. You returned to base safely.",
			"Red squadron executed the operation with precision and discipline.",
			"Imperial tactics remain consistent with previous engagements.",
			"Objectives secured, enemy tactics predictable.",
			"The operation proceeded as expected.",
			"All went well, no major complications.",
			"The mission went as expected.",
			"Communications were clear, coordination excellent."
		];

		let evaluation_hard =
		[
			"Objectives secured under heavy resistance.",
			"We met opposition head-on and still achieved our goal.",
			"Mission complete - resistance heavy, morale unshaken.",
			"Against stiff opposition, our objectives stand achieved.",
			"Objectives achieved despite sporadic enemy attacks.",
			"Heavy opposition but you're back in one piece."
		];

		return(evaluation_easy[rand() % evaluation_easy.length]);
	}
};

class BriefingItem
{
	type;
	tgtIcon;
	typeHex;
	message;
	craft;//For icon
	uniqueID;//For icon
	x;
	y;
	stringRef;
	value;
	iff;
	dir = NORTH;
	text;
	textRef;
	color;
};

//Main brief texts
var TYPE_BRIEF_MSG = 0
var TYPE_ADD_BRIEF_ICO = 1
var TYPE_ZOOM = 2
var TYPE_MOVE_MAP = 3
var TYPE_HIGHLIGHT_ICON = 4
var TYPE_SHOW_SHIP_DATA = 5
var TYPE_HIDE_SHIP_DATA = 6
var TYPE_CAPTION = 7
var TYPE_HIDE_BOXES = 8

class BriefingWrapper
{
	//
	briefingItems = [];
	briefingItemTimes = [];
	//

	//Main brief texts
	mainTexts = [];
	mainTextTimes = [];

	//Icons
	unqiueIconID = [];
	iconType = [];
	iconPos = [];
	iconTime = [];

	reset()
	{
		this.briefingItemTimes.length = 0;
		this.briefingItems.length = 0;
	}

	addMainText(ref, timeSeconds)
	{
		let cur = new BriefingItem();
		
		cur.type = TYPE_BRIEF_MSG;
		cur.typeHex = 0x05;
		cur.message = ref;
		cur.stringRef = mission.briefingStringCount;//Which string this object refers to

		//Add to the string to the list for the .tie
		mission.briefingInts[mission.briefingStringCount] = ref;
		mission.briefingStringCount++;
		//

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	addSpecificBriefingText(txt, timeSeconds)
	{
		mission.briefingStrings_2[mission.briefingStringCount_2] = txt;

		briefingWrapper.addMainText(mission.briefingStringCount_2, timeSeconds);

		mission.briefingStringCount_2++;
	}

	//Zoom "0" is zoomed right out (large area of map on screen)
	doZoom(zoomPercent, timeSeconds)
	{
		let cur = new BriefingItem();

		cur.type = TYPE_ZOOM;
		cur.value = zoomPercent;

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	doHighlightIcon(iconRef, type, timeSeconds)
	{
		let cur = new BriefingItem();
		cur.type = TYPE_HIGHLIGHT_ICON;
		cur.tgtIcon = iconRef;

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	doShowShipData(iconRef, timeSeconds)
	{
		let cur = new BriefingItem();
		cur.type = TYPE_SHOW_SHIP_DATA;
		cur.tgtIcon = iconRef;

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	doHideShipData(iconRef, timeSeconds)
	{
		let cur = new BriefingItem();
		cur.type = TYPE_HIDE_SHIP_DATA;
		cur.tgtIcon = iconRef;

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	doMoveMap(x, y, timeSeconds)
	{
		let cur = new BriefingItem();
		cur.type = TYPE_MOVE_MAP;
		cur.x = x;
		cur.y = y;

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	correctIconRot(iconShip, NESW)
	{
		if (NESW == NORTH)
		{
			if (iconShip == SHUTTLE || iconShip == DELTA_TRANSPORT || iconShip == HEAVY_LIFTER || iconShip == DREADNAUGHT || iconShip == ESCORT_SHUTTLE || iconShip == B_WING || iconShip == MOBQUET_TRANSPORT || iconShip == ACTION_TRANSPORT || iconShip == FRIGATE || iconShip == MODIFIED_FRIGATE)
			{
				return 3;
			}

			return 0;
		}

		if (NESW == SOUTH)
		{
			if (iconShip == SHUTTLE || iconShip == DELTA_TRANSPORT || iconShip == HEAVY_LIFTER || iconShip == DREADNAUGHT || iconShip == B_WING || iconShip == ESCORT_SHUTTLE || iconShip == MOBQUET_TRANSPORT || iconShip == FRIGATE  || iconShip == ACTION_TRANSPORT || iconShip == FRIGATE || iconShip == MODIFIED_FRIGATE)
			{
				return 1;
			}

			return 2;
		}

		if (NESW == EAST)
		{
			if (iconShip == SHUTTLE || iconShip == HYPER_BOUY || iconShip == DELTA_TRANSPORT || iconShip == ESCORT_TRANSPORT || iconShip == HEAVY_LIFTER || iconShip == DREADNAUGHT || iconShip == B_WING || iconShip == ESCORT_SHUTTLE || iconShip == MOBQUET_TRANSPORT || iconShip == FRIGATE || iconShip == ACTION_TRANSPORT || iconShip == FRIGATE || iconShip == MODIFIED_FRIGATE)
			{
				return 4;
			}

			if (iconShip == STRIKE_CRUISER)
			{
				return 3;
			}

			return 3;
		}

		if (NESW == WEST)
		{
			if (iconShip == ESCORT_SHUTTLE || iconShip == HYPER_BOUY || iconShip == SHUTTLE || iconShip == DELTA_TRANSPORT || iconShip == ESCORT_TRANSPORT || iconShip == HEAVY_LIFTER || iconShip == DREADNAUGHT || iconShip == B_WING || iconShip == MOBQUET_TRANSPORT || iconShip == FRIGATE || iconShip == ACTION_TRANSPORT || iconShip == FRIGATE || iconShip == MODIFIED_FRIGATE)
			{
				return 0;
			}

			return 1;
		}

		return 0;
	}

	addIcon(craft, uniqueID, iff, dir, posX, posY, timeSeconds)
	{
		if (craft < 0)
		{
			craft = 0;
		}

		if (uniqueID < 0)
		{
			uniqueID = 0;
		}

		let cur = new BriefingItem();
		cur.type = TYPE_ADD_BRIEF_ICO;
		cur.typeHex = 0x1A;
		cur.craft = craft;
		cur.uniqueID = uniqueID;
		cur.iff = iff;
		cur.x = posX;
		cur.y = posY;
		cur.dir = this.correctIconRot(craft, dir);

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	addCaption(txt, x, y, color, timeSeconds)
	{
		let cur = new BriefingItem();
		cur.type = TYPE_CAPTION;
		cur.x = x;
		cur.y = y;
		cur.textRef = mission.mapTextCount;
		cur.text = txt;
		cur.color = color;

		mission.mapText[mission.mapTextCount] = txt;
		mission.mapTextCount++;

		this.briefingItems.push(cur);
		this.briefingItemTimes.push(timeSeconds);
	}

	convertZoom(value)
	{
		let in_min = 0.0;
		let in_max = 100.0;
		let out_min = 0;
		let out_max = 64;

		return Math.trunc(
			out_min + (value - in_min) * (out_max - out_min) / (in_max - in_min)
		);
	}

	compile()
	{
		tie.briefingByteCount = 0;

		// [Put object arrays in order of time]

		const combined = this.briefingItems.map((item, i) => ({
			time: this.briefingItemTimes[i],
			item: item
		}));

		combined.sort((a, b) => a.time - b.time);

		// Unpack back into original arrays
		for (let i = 0; i < combined.length; i++)
		{
			this.briefingItemTimes[i] = combined[i].time;
			this.briefingItems[i] = combined[i].item;
		}

		// [Generate briefing hex data]

		tie.briefingSize = 0;

		tie.insertEmptyBytesToBriefing(485);

		tie.addByteToBriefing(0xDC); // 60 seconds long brief (Cutoff at 60s)
		tie.addByteToBriefing(0x05);
		tie.addByteToBriefing(0x0);
		tie.addByteToBriefing(0x0);
		tie.addByteToBriefing(0x2C);
		tie.addByteToBriefing(0x0);

		tie.addByteToBriefing(0xFF); // Seems to allocate total size
		tie.addByteToBriefing(0x01);
		tie.addByteToBriefing(0x0);
		tie.addByteToBriefing(0x0);

		tie.briefingSize += 10;

		// [Add briefing main messages]

		let tmSeconds = this.briefingItemTimes[0] * 25.0;

		// Convert to unsigned 16-bit integer
		const toUint16 = (value) => Math.trunc(value) & 0xFFFF;

		// Add a 16-bit word (little-endian: low byte first)
		const addWord = (value) =>
		{
			const scaledValue = toUint16(value);

			const lowByte = scaledValue & 0xFF;
			const highByte = (scaledValue >> 8) & 0xFF;

			tie.addByteToBriefing(lowByte);
			tie.addByteToBriefing(highByte);
		};

		for (let a = 0; a < this.briefingItems.length; a++)
		{
			const item = this.briefingItems[a];

			// [This loop's message]

			let value = tmSeconds;
			let scaledValue = toUint16(value);

			// [Brief text instruction]

			if (item.type == TYPE_BRIEF_MSG)
			{
				// Page break instruction (Required for brief text to show on mission load screen)

				if (briefingPageBreaks)
				{
					addWord(scaledValue);

					tie.addByteToBriefing(0x03); // Instruction type
					tie.addByteToBriefing(0x0);

					tie.briefingSize += 4;
				}

				addWord(scaledValue);

				tie.addByteToBriefing(item.typeHex); // Instruction type
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(item.stringRef & 0xFF); // String text msg ref
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 6;
			}

			if (item.type == TYPE_CAPTION)
			{
				// Time
				value = tmSeconds + 0;
				scaledValue = toUint16(value);

				addWord(scaledValue);
				tie.briefingSize += 2;

				// Instruction
				tie.addByteToBriefing(0x12 + item.textRef);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(item.textRef);
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 4;

				// Function to approximate width
				const textWidth = approximateStringWidth(item.text, 0.75);

				// [X]
				{
					value = -(textWidth / 2) * 100 * 0.60;
					value += item.x * 100 * 1.45;

					scaledValue = toUint16(value);

					addWord(scaledValue);
				}

				// [Y]
				{
					value = item.y * 100 * 1.6;

					scaledValue = toUint16(value);

					addWord(scaledValue);
				}

				tie.briefingSize += 4;

				// Colour
				tie.addByteToBriefing(item.color);
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 2;
			}

			if (item.type == TYPE_MOVE_MAP)
			{
				value = tmSeconds + 0;
				scaledValue = toUint16(value);

				addWord(scaledValue);

				tie.addByteToBriefing(0x06); // Command
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 4;

				// [X]
				{
					value = item.x * 100 * 1.6;
					scaledValue = toUint16(value);

					addWord(scaledValue);
				}

				// [Y]
				{
					value = item.y * 100 * 1.6;
					scaledValue = toUint16(value);

					addWord(scaledValue);
				}

				tie.briefingSize += 4;
			}

			if (item.type == TYPE_ZOOM)
			{
				value = tmSeconds + 0;
				scaledValue = toUint16(value);

				addWord(scaledValue);

				tie.addByteToBriefing(0x07); // Command
				tie.addByteToBriefing(0x0);

				tie.addByteToBriefing(this.convertZoom(item.value)); // Zoom
				tie.addByteToBriefing(0x0);

				tie.addByteToBriefing(this.convertZoom(item.value));
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 8;
			}

			if (item.type == TYPE_SHOW_SHIP_DATA)
			{
				// Time
				value = tmSeconds + 0;
				scaledValue = toUint16(value);

				addWord(scaledValue);

				tie.briefingSize += 2;

				// Instruction
				tie.addByteToBriefing(0x1B);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(0x01); // 0x01 show
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(item.tgtIcon);
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 6;
			}

			if (item.type == TYPE_HIDE_SHIP_DATA)
			{
				// Time
				value = tmSeconds + 0;
				scaledValue = toUint16(value);

				addWord(scaledValue);

				tie.briefingSize += 2;

				// Instruction
				tie.addByteToBriefing(0x1B);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(0x0); // 0x0 hide
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(item.tgtIcon);
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 6;
			}

			if (item.type == TYPE_HIGHLIGHT_ICON)
			{
				// Highlight target icon

				// Time
				value = tmSeconds + 0;
				scaledValue = toUint16(value);

				addWord(scaledValue);

				tie.briefingSize += 2;

				// Instruction
				tie.addByteToBriefing(BRIEFING_EVENT_FG_TAG_1);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(item.tgtIcon);
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 4;
			}

			if (item.type == TYPE_HIDE_BOXES)
			{
				// Time
				value = tmSeconds + 0;
				scaledValue = toUint16(value);

				addWord(scaledValue);

				tie.briefingSize += 2;

				// Instruction
				tie.addByteToBriefing(BRIEFING_EVENT_CLEAR_FG_TAGS);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(0x0);
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 6;
			}

			if (item.type == TYPE_ADD_BRIEF_ICO)
			{
				// Add briefing icon

				scaledValue = toUint16(value);

				addWord(scaledValue);

				tie.addByteToBriefing(item.typeHex);
				tie.addByteToBriefing(0x0);

				tie.addByteToBriefing(item.uniqueID); // ICON REF
				tie.addByteToBriefing(0x0);

				tie.addByteToBriefing(item.craft); // CRAFT ICON
				tie.addByteToBriefing(0x0);

				tie.addByteToBriefing(item.iff); // Icon IFF color
				tie.addByteToBriefing(0x0);

				tie.briefingSize += 10;

				// Rotate the icon
				{
					scaledValue = toUint16(value);

					addWord(scaledValue);

					tie.briefingSize += 2;

					tie.addByteToBriefing(0x1D);

					tie.addByteToBriefing(0x0);
					tie.addByteToBriefing(item.uniqueID); // TARGET ICON TO ROTATE
					tie.addByteToBriefing(0x0);

					tie.addByteToBriefing(item.dir); // ICON ROTATION SETTING

					tie.addByteToBriefing(0x0);

					tie.briefingSize += 6;
				}

				// Move the icon
				{
					const x = item.x;
					const y = item.y;

					scaledValue = toUint16(value);

					addWord(scaledValue);

					tie.briefingSize += 2;

					// Instruction
					tie.addByteToBriefing(BRIEFING_EVENT_MOVE_ICON);
					tie.addByteToBriefing(0x0);

					tie.addByteToBriefing(item.uniqueID);
					tie.addByteToBriefing(0x0);

					// [X]
					{
						value = x * 100 * 1.6;
						scaledValue = toUint16(value);

						addWord(scaledValue);
					}

					// [Y]
					{
						value = y * 100 * 1.6;
						scaledValue = toUint16(value);

						addWord(scaledValue);
					}

					tie.briefingSize += 8;
				}
			}

			// Increment the briefing time
			if (a + 1 < this.briefingItemTimes.length)
			{
				tmSeconds = this.briefingItemTimes[a + 1] * 25.0;
			}
		}

		// End briefing
		tie.addByteToBriefing(0x0F);
		tie.addByteToBriefing(0x27);
		tie.addByteToBriefing(0x22);

		tie.briefingSize += 3;
	}
};

class MissionType1_Seize_Container
{
	TGT_TEAM_REBEL = 0;
	TGT_PLAYER = 1;
	TGT_STORM_UNIT = 2;

	ARRIVAL_PLAYER = 0;
	ARRIVAL_STORM_UNIT = 1;
	ARRIVAL_STORM_UNIT_DOCKED = 2;

	gunboats_1_skill;
	gunboats_1_waves;
	gunboats_1_warheads;
	gunboats_1_primary_tgt;//Secondary tgt: TEAM_REBEL
	gunboats_1_arrival_delay;
	gunboats_1_arrival_condition;
	gunboats_1_ship_count;

	gunboats_2_skill;
	gunboats_2_waves;
	gunboats_2_warheads;
	gunboats_2_primary_tgt;//Secondary tgt: TEAM_REBEL
	gunboats_2_arrival_delay;
	gunboats_2_arrival_condition;
	gunboats_2_ship_count;

	transport_ship_type;
	transport_skill;
	transport_waves;
	transport_ship_count;
	transport_warheads;
	transport_primary_tgt;
	transport_arrival_delay;
	transport_arrival_condition;

	patrol_ss_type;
	mines;
	gunboats_1;
	gunboats_2;
	tie_launch_ss;
	parked_freighters;
	ss_patrol ;
	containerType = CONT_A;
	specialContainerGroup1;
	targetContainer;
	playerCraftType;
	playerFlightGroup;
	boardingCraftType;
	lifterCraft;
	lifterName;
	tgtContainer;
	stormUnitDelay;
	warshipType = FRIGATE;
	warshipName;
	warship;
	centroid = new Vector3D(0,0,0);
	hyperPoint2;
	jumpPointArrival;
	playerStartPoint = new Vector3D(0,0,0);

	gunboat(shipType, skill, waves, shipCount, warheads, primaryTarget, arrivalCondition, arrivalDelay)
	{
		let minClearence = 0.45;
		let minDistToCentroidA = 2.5;//wp 1 min
		let maxDistToCentroidA = 3;//wp 1 max
		let minDistToCentroidB = 4;//Arrival min
		let maxDistToCentroidB = 8.5;//Arrival max

		let segment = vecUtils.generateConstrainedSegment(new Vector3D(0,0,0), generator.getAvoidancePoints(REGION_2),	generator.avoidanceSegments, 2, 5, 0.22, 5);

		{
			let newFg = new FlightGroup();
			newFg.shipType = shipType;
			newFg.iff = IFF_IMPERIAL;
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.formation = FORMATION_VIC;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.spacing = 2;
			newFg.role = ROLE_SECONDARY_TARGET;
			newFg.roleEnabled = false;
			newFg.shipCount = shipCount;
			newFg.waveCount = waves;

			if (shipType == ESCORT_SHUTTLE || shipType == ASSAULT_TRANSPORT || shipType == ESCORT_TRANSPORT)
			{
				newFg.shipCount = 1;
				newFg.waveCount = 1;
			}

			newFg.skill = skill;
			newFg.warheads = warheads;

			if (arrivalCondition == this.ARRIVAL_PLAYER)
			{
				newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.playerFlightGroup, MUST_HAVE_ARRIVED_IN_REGION, arrivalDelay);
			}

			if (arrivalCondition == this.ARRIVAL_STORM_UNIT)
			{
				newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.lifterCraft, MUST_ARRIVE, arrivalDelay);
			}

			if (arrivalCondition == this.ARRIVAL_STORM_UNIT_DOCKED)
			{
				newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.lifterCraft, MUST_BEGIN_BOARDING, arrivalDelay);
			}

			newFg.setStartPoint(REGION_2, segment.A);
			newFg.hyperspaceDeparturePos = segment.A;

			if(primaryTarget == this.TGT_TEAM_REBEL)
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0, segment.B);
			}

			if (primaryTarget == this.TGT_PLAYER)
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_FLIGHT_GROUP, TARGET_TEAM, this.playerFlightGroup, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0, segment.B);
			}

			if (primaryTarget == this.TGT_STORM_UNIT)
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_FLIGHT_GROUP, TARGET_TEAM, this.lifterCraft, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0, segment.B);
			}

			this.gunboats1 = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}	
	}
	
	TIELaunchSS(warship_arrival_condition, warship_arrival_delay)
	{
		let distances = [ DISTANCE_NEAR, DISTANCE_FAR, DISTANCE_VERY_FAR ];

		let r = distances[rand() % distances.length];

		let wpLength = utils.random_2(3.5, 7);

		let offsetFromCentroid = 3;

		if (r == DISTANCE_NEAR)
		{
			offsetFromCentroid = 2.33 + utils.random_2(0, 0.5);
		}
		else if (r == DISTANCE_FAR)
		{
			offsetFromCentroid = 3.33 + utils.random_2(0, 1);
		}
		else if (r == DISTANCE_VERY_FAR)
		{
			offsetFromCentroid = 4 + utils.random_2(0, 2);
		}

		let spherical1 = vecUtils.toSpherical(this.hyperPoint2.x, this.hyperPoint2.y, this.hyperPoint2.z);
		let maxRandomAngle = 1;

		//Opposite player bouy +/- maxRandomAngle (No avoidance at the mo
		//spherical1.x += 180 * PI / 180;//utils.random_2(-maxRandomAngle * PI / 180, (maxRandomAngle * 2 * PI / 180));
		//spherical1.y += 0 * PI / 180;//utils.random_2(-maxRandomAngle * PI / 180, (maxRandomAngle * 2 * PI / 180));

		let oppositePhi = Math.PI - spherical1.x;
		let oppositeTheta = spherical1.y + Math.PI;

		let segmentLength = 5;

		let tmpSeg = vecUtils.orthogonalSegment(new Vector3D(0,0,0), offsetFromCentroid, oppositePhi, oppositeTheta, segmentLength)
	
		{
			let newFg = new FlightGroup();
			newFg.shipType = this.warshipType;
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_2;
			newFg.player = 0;
			newFg.roleEnabled = true;
			newFg.setStartPoint(0, tmpSeg.A);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.startRegion_FromHyperspace = true;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = 30;
			newFg.hyperspaceDeparturePos = tmpSeg.A;
			newFg.useHyperspaceDepart = true;
			newFg.startRegion = REGION_2;
			newFg.shipCount = 1;
			newFg.roleEnabled = false;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.lifterCraft, MUST_ARRIVE, warship_arrival_delay);
			
			if(rand() % 100 < 50)
			{
				newFg.setDepartureCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, flightGroups_2.length, MUST_HAVE_25_PERCENT_SHIELDS, rand() % 10);
			}

			newFg.abortMissionWhen = ABORT_50_PERCENT_SHIELDS;

			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_SS_PATROL_ATTACK, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_10, 0, 0, tmpSeg.B);
			}

			this.warshipName = newFg.name;
			this.warship = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//Warship wingman
		//if (rand() % 100 < 33)
		//{
			//vector <int> ships = { CORVETTE, MODIFIED_CORVETTE};
			//int ship = ships[rand() % ships.size()];
			//generator.warshipWingman(warship, ship, 0.2);
		//}

		//Standard TIE launch (player target)
		{
			let tiePos = tmpSeg.A;
			tiePos.z += 0.12;

			let newFg = new FlightGroup();
			newFg.shipType = generator.getTIEFighterOrInterceptor();
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.skill = SKILL_NOVICE;
			newFg.player = 0;
			newFg.setStartPoint(0, tiePos);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.arriveFromMotherShip = true;
			newFg.motherShip = this.warship;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = 10;
			newFg.startRegion = REGION_2;
			newFg.shipCount = 3;
			newFg.waveCount = 3;
			newFg.roleEnabled = false;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.warship, MUST_ARRIVE, 7 + rand() % 25);

			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, this.centroid);
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//TIE launch (to target ship param 1)
		{
			let tiePos = this.jumpPointArrival;
			tiePos.z += 0.12;

			let newFg = new FlightGroup();
			newFg.shipType = generator.getTIEFighterOrInterceptor();
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.skill = SKILL_NOVICE;
			newFg.player = 0;
			newFg.setStartPoint(0, tiePos);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.arriveFromMotherShip = true;
			newFg.motherShip = this.warship;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = 10;
			newFg.startRegion = REGION_2;
			newFg.shipCount = 3;
			newFg.waveCount = 3;
			newFg.roleEnabled = false;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.warship, MUST_ARRIVE, 7 + rand() % 25);

			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_FLIGHT_GROUP, TARGET_TEAM, this.lifterCraft, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, this.centroid);
				orderUtils.addOrder(newFg, REGION_2, 1, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, this.centroid);
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	}

	circularPatrol_1(center)
	{
		let avoidanceDist = 0.1;
		let minCntrDist = 0.1;
		let maxCntrDist = 1.0;

		//[Compute avoidance for all craft in tgt region]

		let pointCount = 8;

		let increment = 360 / pointCount;

		//Generate the circle. Vary radius / angle to get avoidance fit for all segments
		let maxAttempts = 256;
		let minAvoidance = 0.35;

		let wps = [];//Final wps

		let curRad = 2.0;//Minimum radius
		let radInd = 0.1;

		for (var i = 0; i < maxAttempts; i++)
		{
			let wpTest = [];

			let curTheta = 0;
			let curPhi = 90;

			//Get current circle
			for (var a = 0; a < pointCount; a++)
			{
				let curPos = vecUtils.orthogonalPointAtAngle(new Vector3D(0, 0, 0), new Vector3D(0,0,1), curRad, curTheta * (PI / 180));

				wpTest.push(curPos);

				curTheta += increment;
			}

			curRad += radInd;

			let allowable = true;
			
			for (var a = 0; a < wpTest.length; a++)
			{
				if (a == wpTest.length - 1)
				{
					let curSeg = new Segment();
					curSeg.A = wpTest[a];
					curSeg.B = wpTest[0];

					for (var b = 0; b < generator.avoidanceSegments.length; b++)
					{
						let d = vecUtils.segmentToSegmentDistance(curSeg, generator.avoidanceSegments[b]);
						if (d < minAvoidance)
						{
							allowable = false;
							break;
						}
					}
				}
				else
				{
					let curSeg = new Segment();
					curSeg.A = wpTest[a];
					curSeg.B = wpTest[a + 1];

					for (var b = 0; b < generator.avoidanceSegments.length; b++)
					{
						let d = vecUtils.segmentToSegmentDistance(curSeg, generator.avoidanceSegments[b]);
						if (d < minAvoidance)
						{
							allowable = false;
							break;
						}
					}
				}

				if (!allowable)
				{
					break;
				}
			}

			if (allowable)
			{
				wps = wpTest;
				break;
			}
		}

		if (wps.length < 1)
		{
			//cout << "ERROR: No waypoint found!" << endl;
			return;
		}

		//Update avoidance
		{
			let curSeg = new Segment();
			curSeg.A = wps[0];
			curSeg.B = wps[wps.length - 1];

			generator.avoidanceSegments.push(curSeg);

			for (var a = 0; a < wps.length - 1; a++)
			{
				let curSeg = new Segment();
				curSeg.A = wps[a];
				curSeg.B = wps[a + 1];

				generator.avoidanceSegments.push(curSeg);
			}
		}

		//[Circular patrolling starship]
		//if (this.ss_patrol)
		{
			let newFg = new FlightGroup();
			newFg.shipType = this.patrol_ss_type;
			newFg.iff = IFF_IMPERIAL;
			newFg.name = generator.getSuitableName(newFg.shipType, newFg.iff, false);
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.startRegion_FromHyperspace = true;
			newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;
			newFg.team = TEAM_IMPERIAL_2;
			newFg.setStartPoint(REGION_2, wps[0]);

			//Todo:
			newFg.setDepartureCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, flightGroupCount, MUST_BE_ATTACKED, 0);

			if (rand() % 100 < 50)
			{
				newFg.setDepartureCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, flightGroupCount, MUST_HAVE_50_PERCENT_SHIELDS, 0);
			}

			newFg.role = ROLE_SECONDARY_TARGET;
			newFg.roleEnabled = false;

			//Get distance of the defending ss
			let radius = 100;

			{
				let distances = { DISTANCE_NEAR, DISTANCE_FAR };
				let r = distances[rand() % distances.length];

				if (r == DISTANCE_NEAR)
				{
					radius = 100 + rand() % 50;
				}
				else
				{
					radius = 100 + rand() % 300;
				}
			}

			radius /= 100;

			//[Region 2 order]
			{
				let newWps = [];
				for (let a = 0; a < wps.length; a++)
				{
					if (a == wps.length - 1)
					{
						newWps.push(wps[wps.length - 1]);
						newWps.push(wps[0]);
						continue;
					}

					if (a == 0)
					{
						newWps.push(wps[1]);
						a++;
					}
					else
					{
						newWps.push(wps[a]);
					}
				}

				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_SS_PATROL_ATTACK, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, newWps);			

				if((rand() % 100 < 50) && this.patrol_ss_type != CORVETTE)
				{
					orderUtils.addOrder(newFg, REGION_2, 1, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, newWps);		
					orderUtils.jumpToOrder(newFg, MUST_HAVE_ARRIVED_IN_REGION, this.playerFlightGroup, TARGET_FLIGHT_GROUP, CONDITION_AT_LEAST_ONE_OF, REGION_2, 1, REGION_2 + 1);
				}
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	}

	//Parked shuttle or transport waits a bit then attacks
	baseTransport(shipType, skill, waves, shipCount, warheads, primaryTarget, arrivalCondition, arrivalDelay)
	{
		let startPoint = new Vector3D(0,0,0);

		let craftCount = 1 + rand() % 3;

		let crafts = [ SHUTTLE, DELTA_TRANSPORT ];
		let craftType = crafts[rand() % crafts.length];

		let segment = vecUtils.generateConstrainedSegment(new Vector3D(0,0,0),
			generator.getAvoidancePoints(REGION_2),
			generator.avoidanceSegments,
			0.25,
			1,
			0.22,
			0.25);

		let newFg = new FlightGroup();
		newFg.shipType = craftType;
		newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
		newFg.iff = IFF_IMPERIAL;
		newFg.team = TEAM_IMPERIAL_2;
		newFg.player = 0;
		newFg.roleEnabled = true;
		newFg.setStartPoint(0, segment.B);//Jump to this point (at an angle depending on this and the 1st WP)
		newFg.startRegion_FromHyperspace = false;
		newFg.arrivalDelayMinutes = 0;
		newFg.arrivalDelaySeconds = 0;
		newFg.useHyperspaceDepart = false;
		newFg.startRegion = REGION_2;
		newFg.shipCount = craftCount;
		newFg.roleEnabled = false;
		
		{
			let waitTime = 120;
			orderUtils.addOrder(newFg, REGION_2, 0, ORDER_WAIT, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, utils.secondsToHexForOrders(waitTime), THROTTLE_0, SPEED_DEFAULT, 0, 0, segment.A);
			orderUtils.addOrder(newFg, REGION_2, 1, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 180, 0, segment.A);
		}

		flightGroups_2[flightGroupCount] = newFg;
		flightGroupCount++;
	}

	radioMessages()
	{
		////////////////////////////////
		//Inflight audio messages

		{
			let curMsg = new InflightMessage();
			curMsg = generator.addRadioMessage_SoloLaunchType();
			curMsg.delaySeconds = 5 + rand() % 7;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}
		
		{
			let curMsg = new InflightMessage();
			curMsg = generator.addRadioMessage_CompleteType();
			curMsg.delaySeconds = 2 + rand() % 4;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_100_PERCENT_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.specialContainerGroup1;
			curMsg.targetQualifier_1 = MUST_BE_BAGGED;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_PROTECT_OUR_RECOVERY_CRAFT;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 3 + rand() % 5;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.lifterCraft;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}
		
		{
			let curMsg = new InflightMessage();
			curMsg = generator.addRadioMessage_ReturnType();
			curMsg.delaySeconds = 2 + rand() % 5;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_100_PERCENT_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_COMPLETE_PRIMARY_GOAL;
			mission.messages.push(curMsg);
		}

		if(this.tie_launch_ss)
		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_WEVE_GOT_IMPERIAL_WARSHIPS_EMERGING_FROM_HYPERSPACE;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 2 + rand() % 4;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.warship;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_ENEMY_ASSAULT_GUNBOATS_EMERGING_FROM_HYPERSPACE;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 3 + rand() % 3;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_SHIP_TYPE;
			curMsg.detail_1 = GUNBOAT + 1;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}
	}

	briefing()
	{
		let currentTime = 0;

		let icon1_ref = 0;
		let icon2_ref = 1;
		let icon3_ref = 2;
		let icon4_ref = 3;
		let icon5_ref = 4;
		let icon6_ref = 5;
		let icon7_ref = 6;
		let icon8_ref = 7;
		let icon9_ref = 9;
		let icon10_ref = 10;

		//[Essential reset]
		let briefingTxtMode = true;
		briefingWrapper.reset();
		mission.briefingStringCount_2 = 0;
		mission.mapTextCount = 0;
		//

		//[Set mission name]

		{
			let names =
			[
				"Steal enemy cargo",
				"Seize Imperial supplies",
				"Capture enemy cargo",
				"Capture Imperial container",
				"Raid supply base",
			]

			mission.missionName = names[rand() % names.length];
			missionTitles.push(mission.missionName);
		}

		//-----------------------------------------------------------------
		//Choose icon & caption positions
		// 
		//Positions to be flipped at random
		let captionPos2 = new Vector2D(-11.2, 2);
		let iconPos1 = new Vector2D(-2, 0);//Hyperbouy
		let iconPos2 = new Vector2D(-8, 1);
		let iconPos3 = new Vector2D(-8, -1);
		let iconDir1 = EAST;
		let iconDir2 = EAST;
		let iconDir3 = EAST;

		//Optionally flip horizontal
		if (rand() % 100 < 50)
		{
			captionPos2 = [ 7.45, 2 ];
			iconPos1 = [ 12, 0 ];//Hyperbouy
			iconPos2 = [ 8, 1 ];
			iconPos3 = [ 8, -1 ];

			iconDir1 = WEST;
			iconDir2 = WEST;
			iconDir3 = WEST;
		}

		let baseIconPos1 = vecUtils.calculate2DPosition(0, 0, 45, utils.random_2(1.0, 2.5));
		let baseIconPos2 = vecUtils.calculate2DPosition(0, 0, -45, utils.random_2(1.0, 2.5));
		let baseIconPos3 = vecUtils.calculate2DPosition(0, 0, -120, utils.random_2(1.0, 2.5));
		let baseIconPos4 = vecUtils.calculate2DPosition(0, 0, 120, utils.random_2(1.0, 2.5));
		//-----------------------------------------------------------------

		//Generate text pt 1 [About base 1]
		{
			let pts_1 = [ "Our Y-Wing patrols have located ", "Todays target is ", "The target is ", "The objective is ", "The mission is a raid on "];
			let pt_1 = pts_1[rand() % pts_1.length];

			let pts_2 = [ "an Imperial supply cache.", "a small Imperial depot.", "an Imperial supply base."];
			let pt_2 = pts_2[rand() % pts_2.length];

			briefingWrapper.addSpecificBriefingText(pt_1 + pt_2, 0);
		}

		briefingWrapper.doZoom(100, 0);

		//briefingWrapper.addIcon(this.tgtShipType, icon1_ref, IFF_IMPERIAL, NORTH, 0, 0, 0.0);
		briefingWrapper.addIcon(this.containerType, icon1_ref, IFF_IMPERIAL, NORTH, 0, 0, 0.0);
		briefingWrapper.doHighlightIcon(icon1_ref, 0, 0.5);
		briefingWrapper.doShowShipData(icon1_ref, 3.25);
		briefingWrapper.doHideShipData(icon1_ref, 6.5);

		currentTime += 6.75;

		if (this.mines)
		{
			briefingWrapper.addIcon(MINE_A, icon2_ref, IFF_IMPERIAL, NORTH, 1, 0, 0.0);
			briefingWrapper.addIcon(MINE_A, icon3_ref, IFF_IMPERIAL, NORTH, -1, 0, 0.0);
			briefingWrapper.addIcon(MINE_A, icon4_ref, IFF_IMPERIAL, NORTH, 0, 1, 0.0);
			briefingWrapper.addIcon(MINE_A, icon5_ref, IFF_IMPERIAL, NORTH, 0, -1, 0.0);

			let pts_1 = [ "Mines have been deployed. Destroy them.", "Clear the defensive minefield.", "Clear the enemy minefield.", "Neutralize the enemy minefield."];
			let pt_1 = pts_1[rand() % pts_1.length];

			briefingWrapper.addSpecificBriefingText(pt_1, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon2_ref, 0, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon3_ref, 0, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon4_ref, 0, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon5_ref, 0, currentTime);
		}

		currentTime += 1.0;
		briefingWrapper.doZoom(50, currentTime);

		if (rand() % 100 < 50)
		{
			briefingWrapper.addIcon(this.playerCraftType, icon6_ref, IFF_REBEL, EAST, -6.25, 1, currentTime);
			briefingWrapper.addIcon(this.boardingCraftType, icon7_ref, IFF_REBEL, EAST, -6.25, -1, currentTime);
			briefingWrapper.addIcon(HYPER_BOUY, icon9_ref, IFF_REBEL, EAST, -8.00, 0, currentTime);
		}
		else
		{
			briefingWrapper.addIcon(this.playerCraftType, icon6_ref, IFF_REBEL, WEST, 6.25, 1, currentTime);
			briefingWrapper.addIcon(this.boardingCraftType, icon7_ref, IFF_REBEL, WEST, 6.25, -1, currentTime);
			briefingWrapper.addIcon(HYPER_BOUY, icon9_ref, IFF_REBEL, WEST, 8.00, 0, currentTime);
		}

		{
			let str  = "";
			str += "You will fly " + generator.getShipString(this.playerCraftType) + " " + this.playerCraftName + ".\n";
			briefingWrapper.addSpecificBriefingText(str, currentTime);
		}

		currentTime += 0.65;
		briefingWrapper.doHighlightIcon(icon6_ref, 0, currentTime);

		{
			let str3 = "";

			if (rand() % 100 < 50)
			{
				str3 += "Protect our " + generator.getShipString(this.boardingCraftType) + " as it captures the cargo.\n";
			}
			else
			{
				str3 += "Provide space superiority while our " + generator.getShipString(this.boardingCraftType) + " captures the cargo.\n";
			}

			currentTime += 3.0;
			briefingWrapper.addSpecificBriefingText(str3, currentTime);
		}

		currentTime += 0.65;
		briefingWrapper.doHighlightIcon(icon7_ref, 0, currentTime);

		currentTime += 3.0;
		briefingWrapper.doZoom(125, currentTime);

		if (rand() % 100 < 50)
		{
			briefingWrapper.addIcon(TIE_FIGHTER, icon8_ref, IFF_IMPERIAL, NORTH, 0, -2, currentTime);
		}
		else
		{
			briefingWrapper.addIcon(TIE_FIGHTER, icon8_ref, IFF_IMPERIAL, NORTH, 0, 2, currentTime);
		}

		currentTime += 1.0;

		{
			let str1 = "";
			str1 = "Destroy any escorting fighters.\n";

			let str2 = "";
			str2 = "Destroy any TIE escorts.\n";

			let txts = [ str1, str2 ];

			let txt = txts[rand() % txts.length];

			briefingWrapper.addSpecificBriefingText(txt, currentTime);
		}

		currentTime += 1.0;
		briefingWrapper.doHighlightIcon(icon8_ref, 0, currentTime);

		currentTime += 4.0;

		let ys = [-5.5, 5.5];
		let curY = ys[rand() % ys.length];

		briefingWrapper.addCaption("Reenforcements?", 0.40, curY, COLOR_RED, currentTime);
		briefingWrapper.doMoveMap(0.40, curY, currentTime);

		currentTime += 0.25;

		{
			let str = "Stay alert for any Imperial reenforcements.\n";
			briefingWrapper.addSpecificBriefingText(str, currentTime);
		}

		briefingWrapper.compile();
	}

	compile()
	{
		//Reset
		flightGroupCount = 0;

		var distFromDefiance = 2;
		var bouy1 = new Vector3D(distFromDefiance, 0, 0);

		//Inital jump Bouy region 1
		{
			var newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "To region 2";
			newFg.iff = IFF_REBEL;
			newFg.player = 0;
			newFg.role = ROLE_HYP_TO_REGION_2;
			newFg.roleEnabled = true;
			newFg.setStartPoint(0, bouy1);
			newFg.startRegion = REGION_1;
			newFg.team = TEAM_HYPER;
			newFg.status1 = STATUS_ALREADY_INSPECTED;

			generator.hyperBouy01 = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//Gunboat 1 (targets TEAM_REBEL)
		{
			this.gunboats_1_primary_tgt = this.TGT_TEAM_REBEL;
			this.gunboats_1_arrival_condition =this. ARRIVAL_PLAYER;
			this.gunboats_1_waves = 1 + rand() % 2;
			this.gunboats_1_ship_count = 1 + rand() % 2;
			this.gunboats_1_skill = SKILL_NOVICE;
			this.gunboats_1_warheads = WARHEADS_NO_WARHEADS;

			if (rand() % 100 < 25)
			{
				this.gunboats_1_warheads = WARHEADS_MISSILE;
			}

			this.gunboats_1_arrival_delay = 35 + rand() % 120;
		}

		//Gunboat 2 (can target storm unit, arrival is always storm unit related)
		{
			let tgts = [ this.TGT_STORM_UNIT, this.TGT_STORM_UNIT, this.TGT_STORM_UNIT, this.TGT_PLAYER, this.TGT_TEAM_REBEL ];
			
			this.tgt = tgts[rand() % tgts.length];
			this.gunboats_2_primary_tgt = this.tgt;

			this.arrivals = [ this.ARRIVAL_STORM_UNIT_DOCKED, this.ARRIVAL_STORM_UNIT ];
			this.gunboats_2_arrival_condition = this.arrivals[rand() % this.arrivals.length];

			this.gunboats_2_waves = 2;
			this.gunboats_2_ship_count = 2;
			this.gunboats_2_skill = SKILL_NOVICE;

			this.gunboats_2_warheads = WARHEADS_NO_WARHEADS;

			//if (rand() % 100 < 100)
			//{
			//	gunboats_2_warheads = WARHEADS_MISSILE;
			//}

			this.gunboats_2_arrival_delay = 30 + rand() % 60;
		}

		//[TIE Launch SS]
		{
			let shipClasses = [ FRIGATE, STRIKE_CRUISER, MODIFIED_FRIGATE, DREADNAUGHT ];
			this.warshipType = shipClasses[rand() % shipClasses.length];
		}

		//[Base patrol SS]
		{
			let shipClasses = [ CORVETTE, MODULAR_CONVEYOR, CARGO_FERRY, XIYTIAR_TRANSPORT, ASSAULT_TRANSPORT, ESCORT_SHUTTLE, ESCORT_TRANSPORT ];
			this.patrol_ss_type = shipClasses[rand() % shipClasses.length];
		}

		//[Enemy attacking transport]
		{
			let shipClasses = [ DELTA_TRANSPORT, SHUTTLE, ESCORT_SHUTTLE, ASSAULT_TRANSPORT, ESCORT_TRANSPORT ];
			this.transport_ship_type = shipClasses[rand() % shipClasses.length];
			this.transport_skill = SKILL_NOVICE;
			this.transport_waves = 1;
			this.transport_ship_count = 1;
			this.transport_warheads = WARHEADS_NO_WARHEADS;
			this.transport_primary_tgt = this.TGT_TEAM_REBEL;
			this.transport_arrival_delay = 30 + rand() % 60;

			let arrivals = [ this.ARRIVAL_STORM_UNIT_DOCKED, this.ARRIVAL_STORM_UNIT, this.ARRIVAL_PLAYER ];
			this.transport_arrival_condition = arrivals[rand() % arrivals.length];
		}

		//////////////////////////////////////////
		//[Random mission setup from choice set arrays]
		let set = rand() % 3;
		
		//Dflt
		{
			this.mines = true;
			this.gunboats_1 = true;
			this.gunboats_2 = false;
			this.tie_launch_ss = true;
			this.parked_freighters = rand() % 2;
			this.ss_patrol = false;
			this.transports = true;
		}
		
		//Set 0
		if(set == 0)
		{
			this.mines = true;
			this.gunboats_1 = true;
			this.gunboats_2 = false;
			this.tie_launch_ss = true;
			this.parked_freighters = rand() % 2;
			this.ss_patrol = false;
			this.transports = false;
		}

		//Set 1
		if (set == 1)
		{
			this.mines = false;
			this.gunboats_1 = true;

			if(rand() % 100 < 50)
			{		
				this.gunboats_2 = true;
			}

			this.tie_launch_ss = false;
			this.parked_freighters = true;
			this.ss_patrol = true;
			this.transports= rand() % 2;
		}

		//Set 2
		if (set == 2)
		{
			this.mines = true;
			this.gunboats_1 = false;
			this.gunboats_2 = false;
			this.tie_launch_ss = true;
			this.parked_freighters = false;
			this.ss_patrol = true;
			this.transports = rand() % 2;
		}

		//////////////////////////////////////////

		this.stormUnitDelay = rand() % 16;

		let mineLayers = 1 + rand() % 2;

		mission.missionName = "Steal Imperial supplies";
		mission.region2Title = "Imperial cache";

		mission.debriefText = " " + debrief.compile(0, 0, MISSION_TYPE_SEIZE_CONTAINER);
		//alert(mission.debriefText);
	
		let containerTypes = [ CONT_A, CONT_B, CONT_D, CONT_C, CONT_E, CONT_G, CONT_H, CONT_F ];
		this.containerType = containerTypes[rand() % containerTypes.length];

		generator.generateRebelFleet_2();

		//[Backdrops] (Sequence)
		generator.generateBackdrops();

		this.playerStartPoint = new Vector3D();

		if (XWAMODE == 1)//XWAU mode
		{
			let wingManPos = new Vector3D();
			wingManPos = generator.commandShipPos;

			if (tourCommandShip == COMMAND_SHIP_DEFIANCE || tourCommandShip== COMMAND_SHIP_INDEPENDENCE)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.defiancePosOffset_XWAU.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.defiancePosOffset_XWAU.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.defiancePosOffset_XWAU.z;
			}

			if (tourCommandShip == COMMAND_SHIP_LIBERTY)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.libertyPosOffset_XWAU.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.libertyPosOffset_XWAU.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.libertyPosOffset_XWAU.z;
			}
		}
		else//XWA std mode
		{
			let wingManPos = new Vector3D();
			wingManPos = generator.commandShipPos;

			if (tourCommandShip == COMMAND_SHIP_DEFIANCE || tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.defiancePosOffset_Std.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.defiancePosOffset_Std.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.defiancePosOffset_Std.z;
			}

			if (tourCommandShip == COMMAND_SHIP_LIBERTY)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.libertyPosOffset_Std.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.libertyPosOffset_Std.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.libertyPosOffset_Std.z;
			}
		}

		//[Player FG]
		{
			let newFg = new FlightGroup();

			newFg.shipType = generator.getRandomRebelFighter();
			newFg.name = "Red";
			this.playerCraftName = newFg.name;
			newFg.iff = IFF_REBEL;
			newFg.player = 1;

			newFg.startPoint = this.playerStartPoint;// Vector3D(-3.0, 0.5, 0.0));//FB LR UD

			newFg.startRegion = REGION_1;
			newFg.startRegion_FromHyperspace = false;
			newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;//.randomWarheads();
			newFg.team = TEAM_REBEL_1;
			newFg.mentionedInBriefing = true;
			newFg.role = ROLE_STRIKE_CRAFT;
			newFg.roleEnabled = false;
			newFg.motherShip = generator.defiance;
			newFg.departViaMothership = true;
			newFg.wingmanGroup = 1;
			newFg.skill = SKILL_OFFICER;
	
			if (rand() % 100 < 50)
			{
				newFg.status1 = STATUS_DOUBLE_SHIELDS;
			}

			//[Setup player warhead choice]
			if(rand() % 100 < 75)
			{
				let warheadTypes = [ 0, 1, 2, 3, 4 ];
				let i = warheadTypes[rand() % warheadTypes.length];

				if (i == 0)
				{
					newFg.allow_adv_missiles = true;
					newFg.allow_adv_torpedoes = true;
					newFg.allow_rockets = true;
					newFg.allow_space_bombs = true;
					newFg.allow_missiles = true;
					newFg.allow_torpedoes = true;
				}

				if (i == 1)
				{
					newFg.allow_rockets = true;
					newFg.allow_space_bombs = true;
					newFg.allow_missiles = true;
					newFg.allow_torpedoes = true;
				}

				if (i == 2)
				{
					newFg.allow_missiles = true;
					newFg.allow_torpedoes = true;
				}

				if (i == 3)
				{
					newFg.allow_adv_missiles = true;
					newFg.allow_adv_torpedoes = true;
				}

				if (i == 4)
				{
					newFg.allow_rockets = true;
					newFg.allow_space_bombs = true;
				}
			}

			{
				let wp1 = new Vector3D(newFg.startPoint.x, newFg.startPoint.y-1, newFg.startPoint.z);
				let waypoints = [];
				waypoints.push(wp1);

				orderUtils.addOrder(newFg, REGION_1, 0, ORDER_HYPER_TO_REGION, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_30, SPEED_DEFAULT, 0, 0, waypoints);
			}

			{
				let wp1 = new Vector3D(0,0,0);
				let waypoints = [];
				waypoints.push(wp1);

				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, waypoints);
			}

			this.playerCraftType = newFg.shipType;
			this.playerFlightGroup = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//Goal '3' to get the correct combined order

		flightGroups_2[this.playerFlightGroup].goal3 = MUST_HAVE_ARRIVED_IN_REGION;
		flightGroups_2[this.playerFlightGroup].goal_3_main_text = "Return to the fleet";
		flightGroups_2[this.playerFlightGroup].goal_3_complete_text = "Return to the fleet";
		flightGroups_2[this.playerFlightGroup].goal_3_fail_text = "Return to the fleet";

		//[Containers]
		{
			//Sequence
			let containerCount = 1 + rand() % 4;

			let radius = 0.3;
			let f = 0;
			let incf = 360 / containerCount;

			let n = rand() % containerCount;
			if (containerCount == 1) { radius = 0; }

			let curZ = -1;

			let cname = generator.getSuitableName(this.containerType, IFF_IMPERIAL, false);

			if (rand() % 100 < 50)//Vertical stack
			{
				let spacing = 0.2 + ((rand() % 5) * 0.1);

				curZ = (-(spacing * (containerCount - 1))) / 2;

				for (var a = 0; a < containerCount; a++)
				{
					
					f += incf;

					let curStartPoint = new Vector3D();// = vecUtils.toCartesan(90 * 3.14 / 180, f * 3.14 / 180, radius);
					curStartPoint.z = curZ;

					curZ += spacing;

					this.tgtShipType = this.containerType;

					let cName = "";
					cName += cname + " " + (a + 1).toString();

					let newFg = new FlightGroup();

					newFg.shipType = this.containerType;
					newFg.iff = IFF_IMPERIAL;

					newFg.name = cName;
					newFg.player = 0;
					newFg.setStartPoint(REGION_2, curStartPoint);
					newFg.startRegion = REGION_2;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;

					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_PRIMARY_TARGET;
					newFg.roleEnabled = true;
					let wp1 = generator.getDesiredStartAngle(newFg.startPoint, 90, 0);
					newFg.setWayPoint(REGION_2, 0, 0, wp1);

					//Add to avoidance
					{
						let curSeg = new Segment();
						//curSeg.A = newFg.startPoint;
						//curSeg.B = newFg.startPoint;
						//generator.avoidanceSegments.push(curSeg);
					}

					if (a == n)
					{
						let cargo = generator.randomCargo_1("");
						newFg.cargo = cargo;
						newFg.specialCargo = cargo;

						this.specialContainerGroup1 = flightGroupCount;
						this.tgtContainer = flightGroupCount;

						newFg.goal1 = MUST_BE_BAGGED;

						newFg.goal_1_complete_text = "Identify and help seize the container";
						newFg.goal_1_fail_text = "Identify and help seize the container";
						newFg.goal_1_main_text = "Identify and help seize the container";

						newFg.must2 = MUST;

						flightGroups_2[flightGroupCount] = newFg;
						flightGroupCount++;
					}
					else
					{
						newFg.role = ROLE_PRIMARY_TARGET;
						newFg.roleEnabled = true;

						flightGroups_2[flightGroupCount] = newFg;
						flightGroupCount++;
					}
				}
			}
			else//Circular
			{
				for (var a = 0; a < containerCount; a++)
				{
					f += incf;

					let curStartPoint = new Vector3D();// = vecUtils.toCartesan(90 * 3.14 / 180, f * 3.14 / 180, radius);
					let radius = 0.25;
					curStartPoint = vecUtils.toCartesan(90 * 3.14 / 180, f * 3.14 / 180, radius);
					curStartPoint.z = 0;

					let tgtShipType =  this.containerType;

					let cName = "";
					cName += cname + " " + (a + 1).toString();

					newFg = new FlightGroup();
					newFg.shipType =  this.containerType;
					newFg.iff = IFF_IMPERIAL;
					newFg.name = cName;
					newFg.player = 0;
					newFg.setStartPoint(REGION_2, curStartPoint);
					newFg.startRegion = REGION_2;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;
					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_PRIMARY_TARGET;
					newFg.roleEnabled = true;
					let wp1 = generator.getDesiredStartAngle(newFg.startPoint, 90, 0);
					newFg.setWayPoint(REGION_2, 0, 0, wp1);

					//Add to avoidance
					{
						let curSeg = new Segment();
						curSeg.A = newFg.startPoint;
						curSeg.B = newFg.startPoint;
						generator.avoidanceSegments.push(curSeg);
					}

					if (a == n)
					{
						let cargo = generator.randomCargo_1("");
						newFg.cargo = cargo;
						newFg.specialCargo = cargo;

						this.specialContainerGroup1 = flightGroupCount;
						this.tgtContainer = flightGroupCount;

						newFg.goal1 = MUST_BE_BAGGED;
						//newFg.goal2Region = REGION_2;

						newFg.goal_1_complete_text = "Identify and help seize the container";
						newFg.goal_1_fail_text = "Identify and help seize the container";
						newFg.goal_1_main_text = "Identify and help seize the container";

						newFg.must2 = MUST;

						flightGroups_2[flightGroupCount] = newFg;
						flightGroupCount++;
					}
					else
					{
						newFg.role = ROLE_PRIMARY_TARGET;
						newFg.roleEnabled = true;

						flightGroups_2[flightGroupCount] = newFg;
						flightGroupCount++;
					}
				}
			}
		}

		//[Mines]
		if (this.mines)
		{
			let radius = utils.random_2(0.3, 0.75);

			if (mineLayers == 1)
			{
				generator.generateMineField(new Vector3D(0, 0, 0), radius, 1 + rand() % 4, true);

			}

			if (mineLayers == 2)
			{
				//Two circular mine fields
				generator.generateMineField(new Vector3D(0, 0, -0.35), radius, 1 + rand() % 4, true);
				generator.generateMineField(new Vector3D(0, 0, 0.35), radius, 1 + rand() % 4, true);
			}
		}

		//Orbital patrol waypoints around the base
		if(this.ss_patrol)
		{
			this.circularPatrol_1(new Vector3D(0, 0, 0));
		}

		//[Base transports]
		if (this.transports)
		{
			this.baseTransport(0, 0, 0, 0, 0, 0, 0, 0);
		}

		//if(parked_freighters)
		//{
		//	cargoTraffic();
		//}

		//[Pickup craft] (Sequence)
		{
			this.stormUnitDelay = 2 + rand() % 10;

			this.boardingCraftType = HEAVY_LIFTER;

			this.hyperPoint2 = vecUtils.toCartesan(((45 + 0 + rand() % 55) * PI / 180), ((45 + 90 + 0 + rand() % 55) * PI / 180), 3);
			
			this.jumpPointArrival = vecUtils.lerp3D(new Vector3D(0, 0, 0), this.hyperPoint2, 0.2);

			newFg = new FlightGroup();
			newFg.shipType = HEAVY_LIFTER;
			newFg.iff = IFF_REBEL;
			newFg.name = generator.getSuitableName(newFg.shipType, newFg.iff, false);
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.startRegion_FromHyperspace = true;
			newFg.hyperspaceDeparturePos = this.hyperPoint2;//Same as nav boy pos
			newFg.useHyperspaceDepart = true;
			newFg.arrivalDelaySeconds = 30;
			newFg.role = ROLE_MISSION_CRITICAL_CRAFT;
			newFg.roleEnabled = true;
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;
			newFg.team = TEAM_REBEL_1;
			newFg.setStartPoint(REGION_2, this.hyperPoint2);
			newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.tgtContainer, MUST_BE_INSPECTED, this.stormUnitDelay);
			newFg.skill = SKILL_OFFICER;
			newFg.mentionedInBriefing = false;//Breaks arrival condition. Dont use for reg 2 craft

			this.lifterName = newFg.name;
			this.lifterType = newFg.shipType;

			if (this.mines)
			{
				newFg.setArrivalCondition_Secondary(CONDITION_100_PERCENT_OF, TARGET_SHIP_CATEGORY, REGION_2, SHIP_CATEGORY_MINES, MUST_BE_DESTROYED, this.stormUnitDelay);
			}

			newFg.role = ROLE_MISSION_CRITICAL_CRAFT;
			//newFg.specialCargo = "Storm Unit";

			newFg.must1 = MUST;
			newFg.goal1 = MUST_COMPLETE_MSSION;
			//newFg.goal1Region = REGION_2;//Dont use or it will break the goal / fail it
			newFg.goal_1_complete_text = generator.getShipString(newFg.shipType) + " " + newFg.name + " must complete mission.";
			newFg.goal_1_fail_text = generator.getShipString(newFg.shipType) + " " + newFg.name + " must complete mission.";
			newFg.goal_1_main_text = generator.getShipString(newFg.shipType) + " " + newFg.name + " must complete mission.";

			//[Region 2 order]
			{
				let waypoints = [];
				waypoints.push(this.jumpPointArrival);
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_PICK_UP, TARGET_FLIGHT_GROUP, TARGET_FLIGHT_GROUP, this.specialContainerGroup1, this.specialContainerGroup1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0x01, waypoints);
			}

			this.lifterCraft = flightGroupCount;

			//Depart once boarded
			{
				orderUtils.addOrder(newFg, REGION_2, 1, ORDER_GO_HOME, TARGET_NONE, TARGET_NONE, this.specialContainerGroup1, this.specialContainerGroup1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, newFg.hyperspaceDeparturePos);
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//[TIE launcher] (Sequence for WP avoidance)
		if (this.tie_launch_ss)
		{
			this.TIELaunchSS(this.ARRIVAL_STORM_UNIT, 15 + rand() % 90);
		}

		//[Gunboat 1]
		if(this.gunboats_1)
		{
			this.gunboat(GUNBOAT, this.gunboats_1_skill, this.gunboats_1_waves, this.gunboats_1_ship_count, this.gunboats_1_warheads, this.gunboats_1_primary_tgt, this.gunboats_1_arrival_condition, this.gunboats_1_arrival_delay);
		}

		//[Gunboat 2]
		if(this.gunboats_2)
		{
			this.gunboat(this.transport_ship_type, this.gunboats_2_skill, this.gunboats_2_waves, this.gunboats_2_ship_count, this.gunboats_2_warheads, this.gunboats_1_primary_tgt, this.gunboats_2_arrival_condition, this.gunboats_2_arrival_delay);
		}

		//Bouy
		{
			let HyperAng1 = rand() % 360;
			let HyperAng2 = rand() % 360;
			let hyperPoint3 = vecUtils.toCartesan((HyperAng1 * PI / 180), (HyperAng2 * PI / 180), 3 + rand() % 5);

			let newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "From region 1";
			newFg.iff = IFF_REBEL;//Must be IFF neutral or it will get attacked
			newFg.player = 0;
			newFg.team = TEAM_HYPER;
			newFg.role = ROLE_HYP_FROM_REGION_1;
			newFg.roleEnabled = true;
			newFg.status1 = STATUS_ALREADY_INSPECTED;
			newFg.setStartPoint(REGION_2, hyperPoint3);//Start point for AIs when jumping to this region?

			let wp1 = generator.getDesiredStartAngle(newFg.startPoint, 90, 0);
			newFg.setWayPoint(REGION_1, 0, 0, wp1);

			newFg.startRegion = REGION_2;
			let shipCount = 1;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//Bouy
		{
			let HyperAng1 = rand() % 360;
			let HyperAng2 = rand() % 360;
			let hyperPoint3 = vecUtils.toCartesan((HyperAng1 * PI / 180), (HyperAng2 * PI / 180), 3 + rand() % 5);

			let newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "To the fleet";
			newFg.iff = IFF_REBEL;//Must be IFF neutral or it will get attacked
			newFg.player = 0;
			newFg.team = TEAM_HYPER;
			newFg.role = ROLE_HYP_TO_REGION_1;
			newFg.roleEnabled = true;
			newFg.status1 = STATUS_ALREADY_INSPECTED;
			newFg.setStartPoint(0, new Vector3D(-3.0, 3.0, 0.0));

			let wp1 = generator.getDesiredStartAngle(newFg.startPoint, 90, 0);
			newFg.setWayPoint(REGION_1, 0, 0, wp1);

			newFg.startRegion = REGION_2;
			let shipCount = 1;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_3, this.specialContainerGroup1, MUST_BE_BAGGED, 0);

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	
		//Bouy
		{
			let segment = vecUtils.generateConstrainedSegment(new Vector3D(0,0,0), generator.getAvoidancePoints(REGION_1),	generator.avoidanceSegments, 1.85, 5, 0.15, 1);

			let newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "From Region 2";
			newFg.iff = IFF_REBEL;
			newFg.player = 0;
			newFg.role = ROLE_HYP_FROM_REGION_2;
			newFg.roleEnabled = true;
			newFg.team = TEAM_HYPER;
			newFg.status1 = STATUS_ALREADY_INSPECTED;
			newFg.setStartPoint(0, segment.A);

			let outPoint = new Vector3D();

				//if (findSafePoint(generator.rebelFleetShipPositions,
				//	new Vector3D(0, 0, 0),
				//	3 + rand() % 2,
				//	0.89,
				//	outPoint,
				//	10000))
				//{
				//	newFg.setStartPoint(0, outPoint);
			    //}
	
			let shipCount = 1;
			newFg.team = TEAM_HYPER;
			newFg.startRegion = REGION_1;
	
			newFg.setWayPoint(REGION_1, 0, 0, generator.commandShipPos);

			//[Get acceptable return bouy pos]
			let minClearence = 0.5;
			let minDistToCentroid = 0.5;
			let maxDistToCentroid = 1.5;
			//let segment = new Segment();
			//let found = vecUtils.generateConstrainedSegment(segment, generator.commandShipPos, generator.rebelFleetShipPositions, generator.avoidanceSegments, minDistToCentroid, maxDistToCentroid, minClearence, 3, generator.commandShipPos, 5);

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//finalPass(difficulty);//Done before intel

		////////////////////////////////
		//Mission description & intel
		
		mission.description = "# ";
		
		mission.description += "You will fly " + generator.getShipString(flightGroups_2[this.playerFlightGroup].shipType) + " " + this.playerCraftName + " 1.";
		//str << "The strike force consists of " << getShipString(flightGroups_2[stormUnit].shipType) << " " << flightGroups_2[stormUnit].name << "." << endl << endl;

		let wingMen = [];
		let wingManCount = 0;
		for (var a = 0; a < flightGroupCount; a++)
		{
			if (a == this.playerFlightGroup)
			{
				continue;
			}

			if (flightGroups_2[a].wingmanGroup == flightGroups_2[this.playerFlightGroup].wingmanGroup)
			{
				wingManCount++;
				wingMen.push(generator.getShipString(flightGroups_2[a].shipType) + " " + flightGroups_2[a].name);
			}
		}

		if (wingManCount == 0)
		{
			//mission.description += "You will have no wingmen." + "\n\n";
		}
		else
		{
			mission.description += "Your wingmen consist of: " + "\n";

			for (var a = 0; a < wingMen.length; a++)
			{
				mission.description +=  "  -" + wingMen[a] + "\n";
			}

			mission.description += "\n";
		}

		if (flightGroups_2[this.playerFlightGroup].warheads != WARHEADS_NO_WARHEADS)
		{
			mission.description += "You will carry a standard load of " + generator.getWarheadString(flightGroups_2[this.playerFlightGroup].warheads) + ".\n\n";
		}
		else
		{
			mission.description += "You will carry no warheads.\n\n";
		}

		if (this.mines)
		{
			mission.description += "Identify the container and destroy any mines to bring in " + generator.getShipString(this.lifterType) + " " + this.lifterName + ".\n\n";
		}
		else
		{
			mission.description += "Identify the container to bring in " + generator.getShipString(this.lifterType) + " " + this.lifterName + ".\n\n";
		}

		for (var a = 0; a < flightGroupCount; a++)
		{
			if (flightGroups_2[a].shipType == GUNBOAT)
			{
				let msgTypes = [ 0, 1, 2 ];
				let i = msgTypes[rand() % msgTypes.length];

				if (i == 0)
				{
					mission.description += "Enemy Assault Gunboats could possibly respond to any attack.\n\n";
				}

				if (i == 1)
				{
					mission.description += "Keep an eye out for Assault Gunboats!\n\n";
				}

				if (i == 2)
				{
					mission.description +=  "Enemy Assault Gunboats may respond.\n\n";
				}

				break;
			}
		}

		this.radioMessages();
		this.briefing();
	}
};

class MissionType2_SS_Recovery
{
	TGT_TEAM_REBEL = 0;
	TGT_PLAYER = 1;
	TGT_STORM_UNIT = 2;
	TGT_PRINCIPLE_CRAFT = 3;

	ARRIVAL_STORM_UNIT_DOCKED = 0;
	ARRIVAL_STORM_UNIT = 1;
	ARRIVAL_PLAYER = 2;

	warshipClass = 0;

	gunboats_1_skill;
	gunboats_1_waves;
	gunboats_1_warheads;
	gunboats_1_primary_tgt;//Secondary tgt: TEAM_REBEL
	gunboats_1_arrival_delay;
	gunboats_1_arrival_condition;
	gunboats_1_ship_count;

	gunboats_2_skill;
	gunboats_2_waves;
	gunboats_2_warheads;
	gunboats_2_primary_tgt;//Secondary tgt: TEAM_REBEL
	gunboats_2_arrival_delay;
	gunboats_2_arrival_condition;
	gunboats_2_ship_count;

	entryRegion2AngleAng1;
	entryRegion2AngleAng2;

	tf_1_ship_type;
	tf_1_primary_tgt;
	tf_1_waves;
	tf_1_ship_count;
	tf_1_skill;
	tf_1_warheads;
	tf_1_ship_type;

	tf_2_ship_type;
	tf_2_primary_tgt;
	tf_2_waves;
	tf_2_ship_count;
	tf_2_skill;
	tf_2_warheads;
	tf_2_ship_type;

	fighter_escort_1_type;
	fighter_escort_1_skill;
	fighter_escort_1_warheads;
	fighter_escort_1_ship_count;

	entryRegion2AngleAng1 = 90;
	entryRegion2AngleAng2 = 180;

	mines;
	gunboats_1;
	gunboats_2;
	tie_launch_ss;
	transports;
	tieEscorts;
	playerStartPoint = new Vector3D(0,0,0);
	centroid  = new Vector3D(0,0,0);
	hyperPoint2;
	hyperPoint3;
	tgtShipType;
	boardingCraftType;
	boardingCraftName;
	warshipClass;
	warshipName;
	principleCraft;
	playerCraftType;
	fighterGroup1;
	stormUnitDelay;
	stormUnit;
	jumpPointArrival;
	wingManPos = new Vector3D(0,0,0);

	radioMessages()
	{

		////////////////////////////////
		//Inflight audio messages

		{
			let curMsg = new InflightMessage();
			curMsg = generator.addRadioMessage_SoloLaunchType();
			curMsg.delaySeconds = 5 + rand() % 7;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}
	
		{
			let curMsg = new InflightMessage();
			curMsg = generator.addRadioMessage_CompleteType();
			curMsg.delaySeconds = 2 + rand() % 4;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_100_PERCENT_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.principleCraft;
			curMsg.targetQualifier_1 = MUST_BE_BAGGED;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_ENEMY_ASSAULT_GUNBOATS_EMERGING_FROM_HYPERSPACE;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 3 + rand() % 3;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_SHIP_TYPE;
			curMsg.detail_1 = GUNBOAT + 1;//+ 1 When using ship type
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}

		if(this.tie_launch_ss)
		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_WEVE_GOT_IMPERIAL_WARSHIPS_EMERGING_FROM_HYPERSPACE;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 3;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.warship;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_PROTECT_STORM_UNIT_WHILE_IT_DOCKS;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 5 + rand() % 4;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.stormUnit;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_STORM_UNIT_IS_UNDER_ATTACK;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = rand() % 4;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.stormUnit;
			curMsg.targetQualifier_1 = MUST_BE_ATTACKED;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg = generator.addRadioMessage_ReturnType();
			//generator.inflightWavesToCopy.push_back(curMsg.wavFileRef);
			curMsg.delaySeconds = 2 + rand() % 5;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_100_PERCENT_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_COMPLETE_PRIMARY_GOAL;	
			mission.messages.push(curMsg);
		}

		if(this.tieEscorts)
		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_ENEMY_FIGHTERS_HEADING_YOUR_WAY;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 4 + rand() % 4;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_HAVE_ARRIVED_IN_REGION;
			mission.messages.push(curMsg);
		}

		if(this.tieEscorts)
		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_YOUVE_TAKEN_OUT_THE_TIE_ESCORTS_EXCELLENT_WORK;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 2;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_100_PERCENT_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.fighterGroup1;
			curMsg.targetQualifier_1 = MUST_BE_DESTROYED;
			mission.messages.push(curMsg);
		}
	}

	gunboat(shipType, skill, waves, shipCount, warheads, primaryTarget, arrivalCondition, arrivalDelay)
	{
		let minClearence = 0.45;
		let minDistToCentroidA = 2.5;//wp 1 min
		let maxDistToCentroidA = 3;//wp 1 max
		let minDistToCentroidB = 4;//Arrival min
		let maxDistToCentroidB = 8.5;//Arrival max

		let segment = vecUtils.generateConstrainedSegment(new Vector3D(0,0,0), generator.getAvoidancePoints(REGION_2),	generator.avoidanceSegments, 2, 5, 0.22, 5);

		{
			let newFg = new FlightGroup();
			newFg.shipType = shipType;
			newFg.iff = IFF_IMPERIAL;
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.formation = FORMATION_VIC;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.spacing = 2;
			newFg.role = ROLE_SECONDARY_TARGET;
			newFg.roleEnabled = false;
			newFg.shipCount = shipCount;
			newFg.waveCount = waves;

			if (shipType == ESCORT_SHUTTLE || shipType == ASSAULT_TRANSPORT || shipType == ESCORT_TRANSPORT)
			{
				newFg.shipCount = 1;
				newFg.waveCount = 1;
			}

			newFg.skill = skill;
			newFg.warheads = warheads;

			if (arrivalCondition == this.ARRIVAL_PLAYER)
			{
				newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.playerFlightGroup, MUST_HAVE_ARRIVED_IN_REGION, arrivalDelay);
			}

			if (arrivalCondition == this.ARRIVAL_STORM_UNIT)
			{
				newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.lifterCraft, MUST_ARRIVE, arrivalDelay);
			}

			if (arrivalCondition == this.ARRIVAL_STORM_UNIT_DOCKED)
			{
				newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.lifterCraft, MUST_BEGIN_BOARDING, arrivalDelay);
			}

			newFg.setStartPoint(REGION_2, segment.A);
			newFg.hyperspaceDeparturePos = segment.A;

			if(primaryTarget == this.TGT_TEAM_REBEL)
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0, segment.B);
			}

			if (primaryTarget == this.TGT_PLAYER)
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_FLIGHT_GROUP, TARGET_TEAM, this.playerFlightGroup, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0, segment.B);
			}

			if (primaryTarget == this.TGT_STORM_UNIT)
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_FLIGHT_GROUP, TARGET_TEAM, this.lifterCraft, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0, segment.B);
			}

			this.gunboats1 = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}	
	}

	TIELaunchSS(warship_arrival_condition, warship_arrival_delay)
	{
		let distances = [ DISTANCE_NEAR, DISTANCE_FAR, DISTANCE_VERY_FAR ];

		let r = distances[rand() % distances.length];

		let wpLength = utils.random_2(3.5, 7);

		let offsetFromCentroid = 2.4;

		if (r == DISTANCE_NEAR)
		{
			offsetFromCentroid = 2.33 + utils.random_2(0, 1.5);
		}
		else if (r == DISTANCE_FAR)
		{
			offsetFromCentroid = 3.33 + utils.random_2(0, 1.4);
		}
		else if (r == DISTANCE_VERY_FAR)
		{
			offsetFromCentroid = 4 + utils.random_2(0, 2.5);
		}

		let spherical1 = vecUtils.toSpherical(this.hyperPoint2.x, this.hyperPoint2.y, this.hyperPoint2.z);
		let maxRandomAngle = 1;

		//Opposite player bouy +/- maxRandomAngle (No avoidance at the mo
		//spherical1.x += 180 * PI / 180;//utils.random_2(-maxRandomAngle * PI / 180, (maxRandomAngle * 2 * PI / 180));
		//spherical1.y += 0 * PI / 180;//utils.random_2(-maxRandomAngle * PI / 180, (maxRandomAngle * 2 * PI / 180));

		let oppositePhi = Math.PI - spherical1.x;
		let oppositeTheta = spherical1.y + Math.PI;

		let segmentLength = 5;

		let tmpSeg = vecUtils.orthogonalSegment(new Vector3D(0,0,0), offsetFromCentroid, oppositePhi, oppositeTheta, segmentLength)
	
		{
			let newFg = new FlightGroup();
			newFg.shipType = this.warshipClass;
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_2;
			newFg.player = 0;
			newFg.roleEnabled = true;
			newFg.setStartPoint(0, tmpSeg.A);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.startRegion_FromHyperspace = true;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = 30;
			newFg.hyperspaceDeparturePos = tmpSeg.A;
			newFg.useHyperspaceDepart = true;
			newFg.startRegion = REGION_2;
			newFg.shipCount = 1;
			newFg.roleEnabled = false;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.stormUnit, MUST_ARRIVE, warship_arrival_delay);
			
			if(rand() % 100 < 50)
			{
				newFg.setDepartureCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, flightGroups_2.length, MUST_HAVE_25_PERCENT_SHIELDS, rand() % 10);
			}

			newFg.abortMissionWhen = ABORT_50_PERCENT_SHIELDS;

			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_SS_PATROL_ATTACK, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_10, 0, 0, tmpSeg.B);
			}

			this.warshipName = newFg.name;
			this.warship = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//Warship wingman
		//if (rand() % 100 < 33)
		//{
			//vector <int> ships = { CORVETTE, MODIFIED_CORVETTE};
			//int ship = ships[rand() % ships.size()];
			//generator.warshipWingman(warship, ship, 0.2);
		//}

		//Standard TIE launch (player target)
		{
			let tiePos = tmpSeg.A;
			tiePos.z += 0.12;

			let newFg = new FlightGroup();
			newFg.shipType = generator.getTIEFighterOrInterceptor();
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.skill = SKILL_NOVICE;
			newFg.player = 0;
			newFg.setStartPoint(0, tiePos);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.arriveFromMotherShip = true;
			newFg.motherShip = this.warship;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = 10;
			newFg.startRegion = REGION_2;
			newFg.shipCount = 3;
			newFg.waveCount = 3;
			newFg.roleEnabled = false;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.warship, MUST_ARRIVE, 7 + rand() % 25);

			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, this.centroid);
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//TIE launch (to target ship param 1)
		{
			let tiePos = this.jumpPointArrival;
			tiePos.z += 0.12;

			let newFg = new FlightGroup();
			newFg.shipType = generator.getTIEFighterOrInterceptor();
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.skill = SKILL_NOVICE;
			newFg.player = 0;
			newFg.setStartPoint(0, tiePos);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.arriveFromMotherShip = true;
			newFg.motherShip = this.warship;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = 10;
			newFg.startRegion = REGION_2;
			newFg.shipCount = 3;
			newFg.waveCount = 3;
			newFg.roleEnabled = false;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.warship, MUST_ARRIVE, 7 + rand() % 25);

			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_FLIGHT_GROUP, TARGET_TEAM, this.lifterCraft, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, this.centroid);
				orderUtils.addOrder(newFg, REGION_2, 1, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, this.centroid);
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	}

	briefing()
	{
		//[Set mission name]

		{
			let names =
			[
				"Seize Imperial vessel",
				"Seize Imperial ship",
				"Starship capture operation",
				"Stranded Imperial vessel",
				"Capture operation",
				"Seize Imperial " + generator.getShipString(this.tgtShipType),
				"Capture of " + generator.getShipString(this.tgtShipType)
			];

			mission.missionName = names[rand() % names.length];
			missionTitles.push(mission.missionName);
		}

		let currentTime = 0;

		let icon1_ref = 0;
		let icon2_ref = 1;
		let icon3_ref = 2;
		let icon4_ref = 3;
		let icon5_ref = 4;
		let icon6_ref = 5;
		let icon7_ref = 6;
		let icon8_ref = 7;
		let icon9_ref = 9;
		let icon10_ref = 10;

		//[Essential reset]
		let briefingTxtMode = true;
		briefingWrapper.reset();
		mission.briefingStringCount_2 = 0;
		mission.mapTextCount = 0;
		//

		//-----------------------------------------------------------------
		//Choose icon & caption positions
		// 
		//Positions to be flipped at random
		let captionPos2 = [ -11.2, 2 ];

		let iconPos1 = [ -2, 0 ];//Hyperbouy
		let iconPos2 = [ -8, 1 ];
		let iconPos3 = [ -8, -1 ];
		let iconDir1 = EAST;
		let iconDir2 = EAST;
		let iconDir3 = EAST;

		//Optionally flip horizontal
		if (rand() % 100 < 50)
		{
			captionPos2 = [ 7.45, 2 ];
			iconPos1 = [ 12, 0 ];//Hyperbouy
			iconPos2 = [ 8, 1 ];
			iconPos3 = [ 8, -1 ];

			iconDir1 = WEST;
			iconDir2 = WEST;
			iconDir3 = WEST;
		}

		let baseIconPos1 = vecUtils.calculate2DPosition(0, 0, 45, utils.random_2(1.0, 2.5));
		let baseIconPos2 = vecUtils.calculate2DPosition(0, 0, -45, utils.random_2(1.0, 2.5));
		let baseIconPos3 = vecUtils.calculate2DPosition(0, 0, -120, utils.random_2(1.0, 2.5));
		let baseIconPos4 = vecUtils.calculate2DPosition(0, 0, 120, utils.random_2(1.0, 2.5));
		//-----------------------------------------------------------------

		//Generate text pt 1 [About base 1]
		{
			let pts_1 = [ "Our patrols have located ", "Todays target is ", "The target is ", "The objective is ", "We will capture " ];
			let pt_1 = pts_1[rand() % pts_1.length];

			let pts_2 = [ "a stranded Imperial ship.", "a disabled Imperial vessel.", "a disabled " + generator.getShipString(this.tgtShipType) + "."];
			let pt_2 = pts_2[rand() % pts_2.length];

			let pts_3 = [" Your mission is to help seize this ship.", " Storm unit will be deployed to capture the ship.", " We will board and capture this ship." ];
			let pt_3 = pts_3[rand() % pts_3.length];

			briefingWrapper.addSpecificBriefingText(pt_1 + pt_2 + pt_3, 0);
		}

		briefingWrapper.doZoom(100, 0);

		briefingWrapper.addIcon(this.tgtShipType, icon1_ref, IFF_IMPERIAL, NORTH, 0, 0, 0.0);
		briefingWrapper.doHighlightIcon(icon1_ref, 0, 0.5);
		briefingWrapper.doShowShipData(icon1_ref, 3.25);
		briefingWrapper.doHideShipData(icon1_ref, 6.5);

		currentTime += 6.75;

		if(this.mines)
		{
			briefingWrapper.addIcon(MINE_A, icon2_ref, IFF_IMPERIAL, NORTH, 1, 0, 0.0);
			briefingWrapper.addIcon(MINE_A, icon3_ref, IFF_IMPERIAL, NORTH, -1, 0, 0.0);
			briefingWrapper.addIcon(MINE_A, icon4_ref, IFF_IMPERIAL, NORTH, 0, 1, 0.0);
			briefingWrapper.addIcon(MINE_A, icon5_ref, IFF_IMPERIAL, NORTH, 0, -1, 0.0);

			let pts_1 = [ "Mines have been deployed to defend the ship. Destroy them.", "Clear the defensive minefield so Storm Unit can dock." ];
			let pt_1 = pts_1[rand() % pts_1.length];

			briefingWrapper.addSpecificBriefingText(pt_1, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon2_ref, 0, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon3_ref, 0, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon4_ref, 0, currentTime);

			currentTime += 0.33;
			briefingWrapper.doHighlightIcon(icon5_ref, 0, currentTime);
		}

		currentTime += 1.0;
		briefingWrapper.doZoom(50, currentTime);

		briefingWrapper.addIcon(this.playerCraftType, icon6_ref, IFF_REBEL, EAST, -6.25, 1, currentTime);
		briefingWrapper.addIcon(this.boardingCraftType, icon7_ref, IFF_REBEL, EAST, -6.25, -1, currentTime);
		briefingWrapper.addIcon(HYPER_BOUY, icon9_ref, IFF_REBEL, EAST, -8.00, 0, currentTime);

		{
			let str = "";
			str = "You will fly " + generator.getShipString(this.playerCraftType) + " " + this.playerCraftName + "\n";
			briefingWrapper.addSpecificBriefingText(str, currentTime);
		}

		currentTime += 0.65;
		briefingWrapper.doHighlightIcon(icon6_ref, 0, currentTime);

		{
			let str1 = "";
			str1 = "Protect " + generator.getShipString(this.boardingCraftType) + " " + this.boardingCraftName + " while it seizes the vessel.\n";
				
			let str2;
			str2 = "Protect Storm Unit" + " while it boards and captures the vessel.\n";

			let str3;
			str3 = "Protect our " + generator.getShipString(this.boardingCraftType) + " as it inserts Storm Unit commandos.\n";

			let str4;
			str4 = generator.getShipString(this.boardingCraftType) + " " + this.boardingCraftName + " will deploy Storm Unit. Give them cover.\n";

			let str5;
			str5 = "Protect " + generator.getShipString(this.boardingCraftType) + " " + this.boardingCraftName + " while it secures the vessel.\n";

			let txts = [str1, str2, str3, str4, str5];

			let txt = txts[rand() % txts.length];
				
			currentTime += 3.0;
			briefingWrapper.addSpecificBriefingText(txt, currentTime);
		}

		currentTime += 0.65;
		briefingWrapper.doHighlightIcon(icon7_ref, 0, currentTime);

		currentTime += 3.0;
		briefingWrapper.doZoom(125, currentTime);

		briefingWrapper.addIcon(TIE_FIGHTER, icon8_ref, IFF_IMPERIAL, NORTH, 0, -2, currentTime);

		currentTime += 1.0;
		{
			
			let str1 =  "Destroy any escorting fighters.\n";

			let str2 =  "Destroy any TIE escorts.\n";

			let	str3 = "Neutralize any starfighter escorts.\n";

			let txts = [ str1, str2, str3];

			let txt = txts[rand() % txts.length];

			briefingWrapper.addSpecificBriefingText(txt, currentTime);
		}

		currentTime += 1.0;
		briefingWrapper.doHighlightIcon(icon8_ref, 0, currentTime);

		currentTime += 4.0;
		briefingWrapper.addCaption("Reenforcements?", 0.40, -5.5, COLOR_RED, currentTime);
		briefingWrapper.doMoveMap(0.40, -5, currentTime);

		currentTime += 0.25;

		{
			let str = "Stay alert for any Imperial reenforcements.\n";
			briefingWrapper.addSpecificBriefingText(str, currentTime);
		}

		briefingWrapper.compile();
	}


	compile()
	{
		//Reset
		flightGroupCount = 0;

		var distFromDefiance = 2;
		var bouy1 = new Vector3D(distFromDefiance, 0, 0);

		//Inital jump Bouy region 1
		{
			var newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "To region 2";
			newFg.iff = IFF_REBEL;
			newFg.player = 0;
			newFg.role = ROLE_HYP_TO_REGION_2;
			newFg.roleEnabled = true;
			newFg.setStartPoint(0, bouy1);
			newFg.startRegion = REGION_1;
			newFg.team = TEAM_HYPER;
			newFg.status1 = STATUS_ALREADY_INSPECTED;

			generator.hyperBouy01 = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//////////////////////////
		//[FG setup]

		//[Gunboat 1 (targets TEAM_REBEL)]
		{
			let crafts = [ GUNBOAT ];

			if (difficulty == DIFFICULTY_EASY)
			{
				crafts = [ GUNBOAT, GUNBOAT, SHUTTLE, DELTA_TRANSPORT ];
			}

			if (difficulty == DIFFICULTY_MEDIUM)
			{
				crafts = [ GUNBOAT, GUNBOAT, SHUTTLE, DELTA_TRANSPORT, ESCORT_SHUTTLE ];
			}

			if (difficulty == DIFFICULTY_HARD)
			{
				crafts = [ GUNBOAT, GUNBOAT, SHUTTLE, DELTA_TRANSPORT, ESCORT_SHUTTLE, ASSAULT_TRANSPORT, ESCORT_TRANSPORT ];
			}

			let craft = crafts[rand() % crafts.length];
			
			this.gunboats_1_craft = craft;
			this.gunboats_1_primary_tgt = this.TGT_TEAM_REBEL;
			this.gunboats_1_arrival_condition = this.ARRIVAL_PLAYER;
			this.gunboats_1_waves = 1 + rand() % 2;
			this.gunboats_1_ship_count = 1 + rand() % 3;

			//Only one craft if dangerous
			if (craft == ESCORT_TRANSPORT || craft == ASSAULT_TRANSPORT || craft == ESCORT_SHUTTLE)
			{
				this.gunboats_1_waves = 1;
				this.gunboats_1_ship_count = 1;
			}

			this.gunboats_1_skill = SKILL_NOVICE;
			this.gunboats_1_warheads = WARHEADS_NO_WARHEADS;

			if (rand() % 100 < 25)
			{
				this.gunboats_1_warheads = WARHEADS_MISSILE;
			}

			this.gunboats_1_arrival_delay = 35 + rand() % 120;
		}

		//[Gunboat 2 (can target storm unit OR objective ship, arrival is always storm unit related)]
		{
			let tgts = [ this.TGT_STORM_UNIT, this.TGT_STORM_UNIT, this.TGT_STORM_UNIT, this.TGT_PLAYER, this.TGT_TEAM_REBEL ];
			let tgt = tgts[rand() % tgts.length];
			this.gunboats_2_primary_tgt = tgt;

			this.gunboats_2_craft = GUNBOAT;

			let arrivals = [ this.ARRIVAL_STORM_UNIT_DOCKED, this.ARRIVAL_STORM_UNIT ];
			this.gunboats_2_arrival_condition = arrivals[rand() % arrivals.length];

			this.gunboats_2_waves = 2;
			this.gunboats_2_ship_count = 2;
			this.gunboats_2_skill = SKILL_NOVICE;

			this.gunboats_2_warheads = WARHEADS_NO_WARHEADS;

			if (rand() % 100 < 33)
			{
				this.gunboats_2_warheads = WARHEADS_MISSILE;
			}

			this.gunboats_2_arrival_delay = 30 + rand() % 60;
		}

		//[TIE Launch SS]
		{
			let warShipClasses = [ FRIGATE, STRIKE_CRUISER, MODIFIED_FRIGATE, DREADNAUGHT ];
			this.warshipClass = warShipClasses[rand() % warShipClasses.length];
		}

		//From reg 1 bouy
		let HyperAng1 = rand() % 360;
		let HyperAng2 = rand() % 360;
		this.hyperPoint3 = vecUtils.toCartesan((HyperAng1 * PI / 180), (HyperAng2 * PI / 180), 3 + rand() % 5);

		//Storm unit
		this.hyperPoint2 = vecUtils.toCartesan(((45 + this.entryRegion2AngleAng1 + rand() % 55) * 3.14 / 180), ((45 + 90 + this.entryRegion2AngleAng2 + rand() % 55) * 3.14 / 180), 1.5);

		this.stormUnitDelay = 2 + rand() % 10;

		//[TF 1] 
		{
			let shipClasses = [ TIE_FIGHTER, TIE_BOMBER, TIE_INTERCEPTOR ];
			this.tf_1_ship_type = shipClasses[rand() % shipClasses.length];

			this.tf_1_primary_tgt = this.TGT_PLAYER;

			this.tf_1_waves = 2;
			this.tf_1_ship_count = 2;
			this.tf_1_skill = SKILL_NOVICE;

			this.tf_1_warheads = WARHEADS_NO_WARHEADS;

			if (this.tf_2_ship_type == TIE_BOMBER)
			{
				let warheads = [ WARHEADS_MISSILE, WARHEADS_NO_WARHEADS, WARHEADS_NO_WARHEADS, WARHEADS_NO_WARHEADS ];
				this.tf_1_warheads = warheads[rand() % warheads.length];
			}
		}

		//[TF 2]
		{
			let shipClasses = [ TIE_FIGHTER, TIE_BOMBER, TIE_INTERCEPTOR ];
			this.tf_2_ship_type = shipClasses[rand() % shipClasses.length];

			let tgts = [ this.TGT_STORM_UNIT, this.TGT_STORM_UNIT, this.TGT_PRINCIPLE_CRAFT, this.TGT_PRINCIPLE_CRAFT, this.TGT_PLAYER];
			let tgt = tgts[rand() % tgts.length];
			this.tf_2_primary_tgt = tgt;

			this.tf_2_waves = 2;
			this.tf_2_ship_count = 2;
			this.tf_2_skill = SKILL_NOVICE;
			this.tf_2_warheads = WARHEADS_NO_WARHEADS;

			if (this.tf_2_ship_type == TIE_BOMBER)
			{
				let warheads = [ WARHEADS_MISSILE, WARHEADS_MISSILE, WARHEADS_TORPEDO ];
				this.tf_2_warheads = warheads[rand() % warheads.length];
			}
		}

		//[Escort TIEs]
		{
			if (difficulty == DIFFICULTY_EASY)
			{
				let shipClasses = [ TIE_FIGHTER, TIE_BOMBER, TIE_INTERCEPTOR ];
				this.fighter_escort_1_type = shipClasses[rand() % shipClasses.length];
			}
			else if (difficulty == DIFFICULTY_MEDIUM)
			{
				let shipClasses = [ TIE_FIGHTER, TIE_BOMBER, TIE_INTERCEPTOR, TIE_ADVANCED ];
				this.fighter_escort_1_type = shipClasses[rand() % shipClasses.length];
			}
			else if (difficulty == DIFFICULTY_HARD)
			{
				let shipClasses = [  TIE_INTERCEPTOR, TIE_ADVANCED];
				this.fighter_escort_1_type = shipClasses[rand() % shipClasses.length];
			}

			this.fighter_escort_1_skill = SKILL_NOVICE;
			this.fighter_escort_1_warheads = WARHEADS_NO_WARHEADS;
			this.fighter_escort_1_ship_count = 2 + rand() % 3;
		}

		//[FG master switches]
		this.mines = true;
		this.gunboats_1 = true;
		this.gunboats_2 = false;
		this.tie_launch_ss = rand() % 2;
		this.transports = true;
		this.tieEscorts = rand() % 2;
		//////////////////////////

		mission.region2Title = "Imperial ship";
		mission.debriefText = " " + debrief.compile(0, 0, MISSION_TYPE_SS_RECOVERY);

		generator.generateRebelFleet_2();
		generator.generateBackdrops();

		this.playerStartPoint = new Vector3D();

		if (XWAMODE == 1)//XWAU mode
		{
			let wingManPos = new Vector3D();
			wingManPos = generator.commandShipPos;

			if (tourCommandShip == COMMAND_SHIP_DEFIANCE || tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.defiancePosOffset_XWAU.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.defiancePosOffset_XWAU.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.defiancePosOffset_XWAU.z;
			}

			if (tourCommandShip == COMMAND_SHIP_LIBERTY)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.libertyPosOffset_XWAU.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.libertyPosOffset_XWAU.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.libertyPosOffset_XWAU.z;
			}
		}
		else//XWA std mode
		{
			let wingManPos = new Vector3D();
			wingManPos = generator.commandShipPos;

			if (tourCommandShip == COMMAND_SHIP_DEFIANCE || tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.defiancePosOffset_Std.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.defiancePosOffset_Std.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.defiancePosOffset_Std.z;
			}

			if (tourCommandShip== COMMAND_SHIP_LIBERTY)
			{
				this.playerStartPoint.x = generator.commandShipPos.x + generator.libertyPosOffset_Std.x;
				this.playerStartPoint.y = generator.commandShipPos.y + generator.libertyPosOffset_Std.y;
				this.playerStartPoint.z = generator.commandShipPos.z + generator.libertyPosOffset_Std.z;
			}
		}
		
		//[Player FG]
		{
			let newFg = new FlightGroup();

			newFg.shipType = generator.getRandomRebelFighter();
			newFg.name = "Red";
			this.playerCraftName = newFg.name;
			newFg.iff = IFF_REBEL;
			newFg.player = 1;

			newFg.startPoint = this.playerStartPoint;// Vector3D(-3.0, 0.5, 0.0));//FB LR UD

			newFg.startRegion = REGION_1;
			newFg.startRegion_FromHyperspace = false;
			newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;//.randomWarheads();
			newFg.team = TEAM_REBEL_1;
			newFg.mentionedInBriefing = true;
			newFg.role = ROLE_STRIKE_CRAFT;
			newFg.roleEnabled = false;
			newFg.motherShip = generator.defiance;
			newFg.departViaMothership = true;
			newFg.wingmanGroup = 1;
			newFg.skill = SKILL_OFFICER;
	
			if (rand() % 100 < 50)
			{
				newFg.status1 = STATUS_DOUBLE_SHIELDS;
			}

			//[Setup player warhead choice]
			if(rand() % 100 < 75)
			{
				let warheadTypes = [ 0, 1, 2, 3, 4 ];
				let i = warheadTypes[rand() % warheadTypes.length];

				if (i == 0)
				{
					newFg.allow_adv_missiles = true;
					newFg.allow_adv_torpedoes = true;
					newFg.allow_rockets = true;
					newFg.allow_space_bombs = true;
					newFg.allow_missiles = true;
					newFg.allow_torpedoes = true;
				}

				if (i == 1)
				{
					newFg.allow_rockets = true;
					newFg.allow_space_bombs = true;
					newFg.allow_missiles = true;
					newFg.allow_torpedoes = true;
				}

				if (i == 2)
				{
					newFg.allow_missiles = true;
					newFg.allow_torpedoes = true;
				}

				if (i == 3)
				{
					newFg.allow_adv_missiles = true;
					newFg.allow_adv_torpedoes = true;
				}

				if (i == 4)
				{
					newFg.allow_rockets = true;
					newFg.allow_space_bombs = true;
				}
			}

			{
				let wp1 = new Vector3D(newFg.startPoint.x, newFg.startPoint.y-1, newFg.startPoint.z);
				let waypoints = [];
				waypoints.push(wp1);

				orderUtils.addOrder(newFg, REGION_1, 0, ORDER_HYPER_TO_REGION, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_30, SPEED_DEFAULT, 0, 0, waypoints);
			}

			{
				let wp1 = new Vector3D(0,0,0);
				let waypoints = [];
				waypoints.push(wp1);

				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, waypoints);
			}

			this.playerCraftType = newFg.shipType;
			this.playerFlightGroup = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
				
			flightGroups_2[this.playerFlightGroup].goal3 = MUST_HAVE_ARRIVED_IN_REGION;
			flightGroups_2[this.playerFlightGroup].goal_3_main_text = "Return to the fleet";
			flightGroups_2[this.playerFlightGroup].goal_3_complete_text = "Return to the fleet";
			flightGroups_2[this.playerFlightGroup].goal_3_fail_text = "Return to the fleet";
		}

		//[Objective ship]

		let HyperAngPhi = rand() % 360;
		let HyperAngTheta = rand() % 360;

		this.entryRegion2AngleAng1 = HyperAngPhi;
		this.entryRegion2AngleAng2 = HyperAngTheta;

		this.tgtShipType = generator.randomMediumShip();
		let shipName = generator.getSuitableName(this.tgtShipType, IFF_IMPERIAL, false);

		{
			let wp = vecUtils.toCartesan(((90 + this.entryRegion2AngleAng1 + rand() % 55) * PI / 180), ((90 + 90 + this.entryRegion2AngleAng2 + rand() % 55) * PI / 180), 2.5);
			let startPoint = new Vector3D(0, 0, 0);// = vecUtils.toCartesan(90 * (3.14 / 180), (23 + 180) * (PI / 180), 0.8);
			let hyperPoint1 = vecUtils.displaceVectorTowards(wp, startPoint, -0.4);

			let newFg = new FlightGroup();
			newFg.shipType = this.tgtShipType;
			newFg.name = shipName;
			newFg.iff = IFF_IMPERIAL;
			newFg.player = 0;
			newFg.setStartPoint(REGION_2, startPoint);
			newFg.startRegion = REGION_2;
			newFg.formation = FORMATION_STACKED_HIGH;
			newFg.hyperspaceDeparturePos = hyperPoint1;
			newFg.useHyperspaceDepart = true;//Essential
			newFg.shipCount = 1;
			newFg.team = TEAM_BLUE;
			newFg.spacing = 2;
			newFg.role = ROLE_PRIMARY_TARGET;
			newFg.cargo = generator.randomCargo_1("");

			newFg.goal1 = MUST_BE_BAGGED;
			newFg.roleEnabled = true;

			newFg.goal_1_main_text = generator.getShipString(newFg.shipType) + " " + shipName + " must be seized.";
			newFg.goal_1_fail_text = generator.getShipString(newFg.shipType) + " " + shipName + " was not seized.";
			newFg.goal_1_complete_text = generator.getShipString(newFg.shipType) + " " + shipName + " was seized.";

			newFg.status1 = STATUS_NO_SHIELDS;

			newFg.setWayPoint(REGION_2, 0, 0, wp);
			newFg.setWayPoint(REGION_2, 1, 0, wp);
			newFg.setWayPoint(REGION_2, 2, 0, wp);

			//Reg 2 order 1
			{
				//vector <Vector3D> waypoints;
				//waypoints.push_back(Vector3D(bouy1Position.x + 0.1, bouy1Position.y, bouy1Position.z));
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_DISABLED, TARGET_NONE, TARGET_NONE, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_0, SPEED_DEFAULT, 0, 0, wp);
			}

			//Reg 2 order 1
			{
				orderUtils.addOrder(newFg, REGION_2, 1, ORDER_WAIT, TARGET_NONE, TARGET_NONE, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, wp);
			}

			//Reg 2 order 1
			{
				orderUtils.addOrder(newFg, REGION_2, 2, ORDER_SS_PATROL_WAYPOINTS, TARGET_NONE, TARGET_NONE, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, wp);
			}

			//Reg 2 order 1
			{
				//vector <Vector3D> waypoints;
				//waypoints.push_back(Vector3D(bouy1Position.x + 0.1, bouy1Position.y, bouy1Position.z));
				orderUtils.addOrder(newFg, REGION_2, 3, ORDER_GO_HOME, TARGET_NONE, TARGET_NONE, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, wp);
			}

			this.principleCraft = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//[Circular patrolling fighter craft]
		if (this.tieEscorts)
		{
			let newFg = new FlightGroup();
			newFg.shipType = this.fighter_escort_1_type;
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
			newFg.iff = IFF_IMPERIAL;
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.startRegion_FromHyperspace = true;
			newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
			newFg.shipCount = this.fighter_escort_1_ship_count;
			newFg.warheads = this.fighter_escort_1_warheads;
			newFg.roleEnabled = false;
			newFg.skill = this.fighter_escort_1_skill;

			if (this.fighter_escort_1_type == TIE_BOMBER || this.fighter_escort_1_type == TIE_ADVANCED)
			{
				newFg.warheads = generator.addMissiles(80);
			}

			newFg.team = TEAM_IMPERIAL_1;

			let wps = generator.generateWaypoints(new Vector3D(0,0,0), 1.0 + (rand() % 3), 8);

			newFg.setStartPoint(REGION_2, wps[wps.length - 1]);//It must not match the last wp or it will get stuck

			{
				//Reg 2 order 1
				{
					orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, wps);
				}

				//Reg 2 order 1
				{
					orderUtils.addOrder(newFg, REGION_2, 1, ORDER_SS_PATROL_WAYPOINTS, TARGET_NONE, TARGET_NONE, 0x0, 0x0, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, wps);
				}
			}

			this.fighterGroup1 = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//[Storm Unit]
		{
			let boardingCrafts = [];
			boardingCrafts.push(DELTA_TRANSPORT);
			boardingCrafts.push(ASSAULT_TRANSPORT);
			boardingCrafts.push(ESCORT_SHUTTLE);
			boardingCrafts.push(ESCORT_TRANSPORT);
			boardingCrafts.push(SHUTTLE);
			this.boardingCraftType = boardingCrafts[rand() % boardingCrafts.length];

			this.boardingCraftName = generator.getSuitableName(this.boardingCraftType, IFF_REBEL, false);

			let boardingCraftShip = generator.getShipString(this.boardingCraftType);

			this.jumpPointArrival = vecUtils.lerp3D(new Vector3D(0, 0, 0), this.hyperPoint2, 0.2);

			let newFg = new FlightGroup();
			newFg.shipType = this.boardingCraftType;
			newFg.iff = IFF_REBEL;
			newFg.name = this.boardingCraftName;
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.startRegion_FromHyperspace = true;
			newFg.hyperspaceDeparturePos = this.hyperPoint2;//Same as nav boy pos
			newFg.arrivalDelaySeconds = this.stormUnitDelay;//OK
			newFg.arrivalDelayMinutes = 0;//OK
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;
			newFg.team = TEAM_REBEL_1;
			newFg.setStartPoint(REGION_2, this.hyperPoint2);
			newFg.role = ROLE_MISSION_CRITICAL_CRAFT;
			newFg.roleEnabled = true;
			newFg.mentionedInBriefing = false;//Must not be mentioned in briefing - error with arrival
			newFg.specialCargo = "Storm Unit";

			if(this.tieEscorts)
			{
				newFg.setArrivalCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, this.fighterGroup1, MUST_BE_DESTROYED, this.stormUnitDelay);
			}

			if (this.mines)
			{
				newFg.setArrivalCondition_Secondary(CONDITION_100_PERCENT_OF, TARGET_SHIP_CATEGORY, REGION_2, SHIP_CATEGORY_MINES, MUST_BE_DESTROYED, this.stormUnitDelay);
			}

			//newFg.setDepartureCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, specialContainerGroup1, MUST_BE_BOARDED, 0);
			newFg.must1 = MUST;
			newFg.goal1 = MUST_COMPLETE_MSSION;
			newFg.goal_1_complete_text = "Storm Unit completed its mission.";
			newFg.goal_1_fail_text = "Storm Unit did not complete its mission.";
			newFg.goal_1_main_text = "Storm Unit must complete its mission.";

			this.stormUnit = flightGroupCount;

			let dockingTime = 25 + rand() % 60;

			//[Region 2 order]

			//Reg 2 order 1
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_BOARD_TO_CAPTURE, TARGET_FLIGHT_GROUP, TARGET_FLIGHT_GROUP, this.principleCraft, this.principleCraft, utils.secondsToHexForOrders(dockingTime), THROTTLE_100, SPEED_DEFAULT, 0, 0x01, new Vector3D(0, 0, 0));
			}

			//Reg 2 order 1
			{
				orderUtils.addOrder(newFg, REGION_2, 1, ORDER_GO_HOME, TARGET_NONE, TARGET_NONE, 0, 0, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, this.jumpPointArrival);
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//[TIE launcher] (Sequence for WP avoidance)
		if (this.tie_launch_ss)
		{
			this.TIELaunchSS(this.ARRIVAL_STORM_UNIT, 15 + rand() % 90);
		}

		//[Gunboat 1]
		if(this.gunboats_1)
		{
			this.gunboat(GUNBOAT, this.gunboats_1_skill, this.gunboats_1_waves, this.gunboats_1_ship_count, this.gunboats_1_warheads, this.gunboats_1_primary_tgt, this.gunboats_1_arrival_condition, this.gunboats_1_arrival_delay);
		}

		//[Gunboat 2]
		if(this.gunboats_2)
		{
			this.gunboat(this.gunboats_2_craft, this.gunboats_2_skill, this.gunboats_2_waves, this.gunboats_2_ship_count, this.gunboats_2_warheads, this.gunboats_1_primary_tgt, this.gunboats_2_arrival_condition, this.gunboats_2_arrival_delay);
		}

		//[Mines]
		if (this.mines)
		{
			//Two circular mine fields
			generator.generateMineField(new Vector3D(0, 0, -0.35), 0.65, 1 + rand() % 4, true);
			generator.generateMineField(new Vector3D(0, 0, 0.35), 0.65, 1 + rand() % 4, true);
		}

		//Bouy
		{
			let HyperAng1 = rand() % 360;
			let HyperAng2 = rand() % 360;
			let hyperPoint3 = vecUtils.toCartesan((HyperAng1 * PI / 180), (HyperAng2 * PI / 180), 3 + rand() % 5);

			let newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "From region 1";
			newFg.iff = IFF_REBEL;//Must be IFF neutral or it will get attacked
			newFg.player = 0;
			newFg.team = TEAM_HYPER;
			newFg.role = ROLE_HYP_FROM_REGION_1;
			newFg.roleEnabled = true;
			newFg.status1 = STATUS_ALREADY_INSPECTED;
			newFg.setStartPoint(REGION_2, hyperPoint3);//Start point for AIs when jumping to this region?

			let wp1 = generator.getDesiredStartAngle(newFg.startPoint, 90, 0);
			newFg.setWayPoint(REGION_1, 0, 0, wp1);

			newFg.startRegion = REGION_2;
			let shipCount = 1;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//Bouy
		{
			let HyperAng1 = rand() % 360;
			let HyperAng2 = rand() % 360;
			let hyperPoint3 = vecUtils.toCartesan((HyperAng1 * PI / 180), (HyperAng2 * PI / 180), 3 + rand() % 5);

			let newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "To the fleet";
			newFg.iff = IFF_REBEL;//Must be IFF neutral or it will get attacked
			newFg.player = 0;
			newFg.team = TEAM_HYPER;
			newFg.role = ROLE_HYP_TO_REGION_1;
			newFg.roleEnabled = true;
			newFg.status1 = STATUS_ALREADY_INSPECTED;
			newFg.setStartPoint(0, new Vector3D(-3.0, 3.0, 0.0));

			let wp1 = generator.getDesiredStartAngle(newFg.startPoint, 90, 0);
			newFg.setWayPoint(REGION_1, 0, 0, wp1);

			newFg.startRegion = REGION_2;
			let shipCount = 1;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_3, this.principleCraft, MUST_BE_BAGGED, 0);

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	
		//Bouy
		{
			let segment = vecUtils.generateConstrainedSegment(new Vector3D(0,0,0), generator.getAvoidancePoints(REGION_1),	generator.avoidanceSegments, 1.85, 5, 0.15, 1);

			let newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "From Region 2";
			newFg.iff = IFF_REBEL;
			newFg.player = 0;
			newFg.role = ROLE_HYP_FROM_REGION_2;
			newFg.roleEnabled = true;
			newFg.team = TEAM_HYPER;
			newFg.status1 = STATUS_ALREADY_INSPECTED;
			newFg.setStartPoint(0, segment.A);

			let outPoint = new Vector3D();
			
				//if (findSafePoint(generator.rebelFleetShipPositions,
				//	new Vector3D(0, 0, 0),
				//	3 + rand() % 2,
				//	0.89,
				//	outPoint,
				//	10000))
				//{
				//	newFg.setStartPoint(0, outPoint);
			//	}
	

			let shipCount = 1;
			newFg.team = TEAM_HYPER;
			newFg.startRegion = REGION_1;
	
			newFg.setWayPoint(REGION_1, 0, 0, generator.commandShipPos);

			//[Get acceptable return bouy pos]
			let minClearence = 0.5;
			let minDistToCentroid = 0.5;
			let maxDistToCentroid = 1.5;
			//let segment = new Segment();
			//let found = vecUtils.generateConstrainedSegment(segment, generator.commandShipPos, generator.rebelFleetShipPositions, generator.avoidanceSegments, minDistToCentroid, maxDistToCentroid, minClearence, 3, generator.commandShipPos, 5);

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		////////////////////////////////
		//Mission description
		{
			mission.description = "# ";

			let str = "";

			if (flightGroups_2[this.playerFlightGroup].shipType == X_WING || flightGroups_2[this.playerFlightGroup].shipType == A_WING)
			{
				str = "For this mission you will fly an " + generator.getShipString(flightGroups_2[this.playerFlightGroup].shipType) + " designated " + flightGroups_2[this.playerFlightGroup].name + " 1." + "\n" ;
			}
			else//A or An
			{
				str = "For this mission you will fly a " + generator.getShipString(flightGroups_2[this.playerFlightGroup].shipType) + " designated " + flightGroups_2[this.playerFlightGroup].name + " 1." + "\n\n" ;
			}

			let wingMen = [];
			let wingManCount = 0;

			for (var a = 0; a < flightGroupCount; a++)
			{
				if (a == this.playerFlightGroup)
				{
					continue;
				}

				if (flightGroups_2[a].wingmanGroup == flightGroups_2[this.playerFlightGroup].wingmanGroup)
				{
					wingManCount++;
					wingMen.push(generator.getShipString(flightGroups_2[a].shipType) + " " + flightGroups_2[a].name);
				}
			}

			if (wingManCount == 0)
			{
				//str += "You will have no wingmen. \n\n";
			}
			else
			{
				str += "Your wingmen consist of: \n ";

				for (var a = 0; a < wingMen.size(); a++)
				{
					str += "  -" + wingMen[a] + "\n";
				}

				str += "\n";
			}

			if (flightGroups_2[this.playerFlightGroup].warheads != WARHEADS_NO_WARHEADS)
			{
				str += "You will carry a standard load of " + generator.getWarheadString(flightGroups_2[this.playerFlightGroup].warheads) + ". \n\n";
			}
			else
			{
				str += "You will carry no warheads.\n\n";
			}

			str += "Destroy TIE escorts and clear any mines to bring in " + generator.getShipString(this.boardingCraftType) + " " + this.boardingCraftName + " carrying Storm Unit. \n\n";

			for (var a = 0; a < flightGroupCount; a++)
			{
				if (flightGroups_2[a].shipType == GUNBOAT)
				{
					str += "Enemy Assault Gunboats could possibly respond to any attack.\n\n";
					break;
				}
			}

			if (this.tie_launch_ss)
			{
				str += generator.getShipString(this.warshipClass) + " " + this.warshipName + " is operating in the target region and may launch a counter attack.\n";

				str += "Keep TIE fighters away from our mission critical craft.\n\n";
			}

			mission.description += str;
		}

		this.radioMessages();
		this.briefing();
	}
};

class MissionType3_Base_Attack
{
	playerCraftType;
	playerFlightGroup;
	leadCraft;
	defiance;
	hyperBouy01;
	strikeGroup1 = 0;
	rebelStrikeForceType;
	playerSquadron;
	stationType;
	platform;
	stationTies;
	cargoShip1;
	defiancePos;
	playerStartWayPoint = new Vector3D();
	patrol_ss_type;
	stationName;

	//Friendlies
	rebelAISquadronType;
	aiSquadronSkill;
	aiSquadronWarheads;
	aiSquadronShipCount = 2;
	playerWarheads;
	wingManPos = new Vector3D();
	playerStartPoint = new Vector3D();

	//FG determinant switches
	gunboats_1;
	gunboats_2;
	transports;
	tieEscorts;

	warship;

	stationNormal = new Vector3D();

	alliedCorvette;
	alliedTransports;
	playerAsEscort;
	alliedBombers;

	radioMessages()
	{
		////////////////////////////////
		//Inflight audio messages

		{
			let curMsg = new InflightMessage();
			curMsg = generator.	addRadioMessage_AllLaunchType();
			curMsg.delaySeconds = 5 + rand() % 7;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}
	
		{
			let curMsg = new InflightMessage();
			
			let msgs = [ INFLIGHT_ENEMY_TARGETS_DEAD_AHEAD, INFLIGHT_HIT_EM_HARD_AND_GET_OUTA_THERE, INFLIGHT_THERES_THE_TARGET_ALL_UNITS_CLEAR_TO_ENGAGE, INFLIGHT_ALL_UNITS_FIRE_AT_WILL ];
			let msg = msgs[rand() % msgs.length];

			curMsg.message = generator.getInflightString(msg);
			curMsg.wavFileRef = msg;
			curMsg.delaySeconds = 1 + rand() % 5;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_HAVE_ARRIVED_IN_REGION;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			let msgs = [  INFLIGHT_THE_STATION_IS_LAUNCHING_TIES, INFLIGHT_ALERT_THE_STATION_IS_LAUNCHING_FIGHTERS, INFLIGHT_ENEMY_FIGHTERS_HEADING_YOUR_WAY ];
			let msg = msgs[rand() % msgs.length];

			curMsg.message = generator.getInflightString(msg);
			curMsg.wavFileRef = msg;
			curMsg.delaySeconds = rand() % 4;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.stationTies;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_ENEMY_ASSAULT_GUNBOATS_EMERGING_FROM_HYPERSPACE;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 3 + rand() % 3;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_SHIP_TYPE;
			curMsg.detail_1 = GUNBOAT + 1;//+ 1 When using ship type
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_WEVE_GOT_IMPERIAL_WARSHIPS_EMERGING_FROM_HYPERSPACE;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 3;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.warship;
			curMsg.targetQualifier_1 = MUST_ARRIVE;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg.wavFileRef = INFLIGHT_EXCELLENT_JOB_THE_STATION_HAS_BEEN_DESTROYED;
			curMsg.message = generator.getInflightString(curMsg.wavFileRef);
			curMsg.delaySeconds = 3;
			curMsg.conditionRegion_1 = REGION_2;
			curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.platform;
			curMsg.targetQualifier_1 = MUST_BE_DESTROYED;
			mission.messages.push(curMsg);
		}

		{
			let curMsg = new InflightMessage();
			curMsg = generator.addRadioMessage_ReturnType();
			//generator.inflightWavesToCopy.push_back(curMsg.wavFileRef);
			curMsg.delaySeconds = 2 + rand() % 5;
			curMsg.conditionRegion_1 = REGION_1;
			curMsg.condition_1 = CONDITION_100_PERCENT_OF;
			curMsg.target_1 = TARGET_FLIGHT_GROUP;
			curMsg.detail_1 = this.playerFlightGroup;
			curMsg.targetQualifier_1 = MUST_COMPLETE_PRIMARY_GOAL;	
			mission.messages.push(curMsg);
		}
	}

	briefing()
	{
		//[Set mission name]

		{
			let names =
			[
				"Attack on " + this.stationName,
				"Assault on " + this.stationName,
				"Destroy an Imperial " + generator.getShipString(this.stationType),
				"Attack on an Imperial " + generator.getShipString(this.stationType),
				"Assault an Imperial facility",
				"Strike Imperial base",
				"Destroy research facility",
				"Destroy Imperial supply depot"
			];

			mission.missionName = names[rand() % names.length];
			missionTitles.push(mission.missionName);
		}

		let currentTime = 0;

		let icon1_ref = 0;
		let icon2_ref = 1;
		let icon3_ref = 2;
		let icon4_ref = 3;
		let icon5_ref = 4;
		let icon6_ref = 5;
		let icon7_ref = 6;
		let icon8_ref = 7;
		let icon9_ref = 9;
		let icon10_ref = 10;

		//[Essential reset]
		let briefingTxtMode = true;
		briefingWrapper.reset();
		mission.briefingStringCount_2 = 0;
		mission.mapTextCount = 0;
		//

		//-----------------------------------------------------------------
		//Choose icon & caption positions
		// 
		//Positions to be flipped at random
		let captionPos2 = [-8.25, 2 ];
		let iconPos1 = [ -12, 0 ];//Hyperbouy
		let iconPos2 = [ -8, 1 ];
		let iconPos3 = [ -8, -1 ];
		let iconDir1 = EAST;
		let iconDir2 = EAST;
		let iconDir3 = EAST;
		let iconDir8 = EAST;

		//Manually set the positons:
		let cont1Pos = [3.0, 1.0];
		let cont2Pos = [3.0, -1.0];
		let tiePos = [-1.0, 1.0];
		let frtPos = [0.0, -2.0];

		//Optionally flip horizontal
		if (rand() % 100 < 50)
		{
			captionPos2 = [ 8.25, 2 ];

			iconPos1 = [ 12, 0 ];//Hyperbouy
			iconPos2 = [ 8, 1 ];
			iconPos3 = [ 8, -1 ];

			iconDir1 = WEST;
			iconDir2 = WEST;
			iconDir3 = WEST;
		}

		let baseIconPos1 = vecUtils.calculate2DPosition(0 ,0, 45, utils.random_2(1.0, 2.5));
		let baseIconPos2 = vecUtils.calculate2DPosition(0, 0, -45, utils.random_2(1.0, 2.5));
		let baseIconPos3 = vecUtils.calculate2DPosition(0, 0, -120, utils.random_2(1.0, 2.5));
		let baseIconPos4 = vecUtils.calculate2DPosition(0, 0, 120, utils.random_2(1.0, 2.5));
		//-----------------------------------------------------------------

		//Generate text pt 1 [About base 1]
		{
			let pts_1 = [ "Todays target is ", "The target is ", "The objective is ", "Today we attack " ];
			let pt_1 = pts_1[rand() % pts_1.length];

			let pts_2 = [ "a lightly defended Imperial station.", "an Imperial platform.", "an Imperial station.", "an Imperial base."];
			let pt_2 = pts_2[rand() % pts_2.length];

			briefingWrapper.addSpecificBriefingText(pt_1 + pt_2, 0);
		}

		briefingWrapper.doZoom(133, 0);
		briefingWrapper.doZoom(65, 7);

		/////////////////////////////////////////
		// (1/2) [Strike force with capital / medium ships]
		/////////////////////////////////////////
		if (this.rebelStrikeForceType != STRIKE_ONLY_BOMBER_PLAYER)
		{
			//Secondary strike craft info (not capital ship)
			if (flightGroups_2[this.strikeGroup1].shipType != CORVETTE && flightGroups_2[this.strikeGroup1].shipType != MODIFIED_CORVETTE && flightGroups_2[this.strikeGroup1].shipType != MARAUDER_CORVETTE)
			{
				let name = flightGroups_2[this.strikeGroup1].name;
				let craftType = generator.getShipString(flightGroups_2[this.strikeGroup1].shipType);
				let count = "";
				count = (flightGroups_2[this.strikeGroup1].shipCount).toString();

				let pts_1 = [ " group will lead the attack.", " flight will comprise the main strike force.", " group is the primary attack force.", " squadron makes up the main strike force." ];
				let pt_1 = pts_1[rand() % pts_1.length];

				briefingWrapper.addSpecificBriefingText(count + " Alliance " + craftType + "s from " + name + pt_1, 7);

				let strings = [ "Stay close to " + name + " group as it carries out its mission." , "Protect " + name + " flight as it completes its attack." ,"Ensure our " + craftType + "s successfully complete their mission." ];
				let str = strings[rand() % strings.length];

				briefingWrapper.addSpecificBriefingText(str, 13.5);	
			}
			else//Secondary strike craft info (corvette)
			{
				let name = flightGroups_2[this.strikeGroup1].name;
				let craftType = generator.getShipString(flightGroups_2[this.strikeGroup1].shipType);

				let pts_1 = [ " will lead the attack.", " will comprise the main strike force." ];
				let pt_1 = pts_1[rand() % pts_1.length];

				briefingWrapper.addSpecificBriefingText("Alliance " + craftType + " " + name + pt_1, 7);

				if (rand() % 100 < 0)
				{
					briefingWrapper.addSpecificBriefingText("Protect the " + name + " as it completes its attack.", 13.5);
				}
				else
				{
					briefingWrapper.addSpecificBriefingText("Ensure our " + craftType + " successfully completes its mission.", 13.5);
				}
			}

			briefingWrapper.addIcon(flightGroups_2[this.strikeGroup1].shipType, icon4_ref, IFF_REBEL, iconDir2, iconPos2[0], iconPos2[1], 6);
			briefingWrapper.addIcon(flightGroups_2[this.playerFlightGroup].shipType, icon6_ref, IFF_REBEL, iconDir3, iconPos3[0], iconPos3[1], 6);

			briefingWrapper.doShowShipData(icon4_ref, 16.0);
			briefingWrapper.doHideShipData(icon4_ref, 19);
			briefingWrapper.doHighlightIcon(icon4_ref, 0, 7.2);
			briefingWrapper.doHighlightIcon(icon6_ref, 0, 11);

			//Player fg
			{
				let name = flightGroups_2[this.playerFlightGroup].name;
				let craftType = generator.getShipString(flightGroups_2[this.playerFlightGroup].shipType);

				briefingWrapper.addSpecificBriefingText("You will fly " + craftType + " " + name + ". Red Squadron will provide close escort for our attacking craft.", 10);
			}

			briefingWrapper.doHighlightIcon(icon4_ref, 0, 15);

			//Opposing fighters
			{
				briefingWrapper.doZoom(133, 20);

				briefingWrapper.addIcon(flightGroups_2[this.stationTies].shipType, icon8_ref, IFF_IMPERIAL, iconDir8, tiePos[0], tiePos[1], 20.0);

				briefingWrapper.doHighlightIcon(icon8_ref, 0, 21.0);
				briefingWrapper.addSpecificBriefingText("Beware of the bases compliment of TIEs", 20.25);
			}

			//Final txt
			{
				let pts_1 = [ "Destroy everything you can.", "Destroy containers and any Imperial craft in the area.", "Hit hard and get out fast.", "Completely destroy the enemy base.", "The target is to be totally destroyed." ];
				let pt_1 = pts_1[rand() % pts_1.length];

				let pts_2 = [ " Good luck!", " May the force be with you!", " We're counting on you for success in this mission.", " This facility must be taken out of action!",  " The Alliance is counting on your success.", " Good hunting!" ];
				let pt_2 = pts_2[rand() % pts_2.length];

				briefingWrapper.doHighlightIcon(icon2_ref, 0, 25.5);
				briefingWrapper.doHighlightIcon(icon3_ref, 0, 27);
				briefingWrapper.doHighlightIcon(icon1_ref, 0, 29.5);

				briefingWrapper.addSpecificBriefingText(pt_1 + pt_2, 25.25);
			}
		}
		else // (this.rebelStrikeForceType == STRIKE_ONLY_BOMBER_PLAYER)
		{
			let name = flightGroups_2[this.strikeGroup1].name;
			let craftType = generator.getShipString(flightGroups_2[this.strikeGroup1].shipType);
			let count = "";
			count = (flightGroups_2[this.strikeGroup1].shipCount).toString();

			//let pts_1 = [ " group will lead the attack.", " flight will comprise the main strike force.", " group is the primary attack force.", " squadron comprises the main strike force." ];
			//let pt_1 = pts_1[rand() % pts_1.length];

			briefingWrapper.addSpecificBriefingText("The strike force is made up of 4 Y-Wings from Red group.", 7);

			let strings = [ "Help your wingmen complete their mission." ];
			let str = strings[rand() % strings.length];

			briefingWrapper.addSpecificBriefingText(str, 13.5);	

			briefingWrapper.addIcon(flightGroups_2[this.strikeGroup1].shipType, icon4_ref, IFF_REBEL, iconDir2, iconPos2[0], iconPos2[1], 6);
			briefingWrapper.addIcon(flightGroups_2[this.playerFlightGroup].shipType, icon6_ref, IFF_REBEL, iconDir3, iconPos3[0], iconPos3[1], 6);

			briefingWrapper.doShowShipData(icon4_ref, 16.0);
			briefingWrapper.doHideShipData(icon4_ref, 19);
			briefingWrapper.doHighlightIcon(icon4_ref, 0, 7.2);
			briefingWrapper.doHighlightIcon(icon6_ref, 0, 11);

			briefingWrapper.doHighlightIcon(icon4_ref, 0, 15);

			//Opposing fighters
			{
				briefingWrapper.doZoom(133, 20);

				briefingWrapper.addIcon(flightGroups_2[this.stationTies].shipType, icon8_ref, IFF_IMPERIAL, iconDir8, tiePos[0], tiePos[1], 20.0);

				briefingWrapper.doHighlightIcon(icon8_ref, 0, 21.0);
				briefingWrapper.addSpecificBriefingText("Beware of the bases compliment of TIEs", 20.25);
			}

			//Final txt
			{
				let pts_1 = [ "Destroy everything you can.", "Destroy containers and any Imperial craft in the area.", "Hit hard and get out fast.", "Completely destroy the enemy base.", "The target is to be totally destroyed." ];
				let pt_1 = pts_1[rand() % pts_1.length];

				let pts_2 = [ " Good luck!", " May the force be with you!", " We're counting on you for success in this mission.", " This facility must be taken out of action!",  " The Alliance is counting on your success.", " Good hunting!" ];
				let pt_2 = pts_2[rand() % pts_2.length];

				briefingWrapper.doHighlightIcon(icon2_ref, 0, 25.5);
				briefingWrapper.doHighlightIcon(icon3_ref, 0, 27);
				briefingWrapper.doHighlightIcon(icon1_ref, 0, 29.5);

				briefingWrapper.addSpecificBriefingText(pt_1 + pt_2, 25.25);
			}
		}

		briefingWrapper.doHighlightIcon(icon1_ref, 0, 0.33);

		briefingWrapper.addCaption("Imperial base", 0, 2, COLOR_RED, 0);

		briefingWrapper.addCaption("Strike force", captionPos2[0], captionPos2[1], COLOR_GREEN, 6);

		//sys.msg(flightGroups_2[platform].shipType);

		briefingWrapper.addIcon(flightGroups_2[this.platform].shipType, icon1_ref, IFF_IMPERIAL, NORTH, 0, 0, 0);
		briefingWrapper.addIcon(generator.containerType_1, icon2_ref, IFF_IMPERIAL,  EAST, cont1Pos[0], cont1Pos[1], 0);
		briefingWrapper.addIcon(generator.containerType_2, icon3_ref, IFF_IMPERIAL,  EAST, cont2Pos[0], cont2Pos[1], 0);
		briefingWrapper.addIcon(flightGroups_2[this.cargoShip1].shipType, icon7_ref, IFF_IMPERIAL, EAST, frtPos[0], frtPos[1], 0);

		//Show station ship data
		briefingWrapper.doShowShipData(icon1_ref, 3.0);
		briefingWrapper.doHideShipData(icon1_ref, 6.0);

		briefingWrapper.addIcon(HYPER_BOUY, icon5_ref, IFF_REBEL, iconDir1, iconPos1[0], iconPos1[1], 6);

		briefingWrapper.compile();
	}

	//Desc: Generic bombers launching from Imp ship
	bomberLaunch(motherShip, targetType1, targetType2, targetDetail1, targetDetail2)
	{
		//TIE launch (to target ship param 1)
		{
			let tiePos = flightGroups_2[motherShip].startPoint;

			let newFg = new FlightGroup();
			newFg.shipType = TIE_BOMBER;
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.skill = SKILL_NOVICE;
			newFg.player = 0;
			
			newFg.setStartPoint(0, tiePos);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.arriveFromMotherShip = true;
			newFg.motherShip = motherShip;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = 10;
			newFg.startRegion = REGION_2;
			
			newFg.shipCount = 2 + rand() % 3;
			newFg.waveCount = 1 + rand() % 3;

			if(this.rebelStrikeForceType == STRIKE_WARSHIP_ATTACK_1)
			{
				newFg.warheads = WARHEADS_TORPEDO;
			}
			else
			{
				newFg.warheads = WARHEADS_MISSILE;
			}

			newFg.roleEnabled = false;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, motherShip, MUST_ARRIVE, 7 + rand() % 25);
			
			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, targetType1, targetType2, targetDetail1, targetDetail2, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, new Vector3D(2,2,2));
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
			
		}
	}


	//Imps attack the strike force after the base is destroyed, making defence of the corvette etc a requirement
	//Enter at angle roughly opposite to the entry boy for the strike force
	impCounterAttack(reg2Bouy)
	{
		//Spawn dist
		let maxDist = 6;
		let minDist = 3.5;

		{
			let spherical1 = vecUtils.toSpherical(reg2Bouy.x, reg2Bouy.y, reg2Bouy.z);

			let maxRandomAngle = 33;

			//Opposite player bouy +/- maxRandomAngle (No avoidance at the mo
			spherical1.x += utils.random_2(-maxRandomAngle * PI / 180, (maxRandomAngle * 2 * PI / 180));
			spherical1.y += utils.random_2(-maxRandomAngle * PI / 180, (maxRandomAngle * 2 * PI / 180));

			{
				//TIE Launch SS
				let warshipCrafts = [ ISD, VSD, FRIGATE, MODIFIED_FRIGATE, STRIKE_CRUISER, DREADNAUGHT, ESCORT_CARRIER ];
				let warshipCraft = warshipCrafts[rand() % warshipCrafts.length];

				if (warshipCraft == ISD || warshipCraft == VSD)
				{
					maxDist = 7.6;
					minDist = 5.45;
				}

				let attPos1 = vecUtils.toCartesan(spherical1.x + (180 * PI / 180), spherical1.y, utils.random_2(minDist, maxDist));

				let newFg = new FlightGroup();
				newFg.shipType = warshipCraft;
				newFg.iff = IFF_IMPERIAL;
				newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
				newFg.player = 0;
				newFg.startRegion = REGION_2;
				newFg.formation = FORMATION_STACKED_HIGH;
				newFg.shipCount = 1;
				newFg.team = TEAM_IMPERIAL_2;
				newFg.spacing = 2;
				newFg.role = ROLE_SECONDARY_TARGET;
				newFg.roleEnabled = false;
				newFg.hyperspaceDeparturePos = attPos1;
				newFg.useHyperspaceDepart = false;
				newFg.setStartPoint(REGION_2, attPos1);
				newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.platform, MUST_BE_DESTROYED, 30 + rand() % 60);

				{
					let pos = vecUtils.displaceVectorTowards(new Vector3D(0,0,0), attPos1, 0.25);
					orderUtils.addOrder(newFg, REGION_2, 0, ORDER_SS_PATROL_ATTACK, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0, pos);
				}

				this.warship = flightGroupCount;
				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}


		this.bomberLaunch(this.warship, TARGET_FLIGHT_GROUP, TARGET_TEAM, this.strikeGroup1, TEAM_REBEL_1);
		//fighterLaunch(warship, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1);

		//{
			//let curMsg = new InflightMessage();
			//curMsg.message = generator.getInflightString(INFLIGHT_WEVE_GOT_IMPERIAL_WARSHIPS_EMERGING_FROM_HYPERSPACE);
			//curMsg.wavFileRef = INFLIGHT_WEVE_GOT_IMPERIAL_WARSHIPS_EMERGING_FROM_HYPERSPACE;
			//curMsg.delaySeconds = rand() % 4;
			//curMsg.conditionRegion_1 = REGION_2;
			//curMsg.condition_1 = CONDITION_AT_LEAST_ONE_OF;
			//curMsg.target_1 = TARGET_FLIGHT_GROUP;
			//curMsg.detail_1 = this.warship;
			//curMsg.targetQualifier_1 = MUST_ARRIVE;
			//mission.messages.push(curMsg);
		//}

		//[Escort warship]
		//{
			//vector <int> ships = { ESCORT_CARRIER, DREADNAUGHT, FRIGATE, VSD, MODIFIED_FRIGATE, STRIKE_CRUISER, CARRACK_CRUISER, LANCER_FRIGATE };
			//int ship = ships[rand() % ships.size()];
			//generator.warshipWingman(warship1, ship, 1.0);
		//}
	}

	circularPatrol_1(center)
	{
		let avoidanceDist = 0.1;
		let minCntrDist = 0.1;
		let maxCntrDist = 1.0;

		//[Compute avoidance for all craft in tgt region]

		let pointCount = 8;

		let increment = 360 / pointCount;

		//Generate the circle. Vary radius / angle to get avoidance fit for all segments
		let maxAttempts = 256;
		let minAvoidance = 0.35;

		let wps = [];//Final wps

		let curRad = 2.0;//Minimum radius
		let radInd = 0.1;

		for (var i = 0; i < maxAttempts; i++)
		{
			let wpTest = [];

			let curTheta = 0;
			let curPhi = 90;

			//Get current circle
			for (var a = 0; a < pointCount; a++)
			{
				let curPos = vecUtils.orthogonalPointAtAngle(new Vector3D(0, 0, 0), new Vector3D(0,0,1), curRad, curTheta * (PI / 180));

				wpTest.push(curPos);

				curTheta += increment;
			}

			curRad += radInd;

			let allowable = true;
			
			for (var a = 0; a < wpTest.length; a++)
			{
				if (a == wpTest.length - 1)
				{
					let curSeg = new Segment();
					curSeg.A = wpTest[a];
					curSeg.B = wpTest[0];

					for (var b = 0; b < generator.avoidanceSegments.length; b++)
					{
						let d = vecUtils.segmentToSegmentDistance(curSeg, generator.avoidanceSegments[b]);
						if (d < minAvoidance)
						{
							allowable = false;
							break;
						}
					}
				}
				else
				{
					let curSeg = new Segment();
					curSeg.A = wpTest[a];
					curSeg.B = wpTest[a + 1];

					for (var b = 0; b < generator.avoidanceSegments.length; b++)
					{
						let d = vecUtils.segmentToSegmentDistance(curSeg, generator.avoidanceSegments[b]);
						if (d < minAvoidance)
						{
							allowable = false;
							break;
						}
					}
				}

				if (!allowable)
				{
					break;
				}
			}

			if (allowable)
			{
				wps = wpTest;
				break;
			}
		}

		if (wps.length < 1)
		{
			//cout << "ERROR: No waypoint found!" << endl;
			return;
		}

		//Update avoidance
		{
			let curSeg = new Segment();
			curSeg.A = wps[0];
			curSeg.B = wps[wps.length - 1];

			generator.avoidanceSegments.push(curSeg);

			for (var a = 0; a < wps.length - 1; a++)
			{
				let curSeg = new Segment();
				curSeg.A = wps[a];
				curSeg.B = wps[a + 1];

				generator.avoidanceSegments.push(curSeg);
			}
		}

		//[Circular patrolling starship]
		//if (this.ss_patrol)
		{
			let newFg = new FlightGroup();
			newFg.shipType = this.patrol_ss_type;
			newFg.iff = IFF_IMPERIAL;
			newFg.name = generator.getSuitableName(newFg.shipType, newFg.iff, false);
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.startRegion_FromHyperspace = true;
			newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;
			newFg.team = TEAM_IMPERIAL_2;
			newFg.setStartPoint(REGION_2, wps[0]);

			//Todo:
			newFg.setDepartureCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, flightGroupCount, MUST_BE_ATTACKED, 0);

			if (rand() % 100 < 50)
			{
				newFg.setDepartureCondition(CONDITION_100_PERCENT_OF, TARGET_FLIGHT_GROUP, REGION_2, flightGroupCount, MUST_HAVE_50_PERCENT_SHIELDS, 0);
			}

			newFg.role = ROLE_SECONDARY_TARGET;
			newFg.roleEnabled = false;

			//Get distance of the defending ss
			let radius = 100;

			{
				let distances = { DISTANCE_NEAR, DISTANCE_FAR };
				let r = distances[rand() % distances.length];

				if (r == DISTANCE_NEAR)
				{
					radius = 100 + rand() % 50;
				}
				else
				{
					radius = 100 + rand() % 300;
				}
			}

			radius /= 100;

			//[Region 2 order]
			{
				let newWps = [];
				for (let a = 0; a < wps.length; a++)
				{
					if (a == wps.length - 1)
					{
						newWps.push(wps[wps.length - 1]);
						newWps.push(wps[0]);
						continue;
					}

					if (a == 0)
					{
						newWps.push(wps[1]);
						a++;
					}
					else
					{
						newWps.push(wps[a]);
					}
				}

				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_SS_PATROL_ATTACK, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, newWps);			

				if((rand() % 100 < 75) && this.patrol_ss_type != CORVETTE)
				{
					orderUtils.addOrder(newFg, REGION_2, 1, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, newWps);		
					orderUtils.jumpToOrder(newFg, MUST_HAVE_ARRIVED_IN_REGION, this.playerFlightGroup, TARGET_FLIGHT_GROUP, CONDITION_AT_LEAST_ONE_OF, REGION_2, 1, REGION_2 + 1);
				}
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	}

	//Generate Imperial base, maybe platform, containers, freighters. No mines generated here.
	//It is randomly orientated (applied to all base craft)
	//Manage random cargoship arrival etc, TIE launches
	generateBase_1(centroid, region, meta1, meta2, meta3)
	{
		let phi = rand() % 360;
		let theta = rand() % 360;

		//[Make sure it is not 0 or 360, 90, 90 etc as this will cause rot err]
		if (phi < 1.0 || phi > 359.0)
		{
			phi = 1.0;
		}

		if (theta < 1.0 || theta > 359.0)
		{
			theta = 1.0;
		}

		if (phi < 91 && phi > 89)
		{
			phi = 91;
		}

		if (theta < 91 && theta > 89)
		{
			theta = 91;
		}

		let stationAngleX = phi;
		let stationAngleY = theta;

		let platformDirVec = new Vector3D();

		stationAngleX = 90 + stationAngleX;
		stationAngleY = stationAngleY;

		//[Central Platform]
		{
			let newFg = new FlightGroup();

			this.stationName = generator.getName(NAME_PLATFORM);

			if(rand() % 100 < 50)
			{
				this.stationName = generator.getName(NAME_STATION) + " Station";

				if(rand() % 100 < 50)
				{
					this.stationName = generator.getName(NAME_STATION) + " Base";
				}
			}
			
			newFg.shipType = generator.randomStation(IFF_IMPERIAL);
			newFg.iff = IFF_IMPERIAL;
			newFg.name = this.stationName;
			newFg.player = 0;
			newFg.setStartPoint(region, centroid);
			newFg.startRegion = region;
			newFg.formation = FORMATION_STACKED_HIGH;
			newFg.shipCount = 1;
			newFg.team = TEAM_IMPERIAL_3;
			newFg.spacing = 2;
			newFg.role = ROLE_PRIMARY_TARGET;
			newFg.roleEnabled = true;
			newFg.radio = 0x0;

			let wp1 = generator.getDesiredStartAngle(newFg.startPoint, stationAngleX, stationAngleY);
			vecUtils.setVectorMagnitude(wp1, 2);
			newFg.setWayPoint(region, 0, 0, wp1);

			platformDirVec = wp1;

			this.platform = flightGroupCount;

			orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, 0, THROTTLE_0, SPEED_DEFAULT, 0, 0x01, wp1);

			//Add to avoidance
			{
				let curSeg = new Segment;
				curSeg.A = newFg.startPoint;
				curSeg.B = wp1;
				generator.avoidanceSegments.push(curSeg);
			}

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;

			mission.stationName = newFg.name;
			this.stationType = newFg.shipType;
		}

		//Standard TIEs (player target)
		if(1)
		{
			let newFg = new FlightGroup();
			newFg.shipType = generator.getTIE();
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, false);
			newFg.iff = IFF_IMPERIAL;
			newFg.team = TEAM_IMPERIAL_1;
			newFg.skill = SKILL_VETERAN;
			newFg.player = 0;
			newFg.setStartPoint(0, centroid);//Jump to this point (at an angle depending on this and the 1st WP)
			newFg.arriveFromMotherShip = true;
			newFg.motherShip = this.platform;
			newFg.arrivalDelayMinutes = 0;
			newFg.arrivalDelaySeconds = rand() % 100;
			newFg.startRegion = REGION_2;
			newFg.shipCount = 2 + rand() % 3;
			newFg.waveCount = 1 + rand() % 3;
			newFg.roleEnabled = false;

			this.stationTies = flightGroupCount;

			newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, this.playerFlightGroup, MUST_HAVE_ARRIVED_IN_REGION, rand() % 30);

			orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, 0, THROTTLE_100, SPEED_DEFAULT, 0, 0x01, new Vector3D(1,1,1));

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		let p1 = generator.getDesiredStartAngle(centroid, stationAngleX + 90, stationAngleY);
		let p2 = generator.getDesiredStartAngle(centroid, stationAngleX - 90, stationAngleY);
		this.stationNormal = vecUtils.normalize(new Vector3D(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z));

		//[Cargo containers circular pattern]
		if (0)
		{
			let cShipType = CONT_B;
			let cName = generator.getSuitableName(cShipType, IFF_IMPERIAL, 0);

			for (var a = 0; a < 4; a++)
			{
				let str = "";
				str = " " + (a + 1).toString();

				let newFg = new FlightGroup();
				newFg.shipType = cShipType;
				newFg.iff = IFF_IMPERIAL;
				newFg.name = cName + str.str();
				newFg.player = 0;

				newFg.startRegion = region;
				newFg.formation = FORMATION_STACKED_HIGH;
				newFg.shipCount = 1;
				newFg.team = TEAM_IMPERIAL_3;
				newFg.spacing = 2;
				newFg.role = ROLE_SECONDARY_TARGET;
				newFg.roleEnabled = true;

				st = vecUtils.orthogonalPointAtAngle(centroid, this.stationNormal, 1, (a * 90) * (PI / 180));

				newFg.setStartPoint(region, st);

				//Add to avoidance
				{
					let curSeg = new Segment;
					curSeg.A = newFg.startPoint;
					curSeg.B = newFg.startPoint;
					generator.avoidanceSegments.push(curSeg);
				}

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}


		//[Cargo container array]

		//[Cargo containers line pattern]
		if(1)
		{
			//Axis of container placement
			//let st = new Vector3D();
			//st =  vecUtils.orthogonalPointAtAngle(centroid, this.stationNormal, 1, rand() % 365 * (PI / 180));
			//let s1 = vecUtils.displaceVectorTowards(st, centroid, -0.5);

			if(rand() % 100 > 50)
			{
				let cont1 = generator.randomContainer();

				if(1)
				{
					let newFg = new FlightGroup();
					newFg.shipType = cont1;
					newFg.iff = IFF_IMPERIAL;
					newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
					newFg.player = 0;

					generator.containerType_1 = newFg.shipType;

					newFg.startRegion = region;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;
					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_SECONDARY_TARGET;
					newFg.roleEnabled = true;

					let pos = vecUtils.leftOrRightAxisPoint(new Vector3D(0, 0, 0), platformDirVec, this.stationNormal, 0.7, 0.1);

					newFg.setStartPoint(region, pos);
					newFg.setWayPoint(region, 0, 0, new Vector3D(pos.x + platformDirVec.x, pos.y + platformDirVec.y, pos.z + platformDirVec.z));

					//Add to avoidance
					{
						let curSeg = new Segment;
						curSeg.A = newFg.startPoint;
						curSeg.B = newFg.startPoint;
						generator.avoidanceSegments.push(curSeg);
					}

					flightGroups_2[flightGroupCount] = newFg;
					flightGroupCount++;
				}

				if (1)
				{
					let newFg = new FlightGroup();
					newFg.shipType = cont1;
					newFg.iff = IFF_IMPERIAL;
					newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
					newFg.player = 0;

					generator.containerType_2 = newFg.shipType;

					newFg.startRegion = region;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;
					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_SECONDARY_TARGET;
					newFg.roleEnabled = true;

					let pos = vecUtils.leftOrRightAxisPoint(new Vector3D(0, 0, 0), platformDirVec, this.stationNormal, 0.7, -0.1);

					newFg.setStartPoint(region, pos);
					newFg.setWayPoint(region, 0, 0, new Vector3D(pos.x + platformDirVec.x, pos.y + platformDirVec.y, pos.z + platformDirVec.z ));

					//Add to avoidance
					{
						let curSeg = new Segment();
						curSeg.A = newFg.startPoint;
						curSeg.B = newFg.startPoint;
						generator.avoidanceSegments.push(curSeg);
					}

					flightGroups_2[flightGroupCount] = newFg;
					flightGroupCount++;
				}
			}

			if(rand() % 100 > 50)
			{
				let cont1 = generator.randomContainer();

				if (1)
				{
					let newFg = new FlightGroup();
					newFg.shipType = cont1;
					newFg.iff = IFF_IMPERIAL;
					newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
					newFg.player = 0;

					generator.containerType_1 = newFg.shipType;

					newFg.startRegion = region;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;
					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_SECONDARY_TARGET;
					newFg.roleEnabled = true;

					let pos = vecUtils.leftOrRightAxisPoint(new Vector3D(0, 0, 0), platformDirVec, this.stationNormal, 0.93, 0.1);

					newFg.setStartPoint(region, pos);
					newFg.setWayPoint(region, 0, 0, new Vector3D(pos.x + platformDirVec.x, pos.y + platformDirVec.y, pos.z + platformDirVec.z ));


					//Add to avoidance
					{
						let curSeg = new Segment();
						curSeg.A = newFg.startPoint;
						curSeg.B = newFg.startPoint;
						generator.avoidanceSegments.push(curSeg);
					}

					flightGroups_2[flightGroupCount] = newFg;
					flightGroupCount++;
				}

				if (1)
				{
					let newFg = new FlightGroup();
					newFg.shipType = cont1;
					newFg.iff = IFF_IMPERIAL;
					newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
					newFg.player = 0;
					newFg.startRegion = region;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;
					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_PRIMARY_TARGET;
					newFg.roleEnabled = true;

					generator.containerType_2 = newFg.shipType;

					let pos = vecUtils.leftOrRightAxisPoint(new Vector3D(0, 0, 0), platformDirVec, this.stationNormal, 0.93, -0.1);

					newFg.setStartPoint(region, pos);
					newFg.setWayPoint(region, 0, 0, new Vector3D(pos.x + platformDirVec.x, pos.y + platformDirVec.y, pos.z + platformDirVec.z ));

					//Add to avoidance
					{
						let curSeg = new Segment();
						curSeg.A = newFg.startPoint;
						curSeg.B = newFg.startPoint;
						generator.avoidanceSegments.push(curSeg);
					}

					flightGroups_2[flightGroupCount] = newFg;
					flightGroupCount++;
				}
			}

			if(rand() % 100 > 50)
			{
				let cont1 = generator.randomContainer();

				if (1)
				{
					let newFg = new FlightGroup();
					newFg.shipType = cont1;
					newFg.iff = IFF_IMPERIAL;
					newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
					newFg.player = 0;

					generator.containerType_1 = newFg.shipType;

					newFg.startRegion = region;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;
					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_SECONDARY_TARGET;
					newFg.roleEnabled = true;

					let pos = vecUtils.leftOrRightAxisPoint(new Vector3D(0, 0, 0), platformDirVec, this.stationNormal, 1.16, 0.1);

					newFg.setStartPoint(region, pos);
					newFg.setWayPoint(region, 0, 0, new Vector3D(pos.x + platformDirVec.x, pos.y + platformDirVec.y, pos.z + platformDirVec.z));

					//Add to avoidance
					{
						let curSeg = new Segment();
						curSeg.A = newFg.startPoint;
						curSeg.B = newFg.startPoint;
						generator.avoidanceSegments.push(curSeg);
					}

					flightGroups_2[flightGroupCount] = newFg;
					flightGroupCount++;
				}

				if (1)
				{
					let newFg = new FlightGroup();
					newFg.shipType = cont1;
					newFg.iff = IFF_IMPERIAL;
					newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
					newFg.player = 0;
					newFg.startRegion = region;
					newFg.formation = FORMATION_STACKED_HIGH;
					newFg.shipCount = 1;
					newFg.team = TEAM_IMPERIAL_3;
					newFg.spacing = 2;
					newFg.role = ROLE_PRIMARY_TARGET;
					newFg.roleEnabled = true;

					generator.containerType_2 = newFg.shipType;

					let pos = vecUtils.leftOrRightAxisPoint(new Vector3D(0, 0, 0), platformDirVec, this.stationNormal, 1.16, -0.1);

					newFg.setStartPoint(region, pos);
					newFg.setWayPoint(region, 0, 0,  new Vector3D(pos.x + platformDirVec.x, pos.y + platformDirVec.y, pos.z + platformDirVec.z));

					//Add to avoidance
					{
						let curSeg = new Segment();
						curSeg.A = newFg.startPoint;
						curSeg.B = newFg.startPoint;
						generator.avoidanceSegments.push(curSeg);
					}

					flightGroups_2[flightGroupCount] = newFg;
					flightGroupCount++;
				}
			}
		}
	}

	randomCargoship()
	{
		let ships = [];

		ships.push(ACTION_TRANSPORT);
		ships.push(MODULAR_CONVEYOR);
		ships.push(MOBQUET_TRANSPORT);
		ships.push(XIYTIAR_TRANSPORT);
		ships.push(BULK_FREIGHTER);
		ships.push(CARGO_FERRY);
		ships.push(CONTAINER_TRANSPORT);

		let index = rand() % ships.length;

		return ships[index];
	}

	//Some static ships in the area
	cargoTraffic()
	{
		let shipClass = this.randomCargoship();

		generator.getAvoidanceSegments(REGION_1);//Sequence

		let segment = vecUtils.generateConstrainedSegment_3(
			new Vector3D(0, 0, 0),
			[],
			generator.avoidanceSegments,
			1,
			2, 4,
			3, 6
		);

		{
			let newFg = new FlightGroup();
			newFg.shipType = shipClass;
			newFg.iff = IFF_IMPERIAL;
			newFg.shipCount = 1 + rand() % 3;
			newFg.name = generator.getSuitableName(newFg.shipType, IFF_IMPERIAL, 0);
			newFg.player = 0;
			newFg.startRegion = REGION_2;
			newFg.formation = generator.randomFormation();
			newFg.team = TEAM_IMPERIAL_2;
			newFg.spacing = 1;
			newFg.role = ROLE_SECONDARY_TARGET;
			newFg.roleEnabled = false;
			newFg.setStartPoint(REGION_1, segment.A);
			newFg.wingmanGroup = 3;

			{
				orderUtils.addOrder(newFg, REGION_2, 0, ORDER_SS_PATROL_ATTACK, TARGET_IFF, TARGET_IFF, IFF_REBEL, IFF_REBEL, 0, THROTTLE_0, SPEED_DEFAULT, 180, 0, segment.B);
			}

			this.cargoShip1 = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	}


	/////////////////////////////////////////
	//
	/////////////////////////////////////////
	compile()
	{
		//Reset
		flightGroupCount = 0;

		this.distFromDefiance = 2;
		let bouy1 = new Vector3D(this.distFromDefiance, 0, 0);
		
		//Inital jump Bouy region 1
		{
			var newFg = new FlightGroup();
			newFg.shipType = HYPER_BOUY;
			newFg.name = "To region 2";
			newFg.iff = IFF_REBEL;
			newFg.player = 0;
			newFg.role = ROLE_HYP_TO_REGION_2;
			newFg.roleEnabled = true;
			newFg.setStartPoint(0, bouy1);
			newFg.startRegion = REGION_1;
			newFg.team = TEAM_HYPER;
			newFg.status1 = STATUS_ALREADY_INSPECTED;

			this.hyperBouy01 = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		//entryRegion2AngleAng1;
		//entryRegion2AngleAng2;

		this.defiancePos = new Vector3D(0, 0, 0);

		//ToDo: Player escort bombers
		let rebelStrikeForceTypes = [ STRIKE_WARSHIP_ATTACK_1, STRIKE_ONLY_BOMBER_PLAYER, STRIKE_WARSHIP_ATTACK_1 ];
		this.rebelStrikeForceType = rebelStrikeForceTypes[rand() % rebelStrikeForceTypes.length];

		//[1: Warship attack type]
		//[Strike force fighters]
		let aiCrafts = [ Y_WING, X_WING, Z95, A_WING ];
		let craft = aiCrafts[rand() % aiCrafts.length];
		this.rebelAISquadronType = craft;
		
		if (this.rebelAISquadronType == A_WING || this.rebelAISquadronType == Z95)//If the AI squadron is these, so is the player
		{
			this.playerCraftType = this.rebelAISquadronType;

			if(this.rebelStrikeForceType == STRIKE_ONLY_BOMBER_PLAYER)
			{
				this.rebelAISquadronType = Y_WING;
			}
		}
		else
		{
			let crafts = [ X_WING, Z95, A_WING ];
			let craft = crafts[rand() % crafts.length];
			this.playerCraftType = craft;

			if(this.rebelStrikeForceType == STRIKE_ONLY_BOMBER_PLAYER)
			{
				this.rebelAISquadronType = Y_WING;
			}
		}

		if (this.rebelStrikeForceType == STRIKE_ONLY_BOMBER_PLAYER)
		{
			this.playerCraftType = Y_WING;
			this.rebelAISquadronType = Y_WING;
		}

		//leadCraft = MODIFIED_CORVETTE;
		this.aiSquadronSkill = SKILL_VETERAN;
		this.aiSquadronShipCount = 2 + rand() % 3;

		//Assign warheads
		if (this.rebelAISquadronType == Y_WING)
		{
			this.aiSquadronWarheads = WARHEADS_TORPEDO;
		}

		if (this.rebelAISquadronType == X_WING)
		{
			this.aiSquadronWarheads = WARHEADS_TORPEDO;
		}

		if (this.rebelAISquadronType == A_WING)
		{
			this.aiSquadronWarheads = WARHEADS_MISSILE;
		}

		if (this.rebelAISquadronType == Z95)
		{
			this.aiSquadronWarheads = WARHEADS_MISSILE;
		}

		if (this.playerCraftType == Z95)
		{
			this.playerWarheads = WARHEADS_MISSILE;
		}

		if (this.playerCraftType == X_WING)
		{
			this.playerWarheads = WARHEADS_MISSILE;
		}

		if (this.playerCraftType == A_WING)
		{
			this.playerWarheads = WARHEADS_MISSILE;
		}

		if (this.playerCraftType == Y_WING)
		{
			this.playerWarheads = WARHEADS_TORPEDO;
		}

			mission.debriefText = " " + debrief.compile(0, 0, MISSION_TYPE_BASE_ATTACK);

			let distances = [ DISTANCE_NEAR, DISTANCE_FAR, DISTANCE_VERY_FAR ];
			let r = distances[rand() % distances.length];

			let reg2StDist = 2.0;

			if (r == DISTANCE_NEAR)
			{
				reg2StDist = 1.2 + utils.random_2(0, 0.5);
			}
			else if (r == DISTANCE_FAR)
			{
				reg2StDist = 2 + utils.random_2(0, 1);
			}
			else if (r == DISTANCE_VERY_FAR)
			{
				reg2StDist = 3 + utils.random_2(0, 2);
			}

			let initialBouyPosReg2 = new Vector3D(-reg2StDist, 0, 0);
			let departBouyPosReg3 = new Vector3D((-reg2StDist) - 1, 0, 0);

			let HyperAngPhi = rand() % 360;
			let HyperAngTheta = rand() % 360;

			//[Hangar launch player start position]
			//let wingManStartPoint = new Vector3D();
			//this.playerStartPoint = new Vector3D();

			if (XWAMODE == 1)//XWAU mode
			{
				if (tourCommandShip== COMMAND_SHIP_DEFIANCE || tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
				{
					this.playerStartPoint.x = generator.commandShipPos.x + generator.defiancePosOffset_XWAU.x;
					this.playerStartPoint.y = generator.commandShipPos.y + generator.defiancePosOffset_XWAU.y;
					this.playerStartPoint.z = generator.commandShipPos.z + generator.defiancePosOffset_XWAU.z;

					this.wingManPos.x = generator.commandShipPos.x + generator.defiancePosOffset_XWAU.x;
					this.wingManPos.y = generator.commandShipPos.y + generator.defiancePosOffset_XWAU.y;
					this.wingManPos.z = generator.commandShipPos.z + generator.defiancePosOffset_XWAU.z;
				}

				if (tourCommandShip == COMMAND_SHIP_LIBERTY)
				{
					this.playerStartPoint.x = generator.commandShipPos.x + generator.libertyPosOffset_XWAU.x;
					this.playerStartPoint.y = generator.commandShipPos.y + generator.libertyPosOffset_XWAU.y;
					this.playerStartPoint.z = generator.commandShipPos.z + generator.libertyPosOffset_XWAU.z;

					this.wingManPos.x = generator.commandShipPos.x + generator.libertyPosOffset_XWAU.x;
					this.wingManPos.y = generator.commandShipPos.y + generator.libertyPosOffset_XWAU.y;
					this.wingManPos.z = generator.commandShipPos.z + generator.libertyPosOffset_XWAU.z;
				}
			}
			else//XWA std mode
			{
				if (tourCommandShip == COMMAND_SHIP_DEFIANCE || tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
				{
					this.playerStartPoint.x = generator.commandShipPos.x + generator.defiancePosOffset_Std.x;
					this.playerStartPoint.y = generator.commandShipPos.y + generator.defiancePosOffset_Std.y;
					this.playerStartPoint.z = generator.commandShipPos.z + generator.defiancePosOffset_Std.z;

					this.wingManPos.x = generator.commandShipPos.x + generator.defiancePosOffset_Std.x;
					this.wingManPos.y = generator.commandShipPos.y + generator.defiancePosOffset_Std.y;
					this.wingManPos.z = generator.commandShipPos.z + generator.defiancePosOffset_Std.z;
				}

				if (tourCommandShip == COMMAND_SHIP_LIBERTY)
				{
					this.playerStartPoint.x = generator.commandShipPos.x + generator.libertyPosOffset_Std.x;
					this.playerStartPoint.y = generator.commandShipPos.y + generator.libertyPosOffset_Std.y;
					this.playerStartPoint.z = generator.commandShipPos.z + generator.libertyPosOffset_Std.z;

					this.wingManPos.x = generator.commandShipPos.x + generator.libertyPosOffset_Std.x;
					this.wingManPos.y = generator.commandShipPos.y + generator.libertyPosOffset_Std.y;
					this.wingManPos.z = generator.commandShipPos.z + generator.libertyPosOffset_Std.z;
				}
			}

			this.wingManPos.x -= 0.02;
			this.wingManPos.y -= 0.045;//Forward

			this.playerStartWayPoint.x = this.playerStartPoint.x;//new Vector3D(this.playerStartPoint.x, this.playerStartPoint.y, this.playerStartPoint.z);
			this.playerStartWayPoint.y = this.playerStartPoint.y;
			this.playerStartWayPoint.z = this.playerStartPoint.z;

			this.playerStartWayPoint.y -= 1;
			let jumpCraft_1_StartPos = new Vector3D(0.5, 0, 0);
			
			//[Hyperspace Depature & arrival positions]
			let hyperBouy1 = new Vector3D(0, 0, 0);//Hyperbouy region 1 position, player depart (and player WP1)

			let exitBouy = new Vector3D(2, 2, 2);

			let bouy1Position = new Vector3D(this.distFromDefiance, 0, 0);
			let baseCentroid = new Vector3D(0, 0, 0);
			let toRegion3Bouy = new Vector3D(departBouyPosReg3.x, 0.0, 0.0);
			
			craft = [ CORVETTE, MODIFIED_CORVETTE, MARAUDER_CORVETTE, ASSAULT_TRANSPORT, ESCORT_SHUTTLE, ESCORT_TRANSPORT ];

			this.leadCraft = craft[rand() % craft.length];
	
			if (this.rebelStrikeForceType == STRIKE_ONLY_BOMBER_PLAYER)
			{
				this.leadCraft = Y_WING;
			}

			//Rebel fleet heading map East
			generator.generateRebelFleet_2();

			//[Backdrops] (Sequence)
			generator.generateBackdrops();
			
			//Copy fleet to region 3
			generator.copyRebelFleet();

			//let playStartWp = this.playerStartPoint;
			//playStartWp.y -= 1;
			//
	
			//Compute hyperpoints for the strike craft
			let strikeCraftStartPoints = vecUtils.generatePointsOnPlane(bouy1Position, 10, 0.23);
			random_shuffle(strikeCraftStartPoints);

			let strikeRegion2ExitPoints = vecUtils.generatePointsOnPlane(new Vector3D(departBouyPosReg3.x, 0, 0), 10, 0.23);
			random_shuffle(strikeRegion2ExitPoints);

			//[Player FG]
			{
				let newFg = new FlightGroup();

				newFg.shipType = this.playerCraftType;
				newFg.name = "Red";
				newFg.iff = IFF_REBEL;
				newFg.player = 1;
				newFg.setStartPoint(REGION_1, this.playerStartPoint);
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = this.playerWarheads;
				newFg.team = TEAM_REBEL_1;
				newFg.mentionedInBriefing = true;
				newFg.role = ROLE_STRIKE_CRAFT;
				newFg.roleEnabled = false;
				newFg.motherShip = generator.defiance_region3;
				newFg.departViaMothership = true;
				newFg.arriveFromMotherShip = true;
				newFg.wingmanGroup = 1;
				newFg.radio = 0x01;

				newFg.goal2 = MUST_HAVE_ARRIVED_IN_REGION;
				newFg.goal_2_main_text = "Return to the fleet";
				newFg.goal_2_fail_text = "Return to the fleet";
				newFg.goal_2_complete_text = "Return to the fleet";
				newFg.goal2Region = REGION_3 + 1;
				newFg.must2 = MUST;

				if (rand() % 100 < 50)
				{
					newFg.status1 = STATUS_DOUBLE_SHIELDS;
				}

				//[Setup player warhead choice]
				if (rand() % 100 < 85)
				{
					let warheadTypes = [ 0, 1, 2];
					let i = warheadTypes[rand() % warheadTypes.length];

					if (i == 0)
					{
						newFg.allow_adv_missiles = true;
						newFg.allow_adv_torpedoes = true;
						newFg.allow_rockets = true;
						newFg.allow_space_bombs = true;
						newFg.allow_missiles = true;
						newFg.allow_torpedoes = true;
					}

					if (i == 1)
					{
						newFg.allow_rockets = true;
						newFg.allow_space_bombs = true;
						newFg.allow_missiles = true;
						newFg.allow_torpedoes = true;
					}

					if (i == 2)
					{
						newFg.allow_rockets = true;
						newFg.allow_space_bombs = true;
					}
				}

				{
					orderUtils.addOrder(newFg, REGION_1, 0, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, 0, THROTTLE_20, SPEED_DEFAULT, 0, 0, this.playerStartWayPoint);
					orderUtils.addOrder(newFg, REGION_1, 1, ORDER_HYPER_TO_REGION, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_20, SPEED_DEFAULT, 0, 0, bouy1Position);
				}

				{
					orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, new Vector3D(0.0, 0.0, 0.0));
				}

				{
					orderUtils.addOrder(newFg, REGION_3, 0, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, new Vector3D(0, 0, 0));
				}

				this.playerFlightGroup = flightGroupCount;

				this.strikeGroup1 = flightGroupCount;

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		
			//[Strike Group SS]

			if(this.leadCraft == ESCORT_TRANSPORT || this.leadCraft == ESCORT_SHUTTLE || this.leadCraft == ASSAULT_TRANSPORT)
			{
				let newFg = new FlightGroup();
				newFg.shipType =  this.leadCraft;
				newFg.name = generator.getSuitableName(newFg.shipType, IFF_REBEL, 0);
				newFg.iff = IFF_REBEL;
				newFg.skill = SKILL_ACE;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, new Vector3D(strikeCraftStartPoints[2].x - 1, strikeCraftStartPoints[2].y, strikeCraftStartPoints[2].z));// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = baseCentroid;//Same as nav boy pos
				newFg.useHyperspaceDepart = false;
				newFg.shipCount = 2 + rand() % 2;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_1;
				newFg.mentionedInBriefing = true;
				newFg.role = ROLE_STRIKE_CRAFT;
				newFg.roleEnabled = false;
				newFg.radio = 0x0;
				//newFg.departureTarget = 1;
				newFg.motherShip = generator.defiance_region3;
				newFg.departViaMothership = true;

				//Reg 1 order
				{
					let waypoints = [];
					waypoints.push(new Vector3D(strikeCraftStartPoints[2].x, strikeCraftStartPoints[2].y, strikeCraftStartPoints[2].z));
					orderUtils.addOrder(newFg, REGION_1, 0, ORDER_HYPER_TO_REGION, TARGET_TEAM, TARGET_TEAM, TEAM_IMPERIAL_3, TEAM_IMPERIAL_3, REGION_2, THROTTLE_30, SPEED_DEFAULT, 0, 0, waypoints);
				}

				//Reg 2 orders
				{
					{
						let waypoints = [];;
						waypoints.push(new Vector3D(0, 0, 0));
						//waypoints.push_back(Vector3D(0, 0.4, 0));
						orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_IFF, TEAM_IMPERIAL_3, IFF_IMPERIAL, REGION_1, THROTTLE_100, SPEED_DEFAULT, 0, 0, waypoints);
					}

					//Return point in region 2, back to Defiance reg 3
					{
						orderUtils.addOrder(newFg, REGION_2, 1, ORDER_HYPER_TO_REGION, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, strikeRegion2ExitPoints[2]);
					}
				}

				//Jump to attack from escort
				orderUtils.jumpToOrder(newFg, MUST_BE_DESTROYED, TEAM_IMPERIAL_3, TARGET_TEAM, CONDITION_100_PERCENT_OF, REGION_2, 1, REGION_2 + 1);

				//Reg 3 order 1
				{
					let waypoints = [];;
					orderUtils.addOrder(newFg, REGION_3, 0, ORDER_GO_HOME, TARGET_FLIGHT_GROUP, generator.defiance_region3, generator.defiance_region3, generator.defiance_region3, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, new Vector3D(0, 0.21, -0.21));
				}

				this.strikeGroup1 = flightGroupCount;

				//Reg 3 order 2 (Fly home to Defiance)
				orderUtils.addOrder(newFg, REGION_3, 1, ORDER_GO_HOME, TARGET_FLIGHT_GROUP, generator.defiance_region3, generator.defiance_region3, generator.defiance_region3, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, new Vector3D(0, 0, 0));

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}

			//[Rebel strike Group SS (Larger ship)]

			//[Strike Group FG 1] - Lead ship of the strike group
			if (this.leadCraft == CORVETTE || this.leadCraft == MODIFIED_CORVETTE || this.leadCraft == MARAUDER_CORVETTE)
			{
				let newFg = new FlightGroup();
				newFg.shipType = this.leadCraft;
				newFg.name = generator.getSuitableName(newFg.shipType, IFF_REBEL, 0);
				newFg.shipCount = 1;

				if (this.leadCraft == ESCORT_SHUTTLE || this.leadCraft == ASSAULT_TRANSPORT)
				{
					newFg.shipCount = 1 + rand() % 3;
				}

				newFg.iff = IFF_REBEL;
				newFg.skill = SKILL_ACE;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, new Vector3D(strikeCraftStartPoints[1].x - 1, strikeCraftStartPoints[1].y, strikeCraftStartPoints[1].z));// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = baseCentroid;//Same as nav boy pos
				newFg.useHyperspaceDepart = false;
				newFg.spacing = 3;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_1;
				newFg.mentionedInBriefing = true;
				newFg.role = ROLE_COMMAND_SHIP;
				newFg.roleEnabled = false;
				newFg.motherShip = this.defiance;
				newFg.departViaMothership = true;
				newFg.radio = 0x0;

				//Reg 1 order
				{
					let waypoints = [];
					waypoints.push(new Vector3D(strikeCraftStartPoints[1].x, strikeCraftStartPoints[1].y, strikeCraftStartPoints[1].z));
					orderUtils.addOrder(newFg, REGION_1, 0, ORDER_HYPER_TO_REGION, TARGET_IFF, TARGET_IFF, TEAM_IMPERIAL_3, TEAM_IMPERIAL_3, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, waypoints);
				}

				//Reg 2 orders
				{
					{
						let waypoints = [];
						waypoints.push(new Vector3D(-0.33, 0, 0));
						orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_TEAM, TARGET_IFF, TEAM_IMPERIAL_3, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, waypoints);
					}

					//Return point in region 2, back to Defiance reg 3
					{
						orderUtils.addOrder(newFg, REGION_2, 1, ORDER_HYPER_TO_REGION, TARGET_TEAM, TARGET_TEAM, TEAM_IMPERIAL_3, TEAM_IMPERIAL_3, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, strikeRegion2ExitPoints[1]);
					}
				}

				//Jump to attack from escort
				orderUtils.jumpToOrder(newFg, MUST_BE_DESTROYED, TEAM_IMPERIAL_3, TARGET_TEAM, CONDITION_100_PERCENT_OF, REGION_2, 1, REGION_2 + 1);

				//Reg 3 order 1 (Park up)
				{
					orderUtils.addOrder(newFg, REGION_3, 0, ORDER_SS_HOLD_STATION, TARGET_TEAM, TARGET_TEAM, TEAM_IMPERIAL_3, TEAM_IMPERIAL_3, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, new Vector3D(-.2, 0, 0));
				}

				this.strikeGroup1 = flightGroupCount;

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
			
			//From region 1 (From Defiance)
			{
				let newFg = new FlightGroup();
				newFg.shipType = HYPER_BOUY;
				newFg.name = "From region 1";
				newFg.iff = IFF_REBEL;
				newFg.player = 0;

				newFg.role = ROLE_HYP_FROM_REGION_1;
				newFg.roleEnabled = true;
				newFg.setStartPoint(REGION_2, initialBouyPosReg2);//Start point for AIs when jumping to this region
				newFg.startRegion = REGION_2;
				newFg.team = TEAM_HYPER;
				newFg.status1 = STATUS_ALREADY_INSPECTED;
				newFg.shipCount = 1;

				let seg = new Segment();
				seg.A = newFg.startPoint;
				seg.B = baseCentroid;
				//generator.updateAvoidanceSegments(seg);//NB: This can affect the circular patrol placement

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}

			//To region 3 (To Defiance)
			{
				let newFg = new FlightGroup();
				newFg.shipType = HYPER_BOUY;
				newFg.name = "Alliance fleet";
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.role = ROLE_HYP_TO_REGION_3;
				newFg.roleEnabled = true;
				newFg.setStartPoint(0, toRegion3Bouy);
				newFg.shipCount = 1;
				newFg.team = TEAM_HYPER;
				newFg.startRegion = REGION_2;
				newFg.status1 = STATUS_ALREADY_INSPECTED;
				//newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_3, specialContainerGroup1, MUST_BE_BAGGED, 0);
				//newFg.setArrivalCondition(CONDITION_AT_LEAST_ONE_OF, TARGET_FLIGHT_GROUP, REGION_2, mission.playerFlightGroup, MUST_HAVE_ARRIVED_IN_REGION, 0);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}

			//Return hyperbouy
			{
				let newFg = new FlightGroup();
				newFg.shipType = HYPER_BOUY;
				newFg.name = "From Region 2";
				newFg.iff = IFF_REBEL;
				newFg.team = TEAM_HYPER;
				newFg.player = 0;
				newFg.role = ROLE_HYP_FROM_REGION_2;
				newFg.roleEnabled = true;
				newFg.setStartPoint(REGION_3, new Vector3D(-3, 0, 0));
				newFg.startRegion = REGION_3;
				newFg.status1 = STATUS_ALREADY_INSPECTED;

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
			
			//Translate rebel fleet ships (and intitial WPs) to make room for hypering
			//generator.translateRegion1Ships();
			//generator.translateRegion3Ships(new Vector3D(0, 0, 0), new Vector3D(-3, 0, 0));

			//[Player wingman group (Depart at Defiance)]
			//Sequence
			if (1)
			{
				let newFg = new FlightGroup();
				newFg.shipType = this.rebelAISquadronType;
				newFg.name = "Red";
				newFg.iff = IFF_REBEL;
				newFg.skill = this.aiSquadronSkill;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, this.wingManPos);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = baseCentroid;//Same as nav boy pos
				newFg.useHyperspaceDepart = false;
				newFg.shipCount = 3;
				newFg.warheads = this.aiSquadronWarheads;
				newFg.team = TEAM_REBEL_1;
				newFg.mentionedInBriefing = true;
				newFg.role = ROLE_COMMAND_SHIP;
				newFg.roleEnabled = false;
				newFg.radio = 0x01;
				//newFg.departureTarget = 1;
				newFg.motherShip = generator.defiance_region3;
				newFg.departViaMothership = true;
				newFg.wingmanGroup = 1;

				if (this.rebelStrikeForceType == STRIKE_ONLY_BOMBER_PLAYER)
				{
					this.strikeGroup1 = flightGroupCount;
				}

				//Reg 1 order 1
				{
					let waypoints = [];
					waypoints.push(new Vector3D(this.wingManPos.x, this.wingManPos.y - 0.2, this.wingManPos.z));
					waypoints.push(new Vector3D(this.wingManPos.x + 1, this.wingManPos.y, this.wingManPos.z));
					waypoints.push(new Vector3D(this.wingManPos.x + 1, -0.25, this.wingManPos.z));

					let departPos1 = bouy1Position;
					bouy1Position.y -= 0.25;
					waypoints.push(bouy1Position);
					waypoints.push(new Vector3D(bouy1Position.x + 0.1, bouy1Position.y, bouy1Position.z));
					orderUtils.addOrder(newFg, REGION_1, 0, ORDER_HYPER_TO_REGION, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_80, SPEED_DEFAULT, 0, 0, waypoints);
				}

				//Reg 2 orders
				{
					{
						let waypoints = [];
						waypoints.push(new Vector3D(0, 0, 0));
						//waypoints.push_back(Vector3D(0, 0.4, 0));
						orderUtils.addOrder(newFg, REGION_2, 0, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_2, THROTTLE_100, SPEED_DEFAULT, 0, 0, waypoints);
					}

					//Return hyper point in region 2 (back to Defiance in reg 3)
					{
						orderUtils.addOrder(newFg, REGION_2, 1, ORDER_HYPER_TO_REGION, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, strikeRegion2ExitPoints[3]);
					}

					//Jump to attack from escort
					orderUtils.jumpToOrder(newFg, MUST_BE_DESTROYED, TEAM_IMPERIAL_3, TARGET_TEAM, CONDITION_100_PERCENT_OF, REGION_2, 1, REGION_3 + 1);
				}

				//Reg 3 orders
				{
					//This is the first waypoint after arriving in Reg 3. It must be offset from the vector of the bouy (UDLR) to prevent collisions with player
					{
						//vector <Vector3D> waypoints;
						//orderUtils.addOrder(&newFg, REGION_3, 0, ORDER_ATTACK_TARGETS, TARGET_IFF, TARGET_IFF, IFF_IMPERIAL, IFF_IMPERIAL, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, Vector3D(0, -0.11, 0.11));
					}

					{
						//Reg 3 order 2 (Fly home to Defiance)
						orderUtils.addOrder(newFg, REGION_3, 0, ORDER_GO_HOME, TARGET_FLIGHT_GROUP, generator.defiance_region3, generator.defiance_region3, generator.defiance_region3, REGION_3, THROTTLE_100, SPEED_DEFAULT, 0, 0, new Vector3D(0, 0, 0));
					}
				}

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}

			////////////////////////////////////////////
			//[Imperial units] (Sequence essential for avoidance algorithm)

			this.generateBase_1(baseCentroid, REGION_2, 0, 0, 0);

			//[Base patrol SS]
			{
				let shipClasses = [ ASSAULT_TRANSPORT, ESCORT_SHUTTLE, ESCORT_TRANSPORT, PATROL_CRAFT ];
				this.patrol_ss_type = shipClasses[rand() % shipClasses.length];
			}

			//Orbital patrol waypoints around the base
			if (rand() % 100 < 50)
			{
				this.circularPatrol_1(new Vector3D(0, 0, 0));
			}
			
			this.cargoTraffic(baseCentroid, REGION_2);

			//[Imp counter attack in Region 2]
			//if (rand() % 100 < 50)
			{
				this.impCounterAttack(initialBouyPosReg2);
			}

			//Goal for base
			{
				flightGroups_2[this.platform].goal1 = MUST_BE_DESTROYED;

				flightGroups_2[this.platform].goal_1_complete_text = "Destroy the Imperial base";
				flightGroups_2[this.platform].goal_1_fail_text = "Destroy the Imperial base";
				flightGroups_2[this.platform].goal_1_main_text = "Destroy the Imperial base";
			}

			//finalPass(difficulty);//Done before intel

			//[Mission name]
			mission.missionName = "Strike on " + mission.stationName;

			//[Region names]
			mission.region2Title = mission.stationName;
			flightGroups_2[this.hyperBouy01].name = "To " + mission.stationName;

			mission.region3Title = mission.commandShipName;

			////////////////////////////////
			//Mission commander description
			////////////////////////////////
			{
				mission.description = "# ";
				let str = "";
				str = "For this mission you will fly " + generator.getShipString(flightGroups_2[this.playerFlightGroup].shipType) + " " + flightGroups_2[this.playerFlightGroup].name + ".\n\n";

				{
					let wingMen = [];
					let wingManCount = 0;
					for (var a = 0; a < this.flightGroupCount; a++)
					{
						if (a == this.playerFlightGroup)
						{
							continue;
						}

						if (flightGroups_2[a].wingmanGroup == flightGroups_2[this.playerFlightGroup].wingmanGroup)
						{
							wingManCount += flightGroups_2[a].shipCount;
							//wingMen.push_back(getShipString(flightGroups_2[a].shipType) + " " + flightGroups_2[a].name);
						}
					}

					if (wingManCount == 0)
					{
						//str += "You will have no wingmen.\n\n";
					}
					else if (wingManCount == 1)
					{
						str += "You will have 1 wingman.\n\n";
					}
					else
					{
						str += "You will have " + wingManCount.toString() + " wingmen.\n\n";
					}
				}

				if (flightGroups_2[this.playerFlightGroup].warheads != WARHEADS_NO_WARHEADS)
				{
					str +=  "You will carry a standard load of " + generator.getWarheadString(flightGroups_2[this.playerFlightGroup].warheads) + ".\n\n";
				}
				else
				{
					str +=  "You will carry no warheads.\n\n";
				}

				if (flightGroups_2[this.strikeGroup1].shipCount > 1)
				{
					str +=  "The strike force consists of: " + flightGroups_2[this.strikeGroup1].shipCount.toString() + " " + generator.getShipString(this.leadCraft) + "s.\n\n";
				}

				if (flightGroups_2[this.strikeGroup1].shipCount > 0 && flightGroups_2[this.strikeGroup1].shipCount < 2)
				{
					str +=  generator.getShipString(this.leadCraft) + " " + flightGroups_2[this.strikeGroup1].name + " will lead the attack.\n\n" 
				}

				//str << intelReport.compile(MISSION_TYPE_BASE_ATTACK);

				mission.description += str;
			}
		

		this.radioMessages();
		this.briefing();
	}


};

class Generator
{
	commandShipType = tourCommandShip;

	containerType_1 = CONT_A;
	containerType_2 = CONT_B;
	
	hyperBouy01;

	gunboats_1_skill;
	gunboats_1_waves;
	gunboats_1_warheads;
	gunboats_1_primary_tgt;//Secondary tgt: TEAM_REBEL
	gunboats_1_arrival_delay;
	gunboats_1_arrival_condition;
	gunboats_1_ship_count;

	commandShipPos = new Vector3D(0,0,0);
	defiance;

	rebelFleetShipPositions = [];
	rebelFleetBackdrops = [];
	rebelFleet2Ships = [];

	defiancePosOffset_XWAU = new Vector3D( -0.17, -0.18, -0.03 );
	defiancePosOffset_Std = new Vector3D( -0.17, -0.18, 0.001 );

	libertyPosOffset_XWAU = new Vector3D( 0.595, -0.02, -0.01 );
	libertyPosOffset_Std = new Vector3D( 0.48, -0.09, -0.04 );

	wingManPos = new Vector3D();
	avoidanceSegments = [];
	backdrops = [];

    MINEFIELD_TYPE_CIRCULAR = 0;
	MINEFIELD_TYPE_RANDOM = 1;
	MINEFIELD_TYPE_LINES = 2;

	getWarheadString(warheads)
	{
		if (warheads == WARHEADS_MISSILE) { return "Concussion Missiles"; }
		if (warheads == WARHEADS_TORPEDO) { return "Proton Torpedoes"; }
		if (warheads == WARHEADS_ADV_TORPEDO) { return "Advanced Proton Torpedoes"; }
		if (warheads == WARHEADS_ADV_MISSILE) { return "Advanced Concussion Missiles"; }
		if (warheads == WARHEADS_HEAVY_ROCKET) { return "Heavy Rockets"; }
		if (warheads == WARHEADS_SPACE_BOMB) { return "Space Bombs"; }
		if (warheads == WARHEADS_MAG_PULSE) { return "Mag Pulse Missiles"; }
	}

	randomContainer()
	{
		let containers = [CONT_A, CONT_B, CONT_C, CONT_D, CONT_E, CONT_F, CONT_G, CONT_H, CONT_I];
		return containers[rand() % containers.length];
	}

	randomFormation()
	{
		return rand() % 32;
	}

	// Get the avoidance segments for all craft currently added
	// Currently only the first WP for Order 0 is considered
	// Typically called often
	getAvoidanceSegments(REGION)
	{
		this.avoidanceSegments = [];

		if (REGION == REGION_1)
		{
			let orderToUse = 0;
			let maxWP = 1;

			for (var a = 0; a < flightGroupCount; a++)
			{
				if (flightGroups_2[a].startRegion == REGION && flightGroups_2[a].shipType != HYPER_BOUY && flightGroups_2[a].shipType != BACKDROP)
				{
					/*
					for (var b = 0; b < maxWP; b++)
					{
						//if (flightGroups_2[a].waypoints.WPRegion1Count > b)
						{
							if (b == 0)
							{
								let seg = new Segment();

								let p1 = flightGroups_2[a].startPoint;
								let p2 = new Vector3D();
								p2.x = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[0].x;
								p2.y = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[0].y;
								p2.z = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[0].z;

								seg.A = p1;
								seg.B = p2;
								this.avoidanceSegments.push(seg);
							}
							else
							{
								let seg = new Segment();

								let p1 = new Vector3D();
								p1.x = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[b].x;
								p1.y = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[b].y;
								p1.z = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[b].z;

								let  = new Vector3D();
								p2.x = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[b + 1].x;
								p2.y = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[b + 1].y;
								p2.z = flightGroups_2[a].waypoints.WPRegion1[orderToUse].waypoints[b + 1].z;

								seg.A = p1;
								seg.B = p2;
								this.avoidanceSegments.push(seg);
							}
						}
					}
					*/
				}
			}
		}


		/*
		if (REGION == REGION_2)
		{
			let orderToUse = 0;
			let maxWP = 1;

			for (var a = 0; a < flightGroupCount; a++)
			{
				if (flightGroups_2[a].startRegion == REGION && flightGroups_2[a].shipType != HYPER_BOUY && flightGroups_2[a].shipType != BACKDROP)
				{
					for (var b = 0; b < maxWP; b++)
					{
						//if (flightGroups_2[a].waypoints.WPRegion1Count > b)
						{
							if (b == 0)
							{
								let seg = new Segment();

								let p1 = flightGroups_2[a].startPoint;
								let p2 = new Vector3D();
								p2.x = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[0].x;
								p2.y = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[0].y;
								p2.z = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[0].z;

								seg.A = p1;
								seg.B = p2;
								this.avoidanceSegments.push(seg);
							}
							else
							{
								let seg = new Segment();

								let p1 = new Vector3D();
								p1.x = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[b].x;
								p1.y = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[b].y;
								p1.z = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[b].z;

								let  = new Vector3D();
								p2.x = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[b + 1].x;
								p2.y = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[b + 1].y;
								p2.z = flightGroups_2[a].waypoints.WPRegion2[orderToUse].waypoints[b + 1].z;

								seg.A = p1;
								seg.B = p2;
								this.avoidanceSegments.push(seg);
							}
						}
					}
				}
			}
		}
		*/

	}



	randomStation(IFF)
	{
		let ships = [];

		ships.push(PLATFORM_1);
		ships.push(PLATFORM_2);
		ships.push(PLATFORM_3);
		//ships.push_back(PLATFORM_4);
		//ships.push_back(PLATFORM_5);
		//ships.push_back(PLATFORM_6);
		ships.push(FACTORY);
		//ships.push_back(SHIPYARD);
		//ships.push_back(REPAIR_YARD);

		ships.push(SPACE_COLONY_1);
		ships.push(SPACE_COLONY_2);
		ships.push(SPACE_COLONY_3);
		
		return ships[rand() % ships.length];
	}

	// Move all points away from parameter axis and each other
	relaxPoints(points, axisOrigin, axisDir, minDist)
	{
		const iterations = 16;

		const D = axisDir.normalize();

		for (let iter = 0; iter < iterations; ++iter)
		{
			// --- 1. Push points away from axis ---
			for (let p of points)
			{
				const OP = p.subtract(axisOrigin);
				const proj = D.multiply(OP.dot(D));
				const perp = OP.subtract(proj);
				const dist = perp.length();

				if (dist < minDist && dist > 1e-9)
				{
					const n = perp.normalize();
					const push = n.multiply(minDist - dist);

					// Modify the existing point
					p.x += push.x;
					p.y += push.y;
					p.z += push.z;
				}
			}

			// --- 2. Push points away from each other ---
			for (let i = 0; i < points.length; ++i)
			{
				for (let j = i + 1; j < points.length; ++j)
				{
					const diff = points[i].subtract(points[j]);
					const dist = diff.length();

					if (dist < minDist && dist > 1e-9)
					{
						const n = diff.normalize();
						const push = n.multiply(0.5 * (minDist - dist));

						points[i].x += push.x;
						points[i].y += push.y;
						points[i].z += push.z;

						points[j].x -= push.x;
						points[j].y -= push.y;
						points[j].z -= push.z;
					}
				}
			}
		}

		return points;
	}
	
	translateRegion3Ships(segmentStart, segmentEnd)
	{
		for (var a = 0; a < this.rebelFleet2Ships.length; a++)
		{
			let awayPoints = [];
			for (var b = 0; b < this.rebelFleet2Ships.length; b++)
			{
				if (b != a)
				{
					awayPoints.push(flightGroups_2[this.rebelFleet2Ships[b]].startPoint);
				}
			}

			let origPos = flightGroups_2[this.rebelFleet2Ships[a]].startPoint;
			let newPos = vecUtils.moveAwayFromSegmentAndPoints(flightGroups_2[this.rebelFleet2Ships[a]].startPoint, segmentStart, segmentEnd, awayPoints, 0.375);
			
			let delta = new Vector3D();
			delta.x = newPos.x - origPos.x;
			delta.y = newPos.y - origPos.y;
			delta.z = newPos.z - origPos.z;

			flightGroups_2[this.rebelFleet2Ships[a]].setStartPoint(REGION_3, newPos);

			let wp = new Vector3D(flightGroups_2[this.rebelFleet2Ships[a]].waypoints.WPRegion3[0].waypoints[0].x, flightGroups_2[this.rebelFleet2Ships[a]].waypoints.WPRegion3[0].waypoints[0].y, flightGroups_2[this.rebelFleet2Ships[a]].waypoints.WPRegion3[0].waypoints[0].z);
			wp += delta;

			//flightGroups_2[this.rebelFleet2Ships[a]].setWayPoint(REGION_3, 0, 0, wp);
		}
	}

	/*
	//Move fleet in reg 1 away from the hyper vector and other ships
	translateRegion1Ships()
	{
		let awayPoints = [];
		let axis = new Vector3D(1, 0, 0);

		for (var a = 0; a < this.rebelFleetShips.length; a++)
		{
			let pt = flightGroups_2[this.rebelFleetShips[a]].startPoint;
			awayPoints.push(pt);
		}

		//for (var a = 0; a < awayPoints.length; a++)
		//{
			awayPoints = this.relaxPoints(awayPoints, new Vector3D(0, 0, 0), axis, 1.5);
		//}

		//alert(this.rebelFleetShips.length);

		for (var a = 0; a < this.rebelFleetShips.length; a++)
		{
			let origPos = flightGroups_2[this.rebelFleetShips[a]].startPoint;
			let newPos = new Vector3D();
			newPos.x = awayPoints[a].x;
			newPos.y = awayPoints[a].y;
			newPos.z = awayPoints[a].z;

			let delta = new Vector3D(newPos.x - origPos.x, newPos.y - origPos.y, newPos.z - origPos.z);
			
			let wp = new Vector3D(flightGroups_2[this.rebelFleetShips[a]].waypoints.WPRegion1[0].waypoints[0].x, flightGroups_2[this.rebelFleetShips[a]].waypoints.WPRegion1[0].waypoints[0].y, flightGroups_2[this.rebelFleetShips[a]].waypoints.WPRegion1[0].waypoints[0].z);
			wp.x += delta.x;
			wp.y += delta.y;
			wp.z += delta.z;

			flightGroups_2[this.rebelFleetShips[a]].setStartPoint(REGION_1, newPos);
			flightGroups_2[this.rebelFleetShips[a]].setWayPoint(REGION_1, 0, 0, wp);
		}
	}
	*/

	//Desc: Copy rebel fleet to region 3 (randomly oriented)
	copyRebelFleet()
	{
		let newAngX = new Vector3D();
		let newAngY = new Vector3D();

		{
			let newFg = new FlightGroup();

			if (tourCommandShip == COMMAND_SHIP_DEFIANCE)
			{
				newFg.shipType = MC80A;
			}

			if (tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
			{
				newFg.shipType = MC80A;
			}

			if (tourCommandShip == COMMAND_SHIP_LIBERTY)
			{
				newFg.shipType = MC80
			}

			newFg.name = mission.commandShipName;
			newFg.iff = IFF_REBEL;
			newFg.player = 0;
			newFg.setStartPoint(REGION_3, flightGroups_2[this.defiance].startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
			newFg.startRegion = REGION_3;
			newFg.startRegion_FromHyperspace = false;
			newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;
			newFg.team = TEAM_REBEL_1;
			newFg.mentionedInBriefing = false;
			newFg.role = ROLE_COMMAND_SHIP;

			newAngX = rand() % 360;
			newAngY = rand() % 360;

			let wp1 = this.getDesiredStartAngle(flightGroups_2[this.defiance].startPoint, newAngX, newAngY);
			newFg.setWayPoint(REGION_3, 0, 0, wp1);

			flightGroups_2[flightGroupCount] = newFg;
			this.defiance_region3 = flightGroupCount;
			flightGroupCount++;
		}
		
		for (var a = 0; a < this.rebelFleetShips.length; a++)
		{
			if(flightGroups_2[this.rebelFleetShips[a]].shipType != BACKDROP)
			{
				let newFg = new FlightGroup();
				newFg.shipType = flightGroups_2[this.rebelFleetShips[a]].shipType;
				newFg.name = flightGroups_2[this.rebelFleetShips[a]].name;
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_3, flightGroups_2[this.rebelFleetShips[a]].startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_3;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_1;
				newFg.mentionedInBriefing = false;

				let wp1 = this.getDesiredStartAngle(flightGroups_2[this.rebelFleetShips[a]].startPoint, newAngX, newAngY);
				newFg.setWayPoint(REGION_3, 0, 0, wp1);

				//rebelFleet2Points.push_back(flightGroups_2[rebelFleetShips[a]].startPoint);
				this.rebelFleet2Ships.push(flightGroupCount);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}
		
		for (var a = 0; a < this.rebelFleetBackdrops.length; a++)
		{
			let newFg = new FlightGroup();
			newFg.shipType = BACKDROP;
			newFg.cargo = flightGroups_2[this.rebelFleetBackdrops[a]].cargo;
			newFg.name = flightGroups_2[this.rebelFleetBackdrops[a]].name;
			newFg.iff = IFF_BLUE;

			newFg.startPoint = flightGroups_2[this.rebelFleetBackdrops[a]].startPoint;
			newFg.startRegion = REGION_3;
			newFg.backdropRef = flightGroups_2[this.rebelFleetBackdrops[a]].backdropRef;
			newFg.specialCargo = flightGroups_2[this.rebelFleetBackdrops[a]].specialCargo;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}
	}

	getRandomRebelFighter()
	{
		var n = 1 + rand() % 4;//xw yw aw
		if (n == 4) { n = 14; }//z95
		return n;
	}

	addMissiles(percentageChance)
	{
		if (rand() % 100 > percentageChance) { return WARHEADS_NO_WARHEADS; }

		return WARHEADS_MISSILE;
	}

	generateWaypoints(centroid, radius, count)
	{
		let output = [];

		let f = 0;
		let incf = 360 / count;

		for (var a = 0; a < count; a++)
		{
			f += incf;

			let curStartPoint = new Vector3D(0,0,0);
			curStartPoint = vecUtils.toCartesan(90 * 3.14 / 180, f * 3.14 / 180, radius);
			curStartPoint.z = 0;

			let curPos = new Vector3D(centroid.x + curStartPoint.x, centroid.y + curStartPoint.y, centroid.z + curStartPoint.z);

			output.push(curPos);
		}

		return output;
	}



	randomMediumShip()
	{
		let ships = [];

		ships.push(ACTION_TRANSPORT);
		ships.push(CORVETTE);
		ships.push(MODIFIED_CORVETTE);
		ships.push(MODULAR_CONVEYOR);
		ships.push(MOBQUET_TRANSPORT);
		ships.push(XIYTIAR_TRANSPORT);
		ships.push(BULK_FREIGHTER);
		ships.push(CARGO_FERRY);
		ships.push(CONTAINER_TRANSPORT);

		let index = rand() % ships.length;

		return ships[index];
	}

	getInflightString(ref)
	{
		if (ref == INFLIGHT_HIT_EM_HARD_AND_GET_OUTA_THERE)
		{
			return "Hit em hard and get outa there!";
		}

		if (ref == INFLIGHT_ALERT_THE_STATION_IS_LAUNCHING_FIGHTERS)
		{
			return "Alert! The station is launching fighters!";
		}

		if (ref == INFLIGHT_EXCELLENT_JOB_THE_STATION_HAS_BEEN_DESTROYED)
		{
			return "Excellent job. The station has been destroyed.";
		}	

		if (ref == INFLIGHT_GREAT_WORK_YOUVE_BEATEN_OFF_THE_IMPERIAL_ATTACK)
		{
			return "Great work, you've beaten off the Imperial attack.";
		}

		if (ref == INFLIGHT_STAY_ALERT_KEEP_A_SHARP_EYEOUT_FOR_ANY_INCOMING_CRAFT)
		{
			return "Stay alert. Keep a sharp eyeout for any incoming craft.";
		}

		if (ref == INFLIGHT_ALL_UNITS_FIRE_AT_WILL)
		{
			return "All units fire at will!";
		}

		if (ref == INFLIGHT_BATTLESTATIONS_IMPERIAL_CRAFT_HAVE_ENTERED_THE_AREA)
		{
			return "Battlestations! Imperial craft have entered the area!";
		}

		if (ref == INFLIGHT_ENEMY_ASSAULT_GUNBOATS_EMERGING_FROM_HYPERSPACE)
		{
			return "Enemy Assault Gunboats emerging from hyperspace!";
		}

		if (ref == INFLIGHT_ENEMY_LAMBDA_CLASS_SHUTTLES_HAVE_ENTERED_THE_AREA)
		{
			return "Enemy Lambda class shuttles have entered the area!";
		}

		if (ref == INFLIGHT_YOU_ARE_CLEARED_TO_JUMP_GOOD_LUCK)
		{
			return "You are cleared to jump. Good luck.";
		}

		if (ref == INFLIGHT_GOOD_WORK_OUT_THERE_YOURE_CLEARED_TO_LAND)
		{
			return "Good work out there. You're cleared to land.";
		}

		if (ref == INFLIGHT_GOOD_HUNTING_OUT_THERE)
		{
			return "Good hunting out there.";
		}

		if (ref == INFLIGHT_ENEMY_CARGO_TRAFFIC_ENTERING_THE_AREA)
		{
			return "Enemy cargo traffic entering the area!";
		}

		if (ref == INFLIGHT_ENEMY_ESCORT_SHUTTLES_ENTERING_THE_AREA)
		{
			return "Enemy Escort Shuttles entering the area!";
		}

		if (ref == INFLIGHT_ENEMY_FIGHTERS_HEADING_YOUR_WAY)
		{
			return "Enemy fighters heading your way!";
		}

		if (ref == INFLIGHT_ENEMY_TARGETS_DEAD_AHEAD)
		{
			return "Enemy targets dead ahead!";
		}

		if (ref == INFLIGHT_EXCELLENT_WORK)
		{
			return "Excellent work!";
		}

		if (ref == INFLIGHT_EXCELLENT_WORK_RETURN_TO_THE_FLEET)
		{
			return "Excellent work, return to the fleet.";
		}

		if (ref == INFLIGHT_GOOD_WORK)
		{
			return "Good work!";
		}

		if (ref == INFLIGHT_GOOD_WORK_MISSION_OBJECTIVES_ACHIEVED_HEAD_HOME)
		{
			return "Good work. Mission objectives achieved, head home.";
		}

		if (ref == INFLIGHT_GOOD_WORK_OUT_THERE_WELCOME_BACK)
		{
			return "Good work out there. Welcome back.";
		}

		if (ref == INFLIGHT_GOOD_WORK_TARGET_DESTROYED_RETURN_TO_DEFIANCE)
		{
			return "Good work! Target destroyed - return to Defiance!";
		}

		if (ref == INFLIGHT_GOOD_WORK_TARGET_DESTROYED_RETURN_TO_THE_COMMAND_SHIP)
		{
			return "Good work! Target destroyed - return to the command ship.";
		}

		if (ref == INFLIGHT_HEAD_TO_THE_HYPERBOUY_AND_PREPARE_TO_MAKE_THE_JUMP_TO_HYPERSPACE)
		{
			return "Head to the hyperbouy and prepare to enter hyperspace.";
		}

		if (ref == INFLIGHT_MISSION_COMPLETE_WITHDRAW_BEFORE_REENFORCEMENTS_ARRIVE)
		{
			return "Mission complete! Withdraw before reenforcements arrive!";
		}

		if (ref == INFLIGHT_PREPARE_TO_MAKE_THE_JUMP_TO_LIGHTSPEED_GOOD_LUCK)
		{
			return "Prepare to make the jump to lightspeed - good luck!";
		}

		if (ref == INFLIGHT_PROTECT_OUR_RECOVERY_CRAFT)
		{
			return "Protect our recovery craft.";
		}

		if (ref == INFLIGHT_PROTECT_STORM_UNIT_WHILE_IT_DOCKS)
		{
			return "Protect Storm Unit while it docks.";
		}

		if (ref == INFLIGHT_STORM_UNIT_IS_UNDER_ATTACK)
		{
			return "Storm Unit is under attack!";
		}

		if (ref == INFLIGHT_SUPERB_WORK)
		{
			return "Superb work!";
		}

		if (ref == INFLIGHT_TARGET_DEAD_AHEAD_TAKE_OUT_EVERYTHING_YOU_CAN)
		{
			return "Target dead ahead! Take out everything you can.";
		}

		if (ref == INFLIGHT_THAT_IMPERIAL_CARGOSHIP_IS_MAKING_A_RUN_FOR_IT)
		{
			return "That Imperial cargoship is making a run for it!";
		}

		if (ref == INFLIGHT_THE_STATION_IS_LAUNCHING_TIES)
		{
			return "The station is launching TIEs!";
		}

		if (ref == INFLIGHT_THERES_THE_TARGET_ALL_UNITS_CLEAR_TO_ENGAGE)
		{
			return "There's the target - all units clear to engage!";
		}

		if (ref == INFLIGHT_THIS_IS_COMMANDER_KUPALO_ALL_UNITS_PREPARE_TO_MAKE_THE_JUMP_TO_HYPERSPACE)
		{
			return "This is commander Kupalo. All units prepare to make the jump to hyperspace.";
		}

		if (ref == INFLIGHT_THIS_IS_COMMANDER_KUPALO_COMMENCE_THE_ATTACK_MAY_THE_FORCE_BE_WITH_YOU)
		{
			return "This is commander Kupalo, commence the attack - may the force be with you!";
		}

		if (ref == INFLIGHT_THOSE_GUNBOATS_ARE_TARGETING_STORM_UNIT)
		{
			return "Those Gunboats are targeting Storm Unit!";
		}

		if (ref == INFLIGHT_TIE_FIGHTERS_ARE_LAUNCHING_FROM_THE_IMPERIAL_SHIP)
		{
			return "TIE Fighters are launching from the Imperial ship!";
		}

		if (ref == INFLIGHT_VICTORY_IS_OURS_LONG_LIVE_THE_ALLIANCE)
		{
			return "Victory is ours! Long live the Alliance!";
		}

		if (ref == INFLIGHT_WELCOME_HOME)
		{
			return "Welcome home!";
		}

		if (ref == INFLIGHT_WELL_DONE)
		{
			return "Well done!";
		}

		if (ref == INFLIGHT_WEVE_GOT_IMPERIAL_TRANSPORTS_ON_AN_ATTACK_VECTOR)
		{
			return "We've got Imperial transports on an attack vector!";
		}

		if (ref == INFLIGHT_WEVE_GOT_IMPERIAL_WARSHIPS_EMERGING_FROM_HYPERSPACE)
		{
			return "We've got Imperial warships emerging from hyperspace!";
		}

		if (ref == INFLIGHT_WEVE_GOT_IMPERIAL_WARSHIPS_ENTERING_THE_AREA)
		{
			return "We've got Imperial warships entering the area!";
		}

		if (ref == INFLIGHT_YOU_ARE_CLEAR_TO_INITIATE_THE_JUMP_TO_HYPERSPACE_GOOD_HUNTING)
		{
			return "You are clear the initiate the jump to hyperspace. Good hunting!";
		}

		if (ref == INFLIGHT_YOUVE_TAKEN_OUT_THE_TIE_ESCORTS_EXCELLENT_WORK)
		{
			return "You've taken out the TIE escorts. Excellent work!";
		}

		if (ref == INFLIGHT_OBJECTIVES_COMPLETED_DISENGAGE_AND_PREPARE_TO_JUMP)
		{
			return "Objectives completed. Disengage and prepare to jump.";
		}

		if (ref == INFLIGHT_THE_TASK_FORCE_HAS_JUST_DROPPED_OUT_OF_HYPERSPACE_GOOD_WORK)
		{
			return "The taskforce has just dropped out of hyperspace. Good work.";
		}

		if (ref == INFLIGHT_GREEN_GROUP_HERE_WERE_READY_TO_ASSIST)
		{
			return "Green group here, we're ready to assist!";
		}

		if (ref == INFLIGHT_THIS_IS_GREEN_LEADER_WERE_LAUNCHING_NOW)
		{
			return "This is Green leader: We're launching now!";
		}

		if (ref == INFLIGHT_THIS_IS_GREEN_LEADER_WERE_READY_TO_ENGAGE)
		{
			return "This is Green leader. We're ready to engage.";
		}

		if (ref == INFLIGHT_OUR_COMMAND_SHIP_IS_TAKING_HITS)
		{
			return "Our command ship is taking hits!";
		}

		if (ref == INFLIGHT_ENEMY_ASSAULT_TRANSPORTS_HAVE_ENTERED_THE_AREA)
		{
			return "Enemy Assault Transports have entered the area!";
		}

		if (ref == INFLIGHT_THE_CONVOY_HAS_ARRIVED)
		{
			return "The convoy has arrived.";
		}

		if (ref == INFLIGHT_ALL_CRAFT_PROCEED_TO_YOUR_JUMP_POINTS)
		{
			return "All craft proceed to your jump points.";
		}

		if (ref == INFLIGHT_ALL_CRAFT_PREPARE_TO_MAKE_THE_JUMP_TO_HYPERSPACE)
		{
			return "All craft prepare to make the jump to hyperspace.";
		}

		if (ref == INFLIGHT_BEGIN_YOUR_PATROL_STAY_ALERT)
		{
			return "Begin your patrol. Stay alert.";
		}

		if (ref == INFLIGHT_AN_IMPERIAL_STARDESTROYER_HAS_ENTERED_THE_SYSTEM)
		{
			return "An Imperial Star Destroyer has entered the system.";
		}

		return "";
	}

	addRadioMessage_AllLaunchType()
	{
		//vector<string> txts;
		let wavFiles = [];

		wavFiles.push(INFLIGHT_YOU_ARE_CLEAR_TO_INITIATE_THE_JUMP_TO_HYPERSPACE_GOOD_HUNTING);
		wavFiles.push(INFLIGHT_PREPARE_TO_MAKE_THE_JUMP_TO_LIGHTSPEED_GOOD_LUCK);
		wavFiles.push(INFLIGHT_HEAD_TO_THE_HYPERBOUY_AND_PREPARE_TO_MAKE_THE_JUMP_TO_HYPERSPACE);
		wavFiles.push(INFLIGHT_YOU_ARE_CLEARED_TO_JUMP_GOOD_LUCK);
		wavFiles.push(INFLIGHT_GOOD_HUNTING_OUT_THERE);

		wavFiles.push(INFLIGHT_THIS_IS_COMMANDER_KUPALO_ALL_UNITS_PREPARE_TO_MAKE_THE_JUMP_TO_HYPERSPACE);
		wavFiles.push(INFLIGHT_ALL_CRAFT_PROCEED_TO_YOUR_JUMP_POINTS);
		wavFiles.push(INFLIGHT_ALL_CRAFT_PREPARE_TO_MAKE_THE_JUMP_TO_HYPERSPACE);

		let msg = new InflightMessage();
		let n = rand() % wavFiles.length;
		msg.message = this.getInflightString(wavFiles[n]);
		msg.wavFileRef = wavFiles[n];

		return msg;
	}

	addRadioMessage_SoloLaunchType()
	{
		//vector<string> txts;
		let wavFiles = [];

		wavFiles.push(INFLIGHT_YOU_ARE_CLEAR_TO_INITIATE_THE_JUMP_TO_HYPERSPACE_GOOD_HUNTING);
		wavFiles.push(INFLIGHT_PREPARE_TO_MAKE_THE_JUMP_TO_LIGHTSPEED_GOOD_LUCK);
		wavFiles.push(INFLIGHT_HEAD_TO_THE_HYPERBOUY_AND_PREPARE_TO_MAKE_THE_JUMP_TO_HYPERSPACE);
		wavFiles.push(INFLIGHT_YOU_ARE_CLEARED_TO_JUMP_GOOD_LUCK);
		wavFiles.push(INFLIGHT_GOOD_HUNTING_OUT_THERE);

		let msg = new InflightMessage();
		let n = rand() % wavFiles.length;
		msg.message = this.getInflightString(wavFiles[n]);
		msg.wavFileRef = wavFiles[n];

		return msg;
	}

	addRadioMessage_ReturnType()
	{
		let wavFiles = [];

		wavFiles.push(INFLIGHT_WELCOME_HOME);
		wavFiles.push(INFLIGHT_GOOD_WORK);
		wavFiles.push(INFLIGHT_EXCELLENT_WORK);
		wavFiles.push(INFLIGHT_SUPERB_WORK);
		wavFiles.push(INFLIGHT_WELL_DONE);
		wavFiles.push(INFLIGHT_GOOD_WORK_OUT_THERE_WELCOME_BACK);
		wavFiles.push(INFLIGHT_VICTORY_IS_OURS_LONG_LIVE_THE_ALLIANCE);
		wavFiles.push(INFLIGHT_GOOD_WORK_OUT_THERE_YOURE_CLEARED_TO_LAND);

		let msg = new InflightMessage();
		let n = rand() % wavFiles.length;
		msg.message = this.getInflightString(wavFiles[n]);
		msg.wavFileRef = wavFiles[n];

		return msg;
	}

	addRadioMessage_CompleteType()
	{
		//vector<string> txts;
		let wavFiles = [];

		wavFiles.push(INFLIGHT_MISSION_COMPLETE_WITHDRAW_BEFORE_REENFORCEMENTS_ARRIVE);
		wavFiles.push(INFLIGHT_GOOD_WORK_MISSION_OBJECTIVES_ACHIEVED_HEAD_HOME);
		wavFiles.push(INFLIGHT_EXCELLENT_WORK_RETURN_TO_THE_FLEET);
		wavFiles.push(INFLIGHT_OBJECTIVES_COMPLETED_DISENGAGE_AND_PREPARE_TO_JUMP);

		let msg = new InflightMessage();
		let n = rand() % wavFiles.length;
		msg.message = this.getInflightString(wavFiles[n]);
		msg.wavFileRef = wavFiles[n];

		return msg;
	}

	getShipString(ship)
	{
		if (ship == 1) { return "X-Wing"; }
		if (ship == 2) { return "Y-Wing"; }
		if (ship == 3) { return "A-Wing"; }
		if (ship == 4) { return "B-Wing"; }
		if (ship == 5) { return "TIE Fighter"; }
		if (ship == 6) { return "TIE Interceptor"; }
		if (ship == 7) { return "TIE-Bomber"; }
		if (ship == 8) { return "TIE-Advanced"; }
		if (ship == 9) { return "TIE-Defender"; }
		if (ship == 10) { return "IRD Fighter"; }
		if (ship == 11) { return "Toscan Fighter"; }
		if (ship == 12) { return "Missle Boat"; }
		if (ship == 13) { return "T Wing"; }
		if (ship == 14) { return "Z-95"; }
		if (ship == 15) { return "R-41"; }
		if (ship == 16) { return "Assault Gunboat"; }
		if (ship == 17) { return "Lambda Shuttle"; }
		if (ship == IMP_LANDING_CRAFT) { return "Landing Craft"; }
		if (ship == 18) { return "Escort Shuttle"; }
		if (ship == 19) { return "System Patrol Craft"; }
		if (ship == 20) { return "Scout Craft"; }
		if (ship == 21) { return "Transport"; }
		if (ship == 22) { return "Assault Transport"; }
		if (ship == 23) { return "Escort Transport"; }
		if (ship == 24) { return "Tug"; }
		if (ship == 25) { return "Combat Utility Vehicle"; }
		if (ship == 26) { return "Container A"; }
		if (ship == 27) { return "Container B"; }
		if (ship == 28) { return "Container C"; }
		if (ship == 29) { return "Container D"; }
		if (ship == 30) { return "Heavy Lifter"; }
		if (ship == 31) { return "Mole Miner"; }
		if (ship == 32) { return "Bulk Freighter"; }
		if (ship == 33) { return "Cargo Ferry"; }
		if (ship == 34) { return "Modular Conveyor"; }
		if (ship == 35) { return "Container Transport"; }
		if (ship == 36) { return "Medium Transport"; }
		if (ship == 37) { return "Murrian Transport"; }
		if (ship == 38) { return "Corellian Transport"; }
		if (ship == 39) { return "Modified Corellian Transport"; }
		if (ship == 40) { return "Corellian Corvette"; }
		if (ship == 41) { return "Modified Corvette"; }
		if (ship == 42) { return "Nebulon B Frigate"; }
		if (ship == 43) { return "Modified Frigate"; }
		if (ship == 44) { return "Passenger Liner"; }
		if (ship == 45) { return "Carrack Cruiser"; }
		if (ship == 46) { return "Strike Cruiser"; }
		if (ship == 47) { return "Escort Carrier"; }
		if (ship == 48) { return "Dreadnaught"; }
		if (ship == 49) { return "Calamari Cruiser"; }
		if (ship == 50) { return "Calamari Cruiser"; }
		if (ship == 51) { return "Interdictor"; }
		if (ship == 52) { return "Victory Star Destroyer"; }
		if (ship == 53) { return "Imperial Star Destroyer"; }
		if (ship == 54) { return "Super Star Destroyer"; }
		if (ship == 55) { return "Container E"; }
		if (ship == 56) { return "Container F"; }
		if (ship == 57) { return "Container G"; }
		if (ship == 58) { return "Container H"; }
		if (ship == 59) { return "Container I"; }
		if (ship == 60) { return "Platform"; }
		if (ship == 61) { return "Platform"; }
		if (ship == 62) { return "Platform"; }
		if (ship == 63) { return "Platform"; }
		if (ship == 64) { return "Platform"; }
		if (ship == 65) { return "Platform"; }
		if (ship == 66) { return "Asteroid Base"; }
		if (ship == 67) { return "Asteroid Battery"; }
		if (ship == 68) { return "Asteroid Battery"; }
		if (ship == 69) { return "Factory"; }
		if (ship == 70) { return "Satellite"; }
		if (ship == 71) { return "Satellite"; }
		if (ship == 72) { return "Satellite"; }
		if (ship == 73) { return "Satellite"; }
		if (ship == 74) { return "Satellite"; }
		if (ship == 75) { return "Mine"; }
		if (ship == 76) { return "Mine"; }
		if (ship == 77) { return "Mine"; }
		if (ship == 78) { return "Gun Emplacement"; }
		if (ship == 79) { return "Mine"; }
		if (ship == 80) { return "Probe"; }
		if (ship == 81) { return "Probe"; }
		if (ship == 82) { return "Probe"; }
		if (ship == 83) { return "Bouy"; }
		if (ship == 84) { return "Bouy"; }
		if (ship == 85) { return "Hyper Bouy"; }
		if (ship == 86) { return "Asteroid Field"; }
		if (ship == 87) { return "Planet"; }
		if (ship == 88) { return "Bouy"; }
		if (ship == 89) { return "Cargo Canister"; }
		if (ship == 90) { return "Shipyard"; }
		if (ship == 91) { return "Repair Yard"; }
		if (ship == 92) { return "Modified Star Cruiser"; }
		if (ship == 93) { return "Lancer Frigate"; }
		if (ship == 94) { return "Bulk Cruiser"; }
		if (ship == 95) { return "Assault Frigate"; }
		if (ship == 96) { return "Corellian Gunship"; }
		if (ship == 97) { return "Landing Craft"; }
		if (ship == 98) { return "Assault Shuttle"; }
		if (ship == 99) { return "Marauder Corvette"; }
		if (ship == 100) { return "Star Galleon"; }
		if (ship == 101) { return "Research Ship"; }
		if (ship == 102) { return "Yaught"; }
		if (ship == 103) { return "Liner"; }
		if (ship == 104) { return "Action Transport"; }
		if (ship == 105) { return "Mobquet Transport"; }
		if (ship == 106) { return "Xiytiar Transport"; }
		if (ship == 107) { return "Freighter C"; }
		if (ship == 108) { return "Freighter H"; }
		if (ship == 109) { return "Freighter K"; }
		if (ship == 110) { return "YT 2000 Transport"; }
		if (ship == 111) { return "YT 2400 Transport"; }
		if (ship == 112) { return "Suprosa"; }
		if (ship == 113) { return "Blast Boat"; }
		if (ship == 114) { return "TIE Experimental"; }
		if (ship == 115) { return "TIE Experimental"; }
		if (ship == 116) { return "TIE Experimental"; }
		if (ship == 117) { return "TIE Experimental"; }
		if (ship == 118) { return "TIE Experimental"; }
		if (ship == 119) { return "Cloakshape Fighter"; }
		if (ship == 120) { return "Razor Fighter"; }
		if (ship == 121) { return "Planetary Fighter"; }
		if (ship == 122) { return "Supa Fighter"; }
		if (ship == 123) { return "Pinook Fighter"; }
		if (ship == 124) { return "Booster Pack"; }
		if (ship == 125) { return "Preybird Fighter"; }
		if (ship == 126) { return "Star Viper"; }
		if (ship == 127) { return "Firespray Fighter"; }
		if (ship == 128) { return "Pursuer"; }
		if (ship == 129) { return "Golan 1"; }
		if (ship == 130) { return "Golan 2"; }
		if (ship == 131) { return "Golan 3"; }
		if (ship == SPACE_COLONY_1) { return "Space Colony"; }
		if (ship == SPACE_COLONY_2) { return "Space Colony"; }
		if (ship == SPACE_COLONY_3) { return "Space Colony"; }

		return "";
	}

	generateMineField(centroid, radius, count, primaryTarget)
	{
		let fieldType = this.MINEFIELD_TYPE_CIRCULAR;

		let f = 0;
		let incf = 360 / count;

		let mineType = MINE_A;

		if (rand() % 100 < 25)
		{
			mineType = MINE_B;
		}

		if (fieldType == this.MINEFIELD_TYPE_CIRCULAR)
		{
			for (var a = 0; a < count; a++)
			{
				let str = "";

				str += "Mine";

				f += incf;

				let curStartPoint = vecUtils.toCartesan(90 * 3.14 / 180, f * 3.14 / 180, radius);
				curStartPoint.z = 0;

				curStartPoint = curStartPoint.add(centroid);

				let newFg = new FlightGroup();
				newFg.shipType = mineType;
				newFg.name = str;
				newFg.iff = IFF_IMPERIAL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_2, curStartPoint);
				newFg.startRegion = REGION_2;
				newFg.formation = FORMATION_FRONT_HEXAGON;
				newFg.shipCount = 1;
				newFg.skill = SKILL_VETERAN;
				newFg.team = TEAM_IMPERIAL_1;

				//Reg 1 order 1
				{
					orderUtils.addOrder(newFg, REGION_2, 0, ORDER_HOLD_STEADY, TARGET_TEAM, TARGET_TEAM, TEAM_REBEL_1, TEAM_REBEL_1, REGION_2, THROTTLE_80, SPEED_DEFAULT, 0, 0, new Vector3D(0,0,0));
				}

				//Add to avoidance
				{
					let curSeg = new Segment();
					curSeg.A = newFg.startPoint;
					curSeg.B = newFg.startPoint;
					generator.avoidanceSegments.push(curSeg);
				}

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}

		/*
		if (fieldType == this.MINEFIELD_TYPE_RANDOM)
		{
			for (int a = 0; a < count; a++)
			{
				Vector3D curStartPoint = randomVector(centroid, radius);

				FlightGroup newFg;
				newFg.shipType = MINE_A;
				newFg.name = "Mine";
				newFg.iff = IFF_IMPERIAL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_2, curStartPoint);
				newFg.startRegion = REGION_2;
				newFg.formation = FORMATION_FRONT_HEXAGON;
				newFg.shipCount = 3;
				newFg.team = TEAM_IMPERIAL;

				//Vector3D wp1 = getDesiredStartAngle(newFg.startPoint, 90, 0);
				//newFg.setWayPoint(REGION_2, 0, 0, wp1);

				{
					Order order1;
					order1.generateOrder_MainType(ORDER_HOLD_STEADY, TARGET_IFF, IFF_REBEL, TARGET_IFF, IFF_REBEL, THROTTLE_0);
					newFg.ordersRegion2[0] = order1;
				}

				flightGroups.push_back(newFg);
			}
		}
		*/
	}

	randomCargo_1(notCargo)
	{
		let cargos = [];
		cargos.push("Blasters");
		cargos.push("Supplies");
		cargos.push("Spares");
		cargos.push("Droids");
		cargos.push("Foodstuffs");
		cargos.push("Tibanna gas");
		cargos.push("Fuel");
		cargos.push("Munitions");
		cargos.push("Engines");
		cargos.push("Equipment");
		cargos.push("Bacta");
		cargos.push("Machinery");
		cargos.push("Fuel cells");
		cargos.push("Coolant");
		cargos.push("Water");
		cargos.push("Astromechs");
		cargos.push("Warheads");

		let index = rand() % cargos.length;

		let cur = cargos[index];

		return cur;
	}

	getRandomBackdrop_Sun()
	{
		let sunBackdrops = [];
		sunBackdrops.push(84);
		sunBackdrops.push(73);
		sunBackdrops.push(75);
		sunBackdrops.push(85);
		sunBackdrops.push(86);
		sunBackdrops.push(87);

		let index = rand() % sunBackdrops.length;

		let cur = sunBackdrops[index];

		return cur;
	}

	getAvoidancePoints(region)
	{
		let pts = [];

		for (var a = 0; a < flightGroupCount; a++)
		{
			if (flightGroups_2[a].startRegion == region)
			{
				pts.push(flightGroups_2[a].startPoint);
			}
		}

		return pts;
	}

	getRandomBackdrop_Sun()
	{
		let sunBackdrops = [];
		sunBackdrops.push(84);
		sunBackdrops.push(73);
		sunBackdrops.push(75);
		sunBackdrops.push(85);
		sunBackdrops.push(86);
		sunBackdrops.push(87);

		var index = rand() % sunBackdrops.length;

		var cur = sunBackdrops[index];
		//Remove the selected item
		sunBackdrops.splice(index, 1);

		return cur;
	}

	getRandomBackdrop_Planet()
	{
		//if (backDropsGenerated)
		{
			for (var a = 1; a < 60; a++)
			{
				//Dont use these:

				if (a == 63) { continue; }
				if (a == 55) { continue; }
				if (a == 25) { continue; }
				if (a == 44) { continue; }
				if (a == 45) { continue; }
				if (a == 27) { continue; }

				this.backdrops.push(a);
			}

			//backDropsGenerated = true;
		}

		let index = rand() % this.backdrops.length;

		let cur = this.backdrops[index];

		return cur;
	}

	//bool backDropsGenerated = false;
	getRandomBackdrop_Planet()
	{
		let backdrops = [];

		//if (backDropsGenerated)
		{
			for (var a = 1; a < 60; a++)
			{
				//Dont use these:

				if (a == 63) { continue; }
				if (a == 55) { continue; }
				if (a == 25) { continue; }
				if (a == 44) { continue; }
				if (a == 45) { continue; }
				if (a == 27) { continue; }

				backdrops.push(a);
			}

			//backDropsGenerated = true;
		}

		let index = rand() % backdrops.length;

		let cur = backdrops[index];

		//Remove the selected item
		backdrops.splice(index, 1);

		return cur;
	}

	generateBackdrops()
	{
		let starAndPlanet1 = [new Vector3D(5,5,5), new Vector3D(5,5,-5)];//ok
		let starAndPlanet2 = [new Vector3D(1,-5,0), new Vector3D(5,5,5)];
		let starAndPlanet3 = [new Vector3D(5,5,5), new Vector3D(1,-5, 0.2)];
		let starAndPlanet4 = [new Vector3D(-1,-5,0.5), new Vector3D(2,1,0.5)];
		let starAndPlanet5 = [new Vector3D(4, -5, -2), new Vector3D(1,3,0.5)];
		let starAndPlanet6 = [new Vector3D(0.75, 5, 0.5), new Vector3D(1.25, -5, -0.75)];
		let starAndPlanet7 = [new Vector3D(-0.75, 5, -0.5), new Vector3D(-1.65, -5, 1.45)];
		let starAndPlanet8 = [new Vector3D(5, 4, -0.2), new Vector3D(-5, -2.33, -0.32)];
		let starAndPlanet9 = [new Vector3D(-5, -2.33, 0.72), new Vector3D(5, -4, -1)];
		let starAndPlanet10 = [new Vector3D(-5, 2.33, -1.22), new Vector3D(5, 4, 2)];

		let backdrops = [ starAndPlanet1, starAndPlanet2, starAndPlanet3, starAndPlanet4, starAndPlanet5, starAndPlanet6, starAndPlanet7, starAndPlanet8, starAndPlanet9, starAndPlanet10 ];

		//[Region 1]
		{
			let bdPos = backdrops[rand() % backdrops.length];
			
			//Planet
			{
				let newFg = new FlightGroup();
				newFg.shipType = BACKDROP;
				newFg.cargo = "2.0";//Brightness (at least 2 for color)
				newFg.name = "0.3 0.3 0.3";//Color
				newFg.iff = IFF_BLUE;

				newFg.setStartPoint(0, bdPos[0]);//Planet
				newFg.startRegion = REGION_1;
				newFg.backdropRef = this.getRandomBackdrop_Planet();
				newFg.specialCargo = "1.0";//Size

				let sizes = [ "2.0", "1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3" ];
				let sz = sizes[rand() % sizes.length];

				this.rebelFleetBackdrops.push(flightGroupCount);//Only copy this from reg 1 once!

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;	
			}

			//Star or galaxy
			{
				let newFg = new FlightGroup();
				newFg.shipType = BACKDROP;
				newFg.cargo = "2.0";//Brightness (at least 2 for color)
				newFg.name = "0.3 0.3 0.3";//Color
				newFg.iff = IFF_BLUE;

				newFg.setStartPoint(0, bdPos[1]);//Planet
				newFg.startRegion = REGION_1;
				newFg.backdropRef = this.getRandomBackdrop_Sun();
				newFg.specialCargo = "1.0";//Size

				let sizes = [ "2.0", "1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3" ];
				let sz = sizes[rand() % sizes.length];

				this.rebelFleetBackdrops.push(flightGroupCount);//Only copy this from reg 1 once!

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;	
			}
		}

		//[Region 2]
		{
			let bdPos = backdrops[rand() % backdrops.length];

			//Planet
			{
				let newFg = new FlightGroup();
				newFg.shipType = BACKDROP;
				newFg.cargo = "2.0";//Brightness (at least 2 for color)
				newFg.name = "0.3 0.3 0.3";//Color
				newFg.iff = IFF_BLUE;

				newFg.setStartPoint(0, bdPos[0]);
				newFg.startRegion = REGION_2;
				newFg.backdropRef = this.getRandomBackdrop_Planet();
				newFg.specialCargo = "1.0";//Size

				let sizes = [ "2.0", "1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3" ];
				let sz = sizes[rand() % sizes.length];

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}

			//Star or galaxy
			{
				let newFg = new FlightGroup();

				newFg.shipType = BACKDROP;
				newFg.cargo = "2.0";//Brightness (at least 2 for color)
				newFg.name = "0.3 0.3 0.3";//Color
				newFg.iff = IFF_BLUE;
				newFg.setStartPoint(0, bdPos[1]);
				newFg.startRegion = REGION_2;
				newFg.backdropRef = this.getRandomBackdrop_Sun();

				let sizes = [ "2.0", "1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3" ];
				let sz = sizes[rand() % sizes.length];

				//Galaxy background sz
				if (newFg.backdropRef >= 73 && newFg.backdropRef < 81)
				{
					let sizes =  ["3.0", "2.0", "1.0" ];
					sz = sizes[rand() % sizes.length];
				}

				newFg.specialCargo = sz;//Size

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}
	}

	getSuitableName(shipType, IFF, playerCraft)
	{
		//Medium warships
		if (shipType == MC40A || shipType == ASSAULT_FRIGATE || shipType == DREADNAUGHT || shipType == LANCER_FRIGATE || shipType == INTERDICTOR || shipType == STRIKE_CRUISER || shipType == BULK_CRUISER || shipType == ASSAULT_FRIGATE || shipType == PATROL_CRAFT || shipType == MARAUDER_CORVETTE || shipType == CORELLIAN_GUNSHIP || shipType == ESCORT_CARRIER || shipType == CARRACK_CRUISER || shipType == CORVETTE || shipType == MODIFIED_CORVETTE || shipType == FRIGATE || shipType == MODIFIED_FRIGATE)
		{
			if (IFF == IFF_IMPERIAL)
			{
				return this.getName(NAME_SECOND_RATE);
			}
			else
			{
				return this.getName(NAME_REBEL);//Rebel secondrate todo
			}
		}

		//Player Cort
		//if (playerCraft)
		{
			if (shipType == YT_2000 || shipType == YT_2400 || shipType == CORELLIAN_TRANSPORT)
			{
				return this.getName(NAME_CORT);
			}
		}

		//TIEs
		if (shipType == TIE_FIGHTER || shipType == TIE_BOMBER || shipType == TIE_INTERCEPTOR || shipType == TIE_ADVANCED || shipType == TIE_DEFENDER)
		{
			return this.getName(NAME_TIE);
		}

		if (shipType == X_WING || shipType == Y_WING || shipType == A_WING || shipType == B_WING || shipType == T_WING || shipType == Z95)
		{
			return "Red";
		}

		if (shipType == GUNBOAT || shipType == MISSLE_BOAT)
		{
			return this.getName(NAME_GUNBOAT);
		}

		//Large warships
		if (shipType == ISD || shipType == VSD || shipType == MC80A || shipType == MC40A || shipType == EXECUTOR)
		{
			if (IFF == IFF_IMPERIAL)
			{
				return this.getName(NAME_IMPERIAL);
			}
			else
			{
				return this.getName(NAME_REBEL);
			}
		}

		//Freighters
		if (shipType == CARGO_FERRY || shipType == STAR_GALLEON || shipType == FREIGHT_TRANSPORT_C || shipType == MEDIUM_TRANSPORT || shipType == CONTAINER_TRANSPORT || shipType == BULK_FREIGHTER || shipType == ACTION_TRANSPORT || shipType == MODULAR_CONVEYOR || shipType == MOBQUET_TRANSPORT || shipType == XIYTIAR_TRANSPORT)
		{
			return this.getName(NAME_CARGO_SHIP);
		}

		//Small utility transport
		{
			if (shipType == YT_2000 || shipType == YT_2400 || shipType == CORELLIAN_TRANSPORT || shipType == ASSAULT_SHUTTLE || shipType == HEAVY_LIFTER || shipType == DELTA_TRANSPORT || shipType == ASSAULT_TRANSPORT || shipType == SCOUT_CRAFT || shipType == ESCORT_SHUTTLE || shipType == SHUTTLE || shipType == IMP_LANDING_CRAFT || shipType == ESCORT_TRANSPORT)
			{
				if (IFF == IFF_IMPERIAL)
				{
					return this.getName(NAME_IMP_UTILITY);
				}
				else
				{
					return this.getName(NAME_UTILITY);
				}
			}
		}

		//Container
		{
			if (shipType == CARGO_CANISTER || shipType == CONT_K || shipType == CONT_A || shipType == CONT_B || shipType == CONT_C || shipType == CONT_D || shipType == CONT_E || shipType == CONT_F || shipType == CONT_J || shipType == CONT_G || shipType == CONT_H || shipType == CONT_I)
			{
				return this.getName(NAME_CONTAINER);
			}
		}

		//Platform
		{
			if (shipType == SHIPYARD || shipType == REPAIR_YARD || shipType== GOLAN_1 || shipType == GOLAN_2 || shipType == GOLAN_3 || shipType == FACTORY || shipType == PLATFORM_1 || shipType == PLATFORM_2 || shipType == PLATFORM_3 || shipType == PLATFORM_4 || shipType == PLATFORM_5 || shipType == PLATFORM_6)
			{
				if(rand() % 100 < 50)
				{
					return this.getName(NAME_STATION);
				}
				return this.getName(NAME_STATION);
			}
		}

		return "NA";
	}

	getName(type)
	{
		if (type == NAME_REBEL)
		{
			if (mission.rebelCapitalshipNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.rebelCapitalshipNames.length);

				let cur = mission.rebelCapitalshipNames[index];

				// Remove the selected item
				mission.rebelCapitalshipNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.rebelCapitalshipNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.rebelCapitalshipNames_Initial.length);

					return mission.rebelCapitalshipNames_Initial[index2];
				}
			}
		}

		if (type == NAME_IMPERIAL)
		{
			if (mission.imperialCapitalshipNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.imperialCapitalshipNames.length);

				let cur = mission.imperialCapitalshipNames[index];

				// Remove the selected item
				mission.imperialCapitalshipNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.imperialCapitalshipNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.imperialCapitalshipNames_Initial.length);

					return mission.imperialCapitalshipNames_Initial[index2];
				}
			}
		}

		if (type == NAME_TIE)
		{
			if (mission.TIENames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.TIENames.length);

				let cur = mission.TIENames[index];

				// Remove the selected item
				mission.TIENames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.TIENames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.TIENames_Initial.length);

					return mission.TIENames_Initial[index2];
				}
			}
		}

		if (type == NAME_UTILITY)
		{
			if (mission.utilityNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.utilityNames.length);

				let cur = mission.utilityNames[index];

				// Remove the selected item
				mission.utilityNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.utilityNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.utilityNames_Initial.length);

					return mission.utilityNames_Initial[index2];
				}
			}
		}

		if (type == NAME_IMP_UTILITY)
		{
			if (mission.impUtilityNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.impUtilityNames.length);

				let cur = mission.impUtilityNames[index];

				// Remove the selected item
				mission.impUtilityNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.impUtilityNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.impUtilityNames_Initial.length);

					return mission.impUtilityNames_Initial[index2];
				}
			}
		}

		if (type == NAME_PLATFORM)
		{
			if (mission.randomNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.randomNames.length);

				let cur = mission.randomNames[index];

				return cur;
			}
		}

		if (type == NAME_STATION)
		{
			if (mission.stationNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.stationNames.length);

				let cur = mission.stationNames[index];

				return cur;
			}
		}

		if (type == NAME_SECOND_RATE)
		{	
			if (mission.imperialSecondRateNames.length > 1)
				{
					let index = Math.floor(Math.random() * mission.imperialSecondRateNames.length);

					let cur = mission.imperialSecondRateNames[index];

					// Remove the selected item
					mission.imperialSecondRateNames.splice(index, 1);

					return cur;
				}
				else // Return any if all have been removed
				{
					if(mission.imperialSecondRateNames_Initial.length > 0)
					{
						let index2 = Math.floor(Math.random() * mission.imperialSecondRateNames_Initial.length);

						return mission.imperialSecondRateNames_Initial[index2];
					}
				}
		}

		if (type == NAME_CARGO_SHIP)
		{
			if (mission.cargoShipNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.cargoShipNames.length);

				let cur = mission.cargoShipNames[index];

				// Remove the selected item
				mission.cargoShipNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.cargoShipNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.cargoShipNames_Initial.length);

					return mission.cargoShipNames_Initial[index2];
				}
			}
		}

		if (type == NAME_GUNBOAT)
		{
			if (mission.gunboatNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.gunboatNames.length);

				let cur = mission.gunboatNames[index];

				// Remove the selected item
				mission.gunboatNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.gunboatNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.gunboatNames_Initial.length);

					return mission.gunboatNames_Initial[index2];
				}
			}
		}

		if (type == NAME_CONTAINER)
		{
			if (mission.containerNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.containerNames.length);

				let cur = mission.containerNames[index];

				// Remove the selected item
				mission.containerNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.containerNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.containerNames_Initial.length);

					return mission.containerNames_Initial[index2];
				}
			}
		}

		if (type == NAME_CORT)
		{
			if (mission.cortNames.length > 1)
			{
				let index = Math.floor(Math.random() * mission.cortNames.length);

				let cur = mission.cortNames[index];

				// Remove the selected item
				mission.cortNames.splice(index, 1);

				return cur;
			}
			else // Return any if all have been removed
			{
				if(mission.cortNames_Initial.length > 0)
				{
					let index2 = Math.floor(Math.random() * mission.cortNames_Initial.length);

					return mission.cortNames_Initial[index2];
				}
			}
		}

		return "unnamed";
	}

	getDesiredStartAngle(startPos, inclination, azimuth)
	{
		let vec = new Vector3D();
		vec = vecUtils.toCartesan(inclination * 3.14 / 180, azimuth * 3.14 / 180, 0.1);
		return new Vector3D(startPos.x + vec.x, startPos.y + vec.y, startPos.z + vec.z);
	}

	generateRebelFleet_2()
	{
		this.commandShipPos = new Vector3D(0, 0, 0);// vecUtils.toCartesan(90, 45, utils.random_2(0.5, 1.6));

		//[Command ship]
		if (1)
		{
			let newFg = new FlightGroup();

			if (tourCommandShip == COMMAND_SHIP_LIBERTY)
			{
				newFg.shipType = MC80;
				mission.commandShipName = "Liberty";
			}

			if (tourCommandShip == COMMAND_SHIP_DEFIANCE)
			{
				newFg.shipType = MC80A;
				mission.commandShipName = "Defiance";
			}

			if (tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
			{
				newFg.shipType = MC80A;
				mission.commandShipName = "Independence";
			}
			
			newFg.name = mission.commandShipName;
			newFg.iff = IFF_REBEL;
			newFg.player = 0;
			newFg.setStartPoint(REGION_1, this.commandShipPos);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
			newFg.startRegion = REGION_1;
			newFg.startRegion_FromHyperspace = false;
			newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
			newFg.shipCount = 1;
			newFg.warheads = WARHEADS_NO_WARHEADS;
			newFg.team = TEAM_REBEL_2;
			newFg.mentionedInBriefing = false;
			newFg.role = ROLE_COMMAND_SHIP;
			newFg.roleEnabled = true;

			//[Region 1 waypoints]

			let wp1 = generator.getDesiredStartAngle(new Vector3D(1, 0, 0), 90, 0);
			newFg.setWayPoint(REGION_1, 0, 0, wp1);

			this.defiance = flightGroupCount;

			flightGroups_2[flightGroupCount] = newFg;
			flightGroupCount++;
		}

		let backPoint = new Vector3D(0, 5, 0);
		let frontPoint = new Vector3D(0, -5, 0);

		let points = vecUtils.generatePoints2(backPoint, frontPoint, 7, 0.25, 3);

		//Ship 1
		{
			let newFg = new FlightGroup();

			let startPoint = points[0];
			this.rebelFleetShipPositions.push(startPoint);

			{
				newFg = new FlightGroup();
				newFg.shipType = ASSAULT_FRIGATE;
				newFg.name = this.getSuitableName(newFg.shipType, IFF_REBEL, 0);// getSuitableName(newFg.shipType, IFF_REBEL, false);;
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_2;
				newFg.mentionedInBriefing = false;

				let wp1 = this.getDesiredStartAngle(startPoint, 90, 0);
				newFg.setWayPoint(REGION_1, 0, 0, wp1);

				this.rebelFleetShips.push(flightGroupCount);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}

		//Ship 2
		{
			let newFg = new FlightGroup();

			let startPoint = points[1];
			this.rebelFleetShipPositions.push(startPoint);

			{
				newFg = new FlightGroup();
				newFg.shipType = BULK_CRUISER;
				newFg.name = this.getSuitableName(newFg.shipType, IFF_REBEL, 0);// getSuitableName(newFg.shipType, IFF_REBEL, false);;
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_2;
				newFg.mentionedInBriefing = false;

				let wp1 = this.getDesiredStartAngle(startPoint, 90, 0);
				newFg.setWayPoint(REGION_1, 0, 0, wp1);

				this.rebelFleetShips.push(flightGroupCount);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}

		//Ship 3
		{
			let newFg = new FlightGroup();

			let startPoint = points[2];
			this.rebelFleetShipPositions.push(startPoint);

			{
				newFg = new FlightGroup();
				newFg.shipType = CORVETTE;
				newFg.name = this.getSuitableName(newFg.shipType, IFF_REBEL, 0);// getSuitableName(newFg.shipType, IFF_REBEL, false);;
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_2;
				newFg.mentionedInBriefing = false;

				let wp1 = this.getDesiredStartAngle(startPoint, 90, 0);
				newFg.setWayPoint(REGION_1, 0, 0, wp1);

				this.rebelFleetShips.push(flightGroupCount);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}

		//Ship 4
		{
			let newFg = new FlightGroup();

			let startPoint = points[3];
			this.rebelFleetShipPositions.push(startPoint);

			{
				newFg = new FlightGroup();
				newFg.shipType = MC40A;
				newFg.name = this.getSuitableName(newFg.shipType, IFF_REBEL, 0);// getSuitableName(newFg.shipType, IFF_REBEL, false);;
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_2;
				newFg.mentionedInBriefing = false;

				let wp1 = this.getDesiredStartAngle(startPoint, 90, 0);
				newFg.setWayPoint(REGION_1, 0, 0, wp1);

				this.rebelFleetShips.push(flightGroupCount);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}

		//Ship 5
		{
			let newFg = new FlightGroup();

			let startPoint = points[4];
			this.rebelFleetShipPositions.push(startPoint);

			{
				newFg = new FlightGroup();
				newFg.shipType = FRIGATE;
				newFg.name = this.getSuitableName(newFg.shipType, IFF_REBEL, 0);// getSuitableName(newFg.shipType, IFF_REBEL, false);;
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_2;
				newFg.mentionedInBriefing = false;

				let wp1 = this.getDesiredStartAngle(startPoint, 90, 0);
				newFg.setWayPoint(REGION_1, 0, 0, wp1);

				this.rebelFleetShips.push(flightGroupCount);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}

		//Ship 6
		{
			let newFg = new FlightGroup();

			let startPoint = points[5];
			this.rebelFleetShipPositions.push(startPoint);

			{
				newFg = new FlightGroup();
				newFg.shipType = MODIFIED_FRIGATE;
				newFg.name = this.getSuitableName(newFg.shipType, IFF_REBEL, 0);// getSuitableName(newFg.shipType, IFF_REBEL, false);;
				newFg.iff = IFF_REBEL;
				newFg.player = 0;
				newFg.setStartPoint(REGION_1, startPoint);// Vector3D(-3.0, 0.5, 0.0));//FB LR UD
				newFg.startRegion = REGION_1;
				newFg.startRegion_FromHyperspace = false;
				newFg.hyperspaceDeparturePos = new Vector3D(0.0, 0.0, 0.0);//Same as nav boy pos
				newFg.shipCount = 1;
				newFg.warheads = WARHEADS_NO_WARHEADS;
				newFg.team = TEAM_REBEL_2;
				newFg.mentionedInBriefing = false;

				let wp1 = this.getDesiredStartAngle(startPoint, 90, 0);
				newFg.setWayPoint(REGION_1, 0, 0, wp1);

				this.rebelFleetShips.push(flightGroupCount);

				flightGroups_2[flightGroupCount] = newFg;
				flightGroupCount++;
			}
		}	
	}

	getTIE()
	{
		let ships = [];

		ships.push(TIE_FIGHTER);
		ships.push(TIE_INTERCEPTOR);
		ships.push(TIE_BOMBER);
		//ships.push_back(TIE_ADVANCED);

		let index = rand() % ships.length;

		return ships[index];
	}

	getTIEFighterOrInterceptor()
	{
		let ships = [];

		ships.push(TIE_FIGHTER);
		ships.push(TIE_INTERCEPTOR);
		//ships.push(TIE_BOMBER);
		//ships.push_back(TIE_ADVANCED);

		let index = rand() % ships.length;

		return ships[index];
	}

	compileMissionType(type)
	{
		if(type == MISSION_TYPE_SEIZE_CONTAINER)
		{
			missionType1.compile();
		}

		if(type == MISSION_TYPE_SS_RECOVERY)
		{
			missionType2.compile();
		}

		if(type == MISSION_TYPE_BASE_ATTACK)
		{
			missionType3.compile();
		}
	}

	generate(n)
	{
		//First N missions are mutually exclusive
		if(n == 0)
		{
			this.compileMissionType(types[0])
		}
		else if(n == 1)
		{
			this.compileMissionType(types[1])
		}
		else if(n == 2)
		{
			this.compileMissionType(types[2])
		}
		else//Others totally randomly selected
		{
			this.compileMissionType(types[rand() % types.length])
		}
	}
};