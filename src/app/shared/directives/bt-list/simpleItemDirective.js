MyApp
    .directive("btSimpleItem", function (Common, $compile, $rootScope) {


        return {
            //replace: true,
            restrict: 'E',
            link: function(scope, element) {

            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-list/simpleItem")
        };

    });
