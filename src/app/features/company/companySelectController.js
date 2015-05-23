MyApp
    .controller('CompanySelectController', function($scope, $rootScope,$sce, $http, $location, $translate, Common, CompanyService, $timeout, btApp) {

        $scope.companies = $rootScope.session.user.companies;

        function chooseCompany(company_uuid){
                $scope.loadingAccount = true;
                CompanyService.choose({company:company_uuid}).then(function(response) {

                    btApp.loadFeatures(response.data).then(function () {
                        $rootScope.session.user.company = company_uuid;

                        //$("#company-select").fadeOut();
                        //$("#container").hide();

                        $timeout(function(){
                            Common.goTo("main");

                        });

                    });
                });
        }
        if (Common.isEmpty($scope.companies)){
            $scope.companies = [];
        }

        if ($scope.companies.length===0){
            Common.goTo("company/create");
        }else if($scope.companies.length===1){
            chooseCompany($scope.companies[0].uuid);
        }else{
            setTimeout(function(){
                $("#company-select").fadeIn();
            },1000);
        }

        $scope.chooseCompany = function(company_uuid){
            chooseCompany(company_uuid);
        }
    });
