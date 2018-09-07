
    IdentiApp.controller("MainController", ['$scope', '$location', '$rootScope', 'Enviar','$filter',
	function ($scope, $location, $rootScope,  Enviar,$filter) {




    this.cerrarSesion = function () {       

        $location.url("/login");
    }

 

 

}]);