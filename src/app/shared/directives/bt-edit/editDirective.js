MyApp
    .directive("btEdit", function (Common, $compile, $rootScope, $state) {
        return {
            restrict: 'E',
            transclude:true,
            scope: {
                data:"="
            },
            link: function(scope, element) {

                var parent = scope.$parent;
                var attributeData = [];
                if (Common.isEmpty(scope.data)){
                    scope.data = {} ;
                }

                if (!Common.isEmpty(parent.attributeData)){
                    attributeData = parent.attributeData;
                }

                if (Common.isEmpty(scope.data.mirror)){
                    if (!Common.isEmpty(attributeData[0])){
                        scope.data.mirror = attributeData[0].description;
                    }
                }
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-edit/edit")
        };

    });