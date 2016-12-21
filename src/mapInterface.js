
//
// Function: mapLocation()
//
// This function was taken directly from the Google Maps API sample and adapted
// to insert a marker on the map for the specified entity and then store the 
// marker instance within the entity (Team, Event, or other) for later
// control
function mapLocation(entity, frcInfo) {

    var geo_location = frcInfo.geo_locations[entity.key];
    var resultsMap = frcInfo.map;

    resultsMap.setCenter(geo_location);

    var image = './images/FIRST-logo-tiny.png';
    var marker = new google.maps.Marker({
                                        map: resultsMap,
                                        position: geo_location,
                                        //icon: image
                                    });
    if ( !marker ) {
        console.log( "Error creating marker for " + entity.key );        
    }

    var infoString = "";
    var entityType = entity.getType();
            
    if (entityType = "TEAM") {
				            
    }

    var infoWindow = new google.maps.InfoWindow({
                                    content: 'Hello ' + entity.key
                                });

    google.maps.event.addListener(marker, 'click', function () {
                                    infoWindow.open(map, marker); });

    entity.marker = marker;
    entity.geolocation = geo_location;
    entity.marker.setVisible(false);
			
}

//
// Function: mapFrcTeams()
//
// This function will loop through the list of defined teams and plot a marker on the map
// for the team.
//
function mapFrcTeams( frcInfo ) {

    if ( frcInfo.teamsLoaded == false || frcInfo.geoLoaded == false ) {
        console.log( "Pausing 1 second for teams to load" );
        setTimeout(function(){ mapFrcTeams(frcInfo) }, 1000);
    } else {
        var teamList = frcInfo.getTeamList();

        console.log( "Mapping FRC Teams" );

        // loop through the entire list of teams and add a marker to the map for each team
        for ( i=0; i < teamList.length; i++  ) {
            teamInfo = frcInfo.getTeam(teamList[i]);

            mapLocation( teamInfo, frcInfo );
        }

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
    for ( i=0; i < teamList.length; i++  ) {
        teamInfo = frcInfo.getTeam(teamList[i]);

        if ( teamInfo.marker ) {
            teamInfo.marker.setVisible(visible);
        }
    }
}

function mapFrcEvents( frcInfo ) {

    if ( frcInfo.eventsLoaded == false || frcInfo.geoLoaded == false ) {
        console.log( "Pausing 1 second for events to load" );
        setTimeout(function(){ mapFrcEvents(frcInfo) }, 1000);
    } else {
        var eventList = frcInfo.getEventList();

        console.log( "Mapping FRC Events" );

        // loop through the entire list of events and add a marker to the map for each event
        for ( i=0; i < eventList.length; i++  ) {
            eventInfo = frcInfo.getEvent(eventList[i]);

            mapLocation( eventInfo, frcInfo );
        }

        console.log( "FRC Events Mapped Successfully" );
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

    for ( i=0; i < eventList.length; i++  ) {
        eventInfo = frcInfo.getEvent(eventList[i]);

        if ( eventInfo.marker ) {
            eventInfo.marker.setVisible(visible);
        } else {
            console.log( "No marker for event: " + eventInfo.key );
        }
    }
}

function showFrcEventsByYear(frcInfo, year, visible) {

    var eventList = frcInfo.getEventListByYear(year);

    for ( i=0; i < eventList.length; i++  ) {
        eventInfo = frcInfo.getEvent(eventList[i]);

        if ( eventInfo.marker ) {
            eventInfo.marker.setVisible(visible);
        }
    }
}

