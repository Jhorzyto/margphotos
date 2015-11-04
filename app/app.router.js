margPhotos.config( function( $routeProvider ) {
    $routeProvider.when( '/', { templateUrl: "./app/components/core/coreView.html" })
                  .when( '/home', { templateUrl: "./app/components/home/homeView.html", controller: 'HomeController' })
                  .when( '/login', { templateUrl: "./app/components/login/loginView.html", controller : 'LoginController'})
                  //Default
                  .otherwise({ redirectTo: '/' });
});