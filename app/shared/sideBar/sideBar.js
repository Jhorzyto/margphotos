margPhotos.directive( 'sideBar', function ( ) {
    return { restrict: 'A', controller: 'sideBarController', templateUrl: './app/shared/sideBar/sideBar.html' };
});

margPhotos.controller( "sideBarController", function ( $scope, CoreService ) {
    $scope.isLoginPage = CoreService.getUserData().login;

    $scope.menu = [
        {
            link : '',
            title: 'Feed',
            icon: 'dashboard'
        },
        {
            link : '',
            title: 'Seguidores',
            icon: 'group'
        },
        {
            link : '',
            title: 'Seguindo',
            icon: 'message'
        },
        {
            link : '',
            title: 'Seguindo',
            icon: 'message'
        }
    ];
});