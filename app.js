'use strict';

var IdentiApp = angular.module('Identi', ['ngRoute', 'ui.bootstrap', 'ui.tree', 'ngAnimate', 'ui.bootstrap.datetimepicker', 'ngIdle']);

IdentiApp.constant('CONFIG', {   
    ROL_CURRENT_USER: 1
   })

   .constant('ROLES', {
    PROFESOR:  ['/home', '/CreacionSyllabus']        
}
)



IdentiApp.run(function ($rootScope, $location, $http, CONFIG, ROLES) {
    console.log('http://',location.host);
    $rootScope.baseUri = 'http://'+ location.host ;
    // console.log('permisos + rol')
    // console.log(ROLES)
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

    // $rootScope.$on('$routeChangeStart', function (event, next) 
    // {
    //                 console.log(next.$$route.originalPath)
    //             if (next.data !== undefined) 
    //             {
                    
    //                 next.data.authorized.forEach(function (elemento, indice, array) {
    //                     console.log(elemento, indice);
    //                 });

    //                 // if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1)
    //                 //     {
    //                 //     console.log("entra");
    //                 //     }  
    //             }
    // });

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


IdentiApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 'IdleProvider', '$controllerProvider', '$provide','CONFIG', 'ROLES',
	function ($routeProvider, $locationProvider, $httpProvider, IdleProvider, $controllerProvider, $provide,CONFIG, ROLES) {
	    $routeProvider
        .when('/home', { controller: 'HomeController', controllerAs: 'HmeCtrl', templateUrl: 'partials/home.html' , data: { authorized: [ROLES.PROFESOR]}})
        .when('/login', { controller: 'LoginController', templateUrl: 'partials/login.html' })
        .when('/detalleSyllabus', { controller: 'HistoriaSyllabusController', controllerAs: 'HstSCtrl', templateUrl: 'partials/historiaSyllabus.html' })
        .when('/CreacionSyllabus', { controller: 'WizardCreacionSyllabus', controllerAs: 'WizCtrl', templateUrl: 'partials/wizardCreacionSyllabus.html',data: {
                                     authorized: [ROLES.PROFESOR]}
             })            
        .when('/MostrarSyllabus', { controller: 'mostrarSyllabusController', controllerAs: 'MsylCtrl', templateUrl: 'partials/MostrarSyllabus.html' })
        .when('/Jerarquias', { controller: 'JerarquiasController', controllerAs: 'JrqCtrl', templateUrl: 'partials/Jerarquias.html' })
        .when('/Unidades', { controller: 'UnidadesController', controllerAs: 'UnidCtrl', templateUrl: 'partials/Unidades.html' })

	    
        .otherwise({ redirectTo: '/login' });


}])