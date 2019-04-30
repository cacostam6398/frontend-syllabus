
    IdentiApp.controller("MainController", ['$scope', '$location', '$rootScope', '$modal', 'Enviar','$filter',
	function ($scope, $location, $rootScope, $modal, Enviar,$filter) {

    $rootScope.PermisosOpt = 0	
    this.menuHtml= ""


   

    this.cargarOpcionesPermisos = function () {

        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'token': $rootScope.token
        }
        var url = $rootScope.baseUri + "/syllabus_ean/public/api/index/obt_permisos";
        var Ctrl = this;
        var success = function (json) {
            // Ctrl.ListSyllabus = json.data.Syllabus;
            $rootScope.PermisosOpt = json.data.permisos
            console.log(json)        
           
            Ctrl.menuHtml= Ctrl.ArmarMenuHtml($rootScope.PermisosOpt);
        };
        var error = function (resp) {
            console.log("Error: " + resp);          
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }


    this.ArmarMenuHtml = function(array) {
        
        var html = "<li class='col-md-3 col-xs-6 col-menu-list'>"
                    + "<a  target='_self' href='javascript:void(0);'><div class='pull-left'><i class='zmdi zmdi-landscape mr-20'></i><span class='right-nav-text'><b>Menu</b></span></div><div class='pull-right'><i class='zmdi zmdi-caret-down'></i></div><div class='clearfix'></div></a>"
                    + "	<hr class='light-grey-hr ma-0'/>"
                    +"<ul>"
        for (let index = 0; index < array.length; index++) {           

            html = html + "<li>" + array[index].descripcion  + "</li>"
            
        }    

         html = html + " </ul></li>"

         return html;
            
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


 
    this.cargarOpcionesPermisos();

}]);