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
		console.log(user);
		var socket = io.connect();
		var name = user.alias
		// console.log("hello")
		
		socket.emit("new user", name);
		// socket.on("new user notification", function(name){
		// 	$("#messages").append("<p> " + name + " has joined!</p>")
		// }
		UserFactory.login(user);
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

myAngularObject.controller("DashboardController", function(/*UserFactory*/ ParkFactory, DashboardFactory){
	var _this = this;

	// var service = new google.maps.places.PlacesService(map);
    // var distance = new google.maps.DistanceMatrixRequest(map);

	var map;
	var infoWindow;
	this.courts = [];
	// UserFactory.loggedUser(function(user){
	// 	_this.user = user
	// })
	ParkFactory.geolocation(function(position){
		initialize(position.coords.latitude, position.coords.longitude);
	});

	// this.getOne = function(users){
	// 	UserFactory.getOne(function(users){
	// 		_this.users = users
	// 	})
	// }
	function initialize(lat, lng) {
	  var initposition = new google.maps.LatLng(lat, lng);
	  console.log(lat, lng);

	  // Specify location, radius and place types for your Places API search.
	  var request = {
	    location: initposition,
	    radius: 24000,
	    keyword: 'basketball park',
	  };

	  // Create the PlaceService and send the request.
	  // Handle the callback with an anonymous function.
	  var service = new google.maps.places.PlacesService(document.createElement('div'));
	  service.radarSearch(request, function(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
	      _this.courts = results;
	      console.log(results);
	    }
	  });
	}
	// Run the initialize function when the window has finished loading.
	//google.maps.event.addDomListener(window, 'load', initialize);

	//   google.maps.event.addListener(marker, 'click', function() {
	//     service.getDetails(place, function(result, status) {
	//       if (status !== google.maps.places.PlacesServiceStatus.OK) {
	//         console.error(status);
	//         return;
	//       }
	//       infoWindow.setContent(result.name);
	//       infoWindow.open(map, marker);
	//     });
	//   });
	// }
	// service.nearbySearch(request, callback);
	// UserFactory.loggedUser(function(user){
	// 	_this.user = user;
	// })

	// UserFactory.getAll(function(users){
	// 	_this.users = []
	// 	if(_this.user){
	// 		for(var i = 0; i < users.length; i++){
	// 			if(users[i]._id != _this.user._id){
	// 				_this.users.push(users[i]);
				// }
	// 		};
	// 	}
	// })
	

})

// myAngularObject.controller("ParksController", function(UserFactory, ParkFactory){
// 	var _this = this;
	
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
// })