MyApp
    .controller('CandidateController', function($scope, $rootScope, $sce, $http, $stateParams, $translate,$q, Common,CandidateService, GlobalService) {

        $rootScope.loadingFeature = true;
        var feature = "candidate";

        function loadFeature(){
            var d = $q.defer();
            var id = 333;
            if (!Common.isEmpty($stateParams.uuid)) {
                id = $stateParams.uuid;
            }
            GlobalService.getAttributes(feature, 333).then(function(attributeResponse){

                $scope.attributeData = attributeResponse.data;

                CandidateService.getByExam($stateParams.uuid).then(function(response){
                    $scope.data = response.data;
                    $scope.listData = {
                        fields:[
                            {
                                description:"attributes.candidate_data.name"
                            }
                        ],
                        items:$scope.data,
                        add: function($event){
                            $scope.add($event);
                        }
                    };
                    d.resolve(true);
                });
            });
            return d.promise;
        }

        $scope.save = function(){
            $scope.loadingFeature = true;
            var blnSave = true;
            angular.forEach($scope.data.candidate_data, function(attribute){
                if (blnSave){
                    if (attribute.required === 1 && Common.isEmpty(attribute.value)){
                        $scope.loadingFeature = false;
                        Common.showMessage("Preencha o campo "+attribute.description+"!", "warning");
                        blnSave = false;
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

                objSave.exam = $stateParams.uuid;

                GlobalService.save(feature, mode, objSave).then(function (response) {
                    if (Common.isEmpty(response.error)) {
                        Common.showMessage("Candidato cadastrado com sucesso!", "success");
                        Common.goTo("candidate/exam", {uuid: $stateParams.uuid});

                    } else {
                        alert("Ocorreu um erro ao cadastrar o candidate.");
                    }
                });
            }
        };

        $scope.list = function(){
            $rootScope._app.sidebar.right.unLoad();
            $scope.mode = "list";
        };
        $scope.add = function(){
            $scope.edit();
        };
        $scope.edit = function(obj){
            /*$rootScope._app.sidebar.right.load(feature, $scope.data, function(item){
                $scope.edit(item);
            },"name");*/
            $scope.mode = "edit";
            $scope.formData = $scope.attributeData;
            if (!Common.isEmpty(obj)){
                $scope.uuid = obj.uuid;
            }
        };

        loadFeature().then(function(){

                $rootScope.loadingFeature = false;
                $scope.list();

            
        });
    });

