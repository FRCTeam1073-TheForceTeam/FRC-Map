

function mapSliderEvent( frcInfo, newYear ) {

    // Retrieve the current year
    var currentYear = frcInfo.currentYear;

    if (currentYear != newYear) {
        // Loop through the teams and events and show or hide the teams as the year goes up or down
    	console.log('Sliding from year: ' + currentYear + ' to: ' + newYear);
    	if (event.year != currentYear) {
            eventInfo.marker.setVisible(false);
        }
        else {
        	eventInfo.marker.setVisible(true);
        }
    }
    
    // Save the new year value as the current year
    frcInfo.currentYear = newYear;

}
