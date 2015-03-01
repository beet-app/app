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
            $scope.loadingFeature = true;
            var obj = {person:uuid, company:$rootScope.session.user.company};
            GlobalService.getAllByFilteredAttributes('contract', obj).then(function (response){
                Common.openFeatureRightMenu("person", $scope.list);

                $scope.loadingFeature = false;
                $scope.mode = "listContract";
                if (!response.error){
                    $scope.listContract = response.data;
                }
                else{
                    common.showMessage(response.error, "warning");
                }
            });
        };

        /*$scope.edit = function(uuid){
            $scope.loadingFeature = true;
            GlobalService.getAttributes('person', uuid).then(function(response){
                $scope.loadingFeature = false;
                $scope.selected = uuid;
                if (!response.error){
                    $scope.mode = "edit";
                    $scope.data = response.data;
                }
            });
        };*/

        $scope.setFocus = function(id){
            $("#"+id).find("input").focus();
        };

        if (Common.isEmpty($stateParams.uuid)){
            $scope.listPerson();
        }else{
            $scope.list($stateParams.uuid);
        }
    });
