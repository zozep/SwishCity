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
	this.create = function(){
		console.log(_this.newUser);
		UserFactory.create(_this.newUser, function(response){
			if(response.errors){
				_this.email_err = (response.errors.email) ? response.errors.email.message : "";
				_this.alias_err = (response.errors.alias) ? response.errors.alias.message : "";
				_this.password_err = (response.errors.password) ? response.errors.password.message : "";
			} else {
				_this.newUser = {};
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

myAngularObject.controller("DashboardController", function(UserFactory, ParkFactory, DashboardFactory, $scope){
	console.log("DashboardController loaded...");
	var _this = this;
	$scope.show = false;
	$scope.clickedPark = {};

	UserFactory.loggedUser(function(user){
		console.log("loggedUser callback was called");
		_this.user = user
		if(user){
		console.log(user);
			socket.emit("new user", user.alias);
			ParkFactory.geolocation(function(position){
				console.log("geolocation callback was called");
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
	    radius: 8046,
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

myAngularObject.controller("ParksController", function(UserFactory, ParkFactory, $scope){
	var _this = this;
	$scope.park = ParkFactory.getPark()
	UserFactory.loggedUser(function(user){
		$scope.user = user;
	})
	// console.log($scope)
	var returnedParkInfo = {};

	var service = new google.maps.places.PlacesService(document.createElement('div'));
	service.getDetails({placeId: $scope.park}, callback);

	function callback(result, status) {
  		if (status == google.maps.places.PlacesServiceStatus.OK) {
		   _this.park = result;
		   $scope.$apply();
		   //console.log('results', _this.park);
		
		}
	}
	this.addToPark = function(){

		var addUserToPark = {
			user: $scope.user._id,
			name: _this.park.name,
			park_id: $scope.park
		} 

		ParkFactory.addToPark(addUserToPark);
		// UserFactory.refresh(function(user){
		// 	$scope.user = user;
		// })

	}
	this.removeFromPark = function(){
		var removeUserFromPark = {
			user: $scope.user.alias,
			park_id: $scope.park
		}
		// if(!$scope.user.atPark){
		// 	alert("User not at a park!")
		// }else{
		ParkFactory.removeUserFromPark(removeUserFromPark);
		// }
		// UserFactory.refresh(function(user){
		// 	$scope.user = user;
		// })
	}
})
myAngularObject.directive('chat', function(){
    return{
        restrict: "E",
        templateUrl: 'partials/chat.html'
    }
})

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