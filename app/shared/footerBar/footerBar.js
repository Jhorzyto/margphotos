margPhotos.directive( 'footerBar', function ( ) {
    return { restrict: 'A', controller: 'footerBarController', templateUrl: './app/shared/footerBar/footerBar.html' };
});

margPhotos.controller( "footerBarController", function ( $scope, $route ) {
    $scope.test = $route.current.controller + "footerBar";
});