myAngularObject.factory('UserFactory', function($http, $location) {
	if(!sessionUser){
		$location.path('/');
	}

	var sessionUser;

	function register(user){
		$http.post("/users", {name: user}).success(function(response){
			if(response.errors){
				(response.errors);
			} else {
				sessionUser = response;
				$location.path('/dashboard');
			}
		});
	}

	return {
		login: function(id, callback){
			$http.get("/user/" + id).success(function(response){
				calllback(function(){
					if(response){
						sessionUser = response;
						$location.path('/dashboard');
					} else {
					register(id);
					}
				})
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
			$http.post("/users", newUser).success(function(res){
				callback(res);
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

// myAngularObject.factory('CourtFactory', function($http) {
// 	return {
// 		getAll: function(callback){
// 			$http.get("/users").success(function(response){
// 				callback(response);
// 			})
// 		}
// 	};
// })
