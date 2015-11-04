margPhotos.controller( 'HomeController', function ( $scope, $rootScope ) {
    $rootScope.page.title.changeTitle("Inicio - MargPhotos");
    $scope.teste = "HomeController";
    $scope.imagePath = "https://material.angularjs.org/latest/img/washedout.png";
});