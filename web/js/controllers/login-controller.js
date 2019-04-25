var profile= {}
var auth2;


// function onSignIn(googleUser){

// 	 profile = googleUser.getBasicProfile();
// 	angular.element(document.getElementById('loginIdTotal')).scope().loginGoogle(profile)

// }


IdentiApp.controller("LoginController", ['$scope', '$location', '$rootScope', '$modal', 'Enviar','Recibir',
	function ($scope, $location, $rootScope, $modal, Enviar, Recibir) {
	 
	 
	    $scope.formR1 = true;
	    $scope.formR2 = false;
	    $scope.esta = false;
	    $scope.registro = {};
	    $scope.MostrarCargaReg = false;


 
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
	
		$scope.validarCorreo = function(correo){

			var array1 = correo.split('@');
			var Dominio = array1[1].split('.')[0]

			if(Dominio.toUpperCase() == 'UNIVERSIDADEAN'){
						return true;
			}else{

						return false

			}

		}
		
		$scope.loginGoogle = function(objUser){

			
			console.log(objUser)
			var resp = $scope.validarCorreo(objUser.U3)

			if(resp == true){
				var Ctrl = this;
				var Url =  $rootScope.baseUri + "/syllabus_ean/public/api/index/aut";
				var success = function (json) {	

				   if (json.data.status != "OK") {
					   $scope.message = 'Usuario o Contraseña incorrectos';
					   swal("Error", $scope.message, "info");
				   } else {	                
					  json.data.usuario.imgProfile = objUser.Paa ;
					   sessionStorage.user = JSON.stringify(json.data.usuario);
					   sessionStorage.token =  json.data.token;
					   $rootScope.user = json.data.usuario;
					   $rootScope.user.imgProfile = objUser.Paa;
					   $rootScope.user.nameProfile = objUser.ig;
					   $rootScope.user.Au = objUser.Eea;
					   $rootScope.token = json.data.token;
					   console.log($rootScope.user);	
					   $location.path('/home');
					//    $scope.$apply();	
				   }
				};
			   var error = function (json) {	
				   swal("Error","Usuario incorrectos", "info");	
			   };			   
			   var Data = { "correo": objUser.U3 , "idSesionAut": objUser.Eea }
			   Enviar.elemento(Ctrl, Url, success, error, Data);	
					
			}else{
						swal("Error","Usuario incorrecto", "info");	
						$rootScope.LogOutGoogle();
			}
		}

	  
		

		$rootScope.LogOutGoogle = function(){	
			// var Ctrl = this;
			// var Url =  $rootScope.baseUri + "/syllabus_ean/public/api/index/salir";
			// var success = function (json) {	
				sessionStorage.removeItem('user');
				$rootScope.user = null;
				$rootScope.token = '';		
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function () {
					$location.path('/login');
				});			

			// }
			// var error = function (json) {	
			// 	swal("Error","Error en el servicio Log Out", "info");	
			// };
			// var Data = { "correo":  $rootScope.user.correo , "idSesionAut":  $rootScope.user.Au }
			// Recibir.elemento(Ctrl, Url, success, error,Data);	

			
		}	
		
		$rootScope.GoHome = function(){		
			$location.path('/home');
		}

		$rootScope.GoCreacionSyllabus = function(){		
			$location.path('/CreacionSyllabus');
		}


		sessionStorage.clear();
	    $rootScope.permissions = []; 	
	    sessionStorage.clear();
	    $rootScope.permissions = [];
	    $rootScope.user = '';

		  // $scope.login = function (forma) {
			
	    //     jQuery('#myform').validate({ // initialize the plugin
	    //         rules: {
	    //             'email': {
	    //                 required: true,
	             
	    //             },
	    //             'pass': {
	    //                 required: true,
	    //                 minlength: 2
	    //             }

	    //         },
	    //         submitHandler: function (form) { // for demo
	           
	    //             return false; // for demo
	    //         }
	    //     });

	    //     if (jQuery('#myform').valid()) {
	    //         var user = { "UsuaUsua": "", "UsuaPwd": "" };	          
	    //         var Ctrl = this;
	    //         var Url =  $rootScope.baseUri + "/restapi-syllabusean/public/api/index/aut";
	    //          var success = function (json) {	

	    //             if (json.data.status != "OK") {
	    //                 $scope.message = 'Usuario o Contraseña incorrectos';
	    //                 swal("Error", $scope.message, "info");
	    //             } else {	                
		// 				sessionStorage.user = JSON.stringify(json.data.data);
		// 				sessionStorage.token =  json.data.token;
		// 				$rootScope.user = json.data.data;
		// 				$rootScope.token = json.data.token;
	    //                 console.log($rootScope.user);	            
	    //                 jQuery('.modal-backdrop').remove();		
	    //                 $location.path('/home');
	    //             }
	    //          };
		// 		var error = function (json) {	
		// 			swal("Error","Usuario o Contraseña incorrectos", "info");	
		// 		};
	    //         // var user = { "UsuaEmail": "", "UsuaPsw": "" };
	    //         // user.UsuaEmail = $scope.email;
	    //         // user.UsuaPsw = $scope.password;
	    //         var Data = { "correo": forma.email }
		// 	    Enviar.elemento(Ctrl, Url, success, error, Data);
	    //     }
		// };
		

		// $rootScope.LogOut = function(){

		// 	sessionStorage.removeItem('user');
		// 	$rootScope.user = {};
		// 	$rootScope.token = '';
		// 	$location.path('/login');
		// }	

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
		
	   
	}
]);


function onSuccess(googleUser) {
	
	console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
	profile = googleUser.getBasicProfile();
	angular.element(document.getElementById('loginIdTotal')).scope().loginGoogle(profile)
  }
  function onFailure(error) {
	console.log(error);
  }
  function renderButton() {
	gapi.signin2.render('my-signin2', {
	  'scope': 'profile email',
	  'width': 240,
	  'height': 50,
	  'longtitle': true,
	  'theme': 'dark',
	  'onsuccess': onSuccess,
	  'onfailure': onFailure
	});
  }

  


