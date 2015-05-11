MyApp
    .directive("btLaterality", function (Common, $compile) {


        return {
            //replace: true,
            restrict: 'E',
            link: function(scope, element) {
                scope.options = scope.data.type.options ? scope.data.type.options : [];

            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/dropdown")
        };

    });
