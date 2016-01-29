var infowindow;
var map;
     function success(position)
     {
           // Define the coordinates as a Google Maps LatLng Object
           var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

           // Prepare the map options
           var mapOptions =
          {
                      zoom: 14,
                      center: coords,
                      mapTypeControl: false,
                      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                      mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // Create the map, and place it in the map_canvas div
            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
      
      //search for schools within 1500 metres of our current location, and as a marker use school.png
      placesRequest('Schools',coords,1500,['school'],'images/school.png');


            // Place the initial marker
            var marker = new google.maps.Marker({
                      position: coords,
                      map: map,
                      title: "Your current location!"
            });
      
        }

        function fail()
        {
              // Could not obtain location
        }
    
    //Request places from Google
    function placesRequest(title,latlng,radius,types,icon)
    {
      //Parameters for our places request
      var request = {
        location: latlng,
        radius: radius,
        types: types
      };

      //Make the service call to google
      var callPlaces = new google.maps.places.PlacesService(map);
      callPlaces.search(request, function(results,status){
        //trace what Google gives us back
        $.each(results, function(i,place){
          var placeLoc = place.geometry.location;
           var thisplace = new google.maps.Marker({
             map: map,
             position: place.geometry.location,
             icon: icon,
             title: place.name
           });
        })
      });
    }

// function createMap(coords, zoom){
//     var mapOptions = {
//         zoom: zoom,
//         center: new google.maps.LatLng(coords.latitude, coords.longitude),
//         panControl: false,
//         panControlOptions: {
//             coords: google.maps.ControlPosition.BOTTOM_LEFT
//         },
//         zoomControl: true,
//         zoomControlOptions: {
//             style: google.maps.ZoomControlStyle.LARGE,
//             coords: google.maps.ControlPosition.RIGHT_CENTER
//         },
//         scaleControl: false
//     };
//     infowindow = new google.maps.InfoWindow({
//         content: "holding..."
//     });
//     map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }

// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: dashCtrl.position.lat, lng: dashCtrl.position.lng},
//     zoom: 6
//   });

//   var infoWindow = new google.maps.InfoWindow({map: map});

//     function performSearch() {
//     var request = {
//     bounds: map.getBounds(),
//     keyword: 'basketball court'
//     };

//     service.radarSearch(request, callback);
//   }

  function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.error(status);
      return;
    }
    for (var i = 0, result; result = results[i]; i++) {
      addMarker(result);
    }
  }

  function geocodePlaceId(geocoder, map, infowindow) {
    var placeId = document.getElementById('place-id').value;
    geocoder.geocode({'placeId': placeId}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    })
  }
}