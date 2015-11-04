margPhotos.run ( function( $rootScope, CoreService ) {

    $rootScope.page = {};
    $rootScope.page.title = {
        titleText: angular.element( document.querySelector( 'title' ) ).text,
        changeTitle: function ( newTitle ) {
            if ( angular.isString( newTitle ) ) angular.element( document.querySelector( 'title' ) ).html( newTitle );
        }
    };

    $rootScope.currentPatch = CoreService.getCurrentPath();

    CoreService.getInformation( function( response ){
        $rootScope.userData = response.data;
        console.log($rootScope.userData);
        CoreService.validateLogin( response.data, true );
    }, function( response ){
        CoreService.validateLogin( response.data );
    });

});