myAngularObject.factory('UserFactory', function($http) {
	return {
		getAll: function(callback){
			$http.get("/users").success(function(response){
				callback(response);
			})
		}
	};
})
