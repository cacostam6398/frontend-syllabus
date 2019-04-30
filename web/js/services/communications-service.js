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
            elemento: function (Ctrl, Url, success, error,Data) {
             
                var load = function () {                   
                        var envio = {};    
                        
                        
                        if (Data) {
                            envio = $http({ method: "GET", url: Url,headers: {'Content-Type': 'application/json' },  data: Data });
                        }
                        else{
                            envio = $http({ method: "GET", url: Url });
                        }
                        
                        envio.then(success,   function  () {                               
                            error();
                            }) ;                  
                }
                load();
            }
        }
    }
]);

IdentiApp.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs.compile);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
    );
  };
}]);