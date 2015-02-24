BeetApp
    .controller('RightController', function($scope, $rootScope, $stateParams,$sce, $http, $location, $translate, Common,$state) {

      $scope.executeAction = function(item){


        $location.path($rootScope.sidebar.right.feature+"/"+item.uuid);
      }

    });
