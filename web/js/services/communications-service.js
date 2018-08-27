IdentiApp.factory('Cargar', ['$http', '$rootScope',
    function ($http, $rootScope) {
        return {
            elemento: function (Ctrl, Url, success, error) {

                var tries = 0;
                var load = function () {   

                        var envio = {};
                        envio = $http({ method: "POST", url: Url });
                        envio.then(success,function onError() {
                            error();
                        })  ;   
                }
                load();
            }
        }
    }
]);


IdentiApp.factory('Enviar', ['$http', '$rootScope',
    function ($http, $rootScope) {
        return {
            elemento: function (Ctrl, Url, success, error, Data) {
               
                var load = function () {
                  
                        var envio = {};

                        if (Data) {
                            envio = $http({ method: "POST", url: Url,headers: {'Content-Type': 'application/json' } , data: Data });
                        }
                        else{
                            envio = $http({ method: "POST",headers: {'Content-Type': 'application/json' }, url: Url });
                        }

                        envio.then(success,error )                
                }

                load();

            }

        }
    }
]);

IdentiApp.factory('Recibir', ['$http', '$rootScope',
    function ($http, $rootScope) {
        return {
            elemento: function (Ctrl, Url, success, error) {

                var tries = 0;
                var load = function () {
                    setTimeout(function () {
                        var envio = {};


                        envio = $http({ method: "GET", url: Url });
                        envio.then(success,   function  () {                               
                            error();
                            }) ; 
                    }, 100);
                }
                load();
            }
        }
    }
]);