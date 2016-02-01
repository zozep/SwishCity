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
			alert("Thank you for registering! Please log in");
			$location.path('/');
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

myAngularObject.factory('ParkFactory', function($http, $location) {
	var _this = this;
	factory = {};
	var parks = []


	factory.storeParks = function(newParks){
		parks = newParks;
		console.log(parks)
	}

	factory.getParks = function(callback){
		callback(parks);
	}
	
	factory.parkPage = function(park_id){
		_this.park = park_id
		$location.path("/park");
	}

	factory.getPark = function(){
		return _this.park;
	}

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

  	factory.addToPark = function(title, id, user_id){
  		$http.post("/add/park", {title: title, place_id: id, user_id: user_id}).success(function(response){
  			console.log(response);
  		})
  	}

  	return factory;

});

myAngularObject.factory('DashboardFactory', function($http) {

	return {
		getAll: function(callback){
			$http.get("/users").success(function(response){
				callback(response);
			})
		},
        createMap: function (coords, zoom){
		    var mapOptions = {
		        zoom: zoom,
		        center: new google.maps.LatLng(coords.latitude, coords.longitude),
		        panControl: false,
		        panControlOptions: {
		            coords: google.maps.ControlPosition.BOTTOM_LEFT
		        },
		        zoomControl: true,
		        zoomControlOptions: {
		            style: google.maps.ZoomControlStyle.LARGE,
		            coords: google.maps.ControlPosition.RIGHT_CENTER
		        },
		        scaleControl: false
		    };
		    infowindow = new google.maps.InfoWindow({
		        content: "holding..."
		    });
		    map = new google.maps.Map(document.getElementById('map'), mapOptions);
		},
		createPoint: function (location, title, callback){
		    var point = new google.maps.Marker({
		        title: title
		    })
		    point.setPosition(location);
		    point.setMap(map);
		    google.maps.event.addListener(point, 'click', function(){
		    	callback(point.title);
		    })
		}
	}
});
