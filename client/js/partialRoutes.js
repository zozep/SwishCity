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
    .otherwise({
    	redirectTo: "/"
    })
    .when("/dashboard",{
        templateUrl: "/partials/dashboard.html",
        controller: "DashboardController",
        controllerAs: "dashCtrl"
    })
    .when("/park",{
        templateUrl: "/partials/parks.html",
        controller: "ParksController",
        controllerAs: "parksCtrl"
    })    
});