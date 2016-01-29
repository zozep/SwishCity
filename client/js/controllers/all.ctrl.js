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

myAngularObject.controller("DashboardController", function(UserFactory, ParkFactory, DashboardFactory){
	var _this = this;

	// var service = new google.maps.places.PlacesService(map);
    // var distance = new google.maps.DistanceMatrixRequest(map);

	var map;
	var infoWindow;

	UserFactory.loggedUser(function(user){
		_this.user = user
	})

	ParkFactory.geolocation(function(position){
		console.log(position);
		_this.position = position;
	});

	this.getOne = function(users){
		UserFactory.getOne(function(users){
			_this.users = users
		})
	}
 //    function performSearch() {
 //  	var request = {
 //    bounds: map.getBounds(),
 //    keyword: 'basketball court'
 //  	};

 //  	service.radarSearch(request, callback);
	// }

	// function callback(results, status) {
	//   if (status !== google.maps.places.PlacesServiceStatus.OK) {
	//     console.error(status);
	//     return;
	//   }
	//   for (var i = 0, result; result = results[i]; i++) {
	//     addMarker(result);
	//   }
	// }

	// function addMarker(place) {
	//   var marker = new google.maps.Marker({
	//   	map: map,
	//     position: place.geometry.location,
	//     icon: {
	//       url: 'http://maps.gstatic.com/mapfiles/circle.png',
	//       anchor: new google.maps.Point(10, 10),
	//       scaledSize: new google.maps.Size(10, 17)
	//     }
	//   });

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