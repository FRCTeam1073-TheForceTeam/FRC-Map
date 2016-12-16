
//
// Function: mapLocation()
//
// This function was taken directly from the Google Maps API sample and adapted
// to insert a marker on the map for the specified entity and then store the 
// marker instance within the entity (Team, Event, or other) for later
// control

function mapLocation(entity, geocoder, resultsMap) {
    var location = entity.location;

    // Look up the coordinates of the location using the Geocoder library
    geocoder.geocode({'address': location}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);

            var image = './images/FIRST-logo-tiny.png';
            var marker = new google.maps.Marker({
                                            map: resultsMap,
                                            position: results[0].geometry.location,
                                            //icon: image
                                        });
                                        
            var infoString = "";
            var entityType = entity.getType();
            
            if (entityType = "TEAM") {
				            

            var infoWindow = new google.maps.InfoWindow({
                                            content: 'Hello ' + entity.key
                                        });

            google.maps.event.addListener(marker, 'click', function () {
                                            infoWindow.open(map, marker);
                                        });

            entity.marker = marker;
            entity.geolocation = results[0].geometry.location;
			entity.marker.setVisible(false);
			
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//
// Function: mapFrcTeams()
//
// This function will loop through the list of defined teams and plot a marker on the map
// for the team.
//
function mapFrcTeams( frcInfo ) {

    var teamList = frcInfo.getTeamList();

    // loop through the entire list of teams and add a marker to the map for each team
    for ( i=0; i < teamList.length; i++  ) {
        teamInfo = frcInfo.getTeam(teamList[i]);

        mapLocation( teamInfo, frcInfo.geocoder, frcInfo.map );
        
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

        teamInfo.marker.setVisible(visible);
    }
}

function mapFrcEvents( frcInfo ) {

    var eventList = frcInfo.getEventList();

    // loop through the entire list of events and add a marker to the map for each event
    for ( i=0; i < eventList.length; i++  ) {
        eventInfo = frcInfo.getEvent(eventList[i]);

        mapLocation( eventInfo, frcInfo.geocoder, frcInfo.map );
    }

}

function showFrcEvents(frcInfo, visible) {

    var eventList = frcInfo.getEventList();

    for ( i=0; i < eventList.length; i++  ) {
        eventInfo = frcInfo.getEvent(eventList[i]);

        eventInfo.marker.setVisible(visible);
    }
}

function showFrcTeam( frcInfo, teamNumber ) {

    var teamInfo = frcInfo.getTeam( teamNumber );

    if ( teamInfo ) {
        teamInfo.marker.setVisible(true);
        frcInfo.map.setCenter( teamInfo.geolocation );    
    }

}

