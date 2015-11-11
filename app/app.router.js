margPhotos.config([ '$routeProvider', function ( $routeProvider ) {
    $routeProvider.when('/', {
        templateUrl: './app/components/core/coreView.html',
        controller: 'CoreController'
    }).when('/home', {
        templateUrl: './app/components/home/homeView.html',
        controller: 'HomeController'
    }).when('/login', {
        templateUrl: './app/components/login/loginView.html',
        controller: 'LoginController'
    }).otherwise({ redirectTo: '/' });
}]);