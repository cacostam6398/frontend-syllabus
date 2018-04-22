
    IdentiApp.controller("MainController", ['$scope', '$location', '$rootScope', '$modal', 'Enviar','$filter',
	function ($scope, $location, $rootScope, $modal, Enviar,$filter) {




    this.cerrarSesion = function () {       

        $location.url("/login");
    }

    this.estadoSesion = function () {

       
        if (sessionStorage.user) {
            $rootScope.numProductosCarrito = 0;
            $rootScope.productosCotizar = [];
            $rootScope.user = JSON.parse(sessionStorage.user);  

            console.log($rootScope.user)
        } else {

            $location.url("/login");
        }

    }
    

    this.IdleConfiguracion = function () {
        $scope.started = false;

        function closeModals() {
            if ($scope.warning) {
                console.log("cerrar modals");
                $scope.warning.close();
                $scope.warning = null;
            }

            if ($scope.timedout) {
                $scope.timedout.close();
                $scope.timedout = null;
            }
        }
        $scope.$on('IdleStart', function () {
            closeModals();

            $scope.warning = $modal.open({
                templateUrl: 'warning-dialog.html',
                size: 'sm'
            });
        });
        $scope.$on('IdleEnd', function () {
            closeModals();
        });
        $scope.$on('IdleTimeout', function () {
            $location.url("/login");
            $location.replace();
            closeModals();
            $scope.timedout = $modal.open({
                templateUrl: 'timedout-dialog.html',
                size: 'sm'
            });
        });
        $scope.start = function () {
            closeModals();
            Idle.watch();
            $scope.started = true;
        };
        $scope.stop = function () {
            closeModals();
            Idle.unwatch();
            $scope.started = false;

        };
    };


    this.estadoSesion();

}]);