﻿


IdentiApp.controller("HomeController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {
    $rootScope.SyllabusActual = 0	
    $rootScope.GoCreacionSyllabus = function(){		
        $location.path('/CreacionSyllabus');
    }

    this.ListSyllabus = []

    this.cargarListaSyllabus = function () {

        var jsonEnvio = {
            'id_usuario': $rootScope.user.id_usuario,
            'token': $rootScope.token
        }
        var url = $rootScope.baseUri + "/restapi-syllabusean/public/usuarios/listarsyl";
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
    
    this.cargarOpcionesPermisos = function () {

        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'token': $rootScope.token
        }
        var url = $rootScope.baseUri + "/syllabus_ean/public/api/index/obt_permisos";
        var Ctrl = this;
        var success = function (json) {
            // Ctrl.ListSyllabus = json.data.Syllabus;
            console.log(json)
        };
        var error = function (resp) {
            console.log("Error: " + resp);          
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

    //  this.cargarListaSyllabus();

    this.cargarOpcionesPermisos();
}
]); 