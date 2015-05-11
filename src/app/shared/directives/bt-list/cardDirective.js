MyApp
    .directive("btCard", function (Common, $compile) {


        return {
            //replace: true,
            restrict: 'E',
            link: function(scope, element) {

            },
            scope: {
                item:'='
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-list/card")
        };

    });
