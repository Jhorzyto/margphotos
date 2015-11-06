<?php

require_once './src/Instagram.php';
require_once './src/Sessao.php';
require_once './constantes.php';

use MetzWeb\Instagram\Instagram;

$instagram = new Instagram([ 'apiKey'      => apiKey,
                             'apiSecret'   => apiSecret,
                             'apiCallback' => apiCallback, ]);

$sess = Sessao::instanciar();
$url = "./../";

try {
    $logado = $sess->existe('instagram_data');

    if( isset( $_GET['error'] ) && isset( $_GET['error_description'] ))
        throw new Exception( $_GET['error_description'] );

    if( !$logado && isset( $_GET['code'] ) )
        $sess->set( 'instagram_data', $instagram->getOAuthToken( $_GET['code'] ) );

    header("location:{$url}");

} catch ( Exception $e ){
    header("location:{$url}");
}