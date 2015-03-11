##Project 5
Udacity Neighborhood map project

###Overview
The map covers the top 10 foursquare locations in Washington DC.<br>
The project was built using knockout.js MVVM pattern, jquery, google maps api, foursquare venue api.<br>
This project can be view at http://blog.jordanyong.com/projects/<br>
Minified version of the file can be downloaded from the gh-branch

###Installation
- Install the project by running "git clone https://github.com/jordan23jy/udacity-maps-api.git" in the terminal
- Enter into the root directory and run "npm install" in your terminal to install node modules. Some users might need to run sudo.
- Run "bower install" in the terminal to install dependencies. Dependencies include
	- [Modenizr](http://modernizr.com/)
	- [knockoutJS](http://knockoutjs.com/)
	- [knockoutMappingsJS](http://knockoutjs.com/documentation/plugins-mapping.html)
	- [jQuery](http://jquery.com/)
- Run "gulp serve" in the terminal to run app in localhost:9000
- Run "gulp" in the terminal to obtain minified version of the app in '/dist' directory"

###Features
- Google Maps API
	- Map canvas
	- Marker
	- Info Window
	- Animation
- Foursquare API
	- Address
	- Contact
	- Rating
	- Foursquare link
- Top 10 locations on Foursquare
	- Shown in list view and location point with markers
- Responsive design
	- Additional information is hidden on mobile
	- List view of top 10 locations to be toggled
- Location Selection
	- Clickable location markers providing additional information
	- Change in styling and information to indicate selected state
- Search Box
	- Filters queries of user input
	- Toggle additional information

###How To Use
The app shows 10 top locations in Washington DC with markers on the map corresponding to the name of the location of the sidebar.
To view additional information about a specific location (address, rating), click on either the marker or the name of the location on the left side bar.
The additional information will pop up on the selected marker.
The search box is used to filter the location on the map.
Click on the hamburger icon in the search bar to toggle the item list on the sidebar.

###Support
If you are having any issues please let me know.
Email me at contact@jordanyong.com

###Reference
[Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)<br>
[Foursquare Venue API](https://developer.foursquare.com/overview/venues.html)<br>
[Search Box Filter](http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html)<br>
[KnockoutJS Mappings](http://marcofranssen.nl/knockout-js-mappings/)<br>
[KnockoutJS](http://knockoutjs.com/documentation/introduction.html)<br>
[jQuery](http://api.jquery.com/)


###Tools Used
[knockoutJS](http://knockoutjs.com/)<br>
[jQuery](http://jquery.com/)<br>
[yeoman.io](http://yeoman.io/)<br>
[bower.io](http://bower.io/)<br>
[gulp.js](http://gulpjs.com/)
