myAngularObject.controller("UsersController", function(UserFactory, $location){
	var _this = this;
	this.email_err = "";
	this.password_err = "";
	this.alias_err = "";
	_this.err = {}

	this.getOne = function(user){
		UserFactory.getOne(function(user){
			_this.user = user
		})
	}
	this.create = function(newUser){
		UserFactory.create(newUser, function(response){
			if(response.errors){
				_this.email_err = (response.errors.email) ? response.errors.email.message : "";
				_this.alias_err = (response.errors.alias) ? response.errors.alias.message : "";
				_this.password_err = (response.errors.password) ? response.errors.password.message : "";
			} else {
				UserFactory.register(response);
			}
		})
	}

	this.destroy = function(user){
		UserFactory.destroy(user, function(err){
			_this.err = err;
			getAll();
		})
	}

	this.login = function(user){

		UserFactory.login(user, function(){
			$location.path('/dashboard');
		});
	}

	this.logout = function(){
		UserFactory.logout();
		DashboardFactory.logout();
	}
})

myAngularObject.controller("EditController", function(UserFactory, $routeParams){
	var _this = this;

	function getOne(){
		UserFactory.getOne($routeParams.id, function(user){
			_this.user = user;
		})
	}
	getOne();

	this.update = function(){

		UserFactory.update(_this.user, function(user){
			_this.user = user;
		});
	}
})

myAngularObject.controller("DashboardController", function(UserFactory, ParkFactory, DashboardFactory, $scope){
	var _this = this;

	$scope.show = false;
	$scope.clickedPark = {};

	UserFactory.loggedUser(function(user){
		_this.user = user
		if(_this.user != undefined){
		console.log(user);
			socket.emit("new user", _this.user.alias);
			ParkFactory.geolocation(function(position){
				DashboardFactory.createMap({latitude: position.coords.latitude, longitude: position.coords.longitude}, 11);
				initialize(position.coords.latitude, position.coords.longitude);
	 		})
		}
	})
	this.getOne = function(users){
		UserFactory.getOne(function(users){
			_this.users = users
		})
	}
	this.addToPark = function(title, id){
		ParkFactory.addToPark(title, id, _this.user._id);
	}

	this.parkLoad = function(park_id){
		// console.log(park_id)
		ParkFactory.parkPage(park_id)
	}

	function initialize(lat, lng) {
	  var initposition = new google.maps.LatLng(lat, lng);

	  // Specify location, radius and place types for your Places API search.
	  var request = {
	    location: initposition,
	    radius: 16093,
	    keyword: 'basketball park'
	  };

	  // Creating the PlaceService and sending request.
	  // Handling the callback with an anonymous function.
	  var service = new google.maps.places.PlacesService(document.createElement('div'));
	  service.nearbySearch(request, function(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
	    	$scope.parks = results;
	    	//console.log(results);
	    	$scope.$apply();
	    	for(var i = 0; i < results.length; i++){
	    		DashboardFactory.createPoint(results[i].geometry.location, results[i].name, function(title){
	    			for(var i = 0; i < results.length; i++){
	    				if(results[i].name == title){
	    					console.log(results[i]);
	    					$scope.clickedPark = results[i];
	    					$scope.show = true;
							$scope.$apply();
	    				}
	    			}
				});
	    	}
	      // ParkFactory.storeParks(results);
	    }
	  });
	}
})

myAngularObject.controller("ParksController", function(UserFactory, ParkFactory){
	var _this = this;
	
// 	// this.getDetails = function(){
// 	// 	var = request{
// 	// 		placeId:  
// 	// 	}
// 	// }

	function placeDetailsByPlaceId(service, map, infowindow) {
// Create and send the request to obtain details for a specific place,
// using its Place ID.
		var request = {
			placeId: document.getElementById(ParkFactory.getPark()).value
		};
		service.getDetails(request, function (place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
// If the request succeeds, draw the place location on the map
// as a marker, and register an event to handle a click on the marker.
	      		var marker = new google.maps.Marker({
	        		map: map,
	        		position: place.geometry.location
	      		});

	      		google.maps.event.addListener(marker, 'click', function() {
	        		infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
	          		'Place ID: ' + place.place_id + '<br>' +
	          		place.formatted_address + '</div>');
	        		infowindow.open(map, this);
	      		});

	      		map.panTo(place.geometry.location);
	      	}
		})
	}
// 	UserFactory.loggedUser(function(user){
// 		_this.user = user;
// 	})
	
// 	UserFactory.getAll(function(users){
// 		_this.users = []
// 		if(_this.user){
// 			for(var i = 0; i < users.length; i++){
// 				if(users[i]._id != _this.user._id){
// 					_this.users.push(users[i]);
// 				}
// 			};
// 		}
// 	})
})