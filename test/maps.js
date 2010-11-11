/*
 * maps.js
*/

(function($) {
  module("kl maps");
  
  test("create maps and highlight the center", function() {
	  expect(2);
    var options = {
        mapOptions: {
          zoom: 8, 
          center: {latitude: 31.233333, longitude: 120.483333}, 
          mapTypeId: google.maps.MapTypeId.ROADMAP
          },
        };
        
    var map = $("#map");
    var klmaps = map.data("klmaps");
        
    ok(typeof klmaps == "undefined", "the map is not created.");    
    klmaps = map.klmaps(options).data("klmaps");
    ok(klmaps.getMap(), "the map is set.");

    // clean up
    map.removeData("klmaps");
    map.html('');

  });

  test("create markers from pure data by json format", function() {
	  expect(1);
    var options = {
        mapOptions: {
          zoom: 8, 
          center: {latitude: 31.233333, longitude: 120.483333}, 
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        markers: findPureMarkers(),
      };
    
    var map = $("#map");
    var klmaps = map.klmaps(options).data("klmaps");
    equals(klmaps.getMarkers().length, 2, "the markers should be ready.");

    // clean up
    map.removeData("klmaps");
    map.html('');
    
  });

  test("create markers from a function by json format", function() {
	  expect(1);
    var options = {
        mapOptions: {
          zoom: 8, 
          center: {latitude: 31.233333, longitude: 120.483333}, 
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        markers: findPureMarkers,
      };
    
    var map = $("#map");
    var klmaps = map.klmaps(options).data("klmaps");
    equals(klmaps.getMarkers().length, 2, "the markers should be ready.");

    // clean up
    map.removeData("klmaps");
    map.html('');
    
  });

  test("info window with event", function() {
	  expect(2);
    var options = {
        mapOptions: {
          zoom: 8, 
          center: {latitude: 31.233333, longitude: 120.483333}, 
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        markers: findPureMarkers,
        infoWindow: {
          event: "click",
          style: "google",
          options: {
            content: function(marker) {
              return "<div id='_iwid'>" + marker.getPosition().lat() + "</div>";
              }},
          handlers: { // just for unit test
            domready: function() {
              equals($("#_iwid").length, 1, "info window should show after trigger.");
              start();
            },
          }
        }
      };
    
    var map = $("#map");
    var klmaps = map.klmaps(options).data("klmaps");
    
    equals($("#_iwid").length, 0, "info window should not show before trigger.");

    // trigger mark event
    google.maps.event.trigger(klmaps.getMarkers()[0], "click");

    stop();
    // clean up
    map.removeData("klmaps");
    map.html('');
    
  });

})(jQuery);