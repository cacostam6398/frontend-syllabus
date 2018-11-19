IdentiApp.factory('CargarScript', ['$window', '$q',
    function($window, $q) {
    	return {
			src: function(url,success,atr) {
				$.getScript( url )
				  .done(function( script, textStatus ) {
					success(atr);
				  })
				  .fail(function( jqxhr, settings, exception ) {
					console.log("Error al cargar script:" + exception);
				});
			}
		}
	}
]);
