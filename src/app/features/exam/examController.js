﻿MyApp
    .controller('ExamController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q) {

        $rootScope.loadingFeature = true;
        var feature = "exam";

        function loadFeature(){
            var d = $q.defer();
            var id = 333;
            if (!Common.isEmpty($stateParams.uuid)) {
                id = $stateParams.uuid;
            }
            GlobalService.getAttributes(feature, id).then(function(attributeResponse){

                $scope.attributeData = attributeResponse.data;

                GlobalService.get(feature, $stateParams).then(function(response){
                    $scope.data = response.data;
                    $scope.listData = {
                        fields:[
                            {
                                description:"attributes.exam_data.initial_date"
                            }
                        ],
                        commands:[
                            {
                                label:"rating",
                                icon:"action.swap_vert",
                                iconColor:"#000000",
                                click:function(obj){
                                    $rootScope._app.feature.change($rootScope._app.feature.dict["rating"], true);

                                     Common.goTo("exam/rating/view", {uuid:obj.uuid});

                                }
                            },
                            {
                                label:"candidate",
                                icon:"social.person_add",
                                iconColor:"#000000",
                                click:function(obj){
                                    $rootScope._app.feature.change($rootScope._app.feature.dict["candidate"], true);

                                     Common.goTo("candidate/exam", {uuid:obj.uuid});

                                }
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
            angular.forEach($scope.data.exam_data, function(attribute){
                if (blnSave){
                    if (attribute.required === 1 && Common.isEmpty(attribute.value)){
                        $scope.loadingFeature = false;
                        Common.showMessage("Preencha o campo "+attribute.description+"!", "warning");
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

                GlobalService.save("exam", mode, objSave).then(function (response) {

                    if (Common.isEmpty(response.error)) {
                        Common.showMessage("Avaliação cadastrada com sucesso!", "success");
                        Common.goTo("candidate/exam", {uuid: response.data.uuid});

                    } else {
                        alert("Ocorreu um erro ao cadastrar a avaliação.");
                    }
                });
            }
        };

        $scope.list = function(){
            //$rootScope._app.sidebar.right.unLoad();
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
            if (Common.isEmpty($stateParams.uuid)) {
                $rootScope.loadingFeature = false;
                $scope.list();
            }else{
                angular.forEach($scope.data, function(item) {
                    if (item.uuid = $stateParams.uuid) {
                        $scope.edit(item);
                        $rootScope.loadingFeature = false;
                    }
                });
            }
        });
    });
