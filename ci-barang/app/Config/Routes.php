<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// 🔥 TAMBAHKAN INI
$routes->get('hash', 'Home::hash');

// API BARANG
$routes->group('api', function($routes) {

    // 🔥 PREFLIGHT (SUDAH BENAR)
    $routes->options('(:any)', function () {
        return response()->setStatusCode(200);
    });

    $routes->get('barang', 'Api\Barang::index');
    $routes->post('barang', 'Api\Barang::create');
    $routes->put('barang/(:num)', 'Api\Barang::update/$1');
    $routes->delete('barang/(:num)', 'Api\Barang::delete/$1');

    // QR CODE
    $routes->get('barang/qr/(:num)', 'Api\Barang::qr/$1');

   $routes->post('login', 'Api\Auth::login');
});