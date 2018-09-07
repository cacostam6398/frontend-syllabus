'use strict';

var IdentiApp = angular.module('Identi', ['ngRoute', 'ui.bootstrap', 'ui.tree', 'ngAnimate', 'ui.bootstrap.datetimepicker', 'ngIdle']);





IdentiApp.run(function ($rootScope, $location, $http) {
    console.log('http://',location.host);
    $rootScope.baseUri = 'http://'+ location.host ;
   
    var storage;
    try {
        if (sessionStorage.getItem('user')) {
            if ($rootScope.user == null || typeof $rootScope.user == 'undefined') {
                $rootScope.user = JSON.parse(sessionStorage.user);
                $rootScope.token =  sessionStorage.token;
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
                    $rootScope.token = sessionStorage.token;
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
        .when('/home', { controller: 'HomeController', controllerAs: 'HmeCtrl', templateUrl: 'partials/home.html' })
        .when('/login', { controller: 'LoginController', templateUrl: 'partials/login.html' })
    
	    
        .otherwise({ redirectTo: '/login' });


}])