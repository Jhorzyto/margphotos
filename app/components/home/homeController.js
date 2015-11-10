margPhotos.controller( 'HomeController', function ( $scope, CoreService, $timeout ) {
    var nextUrl;

    CoreService.changeTitlePage("Inicio - MargPhotos");

    CoreService.getInformation({ params: { feed: 50 }}, function( response ){
        CoreService.processResponse( response, function( data ){
            CoreService.validateLogin( data );
            nextUrl = data.data.pagination.next_url;
            $scope.feedData = data.data.data;
        });
    }, function( response ){
        CoreService.processResponse( response );
    });

    $scope.effectsImage = function( data ){
        return {
            'animated'       : data,
            'effectHeart'    : data.like,
            'jello'          : data.like,
            'rubberBand'     : data.improveImage,
            'bounceOutRight' : data.comment
        };
    };

    $scope.effectsButtonLike = function( data ){
        return { likeTrue : data.user_has_liked, 'animated bounce' : data.effect.like };
    };

    $scope.initPost = function( data ){
        data.current_images = data.images.thumbnail;
        data.count_user_in_photo = data.users_in_photo.length;
        data.effect = { improveImage : false, like: false, comment: false };
        data.countDoubleClick = 0;
    };

    $scope.improveImage = function( data ){
        if( data.current_images != data.images.standard_resolution ){
            data.current_images = data.images.standard_resolution;
            effect( data.effect, 'improveImage' );
        }
    };

    $scope.likeImage = function( data ){
        if( data.user_has_liked ){
            data.user_has_liked = false;
            data.likes.count--;
        } else if( !data.user_has_liked ){
            data.user_has_liked = true;
            data.likes.count++;
            effect( data.effect, 'like' );
        }
    };

    $scope.doubleClickImage = function( data ){
        $timeout( function(){ data.countDoubleClick = 0; }, 500 );
        data.countDoubleClick++;
        if( data.countDoubleClick >= 2 )
            $scope.likeImage( data );
    };

    var effect = function( data, type ) {
        data[ type ] = true;
        $timeout( function(){ data[ type ] = false; }, 1000 );
    };
});