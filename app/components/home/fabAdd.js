margPhotos.directive( 'fabAdd', function ( ) {
    return { restrict: 'E', controller: 'fabAddController', templateUrl: './app/components/home/fabAdd.html' };
});

margPhotos.controller( "fabAddController", function ( $scope, $route ) {
    $scope.test = $route.current.controller + "footerBar";
});