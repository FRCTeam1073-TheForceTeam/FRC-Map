
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: 1,
   };
}

function getMarkerIcon(entity, frcInfo) {

    var icon;
    var entityType = entity.getType();

    if (entityType == "TEAM") {
        //icon = pinSymbol('#3366ff');
        if ( entity.first_year == frcInfo.lastYear ) {
            // rookie team
            //icon = './images/rookie-pin.png';
            icon = './images/ltblue-dot.png';
        } else {
            // if the team isn't a rookie team, i.e. veteran team
            //icon = './images/team-pin.png';
            icon = './images/blue-dot.png';
        }
    } else if (entityType == 'EVENT') {
        // for events, use a different color marker to designate
        // regional, district, and championship events
        if ( entity.event_type == 0 ) {
            // regional event
            //icon = './images/regional-events.png';
            icon = './images/red-dot.png';
        } else if ( entity.event_type == 1 ) {
            // district event
            //icon = './images/district-events.png';
            icon = './images/orange-dot.png';
        } else if ( entity.event_type == 2 ) {
            // district  championship event
        	//icon = './images/district-champs.png';
            icon = './images/orange-dot.png';
        } else if ( entity.event_type == 3 || entity.event_type == 4 ) {
            // championship events
            //icon = './images/worlds-pin.png';
            icon = './images/yellow-dot.png';
        } else if ( entity.event_type == 99 || entity.event_type == 100 ) {
            // offseason and preseason events
            //icon = './images/offseason-events.png';
            icon = './images/purple-dot.png';
        } else {
            // unknown type, make it green
            icon = './images/green-dot.png';
        }
    } else {
        icon = './images/green-dot.png';
    }

    return icon;
}

//
// Function: mapLocation()
//
// This function was taken directly from the Google Maps API sample and adapted
// to insert a marker on the map for the specified entity and then store the 
// marker instance within the entity (Team, Event, or other) for later
// control
function mapLocation(entity, frcInfo) {

    var entityType = entity.getType();

    var geo_location = frcInfo.geo_locations[entity.key];
    var resultsMap = frcInfo.map;

    resultsMap.setCenter(geo_location);

    var icon = getMarkerIcon(entity, frcInfo);

    var marker = new google.maps.Marker({
                                        map: resultsMap,
                                        position: geo_location,
                                        icon: icon
                                    });
    if ( !marker ) {
        console.log( "Error creating marker for " + entity.key );        
    }

    var infoString = "";
            
    if (entityType == "TEAM") {
            var rookieStr = '';
            if (entity.first_year == frcInfo.lastYear )
                rookieStr = 'Rookie ';
            infoString = 'Hello, we are <b>' + rookieStr + 'Team ' + entity.team_number + '</b>.';
            infoString += '<br>' + 'We are ' + entity.nickname + '.';
            infoString += '<br>' + 'From ' + entity.location + '.';
            if ( entity.website )
                infoString += '<br>' + '<a href="' + entity.website + '">' + entity.website + '</a>';
            infoString += '<br>Years competed: ' + entity.first_year + '-' + entity.last_year;
    }

    if (entityType == "EVENT") {
            infoString = '<b>' + entity.year + ' ' + entity.name + '</b>';
            infoString += '<br>Location: ' + entity.location;
            infoString += '<br>Event date: ' + entity.start_date;
            infoString += '<br>Event type: ' + entity.event_type_string;
    }			

    var infoWindow = new google.maps.InfoWindow({ content: infoString });

    google.maps.event.addListener(marker, 'click', function () {
                                    infoWindow.open(map, marker); });

    entity.marker = marker;
    entity.geolocation = geo_location;
    entity.marker.setVisible(false);
    entity.infoWindow = infoWindow;

}

//
// Function: mapFrcTeams()
//
// This function will loop through the list of defined teams and plot a marker on the map
// for the team.
//
function mapFrcTeams( frcInfo ) {

    if ( frcInfo.teamsLoaded == false || frcInfo.geoLoaded == false || frcInfo.eventsLoaded == false ) {
        console.log( "Pausing 1 second for teams to load" );
        setTimeout(function(){ mapFrcTeams(frcInfo) }, 1000);
    } else {
        set_spinner_message( "Generating FRC Map..." );

        var teamList = frcInfo.getTeamList();

        console.log( "Mapping FRC Teams" );

        // loop through the entire list of teams and add a marker to the map for each team
        for ( var i=0; i < teamList.length; i++  ) {
            teamInfo = frcInfo.getTeam(teamList[i]);

            mapLocation( teamInfo, frcInfo );
        }

        frcInfo.teamsMapped = true;
        console.log( "FRC Teams Mapped Successfully" );
    }
}

//
// Function: showFrcTeams()
//
// This function will show or hide the markers for all the FRC teams that have been 
// defined for the map. This function is intended to be an example for how to 
// manipulate the markers once they are created.
//
function showFrcTeams(frcInfo, visible) {

    var teamList = frcInfo.getTeamList();

    // loop through the entire list of teams and add a marker to the map for each team
    for ( var i=0; i < teamList.length; i++  ) {
        teamInfo = frcInfo.getTeam(teamList[i]);

        if ( teamInfo.marker ) {
            teamInfo.marker.setVisible(visible);
        }
    }
}

//
// Function: showFrcTeamsByYear()
//
// This function will show or hide the markers for all the FRC teams that are competing
// in the current year
//
function showFrcTeamsByYear(frcInfo, currentYear, visible) {

    if ( visible == false ) {
        // if told to hide teams, just hide all the teams regardless of year
        showFrcTeams(frcInfo, false);
    } else {

        // otherwise, show all the teams that are competing this year

        // display all the teams that have started competing this year
        var teams = frcInfo.getTeamListByYear(currentYear);
        for ( var i=0; i<teams.length; i++ ) {
            teamInfo = frcInfo.getTeam(teams[i]);
            if ( teamInfo.marker )
               teamInfo.marker.setVisible(true);
        }

        // and hide any teams that stopped competing this year, do this by looking up the
        // list of teams that competed for the last time in the previous year
        if ( currentYear > frcInfo.firstYear ) {
            teams = frcInfo.getTeamEndListByYear(currentYear-1);
            for ( var i=0; i<teams.length; i++ ) {
                teamInfo = frcInfo.getTeam(teams[i]);
                if ( teamInfo.marker )
                   teamInfo.marker.setVisible(false);
            }
        }
    }
}

function showFrcTeamsByYearRange(frcInfo, firstYear, lastYear, visible) {
    if ( visible == false ) {
        // if told to hide teams, just hide all the teams regardless of year
        showFrcTeams(frcInfo, false);
    } else {
        // else loop from the first year to the last year of the specified
        // range and show those all appropriate teams
        for ( var i=firstYear; i<=lastYear; i++ ) {
            showFrcTeamsByYear(frcInfo, i, visible);
        }
    }
}

function mapFrcEvents( frcInfo ) {

    if ( frcInfo.eventsLoaded == false || frcInfo.geoLoaded == false || frcInfo.teamsMapped == false ) {
        console.log( "Pausing 1 second for events to load" );
        setTimeout(function(){ mapFrcEvents(frcInfo) }, 1000);
    } else {
        var eventList = frcInfo.getEventList();

        console.log( "Mapping FRC Events" );

        // loop through the entire list of events and add a marker to the map for each event
        for ( var i=0; i < eventList.length; i++  ) {
            eventInfo = frcInfo.getEvent(eventList[i]);

            mapLocation( eventInfo, frcInfo );
        }

        console.log( "FRC Events Mapped Successfully" );

        set_spinner_message( "FRC Map Generated..." );
        setTimeout(function(){ toggle_spinner(); }, 2000);
        
    }
}

function showFrcTeam( frcInfo, teamNumber ) {

    var teamInfo = frcInfo.getTeam( teamNumber );

    if ( teamInfo ) {
        teamInfo.marker.setVisible(true);
        frcInfo.map.setCenter( teamInfo.geolocation );    
    }

}

function showFrcEvents(frcInfo, visible) {

    var eventList = frcInfo.getEventList();

    for ( var i=0; i < eventList.length; i++  ) {
        eventInfo = frcInfo.getEvent(eventList[i]);

        if ( eventInfo.marker ) {
            eventInfo.marker.setVisible(visible);
        } else {
            console.log( "No marker for event: " + eventInfo.key );
        }
    }
}

function showFrcEventsByYear(frcInfo, year, visible) {

    if ( visible == false ) {
        // if told to hide events, just hide all the events regardless of year
        showFrcEvents(frcInfo, false);
    } else {
        var eventList = frcInfo.getEventListByYear(year);

        for ( i=0; i < eventList.length; i++  ) {
            eventInfo = frcInfo.getEvent(eventList[i]);

            if ( eventInfo.marker ) {
                eventInfo.marker.setVisible(visible);
            }
        }
    }
}

