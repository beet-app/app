MyApp
    .controller('CategoryController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q) {
        $rootScope.loadingFeature = true;
        var feature = "category";
        function loadFeature(){
            var d = $q.defer();
            var id=333;
            if (!Common.isEmpty($stateParams.uuid)) {
                id = $stateParams.uuid;
            }
            /*GlobalService.getAttributes('category', id).then(function(attributeResponse){

                $scope.attributeData = attributeResponse.data;

                GlobalService.get(feature, $stateParams).then(function(response){
                    $scope.data = response.data;
                    $scope.listData = {
                        fields:[
                            {
                                description:"attributes.category_data.name"
                            }
                        ],
                        fieldSort : "attributes.category_data.name",
                        items:$scope.data,
                        add: function($event){
                            $scope.add($event);
                        }
                    };


                    d.resolve(true);

                });

            });*/

            return d.promise;
        }

        $scope.list = function(){
            $scope.mode = "list";
        };
        $scope.add = function(){
            $scope.edit();
        };
        $scope.edit = function(obj){
            $rootScope._app.sidebar.right.load(feature, $scope.data, function(item){
                Common.goTo("category/edit", {uuid:item.uuid});
            },"name");
            $scope.mode = "edit";
            $scope.formData = $scope.attributeData;
            if (!Common.isEmpty(obj)){
                $scope.uuid = obj.uuid;

            }
        };

        $scope.save = function(){
            $scope.loadingFeature = true;
            var blnSave = true;
            angular.forEach($scope.data.category_data, function(attribute){
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

                GlobalService.save("category", mode, objSave).then(function (response) {

                    if (Common.isEmpty(response.error)) {
                        Common.showMessage("Atleta cadastrado com sucesso !", "success");
                        loadFeature().then(function(){
                            $scope.loadingFeature = false;
                            Common.goTo("category");
                            $scope.list();
                        });


                    } else {
                        alert("Ocorreu um erro ao cadastrar o atleta.");
                        $scope.loadingFeature = false;
                        Common.goTo("category");
                    }
                });

            }
        };

        loadFeature().then(function(){

            if (Common.isEmpty($stateParams.uuid)) {
                $rootScope.loadingFeature = false;
                $scope.list();
            }else{

                angular.forEach($scope.data, function(item) {
                    if (item.uuid==$stateParams.uuid) {
                        $scope.edit(item);
                        $rootScope.loadingFeature = false;
                    }
                });
            }

        });
    });
