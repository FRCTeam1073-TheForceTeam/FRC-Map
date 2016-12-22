

function FrcData() {
    this.firstYear = 1992;
    this.lastYear = 2017;
    this.currentYear = 2017;
    this.teamsLoaded = false;
    this.eventsLoaded = false;
    this.geoLoaded = false;
    this.teamData = new TeamInfo();
    this.eventData = new EventInfo();
    this.yearData = new YearInfo(this.firstYear,this.lastYear);

    this.getTeam = function( teamNumber ) { return this.teamData.getTeam( teamNumber ); }
    this.getTeamMarker = function( teamNumber ) { return this.teamData.getMarker( teamNumber ); }
    this.getTeamListByYear = function( year ) { return this.yearData.getTeams(year); }
    this.getTeamEndListByYear = function( year ) { return this.yearData.getTeamsEnd(year); }
    this.getTeamList = function() { return this.teamData.getTeamList(); }

    this.getEvent = function( eventCode ) { return this.eventData.getEvent( eventCode ); }
    this.getEventMarker = function( eventCode ) { return this.eventData.getMarker( eventCode ); }
    this.getEventListByYear = function( year ) { return this.yearData.getEvents(year); }
    this.getEventList = function() { return this.eventData.getEventList(); }

    this.loadTeamData = function() { this.teamData.loadData(this); }
    this.loadEventData = function() { this.eventData.loadData(this); }

    // load the Geo locations from the local file 
    this.geo_locations = JSON.parse(geo_coordinates_for_Events_Teams);
    this.geoLoaded = true;
<<<<<<< HEAD
	
	
=======

    // load the team participation information from the local file
    this.team_participation = JSON.parse(team_participation);
    this.participatedLoaded = true;
>>>>>>> origin/master
}

function TeamInfo() {

    this.teamInfo = new Object();
    this.teamList = [];

    this.getTeam = function( teamNumber ) { return this.teamInfo[ 'frc' + teamNumber ]; } 
    this.getTeamList = function() { return this.teamList; }

    this.setMarker = function(teamNumber, marker) {
                            team = getTeam( teamNumber );
                            team.marker = marker;
                     }
    this.getMarker = function(teamNumber) {
                            team = getTeam( teamNumber );
                            return team.marker;
                     }
    this.loadData = function(frcData) { loadTeamDataFromTba(this.teamInfo, this.teamList, frcData); }
}


function EventInfo() {
    this.eventInfo = new Object();
    this.eventList = [];

    this.getEvent = function( eventCode ) { return this.eventInfo[ eventCode ]; }
    this.getEventList = function() { return this.eventList; }

    this.setMarker = function(eventCode, marker) {
                            event = getEvent( eventCode );
                            event.marker = marker;
                     }
    this.getMarker = function(eventCode) {
                            event = getEvent( eventCode );
                            return event.marker;
                     }
    this.loadData = function(frcData) { loadEventData(this.eventInfo, this.eventList, frcData); }
}

function YearInfo(startYear,currentYear) {
    this.startYear = startYear;
    this.currentYear = currentYear;

    // list of teams that first started competing in a given year
    this.teams = [];

    // list of teams that last competed in a given year
    this.teamsEnd = [];

    // list of events for a given year
    this.events = [];

    // initialize each of the lists of lists for each year
    for (var i=0; i<=(currentYear-startYear); i++) {
        this.teams[i] = [];
        this.teamsEnd[i] = [];
        this.events[i] = [];
    }

    this.addTeam = function(year,team_number) {
                            this.teams[year-this.startYear].push(team_number.toString()); }
    this.addTeamEnd = function(year,team_number) {
                            this.teamsEnd[year-this.startYear].push(team_number.toString()); }
    this.addEvent = function(year,eventCode) {
                            this.events[year-this.startYear].push(eventCode); }
    this.getTeams = function(year) { return this.teams[year-this.startYear]; }
    this.getTeamsEnd = function(year) { return this.teamsEnd[year-this.startYear]; }
    this.getEvents = function(year) { return this.events[year-this.startYear]; }
}

function Entity(entity_type) {
	this.type = entity_type;
	this.getType = function() { return this.type; }
}

function loadTeamDummyData( teamInfo, teamList, frcInfo ) {

    var yearInfo = frcInfo.yearData;

    // Create Team 1073 data from TBA dataset
    var team = new Entity('TEAM');

    team.website = "http://www.theforceteam.com";
    team.name = "UTC / Waters Corporation / Parker Hannifin & Hollis-Brookline High School";
    team.locality = "Hollis";
    team.rookie_year = 2003;
    team.region = "New Hampshire";
    team.team_number = 1073;
    team.location = "Hollis, New Hampshire 03049, USA";
    team.key = "frc1073";
    team.country_name = "USA";
    team.motto = "Sanity is Optional";
    team.nickname = "The Force Team";

    team.entity_type = 'TEAM';
    teamInfo[team.key] = team;
    teamList.push(team.team_number.toString());
    yearInfo.addTeam(team.rookie_year, team.team_number);

    // Create Team 1058 from TBA dataset
    var team = new Entity('TEAM');

    team.website = "http://team1058.com/";
    team.name = "Fleet Ready Corp. / BAE Systems / Show Ready Events / Dumpster Depot / JMD Industries / Veloxion / Willseal & Londonderry Senior High School";
    team.locality = "Londonderry";
    team.rookie_year = 2003;
    team.region = "New Hampshire";
    team.team_number = 1058;
    team.location = "Londonderry, New Hampshire 03053, USA";
    team.key = "frc1058";
    team.country_name = "USA";
    team.motto = "You can't stop Team 1058";
    team.nickname = "PVC Pirates";

    team.entity_type = 'TEAM';
    teamInfo[team.key] = team;
    teamList.push(team.team_number.toString());
    yearInfo.addTeam(team.rookie_year, team.team_number);

    // Create Team 1706 from TBA dataset
    var team = new Entity('TEAM');

    team.website = "http://www.ratchetrockers1706.org";
    team.name = "The Boeing Company / Planet Tool / Henry Jubel Foundation(Spartan Light Metals) / NVIDIA & Holt, Timberland and Liberty High Schools in the Wentzville School District";
    team.locality = "Wentzville";
    team.rookie_year = 2005;
    team.region = "Missouri";
    team.team_number = 1706;
    team.location = "Wentzville, Missouri 63385, USA";
    team.key = "frc1706";
    team.country_name = "USA";
    team.motto = "Have skills will travel!";
    team.nickname = "Ratchet Rockers";

    teamInfo[team.key] = team;
    teamList.push(team.team_number.toString());
    yearInfo.addTeam(team.rookie_year, team.team_number);

    frcInfo.teamsLoaded = true;
}

function loadTeamDataFromTba( teamInfo, teamList, frcInfo){
	
	loadTeamDataFromPage( teamInfo, teamList, frcInfo, 0);
}

function loadTeamDataFromPage( teamInfo, teamList, frcInfo, page) {

    var yearInfo = frcInfo.yearData;
	
	
	
	
	// get request using jquery
	var jqxhr = $.getJSON( "https://www.thebluealliance.com/api/v2/teams/"+page+"?X-TBA-App-Id=frc1073:scouting-system:v02", function(json_data) {
		console.log("Get Function Success for page " + page);
			 
<<<<<<< HEAD
		var yearInfo = frcInfo.yearData;
		//getting every team per page
		for ( var num = 0; num<json_data.length; num++ ) {
			 
		var team = json_data[num];
		team.getType = function() { return 'TEAM'; }		
		teamInfo[team.key] = team;
		teamList.push(team.team_number.toString());

		if ( team.rookie_year )
			yearInfo.addTeam(team.rookie_year, team.team_number);
		
		}
			 
			 // recursively call this function until we hit the last page
			page += 1;
			if (json_data.length != 0)
				loadTeamDataFromPage( teamInfo, teamList, frcInfo, page);
			else
			{
				frcInfo.teamsLoaded = true;
				console.log("All Teams Loaded!");
			}
			 
		
=======
			 var yearInfo = frcInfo.yearData;
			 var participationInfo = frcInfo.team_participation;

			 //getting every team per page
			 for ( var num = 0; num<json_data.length; num++ ) {
			 
				var team = new Entity('TEAM');
				
				team.website = json_data[num].website;
				team.name = json_data[num].name;
				team.locality = json_data[num].locality;
				team.rookie_year = json_data[num].rookie_year;
				team.region = json_data[num].region;
				team.team_number = json_data[num].team_number;
				team.location = json_data[num].location;
				team.key = json_data[num].key;
				team.country_name = json_data[num].country_name;
				team.motto = json_data[num].motto;
				team.nickname = json_data[num].nickname;

				team.entity_type = 'TEAM';
				teamInfo[team.key] = team;
				teamList.push(team.team_number.toString());

                // check if the team has any participation information and if so,
                // add the team to the list when they started competing and to
                // the list marking the last year of competition. Note that the
                // last year may be the current year if the team is still competing
                if ( participationInfo[team.key] ) {
                    firstYear = participationInfo[team.key].first_competed;
                    lastYear = participationInfo[team.key].last_competed;

                    team.first_year = firstYear;
                    team.last_year = lastYear;
				    yearInfo.addTeam(firstYear, team.team_number);
				    yearInfo.addTeamEnd(lastYear, team.team_number);
                }
			 }
>>>>>>> origin/master

	}).error( function(jqXHR, textStatus, errorThrown) {
		
		//Error message for debugging
});


    // Cheesy way to determine that all the teams have been loaded
    // will want to come up with a better way...
    console.log("Pausing to allow all teams to load...");
    setTimeout(function(){ 
                            frcInfo.teamsLoaded = true;
                            console.log("Marking All Teams Loaded"); }, 4000);

}

function loadEventData( eventInfo, eventList, frcInfo ) {
    loadEventYearData(eventInfo, eventList, frcInfo, frcInfo.firstYear);
}

function loadEventYearData( eventInfo, eventList, frcInfo, year ) {

    var yearInfo = frcInfo.yearData;

    var url = "https://www.thebluealliance.com/api/v2/events/"+ year.toString() + "?X-TBA-App-Id=frc1073:scouting-system:v02";
    var jqxhr = $.getJSON( url ,function(json_data) {

        // upon success the variable json_data will contain the parsed
        // JSON body of the response
        for (j = 0; j < json_data.length;j++){
            var event = json_data[j];
            event.getType = function() { return 'EVENT'; }
            eventInfo[event.key] = event;
            eventList.push(event.key);
            yearInfo.addEvent(event.year, event.key);
        }

        // recursively call this function until we hit the last year
        year += 1;
        if ( year <= frcInfo.lastYear )
            loadEventYearData(eventInfo, eventList, frcInfo, year);
        else
        {
            frcInfo.eventsLoaded = true;
            console.log("All Events Loaded!");
        }
    })
    .error( function(jqXHR, textStatus, errorThrown) {
       // upon error, this section can be used to handle the error. Here, I just
       // printed the error log message to the console for debugging
       console.log("Error: " + textStatus);
       console.log("incoming text: " + jqXHR.responseText);
    });
}


function loadEventDummyData( eventInfo, eventList, frcInfo ) {

    var yearInfo = frcInfo.yearData;

    event = new Entity('EVENT');

    // Boston District Event
    event.key = "2016mabos";
    event.website = "http://www.nefirst.org/";
    event.official = true;
    event.end_date = "2016-04-03";
    event.name = "NE District - Boston Event";
    event.short_name = "Boston";
    event.facebook_eid = "514860455336904";
    event.event_district_string = "New England";
    event.venue_address = "Agganis Arena - Boston University\n925 Commonwealth Avenue\nBoston, MA 02215\nUSA";
    event.event_district = 3;
    event.week = 5;
    event.location = "Boston, MA, USA";
    event.event_code = "mabos";
    event.year = 2016;
    event.event_type_string = "District";
    event.start_date = "2016-04-01";
    event.event_type = 1;

    eventInfo[event.key] = event;
    eventList.push(event.key);
    yearInfo.addEvent(event.year, event.key);

    
    event = new Entity('EVENT');

    // NH Granite State Regional
    event.key = "2010nh";
    event.website = "http://www.baesystemsfirst.org/regional/";
    event.official = true;
    event.end_date = "2010-03-06";
    event.name = "BAE Systems Granite State Regional";
    event.short_name = "BAE Systems Granite State";
    event.facebook_eid = null;
    event.event_district_string = null;
    event.venue_address = "Verizon Wireless Arena\n555 Elm Street\nManchester, NH 03101\nUSA";
    event.event_district = 0;
    event.week = 0;
    event.location = "Manchester, NH, USA";
    event.event_code = "nh";
    event.year = 2010;
    event.event_type_string = "Regional";
    event.start_date = "2010-03-04";
    event.event_type = 0;

    eventInfo[event.key] = event;
    eventList.push(event.key);
    yearInfo.addEvent(event.year, event.key);


    event = new Entity('EVENT');

    event.key = "1998mi";
    event.website = null;
    event.official = true;
    event.end_date = "1998-03-21";
    event.name = "Great Lakes Regional";
    event.short_name = "Great Lakes";
    event.facebook_eid = null;
    event.event_district_string = null;
    event.venue_address = "Eastern Michigan University\nYpsilanti, MI\nUSA";
    event.event_district = 0;
    event.week = 2;
    event.location = "Ypsilanti, MI, USA";
    event.event_code = "mi";
    event.year = 1998;
    event.timezone = "America/New_York";
    event.event_type_string = "Regional";
    event.start_date = "1998-03-19";
    event.event_type = 0;

    eventInfo[event.key] = event;
    eventList.push(event.key);
    yearInfo.addEvent(event.year, event.key);

    event = new Entity('EVENT');

    event.key = "2013cmp";
    event.website = "http://www.usfirst.org/roboticsprograms/frc/championship-event";
    event.official = true;
    event.end_date = "2013-04-27";
    event.name = "Einstein Field";
    event.short_name = "Einstein";
    event.facebook_eid = "";
    event.event_district_string = null;
    event.venue_address = null;
    event.event_district = 0;
    event.week = null;
    event.location = "St. Louis, USA";
    event.event_code = "cmp";
    event.year = 2013;
    event.timezone = "America/Chicago";
    event.event_type_string = "Championship Finals";
    event.start_date = "2013-04-27";
    event.event_type = 4;

    eventInfo[event.key] = event;
    yearInfo.addEvent(event.year, event.key);
}
