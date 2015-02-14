var positions = [

    {
      title: 'The White House',
      lat: 38.897947,
      lng: -77.036509
    },
    {
      title: 'Newseum',
      lat: 38.893286,
      lng: -77.019264
    },
    {
      title: 'The Studio Theatre',
      lat: 38.910100,
      lng: -77.031500
    },
    {
      title: 'The National Mall',
      lat: 38.889841,
      lng: -77.022966
    },
    {
      title: 'The John F. Kennedy Center for the Performing Arts',
      lat: 38.896010,
      lng: -77.055615
    },
    {
      title: 'Lincoln Memorial',
      lat: 38.889482,
      lng: -77.050176
    },
    {
      title: 'Washington Monument',
      lat: 38.889714,
      lng: -77.035290
    },
    {
      title: 'Dupont Circle',
      lat: 38.909839,
      lng: -77.043434
    },
    {
      title: 'Baked & Wired',
      lat: 38.904252,
      lng: -77.060366
    },
    {
      title: 'Martin Luther King, Jr. Memorial',
      lat: 38.886511,
      lng: -77.044330
    }
  ];



var Markers = function(data) {
  this.title = ko.observable(data.title);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);

}

function ViewModel() {
  var self = this;

  this.positionsList = ko.observableArray([]);
  this.markerArray = ko.observableArray([]);
  this.currentMarker = ko.observable('');
  this.query = ko.observable('');

  // push position data into a list of array
  positions.forEach(function(posData) {
    self.positionsList.push(new Markers(posData));
  });


  //console.log(self.positionsList());

  // point pos to list of positions in the array
  var pos = self.positionsList();


  // set map options
  var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(pos[0].lat(), pos[0].lng()),
    zoom: 15
  }

  // render map
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // set current marker
  this.setCurrentMarker = function(marker) {
    // set current marker
    self.currentMarker(marker);

  }


    // show info window
    var infowindow = new google.maps.InfoWindow();



    // show markers and info window
    var marker, i;
    for (i = 0; i < pos.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos[i].lat(), pos[i].lng()),
        title: pos[i].title(),
        map: map
      });

      // make array of markers
      self.markerArray.push(marker);

      // render info window when mouseover marker icon and set to currentMarker
      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
          return function() {
            // render info window when marker is clicked
            infowindow.setContent(pos[i].title());
            infowindow.open(map, marker);

            //set current marker when marker when clicked
            self.setCurrentMarker(marker);


            // link to foursquare venue search api
            // TODO: Compute obervable outside loop
            this.foursquareUrl = 'https://api.foursquare.com/v2/venues/search?' +
            'client_id=' + foursquareData.client_id +
            '&client_secret=' + foursquareData.client_secret +
            '&v=' + foursquareData.v +
            '&ll=' + marker.position.lng() + ',' + marker.position.lat()

            // console.log url
            //console.log(this.foursquareUrl);

          }
      })(marker, i));
    };


    // render info window when clicked and set to currentMarker
    self.clickedLoc = function(marker){
      self.setCurrentMarker(marker);
      infowindow.setContent(marker.title);
      infowindow.open(map, marker);
    };


  //when infowindow is open, close info window when you click on the map
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });

  // search filter
  this.query = ko.observable('');

  // compute markers that have been searched
  this.filteredMarkers = ko.computed(function() {
    return ko.utils.arrayFilter(self.markerArray(), function(marker) {
      // return marker list that matches search query
      return marker.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    });
  }, this);



  // remove markers if does not match search query; add markers if match search query
  self.filteredMarkers.subscribe(function() {
    // get array of markers that do not match the search query
    var diff = $(self.markerArray()).not(self.filteredMarkers()).get();

    // remove markers that match the search query
    diff.forEach(function(marker) {
      marker.setMap(null);
    });
    // add markers that match the search query
    self.filteredMarkers().forEach(function(marker) {
      marker.setMap(map);
    })
  });





  // resize map according to window
  //google.maps.event.addDomListener(window, 'resize', initialize);
  //google.maps.event.addDomListener(window, 'load', initialize)
}

ko.applyBindings( new ViewModel())