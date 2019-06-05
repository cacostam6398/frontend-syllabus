


IdentiApp.controller("HomeController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {
    $rootScope.SyllabusActual = 0	
    


    $rootScope.PermisosOpt = 0	
    $rootScope.menuHtml= ""
    $scope.CrearSyllabusOpt= false


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
            $rootScope.menuHtml= Ctrl.ArmarMenuHtml($rootScope.PermisosOpt);

            Ctrl.cargarListaSyllabus();
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
            if (array[index].idPermiso == 1) {
                $scope.CrearSyllabusOpt= true
            }
            
        }    

         html = html + " </ul></li>"

         return html;
            
    }


    $rootScope.GoCreacionSyllabus = function(){		
        $location.path('/CreacionSyllabus');
    }

    this.ListSyllabus = []

    this.cargarListaSyllabus = function () {

        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'token': $rootScope.token           
        }
        var url = $rootScope.baseUri + "/syllabus_ean/public/syl/l_syl";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListSyllabus = json.data.Syllabus;
        };
        var error = function (resp) {
            console.log("Error: " + resp);
            jQuery(".progress").hide();
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

    this.enviarInspeccionar = function(idSyl){
        
             $rootScope.SyllabusActual = idSyl
            $location.url("/MostrarSyllabus");
    
        }
    

        this.cargarOpcionesPermisos();


        

}
]); 