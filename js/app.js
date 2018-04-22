'use strict';

var IdentiApp = angular.module('Identi', ['ngRoute', 'ui.bootstrap', 'ui.tree', 'ngAnimate', 'ui.bootstrap.datetimepicker', 'ngIdle']);

IdentiApp.run(function ($rootScope, $location, $http) {
    var storage;
    try {
        if (sessionStorage.getItem('user')) {
            if ($rootScope.user == null || typeof $rootScope.user == 'undefined') {
                $rootScope.user = JSON.parse(sessionStorage.user)
            } else {
                $location.url("/login");
            }
        } else {
            $location.url("/login");
        }
    } catch (e) {
        storage = {};
    }


    $rootScope.$on('$routeChangeSuccess', function () {

        try {
            if (sessionStorage.getItem('user')) {
                if ($rootScope.user != null || typeof $rootScope.user != 'undefined') {
                    $rootScope.user = JSON.parse(sessionStorage.user)
                } else {
                    $location.url("/login");
                }
            } else {
                $location.url("/login");
            }
        } catch (e) {
            storage = {};
        }
    })


})


IdentiApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 'IdleProvider', '$controllerProvider', '$provide',
	function ($routeProvider, $locationProvider, $httpProvider, IdleProvider, $controllerProvider, $provide) {
	    $routeProvider
        .when('/home', { controller: 'HomeController', controllerAs: 'HmeCtrl', templateUrl: 'website/partials/home.html' })
        .when('/login', { controller: 'LoginController', templateUrl: 'partials/login.html' })
        .when('/listaProductos', { controller: 'ListaProductosController', controllerAs: 'LsProCtrl', templateUrl: 'partials/listaProductos.html' })
        .when('/Pedidos', { controller: 'FacturasController', controllerAs: 'facCtrl', templateUrl: 'partials/facturas.html' })
        .when('/CarritoCompras', { controller: 'CotizacionsController', controllerAs: 'CotCtrl', templateUrl: 'partials/cotizacion.html' })

	    
        .otherwise({ redirectTo: '/login' });


}])