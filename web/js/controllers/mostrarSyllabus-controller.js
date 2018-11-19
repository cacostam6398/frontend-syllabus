
    
IdentiApp.controller("mostrarSyllabusController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {

    alert($rootScope.SyllabusActual)
    this.ListSyllabus = []

    this.cargarListaSyllabus = function () {
       
        var jsonEnvio = {
            'id_usuario': $rootScope.user.id_usuario,
            'token': $rootScope.token,
            "id_syllabus": $rootScope.SyllabusActual
        }
        var url = $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/consultar";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListSyllabus.Syllabus = json.data.Syllabus;
            Ctrl.ListSyllabus.Detalle = json.data.Detalle;
            Ctrl.ListSyllabus.Sesiones = json.data.Sesiones;
            Ctrl.ListSyllabus.Competencias =    json.data.Sesiones;

        };
        var error = function (resp) {
            console.log("Error: " + resp);
            jQuery(".progress").hide();
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

    

     this.cargarListaSyllabus();

  



    // ng-href="#!/MostrarSyllabus"

}
]); 