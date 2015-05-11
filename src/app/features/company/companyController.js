MyApp
    .controller('CompanyController', function($scope, $rootScope,$sce, $http, $location, $translate, Common, GlobalService) {
        $rootScope.fullViewMode = false;
        $rootScope.singleViewMode = true;

        GlobalService.getAll('company_type').then(function(response){
            $scope.types = response.data;
            GlobalService.getAttributes('company').then(function(response){

                if (!response.error){
                    $scope.allData = response.data;
                    $("#loadingApp").hide();
                    $("#single_view").fadeIn();
                    $("#company-create").fadeIn();
                }
            });

        });


        $scope.chooseType = function(type){
            $("#company-create").hide();

            setTimeout(function(){
                $scope.formData = {};

                $scope.formData = $scope.allData[type.description + "_data"];
                $scope.type=type;
                $scope.$apply();
                $("#company-create").fadeIn();
            },200);

        };
        $scope.back = function(){
            $("#company-create").hide();
            delete $scope.type;
            setTimeout(function(){
                $("#company-create").fadeIn();
            },500);
        };
        $scope.createCompany = function(){
            $scope.creatingCompany = true;
            var blnSave = true;
            angular.forEach($scope.formData, function(attribute){
                if (blnSave){
                    if (attribute.required===1 && Common.isEmpty(attribute.value)){
                        Common.showMessage("Preencha o campo "+attribute.description+" !", "warning");
                        blnSave = false;
                        $scope.creatingCompany = false;
                    }
                }

            });
            var objSave = {};
            console.log($scope.formData);
            objSave.attribute = Common.getAttributeObj($scope.formData);
            objSave.company_type =  $scope.type.uuid;
            if (blnSave){
                GlobalService.save("company", "create", objSave).then(function(response){

                    if (Common.isEmpty(response.error)){

                        GlobalService.getAllByUser("company").then(function(companyResponse){

                            if (Common.isEmpty(response.error)){
                                console.log(companyResponse.data);
                                $rootScope.session.user.companies = companyResponse.data;
                                Common.goTo("company/select");
                            }else{
                                alert("Ocorreu um erro ao buscar a empresa.");
                            }

                        });


                    }else{
                        alert("Ocorreu um erro ao cadastrar a empresa.");
                    }
                });
            }
        };
    });


