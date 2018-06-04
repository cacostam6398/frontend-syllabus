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
    $rootScope.dataSyllabus={}
    this.contCreate1 = true;

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
            
                var jsonEnvio =  { 'id_usuario': $rootScope.user.id_usuario, 'token': $rootScope.token, "id_materia":data.materia, "correo": $rootScope.user.correo,"observacion":"P"}
                var url =  $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/crearsyl";
                
                var success = function (json) {
                    swal("info", 'cabecera creada', "success");                  
                    Ctrl.contCreate1 = false;
                    console.log(json)
                };
                var error = function (resp) { console.log("Error: " + resp);Ctrl.contCreate1 = true; swal("info", 'Error en el servicio', "info")};        
                Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
            }else{
                Ctrl.contCreate1 = true;
                swal("info", 'Completar informacion', "info");

            }
        }else{
            Ctrl.contCreate1 = true;
            swal("info", 'Completar informacion', "info");

        }
    }

    

    this.cargarCombos(); 
    funcionalidadWiz();
   

}]);