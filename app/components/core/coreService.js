margPhotos.constant( 'urlApi','./api/');

margPhotos.service( 'CoreService', function ( $http, urlApi, $location ) {
    this.getInformation = function( success, error ){
        $http.get( urlApi ).then( success, error );
    };

    this.validateLogin = function( data, home ){
        if( angular.isObject( data ) && angular.isDefined( data.login ) )
            if( data.login )
                $location.path( '/login' );
            else if( angular.isDefined( home ) )
                $location.path( '/home' );
        else
            $location.path( '/login' );
    };

    this.getCurrentPath = function(){
        return $location.$$path;
    };
});