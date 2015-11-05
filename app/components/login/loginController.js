margPhotos.controller( 'LoginController', function ( $scope, CoreService ) {
    CoreService.changeTitlePage("Login - MargPhotos");
    $scope.urlLogin = CoreService.getUserData().data;
});