
    
IdentiApp.controller("JerarquiasController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {

    this.Lista = []
    this.jerarquiaJson= {};
    this.cargarLista = function () {
      
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'token': $rootScope.token           
        }
        var url = $rootScope.baseUri + "/syllabus_ean/public/admin/l_jerarquia";
        var Ctrl = this;
        var success = function (json) {
            
            json.jerarquias = Ctrl.jerarquias;

        };
        var error = function (resp) {
            console.log("Error: " + resp);
            // swal("info", 'Error en el servicio Listar', "info")
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

    
    this.Add = function(){
        var Ctrl = this;  
        Ctrl.jerarquiaJson.correo = $rootScope.user.correo;
        Ctrl.jerarquiaJson.token = $rootScope.token;   
        var url = $rootScope.baseUri + "/syllabus_ean/public/admin/c_jerarquia";
     
        var success = function (json) {
            
            swal("info", 'Se creo Empresa', "success");         
            Ctrl.jerarquiaJson= {};
            Ctrl.cargarLista(); 
            $('#myModal').modal('toggle');
  
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };  

        if (jQuery('form[id="formJerarquia"]').valid()) {  
            Enviar.elemento($scope, url, success, error,  Ctrl.jerarquiaJson);  
        }else {
            swal("info", 'Complete correctamente los campos', "info")
        }

    }

  
    this.cargarLista();   
    setTimeout(function(){
        jQuery('#datable_1').DataTable();
    },100)
    

    
    jQuery('form[id="formJerarquia"]').validate({ // initialize the plugin
        rules: {
           
            inputNombre: {
                required: true         
            },
            inputTipo: {
                required: true
                // minlength: 5
            },
            inputJerSup: {
                required: true
                // minlength: 5
            }   
        },        
        submitHandler: function (form) {   
            return false; 
        }
    });


   

}
]); 