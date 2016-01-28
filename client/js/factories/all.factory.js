myAngularObject.factory('UserFactory', function($http, $location) {
	if(!sessionUser){
		$location.path('/');
	}

	var sessionUser;

	return {
		register: function(user){
			sessionUser = user;
			$location.path('/dashboard');
		},
		login: function(user){
			console.log(user)
			$http.post("/login", user).success(function(response){
				console.log(response)
				if(response.err){
					sessionError = response.err;
					$location.path('/welcome');
				} else {
					sessionUser = response;
					$location.path('/dashboard');
				}
			})
		},
		logout: function(){
			sessionUser = null;
			$location.path("/");
		},
		loggedUser: function(callback){
			callback(sessionUser);
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
})
myAngularObject.factory('DashboardFactory', function() {
	_this.factory = {};
	factory.position;
	
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
});

myAngularObject.factory('ParkFactory', function($http) {
	if (navigator.geolocation) {    
        function success(pos){
            factory.position = pos.coords;
        }
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert('Geolocation is not supported in your browser');
    }
	return {
		getAll: function(callback){
			$http.get("/users").success(function(response){
				callback(response);
			})
		}
	};
})

