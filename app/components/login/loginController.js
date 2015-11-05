margPhotos.controller( 'LoginController', function ( $scope, CoreService ) {
    CoreService.changeTitlePage("Login - MargPhotos");
    $scope.teste = "LoginController";
    $scope.urlLogin = CoreService.getUserData().data;
});