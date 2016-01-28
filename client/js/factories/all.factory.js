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

myAngularObject.factory('ParkFactory', function($http) {
	return {
		getAll: function(callback){
			$http.get("/parks").success(function(response){
				callback(response);
			})
		}
	};
})
