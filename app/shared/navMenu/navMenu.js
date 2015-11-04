margPhotos.directive( 'navMenu', function ( ) {
    return { restrict: 'A', controller: 'navMenuController', templateUrl: './app/shared/navMenu/navMenu.html' };
});

margPhotos.controller( "navMenuController", function ( $scope, $route, $mdSidenav ) {
    $scope.openMenu = function() { $mdSidenav('right').toggle(); };
});