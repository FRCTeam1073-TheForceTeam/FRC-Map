

function FrcData() {
    this.firstYear = 1992;
    this.lastYear = 2017;
    this.currentYear = 2017;
    this.teamData = new TeamInfo();
    this.eventData = new EventInfo();
    this.yearData = new YearInfo(this.firstYear,this.lastYear);

    this.getTeam = function( teamNumber ) { return this.teamData.getTeam( teamNumber ); }
    this.getTeamMarker = function( teamNumber ) { return this.teamData.getMarker( teamNumber ); }
    this.getTeamListByYear = function( year ) { return this.yearData.getTeams(year); }
    this.getTeamList = function() { return this.teamData.getTeamList(); }

    this.getEvent = function( eventCode ) { return this.eventData.getEvent( eventCode ); }
    this.getEventMarker = function( eventCode ) { return this.eventData.getMarker( eventCode ); }
    this.getEventListByYear = function( year ) { return this.yearData.getEvents(year); }
    this.getEventList = function() { return this.eventData.getEventList(); }

    this.loadTeamData = function() { this.teamData.loadData(this.yearData); }
    this.loadEventData = function() { this.eventData.loadData(this.yearData); }

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
    this.loadData = function(yearData) { loadTeamDummyData(this.teamInfo, this.teamList, yearData); }
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
    this.loadData = function(yearData) { loadEventDummyData(this.eventInfo, this.eventList, yearData); }
}

function YearInfo(startYear,currentYear) {
    this.startYear = startYear;
    this.currentYear = currentYear;

    this.teams = [];
    this.events = [];
    for (var i=0; i<=(currentYear-startYear); i++) {
        this.teams[i] = [];
        this.events[i] = [];
    }

    this.addTeam = function(year,team_number) {
                            this.teams[year-this.startYear].push(team_number.toString()); }
    this.addEvent = function(year,eventCode) {
                            this.events[year-this.startYear].push(eventCode); }
    this.getTeams = function(year) { return this.teams[year-this.startYear]; }
    this.getEvents = function(year) { return this.events[year-this.startYear]; }
}

function Entity(entity_type) {
	this.type = entity_type;
	this.getType = function() { return this.type; }
}

function loadTeamDummyData( teamInfo, teamList, yearInfo ) {

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

}


function loadTeamDataFromTba( teamInfo, teamList, yearInfo ) {


}

function loadEventData( eventInfo, eventList, yearInfo ) {
for (i = 1992; i < 2017; i++) {
var url = "https://www.thebluealliance.com/api/v2/events/"+ i.toString() + "?X-TBA-App-Id=frc1073:scouting-system:v02";
var jqxhr = $.getJSON( url ,function(json_data) {
       // upon success the variable json_data will contain the parsed
       // JSON body of the response
       console.log("Success. Yay!");
for (j = 0; j < json_data.length;j++){
var event = json_data[j];
    event.getType = function() { return 'EVENT'; }
eventInfo[event.key] = event;
    eventList.push(event.key);
    yearInfo.addEvent(event.year, event.key);
}


})
 .error( function(jqXHR, textStatus, errorThrown) {
       // upon error, this section can be used to handle the error. Here, I just
       // printed the error log message to the console for debugging
       console.log("Error: " + textStatus);
       console.log("incoming text: " + jqXHR.responseText);
});
	}
	
}


function loadEventDummyData( eventInfo, eventList, yearInfo ) {

    // commented out the line to load all the event data temporarily due to the
    // quota limit issue with Google Maps - ksthilaire 12/16/16
    //loadEventData( eventInfo, eventList, yearInfo );

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
