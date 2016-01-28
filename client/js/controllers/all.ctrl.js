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

	UserFactory.loggedUser(function(user){
		_this.user = user;
	})

	UserFactory.getAll(function(users){
		_this.users = []
		if(_this.user){
			for(var i = 0; i < users.length; i++){
				if(users[i]._id != _this.user._id){
					_this.users.push(users[i]);
				}
			};
		}
	})
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