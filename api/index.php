<?php

require_once './src/Instagram.php';
require_once './src/Sessao.php';
require_once './constantes.php';

use MetzWeb\Instagram\Instagram;

header('Content-Type: application/json');

$instagram = new Instagram([ 'apiKey'      => apiKey,
                             'apiSecret'   => apiSecret,
                             'apiCallback' => apiCallback, ]);

$sess = Sessao::instanciar();

try{

    if( isset( $_GET['logoff'] ))
        $sess->destroy('instagram_data');

    $logado = $sess->existe('instagram_data');

    if( $logado && isset( $_GET['feed'] ) ) {

        $instagram->setAccessToken($sess->get('instagram_data'));
        $data = is_numeric($_GET['feed']) ? $instagram->getUserFeed((int)$_GET['feed']) : $instagram->getUserFeed(50);

        if( isset( $data->pagination ) ){
            $paginacao = [ 'pagination' => $data->pagination ];
            $sess->set( 'instagram_paginacao', (object) $paginacao );
        }

        echo json_encode(["error" => false, "login" => false, "data" => $data]);

    }
    else if( $logado && isset( $_GET['paginacao'] ) && $sess->existe('instagram_paginacao')) {

        $instagram->setAccessToken($sess->get('instagram_data'));
        $data = is_numeric($_GET['paginacao']) ? $instagram->pagination($sess->get('instagram_paginacao'), (int)$_GET['paginacao']) : $instagram->pagination($sess->get('instagram_paginacao'), 50);

        if (isset($data->pagination)) {
            $paginacao = ['pagination' => $data->pagination];
            $sess->set('instagram_paginacao', (object)$paginacao);
        }

        echo json_encode(["error" => false, "login" => false, "data" => $data]);

    }
    else if( $logado && isset( $_GET['like'] ) ) {
        if( is_string($_GET['like']) ){
            $instagram->setAccessToken($sess->get('instagram_data'));
            $data = $instagram->likeMedia($_GET['like']);
            echo json_encode(["error" => false, "login" => false, "data" => $data]);
        } else
            echo json_encode(["error" => true, "login" => false, "data" => []]);

    }
    else if( $logado && isset( $_GET['unLike'] ) ) {
        if( is_string($_GET['unLike']) ){
            $instagram->setAccessToken($sess->get('instagram_data'));
            $data = $instagram->deleteLikedMedia($_GET['unLike']);
            echo json_encode(["error" => false, "login" => false, "data" => $data]);
        } else
            echo json_encode(["error" => true, "login" => false, "data" => []]);

    }
    else {
        echo json_encode( [ "error" => false,
                            "login" => !$logado,
                            "data"  => !$logado ? $instagram->getLoginUrl(['basic', 'likes', 'comments' ]) : $sess->get( 'instagram_data' )->user ]);
    }

} catch ( Exception $e ){
    $sess->destroy('instagram_data');
    echo json_encode([ "error" => true , "login" => false, "error_description" => $e->getMessage() ]);
}

