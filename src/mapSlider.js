

function mapSliderEvent( frcInfo, newYear ) {

    // Retrieve the current year
    var currentYear = frcInfo.currentYear;

    if (currentYear != newYear) {
        // Loop through the teams and events and show or hide the teams as the year goes up or down
    	console.log('Sliding from year: ' + currentYear + ' to: ' + newYear);
    	
    	// Only one year is shown at a time, so get the events for the current year first to hide them
    	var events = frcInfo.getEventListByYear(currentYear);
    	
    	// Loop through the list of events for currentYear, make the marker for that event info invisible if it exists
    	for ( i=0; i<events.length; i++ ) {
    		eventInfo = frcInfo.getEvent(events[i]);
    		if ( eventInfo.marker )
    			eventInfo.marker.setVisible(false);
    	}
    			
    	// Now get the events for the new year to show them
    	var events = frcInfo.getEventListByYear(newYear);
    			
    	// Loop through the list of events for newYear, make the marker for that event info visible if it exists
        for ( i=0; i<events.length; i++ ) {
        	eventInfo = frcInfo.getEvent(events[i]);
        	if ( eventInfo.marker )
        		eventInfo.marker.setVisible(true);
        }

	// This code below was directly copy-pasted from the event code above, to hopefully spawn and show/hide teams instead.    	

	// Only one year is shown at a time, so get the teams for the current year first to hide them
    	var events = frcInfo.getTeamListByYear(currentYear);
    	
    	// Loop through the list of teams for currentYear, make the marker for that team info invisible if it exists
    	for ( i=0; i<team.length; i++ ) {
    		teamInfo = frcInfo.getTeam(events[i]);
    		if ( entity.rookie_year >= currentYear )
    			teamInfo.marker.setVisible(false);
    	}
    			
    	// Now get the events for the new year to show them
    	var events = frcInfo.getTeamListByYear(newYear);
    			
    	// Loop through the list of team for newYear, make the marker for that team info visible if it exists

	// INCOMPLETE - Can't find the variable for the retirement year of a team. Logic for year checking is written, however. Feel free to debug as needed.

	// Loops through the teams and shows teams whose rookie year is or is after the current year, but not if their retirement year lies on the current year or before.
	for ( i=0; i<team.length; i++ ) {
		teamInfo = frcInfo.getTeam(teams[i]);
		if (entity.rookie_year <= currentYear) {
			if (4130 >= currentYear) { 
        		if ( teamInfo.marker ){
					teamInfo.marker.setVisible(true);
				}	
			}
		}
    }
    
    // Save the new year value as the current year
    frcInfo.currentYear = newYear;

}
