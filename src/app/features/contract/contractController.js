BeetApp
    .controller('ContractController', function($scope, $rootScope,$sce, $http, $stateParams, $translate, $mdDialog, Common, GlobalService) {
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

        $scope.edit = function(attribute_group, uuid){
            $scope.loadingFeature = true;

            var id = (Common.isEmpty(uuid)) ? 333 : uuid;
            GlobalService.getAttributes("contract", id).then(function(response){

                $scope.uuid = uuid;
                $scope.loadingFeature = false;
                $scope.selected = uuid;
                if (!response.error){
                    $scope.mode = "edit";
                    $scope.dataContract = response.data[attribute_group];
                }
            });
        };

        $scope.save = function(){
            var blnSave = true;
            angular.forEach($scope.dataContract, function(attribute){
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
                objSave.attribute = Common.getAttributeObj($scope.dataContract);
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

        $scope.newContract = function($event){
            $scope.showDialog($event);
        };

        $scope.showDialog = function($event){
            $mdDialog.show({
                targetEvent: $event,
                locals: {
                    formData:$scope.formData
                },
                controller: DialogController,
                templateUrl:"app/features/contract/contractSelectTypeView.html"
            }).then(function(attribute_group) {
                $scope.edit(attribute_group);
            });
        };

        $scope.setFocus = function(id){
            $("#"+id).find("input").focus();
        };

        function DialogController($scope, $mdDialog, formData) {
            $scope.formData = formData;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.select = function(attribute_group){
                $mdDialog.hide(attribute_group);
            }
        }

        if (Common.isEmpty($stateParams.uuid)){
            $scope.listPerson();
        }else if(!Common.isEmpty($stateParams.uuid) && !$rootScope.editContract){
            $scope.list($stateParams.uuid);

            GlobalService.getAttributes("contract", 333).then(function(dataSet){
                $scope.formData = dataSet.data;
            });
        }
        else if(!Common.isEmpty($stateParams.uuid) && !Common.isEmpty($stateParams.group) && $rootScope.editContract){
            $scope.edit($stateParams.group , $stateParams.uuid);
        }
    });
