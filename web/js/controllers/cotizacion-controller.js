
IdentiApp.controller("CotizacionsController", ['Enviar', 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', '$filter',
       function (Enviar, Cargar, $location, $route, $scope, $rootScope, $modal, $filter) {
   
    this.busqueda = "";
    this.ListFacturas = [];
    this.newdata = {}
    this.cargaModal = {};
    this.FacturaSeleccionada = [];
    this.preciototalfac = 0;
    this.sel=1
    var Ctrl = this;
    this.jsonDetalle = [];
           //CotCtrl

    console.log($rootScope.productosCotizar);

    this.armarjsonDetalle = function()
    {

        for (var i = 0; i < $rootScope.productosCotizar.length; i++) {
            this.jsonDetalle.push({ 'DetIdProducto': $rootScope.productosCotizar[i].ProdId, 'DetCantidad': parseInt($rootScope.productosCotizar[i].Cantidad), 'DetPrecioUnitario': $rootScope.productosCotizar[i].ProdPrecio, 'DetPrecioTotal': ($rootScope.productosCotizar[i].ProdPrecio * parseInt($rootScope.productosCotizar[i].Cantidad)) })
        };

        console.log('json detalle creado')
        console.log(this.jsonDetalle)
        this.crearFactura(this.jsonDetalle);

    }

    this.crearFactura = function (objDetalle) {
        swal({
            title: "Seguro deseas Realizar tu compra ?",
            text: "",
            //imageUrl: "Content/themes/img/logosbvcd.png",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            $rootScope.numProductosCarrito = 0;
            var jsonEnvio = JSON.stringify({ 'idusuario': $rootScope.user.UsuaId, 'objDetalle': objDetalle });
            var url = "/Factura/CreateFactura";
            var Ctrl = this;
            var success = function (json) {
                
                Ctrl.ListFacturas = json;
                $rootScope.productosCotizar = [];                
                swal(
                      'Compra realizada ',
                      'Revisar sus Pedidos',
                      'success'
                    )
                
            };
            var error = function (resp) { console.log("Error: " + resp); jQuery(".progress").hide(); };
            Enviar.elemento(Ctrl, url, success, error, jsonEnvio);

        });
           

    }

    this.detalleFactura = function (idfactura) {
        
        this.FacturaSeleccionada = this.ListFacturas.filter(
                function (value) {
                    if (value.FactId === idfactura) {
                        return value;
                    }
                     
                }
            );

      

    }

    this.sumaPrecioTotal = function (valor) {

        this.preciototalfac = this.preciototalfac + valor;

    }

    this.redondear = function (valor) {
        var red = Math.floor(valor);
        return red;
    }

    this.multiplicarCantidad = function (valor) {
      
        this.preciototalfac =0
        console.log('cotizar')
        console.log(valor)
      
       
        for (var i = 0; i < valor.length; i++) {

            this.preciototalfac = this.preciototalfac + valor[i].ProdPrecio * parseInt(valor[i].Cantidad);

       

        }

    }

 
    $("body").removeClass("modal-open");


}]);