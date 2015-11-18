margPhotos.controller( 'HomeController', function ( $scope, CoreService, $timeout ) {

    CoreService.changeTitlePage("Inicio - MargPhotos");
    $scope.stopScrollFeed = true;

    CoreService.getInformation({ params: { feed: 10 }}, function( response ){
        CoreService.processResponse( response, function( data ){
            CoreService.validateLogin( data );
            $scope.feedData = data.data.data;
            $timeout( function(){ $scope.stopScrollFeed = false; }, 500 );
        });
    }, function( response ){
        CoreService.processResponse( response );
    });

    $scope.getFeedRemaining = function(){
        $scope.stopScrollFeed = true;
        CoreService.getInformation({ params: { paginacao: 10 }}, function( response ){
            CoreService.processResponse( response, function( data ){
                CoreService.validateLogin( data );
                $scope.feedData = $scope.feedData.concat( data.data.data );
                $timeout( function(){ $scope.stopScrollFeed = false; }, 500 );
            });
        }, function( response ){
            CoreService.processResponse( response );
        });
    };

    $scope.requestPagination = function( ) {
        if( !$scope.stopScrollFeed )
            $scope.getFeedRemaining();
    };

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
        data.infoPhotoTextBlock = true;
        data.imageLoaded = { status : false, error : false };
    };

    $scope.improveImage = function( data ){
        if( data.current_images != data.images.standard_resolution ){
            data.current_images = data.images.standard_resolution;
            effect( data.effect, 'improveImage' );
        }
    };

    $scope.likeImage = function( data ){
        if( data.user_has_liked ){
            data.user_has_liked = !data.user_has_liked;
            CoreService.getInformation({ params: { unLike: data.id }}, function( response ){
                CoreService.validateLogin( response.data );
                if( response.data.error || response.data.data.meta.code !== 200 )
                    data.user_has_liked = !data.user_has_liked;
                else
                    data.user_has_liked = !data.user_has_liked;
            }, function( response ){
                data.user_has_liked = !data.user_has_liked;
                CoreService.processResponse( response );
            });
        } else if( !data.user_has_liked ){
            data.user_has_liked = !data.user_has_liked;
            CoreService.getInformation({ params: { like: data.id }}, function( response ){
                CoreService.validateLogin( response.data );
                if( response.data.error || response.data.data.meta.code !== 200 )
                    data.user_has_liked = !data.user_has_liked;
                else
                    data.likes.count++;
            }, function( response ){
                data.user_has_liked = !data.user_has_liked;
                CoreService.processResponse( response );
            });
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