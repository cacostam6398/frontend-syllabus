$(function () {
    $('body').on('click', '.btn-checkbox', function (e) {
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

         ///////////////////Funcionalidad wizard/////////////////////////////
        var e = jQuery.Event("keypress");
        e.which = 13; //choose the one you want
        e.keyCode = 13;
        $("#theInputToTest").trigger(e);

        var funcionalidadWiz = function () {


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



        this.pdf = function (){

            var doc = new jsPDF('p', 'pt', 'a4');     
            var specialElementHandlers = {
                '#editor': function (element, renderer) {
                    return true;
                }
            };


            doc.fromHTML(document.getElementById('html-2-pdfwrapper'), 15, 15, {
                'width': 170,
                'elementHandlers': specialElementHandlers
               
            });

            var iframe = document.createElement('iframe');
            iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
            document.body.appendChild(iframe);            
            iframe.src = doc.output('datauristring');

            // var a =doc.output("datauri");
            // doc.save('sample-file.pdf');

        }

        function headerFooterFormatting(doc, totalPages)
        {
            for(var i = totalPages; i >= 1; i--)
            {
                doc.setPage(i);                            
                //header
                header(doc);
                
                footer(doc, i, totalPages);
                doc.page++;
            }
        };

        function header(doc)
        {
            doc.setFontSize(30);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            
            if (base64Img) {
            doc.addImage(base64Img, 'JPEG', margins.left, 10, 40,40);        
            }
                
            doc.text("Report Header Template", margins.left + 50, 40 );
            doc.setLineCap(2);
            doc.line(3, 70, margins.width + 43,70); // horizontal line
        };


        function footer(doc, pageNumber, totalPages){

            var str = "Page " + pageNumber + " of " + totalPages
        
            doc.setFontSize(10);
            doc.text(str, margins.left, doc.internal.pageSize.height - 20);
            
        };



        //////////////////////// variavles sistema
        this.busqueda = "";
        this.ListMatProgramas = [];
        this.ListMatSelect = [];   
        var Ctrl = this;
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();        
        this.jsonComboEM = []
        this.jsonComboSH = []
        this.jsonComboIN = []
        this.jsonComboCO = []
        this.jsonComboTE = []


        // variavles syllabus creacion
        $rootScope.dataSyllabus = {}
        $rootScope.dataSyllabus.detalle = {
            bibliografia: "",
            co_requisito: "",
            competencia_global: "",
            duracion: "",
            evaluacion: "",
            hrs_autonomas: "",
            hrs_directas: "",
            lengua: "",
            metodologia: "",
            modalidad: "",
            pr_lengua: "",
            pre_requisito: "",
            proposito: "",
            recursos: "",
            resumen: ""
        }

        this.detalleInputs = {
            bibliografia: false,
            co_requisito: false,
            competencia_global: false,
            duracion: false,
            evaluacion: false,
            hrs_autonomas: false,
            hrs_directas: false,
            lengua: false,
            metodologia: false,
            modalidad: false,
            pr_lengua: false,
            pre_requisito: false,
            proposito: false,
            recursos: false,
            resumen: false
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
            A: false,
            B: false,
            C: false,
            D: false,
            E: false,
            EM: false,
            SH: false,
            IN: false,
            CO: false,
            TE: false
        }


        this.contCreate1 = true;
        this.BtnGuardar1 = false;

        this.contCreate2 = true;
        this.BtnGuardar2 = false;

        this.contCreate3 = true;
        this.BtnGuardar3 = false;

        this.BtnGuardar4 = true;
        this.obserbtext = false;
        this.programaCmb = false;
        this.materiaCmb = false;
        this.addSession = false;
        // FINNN variavles syllabus creacion

  

         ////////////////////// Creacion cabecera ///////////////////////

        this.cargarCombos = function () {

            var jsonEnvio = {
                'id_usuario': $rootScope.user.id_usuario,
                'token': $rootScope.token
            }
            var url = $rootScope.baseUri + "/restapi-syllabusean/public/programas/obtmat";
            var Ctrl = this;
            var success = function (json) {
                Ctrl.ListMatProgramas = json.data.programas;
                // console.log(Ctrl.ListMatProgramas)
            };
            var error = function (resp) {
                console.log("Error: " + resp);
                jQuery(".progress").hide();
            };
            Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

        }



        this.ObtProgramasByPrograma = function (idPrograma) {
            var Ctrl = this;
            $rootScope.dataSyllabus.cabecera.codigoMateria = ''
            $rootScope.dataSyllabus.cabecera.facultad = ''
            $rootScope.dataSyllabus.cabecera.creditos = ''
            $rootScope.dataSyllabus.cabecera.tipo = ''
            $rootScope.dataSyllabus.cabecera.descripcionMateria = ''
            $rootScope.dataSyllabus.cabecera.materia = ""

            Ctrl.ListMatSelect = this.ListMatProgramas.filter(function (mat) {

                if (mat.programa.id_programa == idPrograma) {
                    return true;
                } else {
                    return false;
                }


            });




        }


        this.llenarCamposCabecera = function (idMateria) {
            var Ctrl = this;
            let idPrograma = $rootScope.dataSyllabus.cabecera.programa;
            let idMaterial = idMateria;

            if (idPrograma != "" && idMaterial != "") {
                var jsonPrograma = Ctrl.ListMatSelect[0].programa;
                var jsonMateria = Ctrl.ListMatSelect[0].materias.filter(function (mat) {
                    if (mat.id_materia == idMateria) {
                        return true;
                    } else {
                        return false;
                    }
                });

                $rootScope.dataSyllabus.cabecera.codigoMateria = jsonMateria[0].codigo
                $rootScope.dataSyllabus.cabecera.facultad = jsonPrograma.facultad
                $rootScope.dataSyllabus.cabecera.creditos = jsonMateria[0].creditos
                $rootScope.dataSyllabus.cabecera.tipo = jsonMateria[0].tipo
                $rootScope.dataSyllabus.cabecera.descripcionMateria = jsonMateria[0].descripcion

            } else {

                $rootScope.dataSyllabus.cabecera.codigoMateria = ''
                $rootScope.dataSyllabus.cabecera.facultad = ''
                $rootScope.dataSyllabus.cabecera.creditos = ''
                $rootScope.dataSyllabus.cabecera.tipo = ''
                $rootScope.dataSyllabus.cabecera.descripcionMateria = ''
                $rootScope.dataSyllabus.cabecera.materia = ""
            }



        }

        this.CrearCabeceraSyllabus = function () {
            var Ctrl = this;
            let data = $rootScope.dataSyllabus.cabecera
            if (typeof data != 'undefined') {
                if (data.materia != "" && data.programa != "") {

                    var jsonEnvio = {
                        'id_usuario': $rootScope.user.id_usuario,
                        'token': $rootScope.token,
                        "id_materia": data.materia,
                        "correo": $rootScope.user.correo,
                        "observacion": data.obsSyllabusCabecera
                    }
                    var url = $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/crearsyl";

                    var success = function (json) {
                        swal("info", 'cabecera creada', "success");
                        Ctrl.contCreate1 = false;
                        Ctrl.BtnGuardar1 = true;
                        Ctrl.obserbtext = true;
                        Ctrl.programaCmb = true;
                        Ctrl.materiaCmb = true;
                        $rootScope.dataSyllabus.IdSyllabus = json.data.syllabus
                    };
                    var error = function (resp) {
                        console.log("Error: " + resp);
                        Ctrl.contCreate1 = true;
                        Ctrl.BtnGuardar1 = false;
                        Ctrl.obserbtext = false;
                        swal("info", 'Error en el servicio', "info")
                    };
                    Enviar.elemento(Ctrl, url, success, error, jsonEnvio);
                } else {
                    Ctrl.contCreate1 = true;
                    Ctrl.BtnGuardar1 = false;
                    Ctrl.obserbtext = false;
                    Ctrl.programaCmb = false;
                    Ctrl.materiaCmb = false;
                    swal("info", 'Completar informacion', "info");

                }
            } else {
                Ctrl.contCreate1 = true;
                Ctrl.BtnGuardar1 = false;
                Ctrl.obserbtext = false;
                Ctrl.programaCmb = false;
                Ctrl.materiaCmb = false;
                swal("info", 'Completar informacion', "info");
            }
        }


        this.CreardetalleSyllabus = function (objEnv) {
            var jsonEnvio = objEnv
            var url = $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/creardet";
            var Ctrl = this;
            var success = function (json) {
                $rootScope.dataSyllabus.detalle.id_detalle = json.data.syllabus
                swal("info", 'Detalle creado', "success");
                Ctrl.contCreate2 = false;
                Ctrl.BtnGuardar2 = true;
                Ctrl.desCamposDetalle(1);
            };
            var error = function (resp) {
                console.log("Error: " + resp);
                swal("info", 'Error en el servicio', "info")
            };
            Enviar.elemento(Ctrl, url, success, error, jsonEnvio);



        }


        this.ValidarCamposDetalleSyllabus = function () {

            var Ctrl = this;
            let objEnv = $rootScope.dataSyllabus.detalle;

            if (objEnv.bibliografia == "" ||
                objEnv.bibliografia == "" ||
                objEnv.co_requisito == "" ||
                objEnv.competencia_global == "" ||
                objEnv.duracion == "" ||
                objEnv.evaluacion == "" ||
                objEnv.hrs_autonomas == "" ||
                objEnv.hrs_directas == "" ||
                objEnv.lengua == "" ||
                objEnv.metodologia == "" ||
                objEnv.modalidad == "" ||
                objEnv.pr_lengua == "" ||
                objEnv.pre_requisito == "" ||
                objEnv.proposito == "" ||
                objEnv.recursos == "" ||
                objEnv.resumen == ""
            ) {

                swal("info", 'Completar informacion', "info");
                Ctrl.contCreate2 = true;
                Ctrl.BtnGuardar2 = false;

            } else {

                objEnv.id_syllabus = $rootScope.dataSyllabus.IdSyllabus
                objEnv.correo = $rootScope.user.correo
                objEnv.token = $rootScope.token
                objEnv.observacion_version = 'Primera version Syllabus'

                Ctrl.CreardetalleSyllabus(objEnv);

            }

        }

        this.desCamposDetalle = function (code) {
            var Ctrl = this;
            if (code == 1) {

                Ctrl.detalleInputs = {
                    bibliografia: true,
                    co_requisito: true,
                    competencia_global: true,
                    duracion: true,
                    evaluacion: true,
                    hrs_autonomas: true,
                    hrs_directas: true,
                    lengua: true,
                    metodologia: true,
                    modalidad: true,
                    pr_lengua: true,
                    pre_requisito: true,
                    proposito: true,
                    recursos: true,
                    resumen: true
                }

            } else {

                Ctrl.detalleInputs = {
                    bibliografia: false,
                    co_requisito: false,
                    competencia_global: false,
                    duracion: false,
                    evaluacion: false,
                    hrs_autonomas: false,
                    hrs_directas: false,
                    lengua: false,
                    metodologia: false,
                    modalidad: false,
                    pr_lengua: false,
                    pre_requisito: false,
                    proposito: false,
                    recursos: false,
                    resumen: false
                }

            }


        }


        ////////////////////// Creacion competencias ///////////////////////

        function checkEM(mat) {
            if (mat.clave == "EM") {
                return true;
            } else {
                return false;
            }
        }

        function checkSH(mat) {
            if (mat.clave == "SH") {
                return true;
            } else {
                return false;
            }
        }

        function checkIN(mat) {
            if (mat.clave == "IN") {
                return true;
            } else {
                return false;
            }
        }

        function checkCO(mat) {
            if (mat.clave == "CO") {
                return true;
            } else {
                return false;
            }
        }

        function checkTE(mat) {
            if (mat.clave == "TE") {
                return true;
            } else {
                return false;
            }
        }

        $scope.cargarCompetenciasTransversales = function () {

            var jsonEnvio = {
                'id_usuario': $rootScope.user.id_usuario,
                'token': $rootScope.token
            }
            var url = $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/obtcompt";
            var Ctrl = this.WizCtrl;
            var success = function (json) {

                Ctrl.jsonComboEM = json.data.syllabus.filter(checkEM);
                Ctrl.jsonComboSH = json.data.syllabus.filter(checkSH);
                Ctrl.jsonComboIN = json.data.syllabus.filter(checkIN);
                Ctrl.jsonComboCO = json.data.syllabus.filter(checkCO);
                Ctrl.jsonComboTE = json.data.syllabus.filter(checkTE);

            };
            var error = function (resp) {
                console.log("Error: " + resp);
                jQuery(".progress").hide();
            };
            Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

        }

        this.ValidarCamposCompeSyllabus = function () {

            var Ctrl = this;
            let objEnv = $rootScope.dataSyllabus.competenciasEsp;
            let objEnv2 = $rootScope.dataSyllabus.competenciasTra;
            let jsonEnvio = {};
            let jsonComp = []




            if (objEnv.A == "" ||
                objEnv2.EM == "" ||
                objEnv2.SH == ""
                // objEnv2.IN == ""||
                // objEnv2.CO == ""||
                // objEnv2.TE == ""
            ) {

                swal("info", 'Completar informacion', "info");
                Ctrl.contCreate3 = true;
                Ctrl.BtnGuardar3 = false;

            } else {

                // if (objEnv.B == "")
                //     delete $rootScope.dataSyllabus.competenciasEsp["B"];

                // if (objEnv.C == "")
                //     delete $rootScope.dataSyllabus.competenciasEsp["C"];

                // if (objEnv.D == "")
                //     delete $rootScope.dataSyllabus.competenciasEsp["D"];

                // if (objEnv.E == "")
                //     delete $rootScope.dataSyllabus.competenciasEsp["E"];




                for (let i in $rootScope.dataSyllabus.competenciasEsp) {

                    jsonComp.push({
                        "clave": i,
                        "contenido": $rootScope.dataSyllabus.competenciasEsp[i]
                    })

                }

                jsonEnvio.correo = $rootScope.user.correo;
                jsonEnvio.competencias = jsonComp
                jsonEnvio.token = $rootScope.token

                Ctrl.CrearCompetenciasSyllabus(jsonEnvio);

            }




        }

        this.CrearCompetenciasSyllabus = function (data) {


            var jsonEnvio = data
            var url = $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/crearcomp";
            var Ctrl = this;
            var success = function (json) {
                console.log(json)
                $rootScope.dataSyllabus.competenciasEsp2 = json.data.competencias
                swal("info", 'Competencias creadas', "success");
                Ctrl.contCreate3 = false;
                Ctrl.BtnGuardar3 = true;
                Ctrl.desCamposCompetencias(1);
            };
            var error = function (resp) {
                console.log("Error: " + resp);
                swal("info", 'Error en el servicio', "info")
            };
            Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

        }

        this.desCamposCompetencias = function (code) {
            var Ctrl = this;
            if (code == 1) {

                Ctrl.CompetenciasInputs = {
                    A: true,
                    B: true,
                    C: true,
                    D: true,
                    E: true,
                    EM: true,
                    SH: true,
                    IN: true,
                    CO: true,
                    TE: true
                }
            } else {
                Ctrl.CompetenciasInputs = {
                    A: false,
                    B: false,
                    C: false,
                    D: false,
                    E: false,
                    EM: false,
                    SH: false,
                    IN: false,
                    CO: false,
                    TE: false
                }

            }


        }


        ////////////////////// Creacion De Sesiones ///////////////////////

        this.contadorSesiones = 0
        this.aperturaSesion = "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12'> 	<div class='panel panel-inverse panel-dropdown card-view'>"
        this.titulosCompetencias = "";
        this.headerSesion = "";
        this.competenciasSesion = "";
        this.cierreCompetenciasSesion = "</li><li><hr class='light-grey-hr' /></li> </ul></div></div>   "
        this.actividadesSesion = ""
        this.cierreSesion = "";
        this.contadorSesionesCreadas = 1



        this.armarCompetenciasHtml = function () {
            var Ctrl = this;
            Ctrl.addSession = true;
            Ctrl.cierreSesion = "</div></div>   <button type='button' id='comp" + Ctrl.contadorSesionesCreadas + "' onclick=''  class='btn btn-success btn-block  btn-anim'><i class='fa fa-floppy-o'></i><span class='btn-text'>Guardar Sesion</span></button>   </div></div></div>"
            Ctrl.competenciasSesion = "<div class='row'><div class='col-md-6' id='sesi" + Ctrl.contadorSesionesCreadas + "'> "
            let jsonCompTrans = $rootScope.dataSyllabus.competenciasTra;
            let cont = 0

            for (let i in jsonCompTrans) {

                let resp = buscarEspecifica(cont);
                Ctrl.competenciasSesion = Ctrl.competenciasSesion + "<div class='row' style='margin-bottom: 1%' ><div class='col-md-4'> <label class='btn btn-default btn-checkbox' style='background: white;'><input name='checkbox" + Ctrl.contadorSesionesCreadas + "'  type='checkbox' id='" + jsonCompTrans[i] + "-" + Ctrl.contadorSesionesCreadas + "' value='" + jsonCompTrans[i] + "' style='display: none; ' autocomplete='false'/> <i style='margin-left: -11px;'>" + i + "</i></label></div> <div class='col-md-6'><label class='btn btn-default btn-checkbox' style='background: white;'><input name='checkbox" + Ctrl.contadorSesionesCreadas + "' type='checkbox' value='" + resp.valor + "' style='display: none; ' autocomplete='false'/> <i style='margin-left: -11px;'>" + resp.clave + "</i>	</label></div> </div>"
                cont += 1
            }
            Ctrl.competenciasSesion = Ctrl.competenciasSesion + " </div>	<div class='col-md-6'><div class='row'><div class='col-md-12'><textarea id='contenidos" + Ctrl.contadorSesionesCreadas + "' class='form-control' rows='6' >  </textarea></div></div></div></div>"
            Ctrl.headerSesion = "<div class='panel-heading'>	<div class='pull-left'>		<h6 class='panel-title txt-dark'>Sesion " + Ctrl.contadorSesionesCreadas + "</h6>	</div>	<div class='pull-right'><div class='tab-struct custom-tab-1'>	<ul role='tablist' class='nav nav-tabs' id='myTabs_9'>	<li role='presentation'>	<a	target='_self' data-toggle='tab' role='tab'	id='profile_tab_9" + Ctrl.contadorSesionesCreadas + "'	href='#profile_9" + Ctrl.contadorSesionesCreadas + "' aria-expanded='false'>Act.aprendisaje</a>	</li>	<li role='presentation' class='active'>	<a	target='_self'	data-toggle='tab'	role='tab'	id='home_tab_9" + Ctrl.contadorSesionesCreadas + "'	href='#home_9" + Ctrl.contadorSesionesCreadas + "' aria-expanded='true'>Contenidos</a></li>	</ul></div>	</div><div class='clearfix'></div></div>"
            Ctrl.actividadesSesion = "<div id='profile_9" + Ctrl.contadorSesionesCreadas + "' class='tab-pane fade' role='tabpanel' style='padding-top: 0px!important;'><label class='control-label mb-10'>Digite	contenido</label><textarea id='act_aprendizaje" + Ctrl.contadorSesionesCreadas + "' class='form-control' rows='5'> </textarea></div>"

            Ctrl.titulosCompetencias = "<div class='panel-wrapper collapse in'>	<div class='panel-body'>	<div class='tab-content' id='myTabContent_9" + Ctrl.contadorSesionesCreadas + "'><div id='home_9" + Ctrl.contadorSesionesCreadas + "' class='tab-pane fade active in' style='padding-top: 0px!important;' role='tabpanel'><div class='todo-box-wrap'><ul class='todo-list todo-box-nicescroll-bar'>	<div class='row' style='margin-left: 0PX;'>	<div class='col-md-2'><h6 class='panel-title txt-dark'>C.T.</h6></div><div class='col-md-2'><h6 class='panel-title txt-dark'>C.E.</h6></div></div><li class='todo-item'>"

            Ctrl.crearHtmlSesiones(Ctrl.contadorSesionesCreadas);
            Ctrl.contadorSesionesCreadas += 1
        }

        function buscarEspecifica(numCiclo) {

            let jsonCompEspe = $rootScope.dataSyllabus.competenciasEsp2;
            var envio = {}
            envio = {
                clave: jsonCompEspe[numCiclo].clave,
                valor: jsonCompEspe[numCiclo].id_competencia
            }

            return envio

        }



        this.crearHtmlSesiones = function (idDiv) {
            var Ctrl = this;

            $scope.htmlBind = Ctrl.aperturaSesion + Ctrl.headerSesion + Ctrl.titulosCompetencias + Ctrl.competenciasSesion + Ctrl.cierreCompetenciasSesion + Ctrl.actividadesSesion + Ctrl.cierreSesion
            $("#sesionesSyl").append($scope.htmlBind);

            document.getElementById("comp" + idDiv).onclick = function () {

                alert("comp" + idDiv);
                if (idDiv == 1) {
                    Ctrl.BtnGuardar4 = false
                }
                var jsonEnvio = {}
                jsonEnvio.correo = $rootScope.user.correo;
                jsonEnvio.token = $rootScope.token;
                jsonEnvio.contenidos = jQuery("#contenidos" + idDiv).val();
                jsonEnvio.act_aprendizaje = jQuery("#act_aprendizaje" + idDiv).val();
                jsonEnvio.numero = idDiv;
                jsonEnvio.id_detalle = $rootScope.dataSyllabus.detalle.id_detalle;
                jsonEnvio.competencias = []
                $('input[name="checkbox1"]:checked').each(function () {
                    jsonEnvio.competencias.push({
                        id_competencia: this.value
                    })
                });
                console.log('$rootScope.dataSyllabus')
                console.log($rootScope.dataSyllabus)
                console.log(jsonEnvio)

                Ctrl.CrearSesionSyllabus(jsonEnvio);

            }


        }


        this.CrearSesionSyllabus = function (data) {

            var jsonEnvio = data
            var url = $rootScope.baseUri + "/restapi-syllabusean/public/syllabus/crearses";
            var Ctrl = this;
            var success = function (json) {
                console.log(json)
                swal("info", 'Sesion creadas', "success");
                Ctrl.addSession = false;
                Ctrl.desCamposSesiones(data.numero);
            };
            var error = function (resp) {
                console.log("Error: " + resp);
                swal("info", 'Error en el servicio', "info")
            };
            Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

        }


        this.desCamposSesiones = function (idSession) {


            $("#contenidos" + idSession).prop('disabled', true);
            $("#act_aprendizaje" + idSession).prop('disabled', true);
            $("#comp" + idSession).prop('disabled', true);

        }

        setTimeout(function () {
            $scope.cargarCompetenciasTransversales();
        }, 500)
        this.cargarCombos();
        funcionalidadWiz();



    }
]);