IdentiApp.factory('LoginService', ['$http', '$rootScope',
    function($http,$rootScope) {
    	var baseUrl = $rootScope.serviceURL + "/login";
		if($rootScope.serviceURL)
			return {
    		distance : function(email, password){
    			return $http({
    				url : baseUrl,
    				method: "POST",
    				data: {
    					"email" : email,
    					"password" : password
    				}
    			});
    		},
            
			}
		else
			$rootScope.$on("ServiceDone",function(){
			return {
				distance : function(email, password){
					return $http({
						url : baseUrl,
						method: "POST",
						data: {
							"email" : email,
							"password" : password,
						}
					});
				},
            
			}}
			);
    }
]);