margPhotos.directive( 'sideBar', function ( ) {
    return { restrict: 'A', controller: 'sideBarController', templateUrl: './app/shared/sideBar/sideBar.html' };
});

margPhotos.controller( "sideBarController", function ( $scope, $route, $mdSidenav ) {

});