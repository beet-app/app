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
                $rootScope.editContract = false;
                if (!response.error){
                    $scope.list = response.data;
                }
            });
        };

        $scope.list = function(uuid){
            $scope.loadingFeature = true;
            var obj = {person:uuid, company:$rootScope.session.user.company};
            GlobalService.getAllByFilteredAttributes("contract", obj).then(function (response){
                Common.openFeatureRightMenu("person", $scope.list);

                $scope.loadingFeature = false;
                $scope.mode = "listContract";
                $rootScope.personSelected = uuid;
                $rootScope.editContract = true;
                if (!response.error){
                    $scope.listContract = response.data;
                }
                else{
                    common.showMessage(response.error, "warning");
                }
            });
        };

        $scope.edit = function(uuid){
            $scope.loadingFeature = true;
            GlobalService.getAttributes("contract", uuid).then(function(response){

                $scope.uuid = uuid;
                $scope.loadingFeature = false;
                $scope.selected = uuid;
                if (!response.error){
                    $scope.mode = "edit";
                    $scope.dataContract = response.data;
                }
            });
        };

        $scope.save = function(){
            var blnSave = true;
            angular.forEach($scope.dataContract.contract_data, function(attribute){
                if (blnSave){
                    if (attribute.required===1 && Common.isEmpty(attribute.value)){
                        Common.showMessage("Preencha o campo "+attribute.description+" !", "warning");
                        blnSave = false;
                        $scope.creatingCompany = false;
                    }
                }
            });

            if (blnSave) {
                var objSave = {};
                var mode = "create";
                if (!Common.isEmpty($scope.uuid)){
                    mode = "update";
                    objSave.uuid = $scope.uuid;
                }
                objSave.attribute = Common.getAttributeObj($scope.dataContract.contract_data);
                objSave.person = $rootScope.personSelected;
                objSave.company = $rootScope.session.user.company;

                GlobalService.save('contract', mode, objSave).then(function (response) {

                    if (Common.isEmpty(response.error)) {
                        var message = mode === "create" ? "Contrato cadastrado com sucesso!" : "Contrato atualizado com sucesso!";
                        Common.showMessage(message, "success");
                        Common.goTo("contract");
                    } else {
                        Common.showMessage("Ocorreu um erro ao realizar esta operação.", "warning");
                    }
                });
            }
        };

        $scope.setFocus = function(id){
            $("#"+id).find("input").focus();
        };

        if (Common.isEmpty($stateParams.uuid)){
            $scope.listPerson();
        }else if(!Common.isEmpty($stateParams.uuid) && !$rootScope.editContract){
            $scope.list($stateParams.uuid);
        }
        else if(!Common.isEmpty($stateParams.uuid) && $rootScope.editContract){
            $scope.edit($stateParams.uuid);
        }
    });
