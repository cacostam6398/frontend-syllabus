
    
IdentiApp.controller("UnidadesController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {

    this.Lista = []
    this.InserJson= {};
    this.EditJson= {};
    this.jerarquiasCbo = [];
    
    this.myFilter = function (item) { 
        return item.eliminado === null;
    };

    this.cargarLista = function () {
      
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'token': $rootScope.token           
        }
        var url = $rootScope.baseUri + "/syllabus_ean/public/admin/l_unidad";
        var Ctrl = this;
        var success = function (json) {  
            Ctrl.Lista= json.data.jerarquias ;  
        };
        var error = function (resp) {
            console.log("Error: " + resp);
            // swal("info", 'Error en el servicio Listar', "info")
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }
    

    this.GetRecord = function(record){
        var Ctrl = this;  
        Ctrl.EditJson = record;
        jQuery('#myModalEdit').modal('show');
    }


    this.Add = function(){
        var Ctrl = this;  
        Ctrl.InserJson.correo = $rootScope.user.correo;
        Ctrl.InserJson.token = $rootScope.token;   
        var url = $rootScope.baseUri + "/syllabus_ean/public/admin/c_unidad";
     
        var success = function (json) {
            
            swal("info", 'Se creo Unidad', "success");         
            Ctrl.InserJson= {};
            Ctrl.cargarLista(); 
            $('#MyModal').modal('toggle');
  
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };  

        if (jQuery('form[id="formInsert"]').valid()) {  
            Enviar.elemento($scope, url, success, error,  Ctrl.InserJson);  
        }else {
            swal("info", 'Complete correctamente los campos', "info")
        }

    }

  
    this.Update = function(record){
        var Ctrl = this; 
        record.correo = $rootScope.user.correo;
        record.token = $rootScope.token;   
        var url = $rootScope.baseUri + "/syllabus_ean/public/admin/m_jerarquia";
     
        var success = function (json) {
            
            swal("info", 'Se guardaron los cambios', "success");         
            Ctrl.jerarquiaEditJson= {};
            Ctrl.cargarLista(); 
            $('#myModalEdit').modal('toggle');
  
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };  

        if (jQuery('form[id="formJerarquiaEdit"]').valid()) {  
            Enviar.elemento($scope, url, success, error,  record);  
        }else {
            swal("info", 'Complete correctamente los campos', "info")
        }


    }


    this.Delete = function(IdRecord){

        var Ctrl = this; 
        var jsonEnvio = {}
        jsonEnvio.correo = $rootScope.user.correo;
        jsonEnvio.token = $rootScope.token;   
        jsonEnvio.idJerarquia = IdRecord;

        var url = $rootScope.baseUri + "/syllabus_ean/public/admin/b_jerarquia";     
        var success = function (json) {            
            swal("info", 'Se elimino el registro', "success");     
            Ctrl.cargarLista();  
        };
        var error = function (resp) {    
            console.log(resp)                  
            swal("info", 'Error en el servicio', "info")
        };   

        swal({
            title: "Desea eliminar el registro Id: " + IdRecord,
            text: "",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
          }, function () {
            Enviar.elemento($scope, url, success, error,  jsonEnvio);    
          });
           
    }


    this.cargarJerarquias = function () {        
        var jsonEnvio = {
            'correo': $rootScope.user.correo,
            'token': $rootScope.token           
        }
        var url = $rootScope.baseUri + "/syllabus_ean/public/admin/l_jerarquia";
        var Ctrl = this;
        var success = function (json) {            
            Ctrl.jerarquiasCbo = json.data.jerarquias ;  
         
        };
        var error = function (resp) {
            console.log("Error: " + resp);
            // swal("info", 'Error en el servicio Listar', "info")
        };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

        
       
    }

  
    this.cargarLista();  
    setTimeout(function(){      
        jQuery('#datable_1').DataTable();        
    },100);
    

    
    jQuery('form[id="formInsert"]').validate({ 
        rules: {
           
            inputNombre: {
                required: true         
            },
            inputCodSap: {
                required: true
                // minlength: 5
            },
            inputTipo: {
                required: true
                // minlength: 5
            }   ,
            inputNivel: {
                required: true
                // minlength: 5
            }   ,
            inputCreditos: {
                required: true
                // minlength: 5
            } ,
            inputJerSup:{
                required: true
                // minlength: 5
            } ,
            inputJusti:{
                required: true
                // minlength: 5
            } 
        },        
        submitHandler: function (form) {   
            return false; 
        }
    });

    jQuery('form[id="formEdit"]').validate({ 
        rules: {
           
            inputNombre: {
                required: true         
            },
            inputCodSap: {
                required: true
                // minlength: 5
            },
            inputTipo: {
                required: true
                // minlength: 5
            }   ,
            inputNivel: {
                required: true
                // minlength: 5
            }   ,
            inputCreditos: {
                required: true
                // minlength: 5
            } ,
            inputJerSup:{
                required: true
                // minlength: 5
            } ,
            inputJusti:{
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