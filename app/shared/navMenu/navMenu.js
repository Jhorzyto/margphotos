margPhotos.directive( 'navMenu', function ( ) {
    return { restrict: 'A', controller: 'navMenuController', templateUrl: './app/shared/navMenu/navMenu.html' };
});

margPhotos.controller( "navMenuController", function ( $scope, $mdSidenav, CoreService ) {
    $scope.openMenu = function() { $mdSidenav('right').toggle(); };
    $scope.isLoginPage = CoreService.getUserData().login;

    $scope.logoff = function(){
        CoreService.getInformation({ params: { logoff: true }}, function( response ){
            CoreService.processResponse( response, function( data ){
                CoreService.validateLogin( data, true );
                CoreService.setUserData( data );
            });
        }, function( response ){
            CoreService.processResponse( response );
        });
    };

});