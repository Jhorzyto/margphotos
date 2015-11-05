margPhotos.run ( function( CoreService ) {

    CoreService.goTo('/');

    CoreService.getInformation( function( response ){
        CoreService.processResponse( response, function( data ){
            CoreService.validateLogin( data, true );
            CoreService.setUserData( data );
        });
    }, function( response ){
        CoreService.processResponse( response, function( data ){
            CoreService.validateLogin( data );
        });
    });

});