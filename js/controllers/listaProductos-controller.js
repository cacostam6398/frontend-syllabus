
IdentiApp.controller("ListaProductosController", [ 'Cargar', '$location', '$route', '$scope', '$rootScope', '$modal', 
       function ( Cargar, $location, $route, $scope, $rootScope, $modal) {
   
    this.busqueda = "";
    this.ListProductos = [];
    
    this.newdata = {}
    this.cargaModal = {};
    var Ctrl = this;


    this.Cargar = function () {
        var url = "/Producto/ListProductos";
        var Ctrl = this;
        var success = function (json) {
            Ctrl.ListProductos = json;
            console.log(Ctrl.ListProductos);
        };
        var error = function (resp) { console.log("Error: " + resp); };
        Cargar.elemento(Ctrl, url, success, error);
    };


    this.AgregarCotizacion = function (objProducto) {

        console.log('obj carrito')
        console.log(objProducto)
        var productoRepetido = false

        var productoRepetido= $rootScope.productosCotizar.filter(
              function (value) {
                  if (value.ProdId == objProducto.ProdId) {
                      return true;
                  } 
              }
          );

        if (productoRepetido == false) {
            $rootScope.numProductosCarrito = $rootScope.numProductosCarrito + 1
            objProducto.Cantidad = 1;
            $rootScope.productosCotizar.push(objProducto)

            swal(
                       'compra realizada',
                       'Revisar Carrito de compras',
                       'success'
                     )
        } else {
            swal(
                     'Info',
                     'El producto ya fue agregado al carrito de compras',
                     'info'
                   )

        }

       


    }


    this.Cargar();
    $("body").removeClass("modal-open");


}]);