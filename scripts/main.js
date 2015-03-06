$(document).ready(function(){$.ajax({dataType:"json",url:"model.json",type:"GET",success:function(o){ko.applyBindings(new ViewModel(o))},error:function(){$("main").append('<span class="error">Failed to retrieve data</span>'),alert("Failed to retrieve data")}})});var ViewModel=function(o){var e=this,t={copy:["title","loc","lat","id"]};ko.mapping.fromJS(o,t,e),this.markerArray=ko.observableArray([]),this.currentLocation=ko.observable(""),this.query=ko.observable(""),this.foursquare=ko.observable(""),this.filteredMarkers=ko.computed(function(){return ko.utils.arrayFilter(e.markerArray(),function(o){return o.title.toLowerCase().indexOf(e.query().toLowerCase())>=0})},this);var n=o.locations;this.filteredMarkers.subscribe(function(){e.markerArray().forEach(function(o){o.setMap(null)}),e.filteredMarkers().forEach(function(o){o.setMap(s)})});var a,r,i={mapTypeId:google.maps.MapTypeId.ROADMAP,center:new google.maps.LatLng(38.897947,-77.036509),zoom:14,zoomControl:!0,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL,position:google.maps.ControlPosition.RIGHT_BOTTOM},disableDefaultUI:!1,panControl:!1},s=new google.maps.Map(document.getElementById("map-canvas"),i),l=new google.maps.InfoWindow({maxWidth:200});for(r=0;r<n.length;r++)a=new google.maps.Marker({position:new google.maps.LatLng(n[r].lat,n[r].lng),title:n[r].title,map:s,animation:google.maps.Animation.DROP,id:n[r].id}),e.markerArray.push(a),google.maps.event.addListener(a,"click",function(o){return function(){e.setLocation(o)}}(a));this.setLocation=function(o){e.currentLocation()===o?e.removeLocation():(e.getFoursquare(o),e.removeLocation(),e.currentLocation(o),o.setAnimation(google.maps.Animation.BOUNCE),l.open(s,o),s.panTo(o.position))},this.removeLocation=function(){e.currentLocation()&&(e.currentLocation().setAnimation(null),e.currentLocation(null),l.close())},this.getFoursquare=function(o){$.ajax({dataType:"json",cache:!0,url:"https://api.foursquare.com/v2/venues/"+o.id+"?client_id=JZZWQ2GOQCFO4J1R03HFTPFMOTNMTQFRGV5XQ2S0KHQYPVMZ&client_secret=HC1KWRSYXWW5TBRBPW4DKDPH4TEXEVAZQK34GXLW2X1D315G&v=20130815",type:"GET",success:function(o){var e=o.response.venue,t=e.location.formattedAddress,n=t.join(",<br>");l.setContent("<h3>"+e.name+"</h3><br><span>"+n+"</span><br><b> Rating: "+e.rating+"</b>")},error:function(){l.setContent("Failed to retrieve content..."),alert("unable to connect to foursquare API")}})}};