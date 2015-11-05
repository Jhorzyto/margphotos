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

    if( $logado && isset( $_GET['feed'] ) ){

        $instagram->setAccessToken( $sess->get( 'instagram_data' ) );
        $data = is_numeric( $_GET['feed'] ) ? $instagram->getUserFeed( (int) $_GET['feed'] ) : $instagram->getUserFeed( 50 );

        echo json_encode( [ "error" => false, "login" => false, "data" => $data ]);

    } else {
        echo json_encode( [ "error" => false,
                            "login" => !$logado,
                            "data"  => !$logado ? $instagram->getLoginUrl() : $sess->get( 'instagram_data' )->user ]);
    }

} catch ( Exception $e ){
    $sess->destroy('instagram_data');
    echo json_encode([ "error" => true , "login" => false, "error_description" => $e->getMessage() ]);
}

