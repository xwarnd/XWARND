class TIE
{
	//The 3 main .tie file parts
	headerBytes2 = [];//Header
	buffer2 = [];//Flight groups
	footer2 = [];//Footer

	briefingBytes = [];
	briefingByteCount = 0;
	//
	
	addByteToBuffer(ch)
	{
		this.buffer2.push(ch);
	}
	
	intToShortBytes(value)
	{
		return new Uint8Array([
			value & 0xFF,          // low byte
			(value >> 8) & 0xFF    // high byte
		]);
	}

	addByteToBriefing(ch)
	{
		this.briefingBytes[this.briefingByteCount] = ch;
		this.briefingByteCount++;
	}

	insertEmptyBytesToBriefing(count)
	{
		for (var a = 0; a < count; a++)
		{
			this.briefingBytes[this.briefingByteCount] = 0x0;
			this.briefingByteCount++;
		}
	}

	distToFinalByte_2(tgtDistance)
	{
		let distToInt = 160.0263723383473;
		let integer = tgtDistance * distToInt;
		
		let bytes2 = [];
		bytes2 = this.intToShortBytes(integer);
		
		return bytes2;
	}
	
	addDistanceValueToBuffer(dist)
	{
		let bytes4 = [0,0];
		bytes4[1] = this.distToFinalByte_2(dist)[0];
		bytes4[0] = this.distToFinalByte_2(dist)[1];
			
		this.addByteToBuffer(bytes4[1]);
		this.addByteToBuffer(bytes4[0]);
	}
	
	insertEmptyBytes(count)
	{
		for (let a = 0; a < count; a++)
		{
			this.buffer2.push(0x0);
		}
	}
	
	addByteToHeader(byte)
	{
		this.headerBytes2.push(byte);
	}
	
	addStringToHeader(str, sz)
	{
		for (var a = 0; a < sz; a++)
		{
			if (a < str.length)
			{
				this.addByteToHeader(str.charCodeAt(a));
			}
			else
			{
				this.addByteToHeader(0x0);
			}
		}
	}
	
	insertEmptyBytesToHeader(count)
	{
		for (let a = 0; a < count; a++)
		{
			this.headerBytes2.push(0x0);
		}
	}
	
	insertEmptyBytesToFooter(count)
	{
		for (let a = 0; a < count; a++)
		{
			this.footer2.push(0x0);
		}
	}

	addByteToFooter(byte)
	{
		this.footer2.push(byte);
	}
	
	addStringToFooter(str, sz)
	{
		for (var a = 0; a < sz; a++)
		{
			if (a < str.length)
			{
				this.addByteToFooter(str.charCodeAt(a));
			}
			else
			{
				this.addByteToFooter(0x0);
			}
		}
	}
	
	writeString(str)
	{
		for (var a = 0; a < 20; a++)
		{
			if (a < str.length)
			{
				this.buffer2.push(str.charCodeAt(a));
			}
			else
			{
				this.buffer2.push(0x0);
			}
		}
	}
	
	addStringToBuffer(str, sz)
	{	
		this.writeString(str);
	}
		
	addFlightGroup_3(n)
	{
		let craftInt = flightGroups_2[n].shipType;
		let FlightGroupName = flightGroups_2[n].name;
		let RoleDesciption = "";
		let Cargo = flightGroups_2[n].cargo;
		let SpecicalCargo = flightGroups_2[n].specialCargo;
		let craftCount = flightGroups_2[n].shipCount;
		let waveCount = flightGroups_2[n].waveCount;
		let IFF = flightGroups_2[n].iff;
		let warheads = flightGroups_2[n].warheads;
		let player = flightGroups_2[n].player;
		let role = flightGroups_2[n].role;
		let markings = flightGroups_2[n].markings;
		let radio = flightGroups_2[n].radio;
		let role1Enabled = 0xFF;
		let role2Enabled = 0xFF;
		let team = flightGroups_2[n].team;
		let orderN = 0;
		
		if (flightGroups_2[n].roleEnabled)
		{
			role1Enabled = 0x0;
		}
		
		this.addStringToBuffer(FlightGroupName, default_string_size);
			
		this.addByteToBuffer(role1Enabled);
		this.addByteToBuffer(role2Enabled);
		this.addByteToBuffer(role);//craft role
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		
		this.addByteToBuffer(0xFF);
		this.addByteToBuffer(0xFF);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addStringToBuffer(Cargo, default_string_size);
		this.addStringToBuffer(SpecicalCargo, default_string_size);
		this.addStringToBuffer(RoleDesciption, default_string_size);
		this.addByteToBuffer(0x0);//Special cargo bool
		
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x01);//Reference?
		this.addByteToBuffer((craftInt));//Craft type [x]
		this.addByteToBuffer((craftCount));//Number of craft [x]
		this.addByteToBuffer(flightGroups_2[n].status1);//Weapons shield status [x]
		this.addByteToBuffer((warheads));//Warheads [x]
		this.addByteToBuffer(0x0);//
		this.addByteToBuffer((IFF));//IFF [x]
		this.addByteToBuffer(team);//Team [x] //Player must be team 1 for hyper to work
		this.addByteToBuffer(flightGroups_2[n].skill);//Skill [x]
		this.addByteToBuffer(markings);//Markings [x]
		this.addByteToBuffer(radio);//Radio [x]
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].formation);//Formation [x]
		this.addByteToBuffer(flightGroups_2[n].spacing);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(waveCount - 1);//Waves [x]
		this.addByteToBuffer(0x04);
		
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(player);//Payer craft ref [x]
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);//

		this.addByteToBuffer(flightGroups_2[n].dropOffCraft);

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);//
		
		if (flightGroups_2[n].mentionedInBriefing == 1)
		{
			this.addByteToBuffer(flightGroups_2[n].arrivalTargetQualifier);
			this.addByteToBuffer(0x01);
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(flightGroups_2[n].arrivalCondition);//Condition box 1 - Condition type
			this.addByteToBuffer((flightGroups_2[n].arrivalConditionRegion));
		}
		else
		{
			this.addByteToBuffer(flightGroups_2[n].arrivalTargetQualifier);//Condition box 4 - Qualifier
			this.addByteToBuffer(flightGroups_2[n].arrivalTarget);//Condition box 2 - Condition spec 1
			this.addByteToBuffer(flightGroups_2[n].arrivalTargetDetail);//Condition box 3 - Condition spec 2
			this.addByteToBuffer(flightGroups_2[n].arrivalCondition);//Condition box 1 - Condition type
			this.addByteToBuffer((flightGroups_2[n].arrivalConditionRegion));
		}
		
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		if (flightGroups_2[n].mentionedInBriefing == 1)
		{
			this.addByteToBuffer(0x01);//!!!!!
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].arrivalTargetQualifier_2);//Condition box 4 - Qualifier
		this.addByteToBuffer(flightGroups_2[n].arrivalTarget_2);//Condition box 2 - Condition spec 1
		this.addByteToBuffer(flightGroups_2[n].arrivalTargetDetail_2);//Condition box 3 - Condition spec 2
		this.addByteToBuffer(flightGroups_2[n].arrivalCondition_2);//Condition box 1 - Condition type
		this.addByteToBuffer((flightGroups_2[n].arrivalConditionRegion_2));
		
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		
		this.addByteToBuffer(flightGroups_2[n].arrivalDelayMinutes);
		this.addByteToBuffer(flightGroups_2[n].arrivalDelaySeconds);//Arrival delay [x]
		this.addByteToBuffer(flightGroups_2[n].departureTargetQualifier);//Condition box 4 - Qualifier
		this.addByteToBuffer(flightGroups_2[n].departureTarget);//Condition box 2 - Condition spec 1
		this.addByteToBuffer(flightGroups_2[n].departureTargetDetail);//Condition box 3 - Condition spec 2
		this.addByteToBuffer(flightGroups_2[n].departureCondition);//Condition box 1 - Condition type
		this.addByteToBuffer(flightGroups_2[n].departureConditionTgtRegion);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].abortMissionWhen);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].motherShip);//Arrive from this craft
		this.addByteToBuffer(flightGroups_2[n].arriveFromMotherShip);//Arrive from mothership or hyperspace

		this.addByteToBuffer(flightGroups_2[n].motherShip);//Depart via this craft
		this.addByteToBuffer(flightGroups_2[n].departViaMothership);

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		this.addByteToBuffer(flightGroups_2[n].motherShip);//Alternate depart via this craft
		this.addByteToBuffer(flightGroups_2[n].departViaMothership);

		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].throttle);//Throttle order 1 +148 = next throttle

		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		//NB: These are in a different order in other sections!
		{
			orderN = 0;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion1[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion1[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion1[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion1[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion1[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion1[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion1[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion1[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);
		}

		//////////////////////
		// ORDERS / WAYPOINTS
		//////////////////////
		
		////////////////////
		//REGION 1
		////////////////////

		//[ORDER 1]
		
		//[Wps]
		for (var a = 0; a < 8; a++)
		{		
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[0].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[0].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[0].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion1[0].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//To do with hyper
		}

		//Order data in this area?

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].orderSpecifics2);

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		//[SECONDARY TARGET BOX]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].secondaryOrderTargetB);//Target type secondary A - (IFF, ship type, etc)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].secondaryOrderTargetB);//Target type secondary B
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].secondaryOrderTargetDetailB);//Target detail secondary A - (Awing / IFF_Rebel, etc)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].secondaryOrderTargetDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		//[PRIMARY TARGET BOX]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].primaryOrderTargetA);//Target type primary A
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].primaryOrderTargetDetailA);//Target detail primary
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].primaryOrderTargetA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].primaryOrderTargetDetailA);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		
		//[ORDER 2]
		
		//[Wps]
		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[1].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[1].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[1].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion1[1].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////
		
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].orderType);//Throttle for order 3 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].throttle);//Throttle for order 3 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].orderSpecifics2);

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].secondaryOrderTargetA);//Target type secondary A - (IFF, ship type, etc)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].secondaryOrderTargetB);//Target type secondary B
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].secondaryOrderTargetDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].secondaryOrderTargetDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].primaryOrderTargetA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].primaryOrderTargetDetailA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].primaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].primaryOrderTargetDetailB);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		//[ORDER 3]
		
		//[Wps]
		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[2].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[2].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[2].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion1[2].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//[ORDER 4]
		
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].orderType);//Throttle for order 4 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].throttle);//Throttle for order 4 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].orderSpecifics2);

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].secondaryOrderTargetA);//Target type secondary A - (IFF, ship type, etc)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].secondaryOrderTargetB);//Target type secondary B
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].secondaryOrderTargetDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].secondaryOrderTargetDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].primaryOrderTargetA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].primaryOrderTargetDetailA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].primaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].primaryOrderTargetDetailB);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		
		//[Wps]
		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[3].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[3].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion1[3].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion1[3].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////
		
		////////////////////
		//REGION 2
		////////////////////

		//Order 1 for region 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].orderSpecifics1);//Docking time / Tgt region
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].orderSpecifics2);//Docking time
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		{
			orderN = 0;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);
		}

		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);
		
		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[0].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[0].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[0].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion2[0].waypoints[a].enabled);//BOOL WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////
		
		//Order 2 for region 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		{
			orderN = 1;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
		}

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[1].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[1].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[1].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion2[1].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//Order 3 data here...

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//Order 2 for region 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		{
			orderN = 2;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
		}
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);
		
		//[ORDER 3]

		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[2].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[2].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[2].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion2[2].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//Order 2 for region 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		{
			orderN = 3;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion2[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion2[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
		}
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);
		
		//[ORDER 4]

		//WP1

		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[3].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[3].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion2[3].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion2[3].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////
			
		////////////////////
		//REGION 3
		////////////////////
		
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		{
			orderN = 0;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
		}

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[WPs]
		
		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[0].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[0].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[0].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion3[0].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////
		
		//Order 2 for region 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		{
			orderN = 1;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
		}
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[WPs]
		
		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[1].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[1].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[1].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion3[1].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//Order 3 data here...

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//Order 2 for region 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		{
			orderN = 2;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
		}
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[ORDER 3]
		
		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[2].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[2].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[2].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion3[2].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//Order 2 for region 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		{
			orderN = 3;

			let targetPrimaryTypeA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetA;
			let targetPrimaryDetailA = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailA;
			let targetPrimaryTypeB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetB;
			let targetPrimaryDetailB = flightGroups_2[n].ordersRegion3[orderN].primaryOrderTargetDetailB;

			let targetSecondaryTypeA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetA;
			let targetSecondaryDetailA = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailA;
			let targetSecondaryTypeB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetB;
			let targetSecondaryDetailB = flightGroups_2[n].ordersRegion3[orderN].secondaryOrderTargetDetailB;

			//[SECONDARY TARGET BOX]
			this.addByteToBuffer(targetSecondaryTypeA);//Target type secondary A - (IFF, ship type, etc) [left upper box]
			this.addByteToBuffer(targetSecondaryTypeB);//Target type secondary B - (IFF, ship type, etc) [left lower box]
			this.addByteToBuffer(targetSecondaryDetailA);//Target detail secondary A - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetSecondaryDetailB);//Target detail secondary B - (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(0x0);
			this.addByteToBuffer(0x0);

			//[PRIMARY TARGET BOX]
			this.addByteToBuffer(targetPrimaryTypeA);//Target type primary A (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailA);//Target detail primary A (Awing / IFF_Rebel, etc)
			this.addByteToBuffer(targetPrimaryTypeB);//Target type primary B (IFF, ship type, etc)
			this.addByteToBuffer(targetPrimaryDetailB);//Target detail primary B (Awing / IFF_Rebel, etc)
		}
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[ORDER 4]
	
		//WP1

		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[3].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[3].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion3[3].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion3[3].waypoints[a].enabled);//BOOL WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(90 - 26);
		//////////////
		
		////////////////////
		//REGION 4
		////////////////////

		//[ORDER 1]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].secondaryOrderTargetDetailB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].secondaryOrderTargetDetailB);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].primaryOrderTargetA); //TARGET_IFF etc; // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].primaryOrderTargetDetailA);//IFF_REBEL etc // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].primaryOrderTargetA);; //TARGET_IFF etc;// (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetDetailA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].primaryOrderTargetDetailA);//IFF_REBEL  etc
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[0].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[0].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[0].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion4[0].waypoints[a].enabled);//BOOL PREV WP ENABLED
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//Order 2 for region [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].secondaryOrderTargetDetailB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].secondaryOrderTargetDetailB);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].primaryOrderTargetA); //TARGET_IFF etc; // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].primaryOrderTargetDetailA);//IFF_REBEL etc // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].primaryOrderTargetA);; //TARGET_IFF etc;// (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetDetailA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].primaryOrderTargetDetailA);//IFF_REBEL  etc
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[WPs]
		
		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[1].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[1].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[1].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion4[1].waypoints[a].enabled);
			this.addByteToBuffer(0x0);//???????
		}

		//Order 3 data here...

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//Order 3 for region[x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].secondaryOrderTargetDetailB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].secondaryOrderTargetDetailB);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].primaryOrderTargetA); //TARGET_IFF etc; // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].primaryOrderTargetDetailA);//IFF_REBEL etc // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].primaryOrderTargetA);; //TARGET_IFF etc;// (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetDetailA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].primaryOrderTargetDetailA);//IFF_REBEL  etc
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[ORDER 3]
		
		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[2].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[2].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[2].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion4[2].waypoints[a].enabled);
			this.addByteToBuffer(0x0);//???????
		}

		//////////////
		this.insertEmptyBytes(64);
		//////////////

		//Order 4 for region [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].orderType);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].throttle);//Throttle for order 2 [x]
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].orderSpecifics1);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].orderSpecifics2);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].secondaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].secondaryOrderTargetDetailB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].secondaryOrderTargetDetailB);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].primaryOrderTargetA); //TARGET_IFF etc; // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].primaryOrderTargetDetailA);//IFF_REBEL etc // (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetB);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].primaryOrderTargetA);; //TARGET_IFF etc;// (flightGroups_2[n].ordersRegion2[1].primaryOrderTargetDetailA);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].primaryOrderTargetDetailA);//IFF_REBEL  etc
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].speed);//SPEED MGLT
		this.addByteToBuffer(0x0);

		//[ORDER 4]
		
		//[WPs]

		for (var a = 0; a < 8; a++)
		{
			//Each adds two bytes for the dist
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[3].waypoints[a].x);//WP X
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[3].waypoints[a].y);//WP Y
			this.addDistanceValueToBuffer(flightGroups_2[n].waypoints.WPRegion4[3].waypoints[a].z);//WP Z

			this.addByteToBuffer(flightGroups_2[n].waypoints.WPRegion4[3].waypoints[a].enabled);
			this.addByteToBuffer(0x0);//???????
		}

		this.addByteToBuffer(0x0);
		this.insertEmptyBytes(63);
		
		////////////////////////////////////////////
		//[Skip to to orders] ToDo: Secondary conditions
		// NB: This was causing the Corvette on arrival in reg 3 to fly home or not jump correctly
		////////////////////////////////////////////
		// 
		//Skip to this order 1 region 1
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[0].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 2 region 1
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[1].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 3 region 1
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[2].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 3 region 1
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion1[3].jumpToSpecifics);
		this.insertEmptyBytes(11);

		///////////////////////////////////

		//Skip to order 1 region 2
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[0].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 2 region 2
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[1].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 3 region 2
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[2].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 4 region 2
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion2[3].jumpToSpecifics);
		this.insertEmptyBytes(11);

		///////////////////////////////////

		//Skip to order 1 region 3
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[0].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 2 region 3
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[1].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 3 region 3
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[2].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 3 region 3
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion3[3].jumpToSpecifics);
		this.insertEmptyBytes(11);

		///////////////////////////////////

		//Skip to order 1 region 4
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[0].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 2 region 4
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[1].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 3 region 4
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[2].jumpToSpecifics);
		this.insertEmptyBytes(11);

		//Skip to order 4 region 4
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].jumpToMustWhat);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].jumpToTarget);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].jumpToTargetDetail);//The craft (if FG)
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].jumpToWho);
		this.addByteToBuffer(flightGroups_2[n].ordersRegion4[3].jumpToSpecifics);

		this.insertEmptyBytes(11);

		//Skip to order was causing error with the corvette not hypering correctly
		
		//[FG goals]

		this.addByteToBuffer(flightGroups_2[n].must1);
		this.addByteToBuffer(flightGroups_2[n].goal1);//Goal
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x01);//Set to 1 (active goal?)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].goal1Region);//Region specifics
		this.insertEmptyBytes(65);

		this.addByteToBuffer(flightGroups_2[n].must2);
		this.addByteToBuffer(flightGroups_2[n].goal2);//Goal
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x01);//Set to 1 (active goal?)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].goal2Region);//Region specifics
		this.insertEmptyBytes(65);

		this.addByteToBuffer(flightGroups_2[n].must3);
		this.addByteToBuffer(flightGroups_2[n].goal3);//Goal
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x01);//Set to 1 (active goal?)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].goal3Region);//Region specifics
		this.insertEmptyBytes(65);

		this.addByteToBuffer(flightGroups_2[n].must4);
		this.addByteToBuffer(flightGroups_2[n].goal4);//Goal
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x01);//Set to 1 (active goal?)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].goal4Region);//Region specifics
		this.insertEmptyBytes(65);

		this.addByteToBuffer(flightGroups_2[n].must5);
		this.addByteToBuffer(flightGroups_2[n].goal5);//Goal
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x01);//Set to 1 (active goal?)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].goal5Region);//Region specifics
		this.insertEmptyBytes(65);

		this.addByteToBuffer(flightGroups_2[n].must6);
		this.addByteToBuffer(flightGroups_2[n].goal6);//Goal
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x01);//Set to 1 (active goal?)
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].goal6Region);//Region specifics
		this.insertEmptyBytes(65);

		//////////////
		this.insertEmptyBytes(134); //934
		//////////////
		
		//START POINT

		//ToDo: Other region start points

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		this.addByteToBuffer(0x1);//BOOL PREV SP ENABLED
		this.addByteToBuffer(0x0);//???

		this.insertEmptyBytes(16);

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);

		//Hyper point region 1
		//this.addByteToBuffer(0x1);

		//Start point region 1?
		this.addDistanceValueToBuffer(flightGroups_2[n].startPoint.x);//WP X
		this.addDistanceValueToBuffer(flightGroups_2[n].startPoint.y);//WP Y
		this.addDistanceValueToBuffer(flightGroups_2[n].startPoint.z);//WP Z
		this.addByteToBuffer(0x1);

		//this.addByteToBuffer(flightGroups_2[n].region1StartPositionEnabled);//Startpoint region 1 enabled
		//this.addByteToBuffer(0x0);
		//this.addByteToBuffer(0x0);

		this.insertEmptyBytes(17);
		this.addDistanceValueToBuffer(flightGroups_2[n].hyperspaceDeparturePos.x);//WP X
		this.addDistanceValueToBuffer(flightGroups_2[n].hyperspaceDeparturePos.y);//WP Y
		this.addDistanceValueToBuffer(flightGroups_2[n].hyperspaceDeparturePos.z);//WP Z
		this.addByteToBuffer(flightGroups_2[n].useHyperspaceDepart);
		this.addByteToBuffer(0x0);

		//Restore
		this.addByteToBuffer(flightGroups_2[n].startRegion);//Start region [x]

		this.addByteToBuffer(0x0);
		this.addByteToBuffer(0x0);
		this.addByteToBuffer(flightGroups_2[n].startRegion);//Hyperspace waypoint depart region

		//////////////
		this.insertEmptyBytes(28);
		//////////////

		this.addByteToBuffer(flightGroups_2[n].wingmanGroup);//Wingman group

		this.addByteToBuffer(0x0);

		//Warhead options
		if (flightGroups_2[n].allow_space_bombs)
		{
			this.addByteToBuffer(0x01);
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		if (flightGroups_2[n].allow_rockets)
		{
			this.addByteToBuffer(0x02);
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		if (flightGroups_2[n].allow_missiles)
		{
			this.addByteToBuffer(0x03);
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		if (flightGroups_2[n].allow_torpedoes)
		{
			this.addByteToBuffer(0x04);
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		if (flightGroups_2[n].allow_adv_missiles)
		{
			this.addByteToBuffer(0x05);
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		if (flightGroups_2[n].allow_adv_torpedoes)
		{
			this.addByteToBuffer(0x06);
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		if (flightGroups_2[n].allow_mag_pulse)
		{
			this.addByteToBuffer(0x07);
		}
		else
		{
			this.addByteToBuffer(0x0);
		}

		//////////////
		this.insertEmptyBytes(63);
		//////////////

		this.addByteToBuffer(flightGroups_2[n].backdropRef);//Backdrop //this.addByteToBuffer(flightGroups_2[n].backdropRef);//Backdrop

		this.insertEmptyBytes(43);
	}
	
	createHeader()
	{
		this.addByteToHeader(0x12);
		this.addByteToHeader(0x0);
		this.addByteToHeader(flightGroupCount);
		this.addByteToHeader(0x0);
		this.addByteToHeader(mission.messages.length);
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x01);
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(88);
		
		//aka insertRegions():
		this.addStringToHeader(mission.region1Title, 132);
		this.addStringToHeader(mission.region2Title, 132);
		this.addStringToHeader(mission.region3Title, 132);
		this.addStringToHeader(mission.region4Title, 132);
		//
		
		//Final data
		this.insertEmptyBytesToHeader(68);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);// X 15
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(139);
		this.addByteToHeader(0x01);

		this.insertEmptyBytesToHeader(6335);
		
		this.addByteToHeader(mission.hangarType);//HANGAR TYPE
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x0);//Auto end mission when objectives completed
		this.addByteToHeader(Math.floor(Math.random() * 3));//Mission officer voice
		
		if (tourCommandShip == COMMAND_SHIP_DEFIANCE)
		{
			this.addByteToHeader(0x04);//Defiance insignia
		}

		if (tourCommandShip == COMMAND_SHIP_LIBERTY)
		{
			this.addByteToHeader(0x05);//Liberty insignia
		}

		if (tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
		{
			this.addByteToHeader(0x06);//Independence insignia
		}
		
		this.addByteToHeader(0x0);
		this.addByteToHeader(0x62);//Essential for briefing to work?

		if (tourCommandShip == COMMAND_SHIP_DEFIANCE)
		{
			this.addByteToHeader(0x04);//Defiance insignia
		}

		if (tourCommandShip == COMMAND_SHIP_LIBERTY)
		{
			this.addByteToHeader(0x05);//Liberty insignia
		}

		if (tourCommandShip == COMMAND_SHIP_INDEPENDENCE)
		{
			this.addByteToHeader(0x06);//Independence insignia
		}

		this.insertEmptyBytesToHeader(59);
	}
	
	//aka: generateTieFile_Footer()
	createFooter()
	{
		//[Generate mission messages]

		if (mission.messages.length > 0)
		{
			if (mission.messages[0].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[0].detail_1 -= 1;
			}
		}

		if (mission.messages.length > 1)
		{
			if (mission.messages[1].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[1].detail_1 -= 1;
			}
		}

		if (mission.messages.length > 2)
		{
			if (mission.messages[2].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[2].detail_1 -= 1;
			}
		}

		if (mission.messages.length > 3)
		{
			if (mission.messages[3].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[3].detail_1 -= 1;
			}
		}

		if (mission.messages.length > 4)
		{
			if (mission.messages[4].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[4].detail_1 -= 1;
			}
		}

		if (mission.messages.length > 5)
		{
			if (mission.messages[5].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[5].detail_1 -= 1;
			}
		}

		if (mission.messages.length > 6)
		{
			if (mission.messages[6].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[6].detail_1 -= 1;
			}
		}

		if (mission.messages.length > 7)
		{
			if (mission.messages[7].target_1 == TARGET_SHIP_TYPE)
			{
				mission.messages[7].detail_1 -= 1;
			}
		}

		//Radio messages
		for (var n = 0; n < mission.messages.length; n++)
		{
			this.addByteToFooter(n);
			this.addByteToFooter(0x0);

			this.addStringToFooter(mission.messages[n].message, 68);
			this.insertEmptyBytesToFooter(12);
			this.addByteToFooter(0x01);
			this.insertEmptyBytesToFooter(22 - 13);
			this.addByteToFooter(mission.messages[n].targetQualifier_1);//Must be
			this.addByteToFooter(mission.messages[n].target_1);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_1);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_1);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_1 + 1);//Region

			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_2);//Must be
			this.addByteToFooter(mission.messages[n].target_2);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_2);//Target detail (TEAM, X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_2);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_2 + 1);//Region

			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);

			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_1);//Must be
			this.addByteToFooter(mission.messages[n].target_1);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_1);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_1);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_1 + 1);//Region
			
			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_2);//Must be
			this.addByteToFooter(mission.messages[n].target_2);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_2);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_2);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_2 + 1);//Region

			this.addByteToFooter(0x66);

			this.insertEmptyBytesToFooter(20);//43
			this.addByteToFooter(mission.messages[n].delaySeconds);//Message delay

			//Conditions to cancel the message

			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_cancel);//Must be
			this.addByteToFooter(mission.messages[n].target_cancel);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_cancel);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_cancel);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_cancel + 1);//Region

			this.insertEmptyBytesToFooter(13);
		}


		//[End messages]
			
		//Override bytes
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x01);

		//[Setup alliances]

		//[Faction 1]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x01);//Rebel 1
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);//Rebel 2
		this.addByteToFooter(0x01);//Rebel 3
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);//This bit needed to show briefing in game

		this.insertEmptyBytesToFooter(25);

		//[Faction 2]
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(25);

		//[Faction 3]
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 4]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 5]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 6]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 7]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 8]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//////////////////////////
		
		this.insertEmptyBytesToFooter(487);
		this.addByteToFooter(0x01);

		//insertBriefing() function . Todo: Generate briefing bytes
		for (var a = 0; a < this.briefingByteCount; a++)
		{
			this.addByteToFooter(this.briefingBytes[a]);
		}

		//
		this.insertEmptyBytesToFooter(17151 - (this.briefingSize - 1));//Amount after briefing
		//
		
		//ok

		this.insertEmptyBytesToFooter(266);

		this.addByteToFooter(0x01);//<---Briefing seen by team 1
		
		this.insertEmptyBytesToFooter(9);

		//ok

		for (var a = 0; a < 6; a++)
		{
			this.addByteToFooter(mission.mapText[a].length);
			this.addByteToFooter(0x0);
			this.addStringToFooter(mission.mapText[a], mission.mapText[a].length);
		}
		
		this.insertEmptyBytesToFooter(244);
		
		//ok (Works if mapText[] is: 'string 1', 'string 2', etc)
		//alert("len: " + this.footer2.length);

		let addN = 0;

		//Brief text 1
		let minus = 6;

		if (mission.briefingStringCount < 1)
		{
			let stringToAdd = "Briefing";
			this.addByteToFooter(stringToAdd.length);
			this.addByteToFooter(0x0);
			this.addStringToFooter(stringToAdd, stringToAdd.length);
		}
		
		let briefingTxtMode = true;//Text only briefing
		
		{
			for (var a = 0; a < mission.briefingStringCount_2; a++)
			{
				if (a == 0)
				{
					let stringToAdd = mission.briefingStrings_2[a];
					this.addByteToFooter(stringToAdd.length);
					this.addByteToFooter(0x0);
					this.addStringToFooter(stringToAdd, stringToAdd.length);
				}
				else
				{
					minus += -2;

					let stringToAdd = mission.briefingStrings_2[a];
					this.addByteToFooter(stringToAdd.length);
					this.addByteToFooter(0x0);
					this.addStringToFooter(stringToAdd, stringToAdd.length);
				}
			}
		}

		//[Rest of footer]
		
		this.insertEmptyBytesToFooter((addN + 50917 + 39) + minus);
		//tieFile.this.insertEmptyBytesToFooter();//Correction / Delete?
		let goalsSize = 0;

		//[Flight group goal alt-texts]

		let goal = "";

		for(var a = 0; a < flightGroupCount; a++)
		{
			{
				goal = flightGroups_2[a].goal_1_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_1_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_1_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_2_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_2_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_2_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_3_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_3_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_3_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_4_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_4_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_4_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_5_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_5_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_5_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_6_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_6_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_6_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal =flightGroups_2[a].goal_7_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_7_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_7_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_8_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_8_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_8_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;
		}
					
		//Debrief text
		this.insertEmptyBytesToFooter(3911);
		let debrief = mission.debriefText;
		this.addStringToFooter(debrief, debrief.length);
		
		//tieFile.this.insertEmptyBytesToFooter((41771 + goalsSize) - (debrief.size() + 3912));

		this.insertEmptyBytesToFooter((12288 - debrief.length) - 4096);

		//Mission desc
		let desc = mission.description;

		this.addStringToFooter(desc, desc.length);
		this.insertEmptyBytesToFooter(4096 - desc.length);
	}
	
	//aka: tieFile.generateTieFile_Footer();
	//Most of the generation done here
	generateTieFile()
	{
	
		//Radio messages
		for (var n = 0; n < mission.messages.length; n++)
		{
			this.addByteToFooter(n);
			this.addByteToFooter(0x0);

			this.addStringToFooter(mission.messages[n].message, 68);
			this.insertEmptyBytesToFooter(12);
			this.addByteToFooter(0x01);
			this.insertEmptyBytesToFooter(22 - 13);
			this.addByteToFooter(mission.messages[n].targetQualifier_1);//Must be
			this.addByteToFooter(mission.messages[n].target_1);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_1);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_1);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_1 + 1);//Region

			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_2);//Must be
			this.addByteToFooter(mission.messages[n].target_2);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_2);//Target detail (TEAM, X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_2);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_2 + 1);//Region

			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);

			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_1);//Must be
			this.addByteToFooter(mission.messages[n].target_1);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_1);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_1);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_1 + 1);//Region
			
			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_2);//Must be
			this.addByteToFooter(mission.messages[n].target_2);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_2);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_2);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_2 + 1);//Region

			this.addByteToFooter(0x66);

			this.insertEmptyBytesToFooter(20);//43
			this.addByteToFooter(mission.messages[n].delaySeconds);//Message delay

			//Conditions to cancel the message

			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(0x0);
			this.addByteToFooter(mission.messages[n].targetQualifier_cancel);//Must be
			this.addByteToFooter(mission.messages[n].target_cancel);//Target category (Ship type, iff)
			this.addByteToFooter(mission.messages[n].detail_cancel);//Target detail (X_WING, IFF_IMPERIAL)
			this.addByteToFooter(mission.messages[n].condition_cancel);//Condition type (100% of)
			this.addByteToFooter(mission.messages[n].conditionRegion_cancel + 1);//Region

			this.insertEmptyBytesToFooter(13);
		}

		//[End messages]
			
		//Override bytes
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x03);

		this.insertEmptyBytesToFooter(367);
		this.addByteToFooter(0x01);

		//[Setup alliances]

		//[Faction 1]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x01);//Rebel 1
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);//Rebel 2
		this.addByteToFooter(0x01);//Rebel 3
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);//This bit needed to show briefing in game

		this.insertEmptyBytesToFooter(25);

		//[Faction 2]
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(25);

		//[Faction 3]
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 4]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 5]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 6]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 7]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//[Faction 8]
		this.insertEmptyBytesToFooter(25);

		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x0);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);
		this.addByteToFooter(0x01);

		this.insertEmptyBytesToFooter(453);
		this.addByteToFooter(0x01);

		//////////////////////////

		this.insertEmptyBytesToFooter(487);
		this.addByteToFooter(0x01);
		
		//insertBriefing() function . Todo: Generate briefing bytes
		for (a = 0; a < this.briefingByteCount; a++)
		{
			this.addByteToFooter(this.briefingBytes[a]);
		}
		
		//
		this.insertEmptyBytesToFooter(17151 - (briefingSize - 1));//Amount after briefing
		//

		this.insertEmptyBytesToFooter(266);

		this.addByteToFooter(0x01);//<---Briefing seen by team 1
		
		this.insertEmptyBytesToFooter(9);

		for (a = 0; a < 6; a++)
		{
			this.addByteToFooter(mission.mapText[a].length);
			this.addByteToFooter(0x0);
			this.addStringToFooter("text", 20);
		}
		
		this.insertEmptyBytesToFooter(244);

		let addN = 0;

		//Brief text 1
		let minus = 6;

		if (mission.briefingStringCount < 1)
		{
			let stringToAdd = "Briefing";
			this.addByteToFooter(stringToAdd.length);
			this.addByteToFooter(0x0);
			this.addStringToFooter(stringToAdd, stringToAdd.length);
		}
		
		let briefingTxtMode = true;//Text only briefing
		
		{
			for (var a = 0; a < mission.briefingStringCount_2; a++)
			{
				if (a == 0)
				{
					let stringToAdd = mission.briefingStrings_2[a];
					this.addByteToFooter(stringToAdd.length);
					this.addByteToFooter(0x0);
					this.addStringToFooter(stringToAdd, stringToAdd.length);
				}
				else
				{
					minus += -2;

					let stringToAdd = mission.briefingStrings_2[a];
					this.addByteToFooter(stringToAdd.length);
					this.addByteToFooter(0x0);
					this.addStringToFooter(stringToAdd, stringToAdd.length);
				}
			}
		}

		//[Rest of footer]
		
		this.insertEmptyBytesToFooter((addN + 50917 + 39) + minus);
		//tieFile.this.insertEmptyBytesToFooter();//Correction / Delete?
		let goalsSize = 0;
		let goal = 0;
		
		//[Flight group goal alt-texts]

		for(var a = 0; a < flightGroupCount; a++)
		{
			{
				goal = flightGroups_2[a].goal_1_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_1_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_1_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_2_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_2_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_2_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_3_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_3_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_3_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_4_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_4_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_4_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_5_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_5_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_5_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_6_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_6_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_6_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal =flightGroups_2[a].goal_7_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_7_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_7_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;

			{
				goal = flightGroups_2[a].goal_8_main_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_8_complete_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			{
				goal = flightGroups_2[a].goal_8_fail_text;
				this.addStringToFooter(goal, 64);
				goalsSize += 64;
			}

			goalsSize += 21;
		}
					
		//Debrief text
		this.insertEmptyBytesToFooter(3911);
		let debrief = mission.debriefText;
		this.addStringToFooter(debrief, debrief.length);
		
		//tieFile.this.insertEmptyBytesToFooter((41771 + goalsSize) - (debrief.size() + 3912));

		this.insertEmptyBytesToFooter((12288 - debrief.length) - 4096);

		//Mission desc
		let desc = mission.description;

		this.addStringToFooter(desc, desc.length);
		this.insertEmptyBytesToFooter(4096 - desc.length);
	}
};