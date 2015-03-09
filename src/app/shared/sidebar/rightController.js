BeetApp
    .controller('RightController', function($scope, $rootScope, $stateParams,$sce, $http, $location, $translate, Common,$state, UserService) {

        $scope.executeAction = function(item){


            $location.path($rootScope.sidebar.right.feature+"/"+item.uuid);
        };



        $scope.logout = function(){
            UserService.logout().then(function(response){

                if (Common.isEmpty(response.error)){
                    Common.goTo("login");
                }else{
                    alert("Problemas com o servidor");
                }

            });
        };

    });
