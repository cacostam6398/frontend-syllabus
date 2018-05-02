IdentiApp.factory('Cargar', ['$http', '$rootScope',
    function ($http, $rootScope) {
        return {
            elemento: function (Ctrl, Url, success, error) {

                var tries = 0;
                var load = function () {
                    setTimeout(function () {
                        var envio = {};


                        envio = $http({ method: "POST", url: Url });
                        envio.success(success);
                        envio.error(
                            function () {
                                if (tries < 1) {
                                    console.log("Intento de carga " + (tries + 1) + " de 3");
                                    tries++;
                                    setTimeout(load, 500);
                                }
                                else
                                    error();
                            }
                        );
                    }, 100);
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

                var tries = 0;
                var load = function () {
                    setTimeout(function () {
                        var envio = {};

                        if (Data) {
                            envio = $http({ method: "POST", url: Url, data: Data });
                        }
                        else
                            envio = $http({ method: "POST", url: Url, data: Data });
                        envio.success(success);
                        envio.error(
                            function () {
                                if (tries < 1) {
                                    console.log("Intento de carga " + (tries + 1) + " de 3");
                                    tries++;
                                    setTimeout(load, 500);
                                }
                                else
                                    error();
                            }
                        );
                    }, 100);
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
                        envio.then(success,   function () {                               
                            error();
                            }) ; 
                    }, 100);
                }
                load();
            }
        }
    }
]);