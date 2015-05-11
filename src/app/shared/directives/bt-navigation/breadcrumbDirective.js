MyApp
    .directive("btBreadcrumb", function (Common, $compile, $rootScope, $state) {
        return {
            restrict: 'E',
            scope: {

            },
            link: function(scope, element) {
                scope.changeFeature = function(item){
                    $rootScope._app.feature.change(item.feature);
                };
                if (Common.isEmpty(scope.data)){
                    scope.data = [];
                    var arrPath = $state.current.name.split("/");
                    for (var x=arrPath.length-1 ; x>=0 ; x--){
                        if (!Common.isEmpty($rootScope._app.feature.dict[arrPath[x]])){
                            scope.data.push({
                                feature:$rootScope._app.feature.dict[arrPath[x]]
                            });
                        }

                    }
                }


            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-navigation/breadcrumb")
        };

    });