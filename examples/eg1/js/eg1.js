(function() {

  window.onload = function() {
    
    // Creating a map
    var options = {
        mapOptions: {
          zoom: 8, 
          center: {latitude: 31.2181747, longitude: 121.612137}, 
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        markers: function() {
          var markers = [];
          var southWestLat = 31.2181747 - 4, southWestLng = 121.612137 - 5;
          for (var i = 0; i < 1000; i++) {
            markers.push({
              position: {
                latitude: southWestLat + 8 * Math.random(),
                longitude: southWestLng + 10 * Math.random(),
              }
            })
          }
          return markers;
          },
        infoWindow: {
          event: "click",
          style: "google",
          options: {
            content: function(marker) {
              return "<div> Hello Marker, " + marker.getPosition().lat() + "</div>";
              }},
        }
      };

    $("#map").klmap(options);
  
  };
       	
})();