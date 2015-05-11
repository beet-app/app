MyApp
    .directive("btEditToolbar", function (Common, $compile, $rootScope, $state) {
        return {
            restrict: 'E',
            scope: {
                description:"="
            },
            link: function(scope, element) {
                scope.cancel = function(){
                    $rootScope._app.feature.change($rootScope._app.feature.current);
                };
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-edit/editToolbar")
        };

    });