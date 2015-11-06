margPhotos.constant( 'urlApi','./api/');

margPhotos.service( 'CoreService', function ( $http, urlApi, $location, $rootScope ) {

    var page = {
        title : {
            titleText: angular.element( document.querySelector( 'title' ) ).text,
            changeTitle: function ( newTitle ) {
                if ( angular.isString( newTitle ) ) angular.element( document.querySelector( 'title' ) ).html( newTitle );
            }
        }
    };

    this.changeTitlePage = page.title.changeTitle;

    this.getInformation = function( config, success, error ){
        config = angular.isDefined( config ) && angular.isObject( config ) ? config : {};
        $http.get( urlApi, config ).then( success, error );
    };

    this.goTo = function( address, external ){
        if( angular.isDefined( external ) && angular.isString( address ) )
            $location.url( address );
        else if( angular.isUndefined( external ) && angular.isString( address ) )
            $location.path( address );
    };

    this.validateLogin = function( data, home ){
        if( angular.isObject( data ) && angular.isDefined( data.login ) ){
            if( data.login )
                this.goTo( '/login' );
            else if( angular.isDefined( home ) )
                this.goTo( '/home' );
        } else
            this.goTo( '/login' );
    };

    this.getCurrentPath = function(){
        return $location.$$path;
    };

    this.setUserData = function( data ){
        if( angular.isObject( data ) )
            $rootScope.userData = data;
    };

    this.getUserData = function(){
        return angular.isDefined( $rootScope.userData ) ? $rootScope.userData : { login : true };
    };

    this.processResponse = function( response, callback ){

        if( angular.isDefined( callback ) && angular.isFunction( callback ))
            callback( response.data );

        switch ( response.status ){
            case 404:
            case 500:
                console.warn( response.statusText );
            break;
        }
    };
});