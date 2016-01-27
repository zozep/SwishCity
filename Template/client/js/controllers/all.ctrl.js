myAngularObject.controller("UsersController", function(UserFactory){
	var _this = this;

	UserFactory.getAll(function(response){
		console.log(response);
		_this.users = response;
	})
})