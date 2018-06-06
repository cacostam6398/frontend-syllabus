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

    $rootScope.dataSyllabus.competenciasEsp = {                
        A: "",
        B: "",
        C: "",
        D: "",
        E: ""
     }

     $rootScope.dataSyllabus.competenciasTra = {                
        EM: "",
        SH: "",
        IN: "",
        CO: "",
        TE: ""
     }

     this.CompetenciasInputs = {                
        A : false,
        B : false,
        C : false,
        D : false,
        E : false ,
        EM : false ,
        SH : false ,
        IN : false ,
        CO : false ,
        TE : false        
    }


    this.contCreate1 = false;
    this.BtnGuardar1 = false;

    this.contCreate2 = false;
    this.BtnGuardar2 = false;

    this.contCreate3 = false;
    this.BtnGuardar3 = false;

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
            Ctrl.contCreate2 = true;
            Ctrl.BtnGuardar2 = false;

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

    this.ValidarCamposCompeSyllabus = function(){

        var Ctrl = this;
        let objEnv =  $rootScope.dataSyllabus.competenciasEsp ;
        let objEnv2 =  $rootScope.dataSyllabus.competenciasTra ;
        let jsonEnvio = {};
        let jsonComp = []
       
        

     
        if (    objEnv.A  == "" ||                
                objEnv2.EM == ""||
                objEnv2.SH == ""
                // objEnv2.IN == ""||
                // objEnv2.CO == ""||
                // objEnv2.TE == ""
            ){

                swal("info", 'Completar informacion', "info");
                Ctrl.contCreate3 = true;
                Ctrl.BtnGuardar3 = false;

            }else{

            if (objEnv.B == "")
                delete $rootScope.dataSyllabus.competenciasEsp["B"];
    
            if (objEnv.C == "")
                delete $rootScope.dataSyllabus.competenciasEsp["C"];
    
            if (objEnv.D == "")
                delete $rootScope.dataSyllabus.competenciasEsp["D"];
    
            if (objEnv.E == "")
                delete $rootScope.dataSyllabus.competenciasEsp["E"];

            
            

                for (let i in  $rootScope.dataSyllabus.competenciasEsp) {
                
                    jsonComp.push({"clave": i , "contenido": $rootScope.dataSyllabus.competenciasEsp[i]})

                }
                      
                 jsonEnvio.correo = $rootScope.user.correo;
                 jsonEnvio.competencias =  jsonComp
                 jsonEnvio.token = $rootScope.token
    
                 Ctrl.CrearCompetenciasSyllabus(jsonEnvio);

            }

        


    }

    this.CrearCompetenciasSyllabus = function(data){     
     

        var jsonEnvio = data
        var url =  $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/crearcomp";
        var Ctrl = this;
        var success = function (json) {
            console.log(json)
            swal("info", 'Competencias creadas', "success");                  
            Ctrl.contCreate3 = false;
            Ctrl.BtnGuardar3 = true;
            Ctrl.desCamposCompetencias(1);
        };
        var error = function (resp) { console.log("Error: " + resp); swal("info", 'Error en el servicio', "info") };        
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    }

    this.desCamposCompetencias = function(code){
        var Ctrl = this;
        if(code == 1){

            Ctrl.CompetenciasInputs = {                
                A : true,
                B : true,
                C : true,
                D : true,
                E : true ,
                EM : true ,
                SH : true ,
                IN : true ,
                CO : true ,
                TE : true        
            }
        }else{
            Ctrl.CompetenciasInputs = {                
                A : false,
                B : false,
                C : false,
                D : false,
                E : false ,
                EM : false ,
                SH : false ,
                IN : false ,
                CO : false ,
                TE : false        
            }

        }


    }


    this.contadorSesiones = 0

    this.aperturaSesion = "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12'> 	<div class='panel panel-inverse panel-dropdown card-view'>"
    this.headerSesion =  "<div class='panel-heading'>	<div class='pull-left'>		<h6 class='panel-title txt-dark'>Sesion 1</h6>	</div>	<div class='pull-right'><div class='tab-struct custom-tab-1'>	<ul role='tablist' class='nav nav-tabs' id='myTabs_9'>	<li role='presentation'>	<a	target='_self' data-toggle='tab' role='tab'	id='profile_tab_9'	href='#profile_9' aria-expanded='false'>Act.aprendisaje</a>	</li>	<li role='presentation' class='active'>	<a	target='_self'	data-toggle='tab'	role='tab'	id='home_tab_9'	href='#home_9' aria-expanded='true'>Contenidos</a></li>	</ul></div>	</div><div class='clearfix'></div></div>"
    this.titulosCompetencias = "<div class='panel-wrapper collapse in'>	<div class='panel-body'>	<div class='tab-content' id='myTabContent_9'><div id='home_9' class='tab-pane fade active in' style='padding-top: 0px!important;' role='tabpanel'><div class='todo-box-wrap'><ul class='todo-list todo-box-nicescroll-bar'>	<div class='row' style='margin-left: 0PX;'>	<div class='col-md-2'><h6 class='panel-title txt-dark'>C.T.</h6></div><div class='col-md-2'><h6 class='panel-title txt-dark'>C.E.</h6></div></div><li class='todo-item'>"
    // this.competenciasSesion = "<div class='row'><div class='col-md-6'>	<div class='row' style='margin-bottom: 1%' ><div class='col-md-6'> <label class='btn btn-default btn-checkbox' style='background: white;'><input name='checkbox' type='checkbox' value='ant' style='display: none; ' autocomplete='false'/> <i style='margin-left: -11px;'>AN</i></label></div> <div class='col-md-6'><label class='btn btn-default btn-checkbox' style='background: white;'><input name='checkbox' type='checkbox' value='CO' style='display: none; ' autocomplete='false'/> <i style='margin-left: -11px;'>CO</i>	</label></div> </div></div>	<div class='col-md-6'><div class='row'><div class='col-md-12'><textarea class='form-control' rows='4' > fdgdfgdfg </textarea></div></div></div></div>			"
    this.competenciasSesion = "";    
    this.cierreCompetenciasSesion = "</li><li><hr class='light-grey-hr' /></li> </ul></div></div>   "
    this.actividadesSesion = "<div id='profile_9' class='tab-pane fade' role='tabpanel' style='padding-top: 0px!important;'><label class='control-label mb-10'>Digite	contenido</label><textarea class='form-control' rows='5'> </textarea></div>"
    this.cierreSesion = "</div></div></div></div></div>"

   
   
  

    this.armarCompetenciasHtml = function(){
        var Ctrl = this;
        Ctrl.competenciasSesion = "<div class='row'><div class='col-md-6'> "        

        let jsonCompTrans = $rootScope.dataSyllabus.competenciasTra;
        let jsonCompEspe  = $rootScope.dataSyllabus.competenciasEsp;
        let cont = 0
        
        for (let Z in jsonCompEspe) {

            for (let i in jsonCompTrans) { 

                let un = jsonCompTrans[cont]
                Ctrl.competenciasSesion =  Ctrl.competenciasSesion + "<div class='row' style='margin-bottom: 1%' ><div class='col-md-6'> <label class='btn btn-default btn-checkbox' style='background: white;'><input name='checkbox' type='checkbox' value='"+   jsonCompTrans[i] +"' style='display: none; ' autocomplete='false'/> <i style='margin-left: -11px;'>"+  i   +"</i></label></div> <div class='col-md-6'><label class='btn btn-default btn-checkbox' style='background: white;'><input name='checkbox' type='checkbox' value='"+ jsonCompTrans[Z]   +"' style='display: none; ' autocomplete='false'/> <i style='margin-left: -11px;'>"+ Z +"</i>	</label></div> </div>"
               
                cont+=1;
                break;
            }
            // jsonComp.push({"clave": i , "contenido": $rootScope.dataSyllabus.competenciasEsp[i]})

        }


        Ctrl.competenciasSesion = Ctrl.competenciasSesion  +  " </div>	<div class='col-md-6'><div class='row'><div class='col-md-12'><textarea class='form-control' rows='4' > fdgdfgdfg </textarea></div></div></div></div>"

        Ctrl.crearHtmlSesiones()
    }
  


    this.crearHtmlSesiones = function(){
        var Ctrl = this;

        $scope.htmlBind = Ctrl.aperturaSesion +  Ctrl.headerSesion +  Ctrl.titulosCompetencias + Ctrl.competenciasSesion + Ctrl.cierreCompetenciasSesion + Ctrl.actividadesSesion +  Ctrl.cierreSesion 

        $("#sesionesSyl").append($scope.htmlBind); 

    }




    setTimeout(function(){       
        $scope.cargarCompetenciasTransversales();
    },500)   
    this.cargarCombos(); 
    funcionalidadWiz();
    
   

}]);