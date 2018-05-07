IdentiApp.controller('HomeController',function ($location, $route, $scope,$rootScope, $modal,$filter) {
    

    $rootScope.GoCreacionSyllabus = function(){		
        $location.path('/CreacionSyllabus');
    }

    this.sesion = 'David';


});