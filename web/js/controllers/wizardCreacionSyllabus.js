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
    var $icon = $button.find('[data-icon-on]');
    $button.addClass('active');
    $input.prop('checked', true);
    $icon.css('width',$icon.width());
    $icon.removeAttr('class').addClass($icon.data('icon-on'));
    $input.trigger('change');
}

function unchecked($input) {
    var $button = $input.closest('.btn');
    var $icon = $button.find('[data-icon-on]');
    $button.removeClass('active');
    $input.prop('checked', false);
    $icon.css('width',$icon.width());
    $icon.removeAttr('class').addClass($icon.data('icon-off'));
    $input.trigger('change');
}

IdentiApp.controller("WizardCreacionSyllabus", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
       function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {
   
    this.busqueda = "";
    this.ListFacturas = [];
    this.newdata = {}
    this.cargaModal = {};
    this.FacturaSeleccionada = [];
    this.preciototalfac = 0;
    var Ctrl = this;
    this.currentDate = new Date();
    this.currentYear =  this.currentDate.getFullYear();

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
    // this.CargarPorUsuario = function () {
    //     var jsonEnvio = { 'idUsuario': $rootScope.user.UsuaId }
    //     var url = "/Factura/ListFacturasByIdUsuario";
    //     var Ctrl = this;
    //     var success = function (json) {
    //         Ctrl.ListFacturas = json;
    //         console.log(Ctrl.ListFacturas)
    //     };
    //     var error = function (resp) { console.log("Error: " + resp); jQuery(".progress").hide(); };
    //     Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    // };


    // this.CargarPorUsuario();

    funcionalidadWiz();

}]);