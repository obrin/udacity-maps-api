$.getJSON("model.json",function(o){"use strict";var e=o.data,t=function(){var t=this;this.markerArray=ko.observableArray([]),this.locationArray=ko.observableArray([o]),this.location=ko.observable(""),this.currentLocation=ko.observable(""),this.query=ko.observable(""),this.filteredMarkers=ko.computed(function(){return ko.utils.arrayFilter(t.markerArray(),function(o){return o.title.toLowerCase().indexOf(t.query().toLowerCase())>=0})},this);var n=e;this.filteredMarkers.subscribe(function(){t.markerArray().forEach(function(o){o.setMap(null)}),t.filteredMarkers().forEach(function(o){o.setMap(s)})});var r,a,i={mapTypeId:google.maps.MapTypeId.ROADMAP,center:new google.maps.LatLng(38.897947,-77.036509),zoom:15,zoomControl:!0,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL,position:google.maps.ControlPosition.RIGHT_BOTTOM},disableDefaultUI:!1,panControl:!1},s=new google.maps.Map(document.getElementById("map-canvas"),i),l=new google.maps.InfoWindow;for(a=0;a<n.length;a++)r=new google.maps.Marker({position:new google.maps.LatLng(n[a].lat,n[a].lng),title:n[a].title,map:s,animation:google.maps.Animation.DROP}),t.markerArray.push(r),google.maps.event.addListener(r,"click",function(o){return function(){t.setLocation(o)}}(r));this.setLocation=function(o){t.currentLocation()===o?t.removeLocation():(t.removeLocation(),t.currentLocation(o),o.setAnimation(google.maps.Animation.BOUNCE),l.setContent(o.title),l.open(s,o))},this.removeLocation=function(){t.currentLocation()&&(t.currentLocation().setAnimation(null),t.currentLocation(null),l.close())}};ko.applyBindings(new t)});