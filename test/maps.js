/*
 * maps.js
*/

(function($) {
  module("kl maps");
  
  /*
  test("init", function() {
    expect(2);
    ok($("script[src^='http://maps.google.com/maps/api/js']").length == 0, "map api will not be loaded before windows.");
    var maps = $("#map").klMap(options);
    ok($("script[src^='http://maps.google.com/maps/api/js']").length == 1, "map api should be loaded after windows.");
  });
  */
 
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
    var klmap = map.data("klmap");
        
    ok(typeof klmap == "undefined", "the map is not created.");    
    klmap = map.klMap(options).data("klmap");
    ok(klmap.getMap(), "the map is set.");

    // clean up
    map.removeData("klmap");
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
    var klmap = map.klMap(options).data("klmap");
    equals(klmap.getMarkers().length, 2, "the markers should be ready.");

    // clean up
    map.removeData("klmap");
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
    var klmap = map.klMap(options).data("klmap");
    equals(klmap.getMarkers().length, 2, "the markers should be ready.");

    // clean up
    map.removeData("klmap");
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
    var klmap = map.klMap(options).data("klmap");
    
    equals($("#_iwid").length, 0, "info window should not show before trigger.");

    // trigger mark event
    google.maps.event.trigger(klmap.getMarkers()[0], "click");

    stop();
    // clean up
    map.removeData("klmap");
    map.html('');
    
  });

  test("testkh", function() {
  });
  /*
  // it does not work well
  test("create maps with auto detect center", function() {
	  expect(1);
    var options={zoom: 8, mapTypeId: google.maps.MapTypeId.ROADMAP},
        map = $("#map").data("klmap");
        
    map = $("#map").klMap(options).data("klmap");
    ok(map.getMap().getCenter().lng() != 0, "the map is set.");
    
    
  });
  */
  
  /*
  test("clickshowinfowindow", function() {
  });
  */
  
  /*
  test("load markers", function() {
    expect(1);
    
    stop(1500);
    var maps = $('#map').klMap(
        {
          zoom: 8,
          latitude: 31.233333,
          longitude: 120.483333,
          options: {zoom: 8, latitude: 31.233333, longitude: 120.483333, mapTypeId: google.maps.MapTypeId.ROADMAP},
          markers: findPureMarkers,
        }
    )
    equals($klmap.markers.length, findPureMarkers($klmap).markers.length, "markers should be appended to the maps.");

  });
  */
  
  function assert_array(actual, expected, msg) {
    equals(actual.length, expected.length, msg);
    for (var i = 0, l = actual.length; i < l; i++) {
      equals(actual[i], expected[0], msg);
    }
  }
})(jQuery);