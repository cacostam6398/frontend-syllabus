$(function() {
    $('body').on('click','.btn-checkbox',function(e) {
        e.stopPropagation();
        e.preventDefault();
        var $checkbox = $(this).find(':input[type=checkbox]');
        if ($checkbox.length) {
            var $icon = $(this).find('[data-icon-on]');
            if ($checkbox.is(':checked')) {
                unchecked($checkbox);
            } else {
                checked($checkbox);
            }
            return;
        }
  
    });
});

function checked($input) {
    var $button = $input.closest('.btn');  
    $button.addClass('active2');
    $input.prop('checked', true); 
   
}

function unchecked($input) {
    var $button = $input.closest('.btn');   
    $button.removeClass('active2');
    $input.prop('checked', false); 
   
}

IdentiApp.controller("WizardCreacionSyllabus", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
       function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {
   
    this.busqueda = "";
    this.ListMatProgramas = [];
    this.ListMatSelect = [];
    this.newdata = {}
    this.cargaModal = {};    
    var Ctrl = this;
    this.currentDate = new Date();
    this.currentYear =  this.currentDate.getFullYear();

    // variavles syllabus creacion

    $rootScope.dataSyllabus={}
    $rootScope.dataSyllabus.detalle = {                
        bibliografia : "",
        co_requisito : "",
        competencia_global : "",
        duracion : "",
        evaluacion : "",
        hrs_autonomas : "",
        hrs_directas : "",
        lengua : "",
        metodologia : "" ,
        modalidad : "",
        pr_lengua : "",
        pre_requisito : "",
        proposito : "",
        recursos : "",
        resumen : ""
    }

    this.detalleInputs = {                
        bibliografia : false,
        co_requisito : false,
        competencia_global : false,
        duracion : false,
        evaluacion : false ,
        hrs_autonomas : false ,
        hrs_directas : false ,
        lengua : false ,
        metodologia : false ,
        modalidad : false ,
        pr_lengua : false ,
        pre_requisito : false ,
        proposito : false ,
        recursos : false ,
        resumen :false
    }


    this.contCreate1 = false;
    this.BtnGuardar1 = false;

    this.contCreate2 = false;
    this.BtnGuardar2 = false;

    this.obserbtext = false;
    this.programaCmb = false;
    this.materiaCmb = false;


   // FINNN variavles syllabus creacion

   this.jsonComboEM = []
   this.jsonComboSH = []
   this.jsonComboIN = []
   this.jsonComboCO = []
   this.jsonComboTE = []



    var e = jQuery.Event("keypress");
    e.which = 13; //choose the one you want
    e.keyCode = 13;
    $("#theInputToTest").trigger(e);


    var funcionalidadWiz = function(){

    
            //Initialize tooltips
            $('.nav-tabs > li a[title]').tooltip();
            
            //Wizard
            $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        
                var $target = $(e.target);
            
                if ($target.parent().hasClass('disabled')) {
                    return false;
                }
            });
        
            $(".next-step").click(function (e) {
        
                var active = $('.wizard .nav-tabs li.active');
                active.next().removeClass('disabled');
                nextTab(active);
        
            });
            $(".prev-step").click(function (e) {
        
                var active = $('.wizard .nav-tabs li.active');
                prevTab(active);
        
            });
    }
             

    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
    }
    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }
   
    
    this.cargarCombos = function(){

        var jsonEnvio = { 'id_usuario': $rootScope.user.id_usuario, 'token': $rootScope.token }
        var url =  $rootScope.baseUri + "/restapi-syllabusean/public/programas/obtmat";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListMatProgramas = json.data.programas;
            // console.log(Ctrl.ListMatProgramas)
        };
        var error = function (resp) { console.log("Error: " + resp); jQuery(".progress").hide(); };        
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }



    this.ObtProgramasByPrograma = function(idPrograma){
        var Ctrl = this;
           $rootScope.dataSyllabus.cabecera.codigoMateria = ''
            $rootScope.dataSyllabus.cabecera.facultad = ''
            $rootScope.dataSyllabus.cabecera.creditos = ''
            $rootScope.dataSyllabus.cabecera.tipo = ''
            $rootScope.dataSyllabus.cabecera.descripcionMateria = ''
            $rootScope.dataSyllabus.cabecera.materia = ""
        
        Ctrl.ListMatSelect = this.ListMatProgramas.filter(function(mat){
            
            if(mat.programa.id_programa == idPrograma ){                
                return true; 
            }else{               
                return false;
            }


        });
        

         
      
    }


    this.llenarCamposCabecera = function(idMateria){
        var Ctrl = this;
        let idPrograma = $rootScope.dataSyllabus.cabecera.programa;
        let idMaterial = idMateria ;
        
        if(idPrograma != "" && idMaterial != "" ){            
            var jsonPrograma = Ctrl.ListMatSelect[0].programa;
            var jsonMateria =  Ctrl.ListMatSelect[0].materias.filter(function(mat){
                if(mat.id_materia == idMateria ){                
                    return true; 
                }else{                   
                    return false;
                }       
            });

            $rootScope.dataSyllabus.cabecera.codigoMateria = jsonMateria[0].codigo
            $rootScope.dataSyllabus.cabecera.facultad = jsonPrograma.facultad
            $rootScope.dataSyllabus.cabecera.creditos = jsonMateria[0].creditos
            $rootScope.dataSyllabus.cabecera.tipo = jsonMateria[0].tipo
            $rootScope.dataSyllabus.cabecera.descripcionMateria = jsonMateria[0].descripcion

        }else{

            $rootScope.dataSyllabus.cabecera.codigoMateria = ''
            $rootScope.dataSyllabus.cabecera.facultad = ''
            $rootScope.dataSyllabus.cabecera.creditos = ''
            $rootScope.dataSyllabus.cabecera.tipo = ''
            $rootScope.dataSyllabus.cabecera.descripcionMateria = ''
            $rootScope.dataSyllabus.cabecera.materia = ""
        }

        

    }

    this.CrearCabeceraSyllabus = function(){
        var Ctrl = this;
        let data =  $rootScope.dataSyllabus.cabecera
        if( typeof data != 'undefined' ){
            if(data.materia != "" && data.programa != ""  ){  
            
                var jsonEnvio =  { 'id_usuario': $rootScope.user.id_usuario, 'token': $rootScope.token, "id_materia":data.materia, "correo": $rootScope.user.correo,"observacion":data.obsSyllabusCabecera}
                var url =  $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/crearsyl";
                
                var success = function (json) {
                    swal("info", 'cabecera creada', "success");                  
                    Ctrl.contCreate1 = false;
                    Ctrl.BtnGuardar1 = true;
                    Ctrl.obserbtext = true;
                    Ctrl.programaCmb = true;
                    Ctrl.materiaCmb = true;
                    $rootScope.dataSyllabus.IdSyllabus= json.data.syllabus                   
                };
                var error = function (resp) { console.log("Error: " + resp);Ctrl.contCreate1 = true; Ctrl.BtnGuardar1 = false; Ctrl.obserbtext = false;swal("info", 'Error en el servicio', "info")};        
                Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
            }else{
                Ctrl.contCreate1 = true;
                Ctrl.BtnGuardar1 = false;
                Ctrl.obserbtext = false;
                Ctrl.programaCmb= false;
                Ctrl.materiaCmb= false;
                swal("info", 'Completar informacion', "info");

            }
            }else{
                Ctrl.contCreate1 = true;
                Ctrl.BtnGuardar1 = false;
                Ctrl.obserbtext = false;
                Ctrl.programaCmb = false;
                Ctrl.materiaCmb = false;
                swal("info", 'Completar informacion', "info");
            }
    }


    this.CreardetalleSyllabus = function(objEnv){
        console.log(objEnv)
     

        var jsonEnvio = objEnv
        var url =  $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/creardet";
        var Ctrl = this;
        var success = function (json) {
            console.log(json)
            swal("info", 'Detalle creado', "success");                  
            Ctrl.contCreate2 = false;
            Ctrl.BtnGuardar2 = true;
            Ctrl.desCamposDetalle(1);
        };
        var error = function (resp) { console.log("Error: " + resp); swal("info", 'Error en el servicio', "info") };        
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);





    }

    
    this.ValidarCamposDetalleSyllabus = function(){

        var Ctrl = this;
        let objEnv =  $rootScope.dataSyllabus.detalle ;
        
         if (   objEnv.bibliografia == "" ||
                objEnv.bibliografia == "" ||
                objEnv.co_requisito == "" ||
                objEnv.competencia_global == "" ||
                objEnv.duracion == "" ||
                objEnv.evaluacion == "" ||
                objEnv.hrs_autonomas == "" ||
                objEnv.hrs_directas =="" ||
                objEnv.lengua == "" ||
                objEnv.metodologia == "" ||
                objEnv.modalidad == "" ||
                objEnv.pr_lengua =="" ||
                objEnv.pre_requisito == "" ||
                objEnv.proposito == "" ||
                objEnv.recursos == "" ||
                objEnv.resumen == ""        
        ){

            swal("info", 'Completar informacion', "info");
            Ctrl.contCreate1 = true;
            Ctrl.BtnGuardar1 = false;

        }else{

            objEnv.id_syllabus  = $rootScope.dataSyllabus.IdSyllabus
            objEnv.correo  = $rootScope.user.correo
            objEnv.token = $rootScope.token
            objEnv.observacion_version = 'Primera version Syllabus'

            Ctrl.CreardetalleSyllabus(objEnv);

        }        

    }

    this.desCamposDetalle = function(code){
        var Ctrl = this;
        if(code == 1){

            Ctrl.detalleInputs = {                
                bibliografia : true,
                co_requisito : true,
                competencia_global : true,
                duracion : true,
                evaluacion : true ,
                hrs_autonomas : true ,
                hrs_directas : true ,
                lengua : true ,
                metodologia : true ,
                modalidad : true ,
                pr_lengua : true ,
                pre_requisito : true ,
                proposito : true ,
                recursos : true ,
                resumen :true
            }

        }else{

            Ctrl.detalleInputs = {                
                bibliografia : false,
                co_requisito : false,
                competencia_global : false,
                duracion : false,
                evaluacion : false ,
                hrs_autonomas : false ,
                hrs_directas : false ,
                lengua : false ,
                metodologia : false ,
                modalidad : false ,
                pr_lengua : false ,
                pre_requisito : false ,
                proposito : false ,
                recursos : false ,
                resumen :false
            }        

        }


    }
    

    ////////////////////// Creacion competencias ///////////////////////

    function checkEM(mat) {
        if(mat.clave == "EM" ){                
            return true; 
        }else{               
            return false;
        }
    }

    function checkSH(mat) {
        if(mat.clave == "SH" ){                
            return true; 
        }else{               
            return false;
        }
    }

    function checkIN(mat) {
        if(mat.clave == "IN" ){                
            return true; 
        }else{               
            return false;
        }
    }

    function checkCO(mat) {
        if(mat.clave == "CO" ){                
            return true; 
        }else{               
            return false;
        }
    }

    function checkTE(mat) {
        if(mat.clave == "TE" ){                
            return true; 
        }else{               
            return false;
        }
    }

    $scope.cargarCompetenciasTransversales = function(){

        var jsonEnvio = { 'id_usuario': $rootScope.user.id_usuario, 'token': $rootScope.token }
        var url =  $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/obtcompt";
        var Ctrl = this.WizCtrl;
        var success = function (json) {           
            
             Ctrl.jsonComboEM = json.data.syllabus.filter(checkEM);
             Ctrl.jsonComboSH = json.data.syllabus.filter(checkSH);
             Ctrl.jsonComboIN = json.data.syllabus.filter(checkIN);
             Ctrl.jsonComboCO = json.data.syllabus.filter(checkCO);
             Ctrl.jsonComboTE = json.data.syllabus.filter(checkTE);

        };
        var error = function (resp) { console.log("Error: " + resp); jQuery(".progress").hide(); };        
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }


    setTimeout(function(){       
        $scope.cargarCompetenciasTransversales();
    },500)   
    this.cargarCombos(); 
    funcionalidadWiz();
    
   

}]);