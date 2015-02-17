/**
  * @desc contains all data and view model
  * @author Jordan Yong jordanyong23@gmail.com
  */


var Locations = function(data) {
  this.title = ko.observable(data.title);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
  };

$.getJSON('scripts/model.json', function(adminData) {

  var info = adminData.data;
  console.log(info);

var ViewModel = function() {
  //var info;
  //var model = $.getJSON('scripts/model.json', function(q) {
  //  info = q.data;
  //  return console.log(info.length);
  //});

  var self = this;
  //var currentLocation = null;

  this.markerArray = ko.observableArray([]);  // POSIBLE TO REMOVE MARKER ARRAY
  //this.locationArray = ko.observableArray(model);
  this.locationArray = ko.observableArray([adminData]);
  this.location = ko.observable('');
  this.currentLocation = ko.observable('');
  this.query = ko.observable(''); // search query keyed by user
  // array of markers that have been filtered with user's search query
  this.filteredMarkers = ko.computed(function() {
    return ko.utils.arrayFilter(self.markerArray(), function(marker) {
      return marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    });
  }, this);
  //console.log(self.filteredMarkers());

  // push position data into a list of array
  //info.forEach(function(data) {
  //  self.locationArray.push(new Locations(data));
  //});

  // point loc to locationArray for easy access
  var loc = info;
  //var loc = self.filteredMarkers();
  console.log(loc[0].lat);

  //self.filteredMarkers.subscribe(function() {
  //  return console.log(self.filteredMarkers());
  //})

  // renders only markers that match search query
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
    zoom: 15,
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

  // show info window
  var infowindow = new google.maps.InfoWindow();

  // init: show markers and info window
  var marker, i;
  for (i = 0; i < loc.length; i++) {
    // render all markers
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(loc[i].lat, loc[i].lng),
      title: loc[i].title,
      map: map,
      animation: google.maps.Animation.DROP
    });
    //console.log(google.maps);

    // set list of markers into an array
    self.markerArray.push(marker);

    // when marker is clicked, set it as current location - animate and render info window
    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        self.setLocation(marker); // set as current location
      }
    })(marker));
  };


  this.setLocation = function(selection) {
    if (self.currentLocation() === selection ) {
      self.removeLocation();                                // if location is selected the second time in a row it is unselected
    } else {
      self.removeLocation();
      self.currentLocation(selection);                      // set location to what has been selected
      selection.setAnimation(google.maps.Animation.BOUNCE); // animate selection to bounce
      infowindow.setContent(selection.title);               // set content of selected marker's info window
      infowindow.open(map, selection);                      // render info window of selected marker
      //map.panTo(selection.position);                        // set center of screen to selected marker
      //console.log(selection);
    };
  }


  this.removeLocation = function() {
    // remove details from location
    if (self.currentLocation()) {
      self.currentLocation().setAnimation(null); // remove animation
      self.currentLocation(null);                // remove objects in location
      infowindow.close();
    };
  };



};

ko.applyBindings( new ViewModel());

});

/****************

responsive design
animate bounce when clicked on list view
auto-complete search bar
handle errors
****************/
