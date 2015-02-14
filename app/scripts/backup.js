var map;
var services;

function handleSearchResults(results, status) {
	console.log(results);

	for(var i = 0; i < results.length; i++) {
	    var marker = new google.maps.Marker({
	    position: results[i].geometry.location,
	    map: map,
	    //icon: results[i].icon
		});
	}
}

function performSearch() {
	var request = {
		bounds: map.getBounds(),
		name: "McDonald's"
	}
	service.nearbySearch(request, handleSearchResults);
}

function initialise(location) {
	console.log(location);
	console.log(location.coords);

	var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
	var mapOptions = {
	  zoom: 12,
	  center: currentLocation,
	};

	map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

    var marker = new google.maps.Marker({
    position: currentLocation,
    map: map,
    title:"Hello World!"
	});

	service = new google.maps.places.PlacesService(map);

	// ensures until the map bounds are initialised before the search is performed
	google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

	var circleOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: currentLocation,
      radius: 2000

    };

    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle(circleOptions);

    // add traffic layer
    var trafficLayer = new google.maps.TrafficLayer();
    $('#traffic').click(function() {
    	if (trafficLayer.getMap()) {
    		trafficLayer.setMap(null);
    	} else {
    		trafficLayer.setMap(map);
    	};
    })

    function traffic() {
    	if (trafficLayer.getMap()) {
    		trafficLayer.setMap(null);
    	} else {
    		trafficLayer.setMap(map);
    	};
    }
}

$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(initialise);
});

/*===== SEARCH BOX =====*/
  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

    /*===============*/

    // Retrieves the places in the given neighborhood using the Foursquare API.
    apis.foursquare.getPlacesIn(neighborhood.location, function (places) {
        if (places.length <= 0) {
            self.hasPlaces(false);
            self.loading(false);

            return;
        }

        self.hasPlaces(true);

        // For each retrieved place
        places.forEach(function (place) {

          // A property to hold the place's marker.
          place.marker = new google.maps.Marker({
              map: self.map,
              title: place.name,
              position: {
                  lat: place.location.lat,
                  lng: place.location.lng
              },
              icon: place.markerIcon
          });

          // Open the info window when the place's marker is clicked.
          if (place.hasOwnProperty('marker')) {
              google.maps.event.addListener(place.marker, 'click', function () {

                  if (!place.infoWindowOpened()) {
                      place.infoWindow.open(self.map, place.marker);

                      var icon = place.marker.getIcon();

                      place.marker.setIcon(icon.substring(0, icon.length - 4) + '_selected.png');

                      place.infoWindowOpened(true);

                      document.getElementById(place.id).scrollIntoView();
                  }
              });
          }
        });
    });
  /*============*/
