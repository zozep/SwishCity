app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: '/partials/main.html',
        controller: "MainController",
        controllerAs: "main"
    })
    .otherwise({
        redirectTo: '/',
    });
});