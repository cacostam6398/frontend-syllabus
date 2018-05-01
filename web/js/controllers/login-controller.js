IdentiApp.controller("LoginController", ['$scope', '$location', '$rootScope', '$modal', 'Enviar',
	function ($scope, $location, $rootScope, $modal, Enviar) {
	 
	 
	    $scope.formR1 = true;
	    $scope.formR2 = false;
	    $scope.esta = false;
	    $scope.registro = {};
	    $scope.MostrarCargaReg = false;


	    jQuery('#myform2').validate({ // initialize the plugin
	        rules: {
	            'nombre': {
	                required: true,
	                noSpecials: true
	            },
	            'apellido': {
	                required: true,
	                noSpecials: true

	            },
	            'email': {
	                required: true,
	                minlength: 2,
	                email: true
	            },
	            'telefono': {
	                required: true,
	                minlength: 2,
	                number: true
	            },
	            'contra': {
	                required: true,
	                minlength: 10,
	                maxlength: 20,
	                noSpecials: true
	            },
	            'numDoc': {
	                required: true,
	                minlength: 2,
	                number: true
	            },
	            'ciud': {
	                required: true,
	                minlength: 2
	            },
	            'dire': {
	                required: true,
	                minlength: 2
	            }

	        },
	        submitHandler: function (form) { // for demo
	            return false; // for demo
	        }
	    });



	    $scope.translateFormReg = function (esta2){	    
	        if (esta2 == false) {
	            $scope.formR1 = false;
	            $scope.formR2 = true;
	            $scope.esta = true;
	        } else {
	            $scope.formR1 = true;
	            $scope.formR2 = false;
	            $scope.esta = false;
	        }	    
	    }

	    $scope.registrar = function (registro) {
	        $scope.MostrarCargaReg = true;

	        if (jQuery('#myform2').valid()) {
	            var url = "/Usuarios/CreateUsuario";
	            var success = function (json) {
	                if (json != 500) {
	                    $scope.registro = {};
	                    swal("Exito", registro.UsuaNombre + " Se ha registrado correctamente ", "success");
	                    $scope.formR1 = true;
	                    $scope.formR2 = false;
	                    $scope.MostrarCargaReg = false
	                } else {
	                    swal("Informacion", "Error en el registro. Por Favor Valide los campos Ingresados", "info");
	                    $scope.formR1 = true;
	                    $scope.formR2 = false;
	                    $scope.MostrarCargaReg = false
	                }
	            };
	            var error = function (resp) { $scope.MostrarCargaReg = false; console.log("Error: " + resp); swal("Informacion", "Error en el registro. Por Favor Valide los campos Ingresados", "info"); };
	            Enviar.elemento($scope, url, success, error, registro);
	        } else {
	            $scope.MostrarCargaReg = false;
	        }
	    }


	    $scope.ModalRecuperacion = function () {
	        this.Modal = $modal.open({
	            templateUrl: 'Modal.html',
	            scope: $scope,
	            size: 'sm'
	        });
	    };
        

	    $scope.login = function (forma) {

	        jQuery('#myform').validate({ // initialize the plugin
	            rules: {
	                'email': {
	                    required: true,
	             
	                },
	                'pass': {
	                    required: true,
	                    minlength: 2
	                }

	            },
	            submitHandler: function (form) { // for demo
	           
	                return false; // for demo
	            }
	        });

	        if (jQuery('#myform').valid()) {
	            var user = { "UsuaUsua": "", "UsuaPwd": "" };
	            $scope.MostrarCarga = true;
	            var Ctrl = this;
	            var Url = "https://www.w3schools.com/angular/customers.php";
	            var success = function (json) {
	              console.log(json)
	                user.UsuaUsua = json.UsuaUsua;
	                user.UsuaPwd = json.UsuaPwd;

	                if (json.UsuaEsta != 1) {
	                    $scope.message = 'Usuario o Contraseña incorrectos';
	                    swal("Error", $scope.message, "info");
	                } else {
	                    json.success = true;
	                    sessionStorage.user = JSON.stringify(json);
	                    $rootScope.user = json;
	                    console.log($rootScope.user);
	                    $rootScope.numProductosCarrito = 0;
	                    $rootScope.productosCotizar = [];
	                    jQuery('.modal-backdrop').remove();

	                    $location.path('/home');
	                }
	            };
	            var error = function (json) {						
					$location.path('/home');
	            };
	            var user = { "UsuaEmail": "", "UsuaPsw": "" };
	            user.UsuaEmail = $scope.email;
	            user.UsuaPsw = $scope.password;
	            var Data = { "user": user }
	            Enviar.elemento(Ctrl, Url, success, error, Data);
	        }
	    };


	    //$scope.setCredentials = function (username, password) {
	    //    var authdata = Base(username + ':' + password);
	    //    var Data = { "token": authdata };
	    //    var Ctrl = this;
	    //    var Url = "/Login/CreateSessionAuth";
	    //    var success = function (json) {
	          
	    //    };
	    //    var error = function (json) {	           
	    //        console.log(json);
	    //    };	
	    //    Enviar.elemento(Ctrl, Url, success, error, Data);

	    //}
	    sessionStorage.clear();
	    $rootScope.permissions = []; 	
	    sessionStorage.clear();
	    $rootScope.permissions = [];
	    $rootScope.user = '';
	}
]);


