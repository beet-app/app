BeetApp
  .controller('ContractController', function($scope, $rootScope,$sce, $http, $stateParams, $translate, Common, GlobalService) {
    $scope.loadingFeature = true;
    GlobalService.get('person').then(function(response){
      if (!response.error){
        $scope.list = response.data;
      }
    });

    $scope.listPerson = function(){
      GlobalService.get('person').then(function(response){
        $scope.loadingFeature = false;
        $scope.mode = "list";
        if (!response.error){
          $scope.list = response.data;
        }
      });
    };

    $scope.list = function(uuid){
      GlobalService.get('contract').then(function(response){
        $scope.loadingFeature = false;
        $scope.mode = "listContract";
        if (!response.error){
          $rootScope.sidebar.right = {
            feature:"contract",
            items:response.data
          };
          $scope.list = response.data;
        }
      });
    };

    $scope.edit = function(uuid){
      $scope.loadingFeature = true;
      GlobalService.getAttributes('person', uuid).then(function(response){
        $scope.loadingFeature = false;
        $scope.selected = uuid;
        if (!response.error){
          $scope.mode = "edit";
          $scope.data = response.data;
        }
      });
    };

    $scope.setFocus = function(id){
      $("#"+id).find("input").focus();
    };

    if (Common.isEmpty($stateParams.uuid)){
      $scope.listPerson();
    }else{
      $scope.edit($stateParams.uuid);
    }
  });
