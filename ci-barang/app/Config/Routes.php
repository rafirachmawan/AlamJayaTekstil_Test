<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// API BARANG
$routes->group('api', function($routes) {

    // 🔥 WAJIB: HANDLE PREFLIGHT (INI YANG KURANG)
    $routes->options('(:any)', function () {
        return response()->setStatusCode(200);
    });

    $routes->get('barang', 'Api\Barang::index');
    $routes->post('barang', 'Api\Barang::create');
    $routes->put('barang/(:num)', 'Api\Barang::update/$1');
    $routes->delete('barang/(:num)', 'Api\Barang::delete/$1');

    // QR CODE
    $routes->get('barang/qr/(:num)', 'Api\Barang::qr/$1');
});