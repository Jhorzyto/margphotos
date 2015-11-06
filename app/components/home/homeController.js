margPhotos.controller( 'HomeController', function ( $scope, CoreService ) {
    var nextUrl;

    CoreService.changeTitlePage("Inicio - MargPhotos");
    $scope.teste = "HomeController";
    $scope.imagePath = "https://material.angularjs.org/latest/img/washedout.png";

    CoreService.getInformation({ params: { feed: 50 }}, function( response ){
        CoreService.processResponse( response, function( data ){
            CoreService.validateLogin( data );
            nextUrl = data.data.pagination.next_url;
            $scope.feedData = data.data.data;
        });
    }, function( response ){
        CoreService.processResponse( response );
    });
});