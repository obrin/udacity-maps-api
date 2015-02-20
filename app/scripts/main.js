/**
  * @desc contains all data and view model
  * @author Jordan Yong jordanyong23@gmail.com
  */

// when document is ready, request dataset and pass it into ViewModel if successful
// alert is given when ajax request has failed
$(document).ready(function() {
  $.ajax({
    dataType: "json",
    url: "model.json",
    type: "GET",
    success: function(response) {
      model = new ViewModel(response);
      ko.applyBindings(model);
      //console.log(model);
    },
    error: function() {
      alert('something went wrong');
    }
  });
})


var ViewModel = function(data) {
  var self = this;

  /** customize mapping options
   * @copy copy datasets as values, not wrapping to observable (no change in datasets)
   */
  var locMapping = {
    'copy': ['title', 'loc', 'lat', 'id']
  }

  // map model.json dataset to ViewModel
  ko.mapping.fromJS(data, locMapping, self);

  this.markerArray = ko.observableArray([]);
  this.currentLocation = ko.observable('');
  this.query = ko.observable(''); // search query keyed by user
  this.foursquare = ko.observable('');

  // array of markers that have been filtered with user's search query
  this.filteredMarkers = ko.computed(function() {
    return ko.utils.arrayFilter(self.markerArray(), function(marker) {
      return marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    });
  }, this);


  // point loc to locations json data for easy access
  var loc = data.locations;

  // render markers that match search query
  this.filteredMarkers.subscribe(function() {

    // clears all markers
    self.markerArray().forEach(function(marker) {
      marker.setMap(null);
    });

    // renders all markers that match search query
    self.filteredMarkers().forEach(function(marker) {
      marker.setMap(map);
    });

  });

  // defines map features
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(38.897947, -77.036509),
    zoom: 14,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    disableDefaultUI: false,
    panControl: false
  };

  // render map
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // render info window
  var infowindow = new google.maps.InfoWindow();

  // generates characteristics of each marker and stores them in an array
  // add an event listener to set clicked marker as current location (setLocation())
  var marker, i;
  for (i = 0; i < loc.length; i++) {
    // render all markers
    marker = new google.maps.Marker({
      // features and data sets of markers
      position: new google.maps.LatLng(loc[i].lat, loc[i].lng),
      title: loc[i].title,
      map: map,
      animation: google.maps.Animation.DROP,
      id: loc[i].id
    });

    // set list of markers into an array
    self.markerArray.push(marker);

    // when marker is clicked, set it as current location - animate and render info window
    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        self.setLocation(marker); // set as current location
      };
    })(marker));
  }

  // set characteristics of current marker under interaction
  this.setLocation = function(selection) {
    if (self.currentLocation() === selection ) {
      self.removeLocation();                                // if location is selected the second time in a row it is unselected
    } else {
      self.removeLocation();
      self.currentLocation(selection);                      // set location to what has been selected
      selection.setAnimation(google.maps.Animation.BOUNCE); // animate selection to bounce
      infowindow.setContent(selection.title);               // set content of selected marker's info window
      infowindow.open(map, selection);                      // render info window of selected marker
      //map.panTo(selection.position);                      // set center of screen to selected marker
      self.getFoursquare(selection);                        // gets foursquare json data on current location
      console.log(selection);
    }
  };

  // remove characteristics of current marker under interaction
  this.removeLocation = function() {
    // remove details from location
    if (self.currentLocation()) {
      self.currentLocation().setAnimation(null); // remove animation
      self.currentLocation(null);                // remove objects in location
      infowindow.close();
    };
  };

  // request and caches foursquare data, updated into foursquare observable. on request failure, user is alerted
  // foursquare venue data is requested by matching with venue id obtained from model.json
  this.getFoursquare = function(selection) {
    $.ajax({
      dataType: "json",
      cache: true,
      url: "https://api.foursquare.com/v2/venues/" + selection.id + "?"
      + "client_id=" + "JZZWQ2GOQCFO4J1R03HFTPFMOTNMTQFRGV5XQ2S0KHQYPVMZ"
      + "&client_secret=" + "HC1KWRSYXWW5TBRBPW4DKDPH4TEXEVAZQK34GXLW2X1D315G"
      + "&v=" + "20130815",

      type: "GET",
      success: function(q) {
        self.foursquare(q.response.venue);
        console.log(self.foursquare());
        //console.log(q.response);
      },
      error: function() {
        alert('unable to retrieve information');
      }
    });
  };
};
