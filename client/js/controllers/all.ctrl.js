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
		UserFactory.login(user);
	}

	this.logout = function(){
		UserFactory.logout();
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

myAngularObject.controller("DashboardController", function(UserFactory, ParkFactory){
	var _this = this;

	var service = new google.maps.places.PlacesService(map);
    var directions = new google.maps.DirectionsRoute();
    var distance = new google.maps.DistanceMatrixRequest();

		if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };

	      infoWindow.setPosition(pos);
	      infoWindow.setContent('Location found.');
	      map.setCenter(pos);
	    }, function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	    });
	  } else {
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	  }
	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	  infoWindow.setPosition(pos);
	  infoWindow.setContent(browserHasGeolocation ?
	                        'Error: The Geolocation service failed.' :
	                        'Error: Your browser doesn\'t support geolocation.');
		}
	});

	service.nearbySearch(request, callback);
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