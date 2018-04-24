
IdentiApp.controller("FacturasController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
       function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {
   
    this.busqueda = "";
    this.ListFacturas = [];
    this.newdata = {}
    this.cargaModal = {};
    this.FacturaSeleccionada = [];
    this.preciototalfac = 0;
    var Ctrl = this;



             
    this.CargarPorUsuario = function () {
        var jsonEnvio = { 'idUsuario': $rootScope.user.UsuaId }
        var url = "/Factura/ListFacturasByIdUsuario";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListFacturas = json;
            console.log(Ctrl.ListFacturas)
        };
        var error = function (resp) { console.log("Error: " + resp); jQuery(".progress").hide(); };
        Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

    };


    this.detalleFactura = function (idfactura) {
        this.preciototalfac = 0;
        this.FacturaSeleccionada = this.ListFacturas.filter(
                function (value) {
                    if (value.FactId === idfactura) {
                        return value;
                    }
                     
                }
            );

        console.log('filtro')
        console.log(this.FacturaSeleccionada)

    }

    this.sumaPrecioTotal = function(valor){
        
        this.preciototalfac =  this.preciototalfac +  valor;
    }


    this.CargarPorUsuario();
    $("body").removeClass("modal-open");


}]);