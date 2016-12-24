

function mapSliderEvent( frcInfo, newYear ) {

    // Retrieve the current year
    var currentYear = frcInfo.currentYear;

    if (currentYear != newYear) {

        // Loop through the teams and events and show or hide the teams as the year goes up or down
    	console.log('Sliding from year: ' + currentYear + ' to: ' + newYear);
    	
        // ///////////////////////////////////////////////////////////////////////////////
        // //////////////////////////// Events Display ///////////////////////////////////
    	if ( frcInfo.showEvents ) {
            // Only one year is shown at a time, so get the events for the current year first to hide them
    	    var events = frcInfo.getEventListByYear(currentYear);
    	
    	    // Loop through the list of events for currentYear, hide the marker for that event if it exists
    	    for ( i=0; i<events.length; i++ ) {
    		    eventInfo = frcInfo.getEvent(events[i]);
    		    if ( eventInfo.marker )
    			    eventInfo.marker.setVisible(false);
    	    }
    			
    	    // Now get the events for the new year to show them
    	    var events = frcInfo.getEventListByYear(newYear);
    			
    	    // Loop through the list of events for newYear, show the marker for that event if it exists
            for ( i=0; i<events.length; i++ ) {
        	    eventInfo = frcInfo.getEvent(events[i]);
        	    if ( eventInfo.marker )
        		    eventInfo.marker.setVisible(true);
            }
        }
        // ////////////////////////// End Events Display /////////////////////////////////
        // ///////////////////////////////////////////////////////////////////////////////

        // ///////////////////////////////////////////////////////////////////////////////
        // ///////////////////////////// Teams Display ///////////////////////////////////
    	if ( frcInfo.showTeams ) {

            // if the new year is greater than the current year (going up)
            if ( newYear > currentYear) {

                // call getTeamListByYear() for the new year to get the list of teams that started competing
                // iterate over that list and show the marker for each team in that list to add
                // that team to the map
    	        var teams = frcInfo.getTeamListByYear(newYear);
    	
    	        for ( i=0; i<teams.length; i++ ) {
    		        teamInfo = frcInfo.getTeam(teams[i]);
    		        if ( teamInfo.marker )
    			        teamInfo.marker.setVisible(true);
    	        }

                // call getTeamEndListByYear() for the current year to get the list of teams that ended competing
                // iterate over that list and hide the marker for each team in that list to remove
                // the team from the map
    	        teams = frcInfo.getTeamEndListByYear(currentYear);
    	
    	        for ( i=0; i<teams.length; i++ ) {
    		        teamInfo = frcInfo.getTeam(teams[i]);
    		        if ( teamInfo.marker )
    			        teamInfo.marker.setVisible(false);
    	        }

            } else {
//
// Jack or Errica - you can code up the slider behavior for the teams when the slider is decreasing. I inserted
//                  comments that describe the expected behavior. The above code handles the case when the
//                  slider value is increasing, and I provided it to give you the example of what the behavior
//                  looks like.
//
                // else the new year is less than the current year (going down)

                // call getTeamListByYear() for the current year to get the list of teams that started competing
                // iterate over that list and hide the marker for each team in that list to remove
                // the team from the map because the new year is before the team started competing

                // call getTeamEndListByYear() for the new year to get the list of teams that ended competing in 
                // the new year and show the marker for each team in that list to add the team to the
                // map to reflect that the team was competing in the new year
            }
        }

/* kensthilaire - commented this code out and inserted the above commented pseudo-code along with an implementation of the slider
                  going up to give Jack and Errica an example of how to to do it. We'll want to remove this once the above 
                  implementation is completed.

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

end commented out code */

        // ///////////////////////////////////////////////////////////////////////////////
        // ///////////////////////////// Teams Display ///////////////////////////////////
    
    }

    // Save the new year value as the current year
    frcInfo.currentYear = newYear;

}
