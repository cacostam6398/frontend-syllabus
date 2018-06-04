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
            console.log(Ctrl.ListMatProgramas)
        };
        var error = function (resp) { console.log("Error: " + resp); jQuery(".progress").hide(); };        
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }



    this.ObtProgramasByPrograma = function(idPrograma){

        
        var Ctrl = this;
        Ctrl.ListMatSelect = this.ListMatProgramas.filter(function(mat){

            
            if(mat.programa.id_programa == idPrograma ){
                console.log(mat.programa.id_programa);
                return true; 
            }else{
               
                return false;
            }


        });
        

         
      
    }

    this.cargarCombos(); 
    funcionalidadWiz();
   

}]);