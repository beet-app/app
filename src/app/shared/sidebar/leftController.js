BeetApp
    .controller('LeftController', function($scope, $rootScope,$sce, $http, $location, $translate, Common,$state, $timeout) {

        $scope.menuLeft = $rootScope.session.features;

        //$scope.menuLeft = [{"uuid":"9351de4f-5454-4e9a-b0d3-a3af49e71322","description":"person","order":1,"attributes":{"sidebar":{"icon_color":"gold","title":"person","icon":"action.grade","path":"person"}}},{"uuid":"bbedb75c-096f-4f5d-9a9f-fd451e06e4e8","description":"contract","order":2,"attributes":{"sidebar":{"icon_color":"black","title":"contract","icon":"action.description","path":"contract"}}},{"uuid":"2d8e184d-5ae0-4044-ba3c-3a018358a886","description":"expense_company","order":3,"attributes":{"sidebar":{"icon_color":"blue","title":"expense_company","icon":"action.shopping_cart","path":"expense-company"}}},null,null,null,{"uuid":"7a417204-599b-4c36-9923-1b04cd87f766","description":"expense_person","order":7,"attributes":{"sidebar":{"icon_color":"green","title":"expense","icon":"action.payment","path":"expense"}}}];

    });
