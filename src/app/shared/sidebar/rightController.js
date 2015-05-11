MyApp
    .controller('RightController', function($scope, $rootScope, $stateParams,$sce, $http, $location, $translate, Common,$state, UserService) {

        $scope.executeAction = function(item){


            $location.path($rootScope.sidebar.right.feature+"/"+item.uuid);
        };


    });
