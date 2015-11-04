margPhotos.controller( 'LoginController', function ( $scope, $rootScope, $location ) {
    $rootScope.page.title.changeTitle("Login - MargPhotos");
    $scope.teste = "LoginController";
    $scope.autenticar = function(){
        console.log("chegou!");
        $location.url( $rootScope.userData.data );
    };
});