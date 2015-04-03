BeetApp
    .controller('CompanySelectController', function($scope, $rootScope,$sce, $http, $location, $translate, Common, CompanyService) {

        $scope.companies = $rootScope.session.user.companies;
        function chooseCompany(company_uuid){
            CompanyService.choose({company:company_uuid}).then(function(response){
                $rootScope.session.user.company = company_uuid;
                $rootScope.session.features = [];
                angular.forEach(response.data, function(feature){
                    if (!Common.isEmpty(feature)){
                        $rootScope.session.features.push(feature);
                    }
                });
                $("#company-select").fadeOut();
                $rootScope.fullViewMode = true;
                $rootScope.singleViewMode = false;
                Common.goTo("main");

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
