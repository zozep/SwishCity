myAngularObject.controller("UsersController", function(UserFactory, $location){
	var _this = this;

	// function getAll(){
	// 	UserFactory.getAll(function(users){
	// 		_this.users = users;
	// 	})
	// }

	_this.err = {}

	this.getOne = function(user){
		UserFactory.getOne(function(user){
			_this.user = user
		})
	}
	this.create = function(newUser){

		UserFactory.create(newUser, function(err){
			console.log(newUser)
			_this.err = err;
			console.log(_this.err);
			_this.user = {};
			$location.path("/dashboard");
		})
	}

	this.destroy = function(user){
		UserFactory.destroy(user, function(err){
			_this.err = err;
			getAll();
		})
	}

	this.login = function(){
		console.log(_this.user);
		UserFactory.login(_this.user);
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
// })
// })
// myAngularObject.controller("courtsController", function(UserFactory, CourtFactory){
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
})