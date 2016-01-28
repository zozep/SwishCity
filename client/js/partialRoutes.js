myAngularObject.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: '/partials/welcome.html',
        controller: "UsersController",
        controllerAs: "usersCtrl"
    })
    .when('/users/:id/edit', {
		templateUrl: '/partials/edit.html',
		controller: "EditController",
		controllerAs: "editCtrl"
    })
    .when("/dashboard",{
    	templateUrl: "/partials/dashboard.html",
    	controller: "courtsController",
    	controllerAs: "courtsCtrl"
    })
    .otherwise({
    	redirectTo: "/"
    })
});