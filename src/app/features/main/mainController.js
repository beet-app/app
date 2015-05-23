MyApp
  .controller('MainController', function($scope, $rootScope,$sce, $http, $location, $translate, Common, $timeout) {


        $rootScope._app.feature.change($rootScope._app.feature.dict["main"], true);
        $rootScope.singleViewMode = false;
        $rootScope.fullViewMode = true;
        $timeout(function(){

            $("#loadingApp").hide();
            $("#container").fadeIn("slow");
            $rootScope.loadingFeature = false;
        },1000);







  });
