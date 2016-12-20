

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
        		eventInfo.marker.setVisible(true)
        }
    }
    
    // Save the new year value as the current year
    frcInfo.currentYear = newYear;

}
