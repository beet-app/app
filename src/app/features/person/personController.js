BeetApp
    .controller('PersonController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q) {
        $scope.loadingFeature = true;

        $scope.list = function(){
            $rootScope._app.sidebar.right.unLoad();
            GlobalService.get('person').then(function(response){

                if (!response.error){
                    $scope.data = response.data;

                    if (Common.isEmpty($stateParams.uuid)){
                        $scope.loadingFeature = false;
                        $scope.mode = "list";
                    }else{
                        $scope.edit($stateParams.uuid);
                    }
                }
            });
        };

        $scope.edit = function(uuid){
            $scope.loadingFeature = true;
            GlobalService.getAttributes('person', uuid).then(function(response){
                $rootScope._app.sidebar.right.load("person", $scope.data);

                $scope.uuid = uuid;
                $scope.loadingFeature = false;
                $scope.selected = uuid;
                if (!response.error){
                    $scope.mode = "edit";
                    $scope.formData = response.data;
                }
            });
        };

        $scope.save = function(){
	        $scope.loadingFeature = true;
            var blnSave = true;
            angular.forEach($scope.data.person_data, function(attribute){
                if (blnSave){
                    if (attribute.required===1 && Common.isEmpty(attribute.value)){
	                    $scope.loadingFeature = false;
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
                objSave.attribute = Common.getAttributeObj($scope.formData);
                objSave.company = Common.isEmpty($rootScope.session.user.company) ? $rootScope.session.user.companies[0].uuid : $rootScope.session.user.company;

                GlobalService.save("person", mode, objSave).then(function (response) {

                    if (Common.isEmpty(response.error)) {
                        Common.showMessage("Atleta cadastrado com sucesso !", "success");
                        Common.goTo("person");

                    } else {
                        alert("Ocorreu um erro ao cadastrar o atleta.");
                    }
                });

            }
        };


        $scope.list();
    });