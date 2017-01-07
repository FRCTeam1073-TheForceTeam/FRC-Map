# FRC-Map
This repository contains the source files associated with the 2017 FRC maps project. The majority of the map program
is contained in the JavaScript source files contained in the src directory. The css directory contains the 
Bootstrap CSS files that the map depends on. The js directory contains any external JavaScript libraries that the
map uses. The data directory contains a set of JavaScript files that contain pre-formatted map data that the
program references. And, the images directory contains the set of images for the pin markers on the map.

The map itself is fairly self-contained, though it does require internet access to load the event and team data
and then to generate the map. All CSS and JavaScript dependencies are contained in the directory hierarchy, so that
the map can be installed on any system and then accessed by opening the frcMap.html file in a browser.

The map has been tested with the latest versions of Firefox, Chrome, Microsoft Edge, and Internet Explorer 11 on a 
Windows 10 platform. It has been tested with Firefox, Chrome and Safari on a Mac Sierra platform. And, it has been 
tested on an iPad 2 running the latest iOS. Some massaging of the bootstrap-slider.js file was required to get things
to run on Internet Explorer 11 and Safari on the iPad, and these minor changes have been applied to that module in
this repository.

The map relies on the public API that is provided by TheBlueAlliance for all the team and event data. Using the
TBA APIs, this map loads the data and stores it in a local data model. And, then the map rendering behavior extracts
the data from the model to create the markers on the map. Many thanks to TheBlueAlliance for a clean, complete, and 
easy to work with set of APIs.

The map uses the Google Maps API for the map itself. In order to stay within transaction limits imposed by 
Google for the free service, all geo location information was extracted by a separate program, with the resulting
data captured as a JavaScript object that is then loaded at runtime.

Additionally, team participation information was obtained from TheBlueAlliance, but it, too, was obtained by a separate
program with the results captured as a JavaScript object in a file that is loaded at runtime. This was done by the 
separate program to better organize the data in a form that the JavaScript expected.

The map program, while fully functional, is not complete. We simply ran out of time to get it done before
2017 kickoff. We plan to continue the development of the map and expand on the behavior.
