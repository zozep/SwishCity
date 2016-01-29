myAngularObject.factory('UserFactory', function($http, $location) {
	if(!sessionUser){
		$location.path('/');
	}
	var _this = this;
	var sessionUser;

	var factory = {
		sessionUser: {},
		register: function(user){
			sessionUser = user;
			$location.path('/dashboard');
		},
		login: function(user, callback){
			$http.post("/login", user).success(function(response){
				if(response.err){
					sessionError = response.err;
					$location.path('/welcome');
				} else {
					_this.sessionUser = response;
					callback();
				}
			})
		},
		logout: function(){
			sessionUser = null;
			$location.path("/");
		},
		loggedUser: function(callback){
			callback(_this.sessionUser);
		},
		getOne: function(id, callback){
			$http.get("/user/" + id).success(function(response){
				callback(response);
			})
		},
		getAll: function(callback){
			$http.get("/users").success(function(response){
				callback(response);
			})
		},
		create: function(newUser, callback){
			$http.post("/users", newUser).success(function(response){
				callback(response);
			})
		},
		update: function(user, callback){
			$http.put('/update/'+ user._id, user).success(function(res){
				$location.path('/users');
			})
		},
		destroy: function(user, callback){
			$http.delete("/users/" + user._id, user).success(function(){
				callback();
			})
		}
	}
	return factory;
})

myAngularObject.factory('ParkFactory', function() {
	factory = {};
	

	factory.geolocation = function(callback){
		if (navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function(position) {
				callback(position);

    		}, function() {
      			handleLocationError(true, infoWindow, map.getCenter());
      			console.log("error")
    		});

  		} else {
    		// Browser doesn't support Geolocation
    		handleLocationError(false, infoWindow, map.getCenter());
  		}
  	}

  	return factory;

});

myAngularObject.factory('DashboardFactory', function($http) {

	return {
		getAll: function(callback){
			$http.get("/users").success(function(response){
				callback(response);
			})
		}
	};
	
})

