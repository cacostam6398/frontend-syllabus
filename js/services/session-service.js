IdentiApp.factory('session', ['$location',
    function($location) {
    	return {
    		confirmar : function(Url, Data, success, error, Ctrl){
				var conp = sessionStorage.firstName && sessionStorage.lastName && sessionStorage.isActive;
				if(!conp){
					$location.url("/login");
					return false;}
				else
					return sessionStorage.userType;
    		}     
    	}
    }]
);