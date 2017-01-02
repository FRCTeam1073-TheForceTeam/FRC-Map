

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

        var watchTeam = '1073';     // set to a team number for debugging

    	if ( frcInfo.showTeams ) {

            // if the new year is greater than the current year (going up)
            if ( newYear > currentYear) {


                for ( year=currentYear; year<newYear; year++ ) {

                    // call getTeamListByYear() for the new year to get the list of teams that started competing
                    // iterate over that list and show the marker for each team in that list to add
                    // that team to the map
    	            var teams = frcInfo.getTeamListByYear(year+1);
    	
    	            for ( i=0; i<teams.length; i++ ) {
    		            teamInfo = frcInfo.getTeam(teams[i]);

                        if ( teams[i] == watchTeam ) {
                            console.log( 'FRC ' + teams[i] + ' Showing' );
                        }

    		            if ( teamInfo.marker )
    			            teamInfo.marker.setVisible(true);
    	            }

                    // call getTeamEndListByYear() for the current year to get the list of teams that ended competing
                    // iterate over that list and hide the marker for each team in that list to remove
                    // the team from the map
    	            teams = frcInfo.getTeamEndListByYear(year);
    	
    	            for ( i=0; i<teams.length; i++ ) {
    		            teamInfo = frcInfo.getTeam(teams[i]);

                        if ( teams[i] == watchTeam ) {
                            console.log( 'FRC ' + teams[i] + ' Hiding' );
                        }

    		            if ( teamInfo.marker )
    			            teamInfo.marker.setVisible(false);
    	            }
    	        }

            } else {

                // else the new year is less than the current year (going down)
                for ( year=currentYear; year>newYear; year-- ) {

                    // call getTeamListByYear() for the current year to get the list of teams that started competing
                    // iterate over that list and hide the marker for each team in that list to remove
                    // the team from the map because the new year is before the team started competing
                    teams = frcInfo.getTeamListByYear(year);

                    for ( i=0; i<teams.length; i++ ) {
                        teamInfo = frcInfo.getTeam(teams[i]);

                        if ( teams[i] == watchTeam ) {
                            console.log( 'FRC ' + teams[i] + ' Hiding' );
                        }

                        if ( teamInfo.marker )
                            teamInfo.marker.setVisible(false);
                    }

                    // call getTeamEndListByYear() for the new year to get the list of teams that ended competing in 
                    // the new year and show the marker for each team in that list to add the team to the
                    // map to reflect that the team was competing in the new year
                    teams = frcInfo.getTeamEndListByYear(year-1);

                    for ( i=0; i<teams.length; i++ ) {
                        teamInfo = frcInfo.getTeam(teams[i]);

                        if ( teams[i] == watchTeam ) {
                            console.log( 'FRC ' + teams[i] + ' Showing' );
                        }

                        if ( teamInfo.marker )
                            teamInfo.marker.setVisible(true);
                    }
                }
            }
        }

        // ///////////////////////////////////////////////////////////////////////////////
        // ///////////////////////////// Teams Display ///////////////////////////////////
    

        // Save the new year value as the current year
        frcInfo.currentYear = newYear;

        console.log( "Setting current year to " + frcInfo.currentYear );
    }
}
