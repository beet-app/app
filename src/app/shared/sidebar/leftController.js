BeetApp
    .controller('LeftController', function($scope, $rootScope,$sce, $http, $location, $translate, Common,$state) {

      if (!Common.isEmpty($rootScope.session)){
        $scope.menuLeft = $rootScope.session.features;
      }

    $scope.changeLeftMenu = function(feature){
      Common.goTo(feature);
    }

    });
