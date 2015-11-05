margPhotos.controller( 'HomeController', function ( $scope, CoreService ) {
    CoreService.changeTitlePage("Inicio - MargPhotos");
    $scope.teste = "HomeController";
    $scope.imagePath = "https://material.angularjs.org/latest/img/washedout.png";
});