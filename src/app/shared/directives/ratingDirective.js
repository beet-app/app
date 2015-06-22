MyApp
    .directive("rating", function (Common, $compile, $rootScope, $state) {
        return {
            restrict: 'E',
            scope: {
                data:"=",
                action:"=",
                size:"@"
            },
            link: function(scope, element) {
                if (Common.isEmpty(scope.data.score)){
                    scope.data.score = 0;
                }
                if (Common.isEmpty(scope.size)){
                    scope.size = 5;
                }
                scope.levels = new Array(scope.size);
                scope.hover = new Array(scope.size);
                scope.showHover = function(index){
                    for (var x=0 ; x<index+1 ; x++){
                        scope.hover[x] = true;
                    }
                };
                scope.clearHover = function(index){
                    scope.hover = new Array(scope.size);
                };
                scope.rate = function(level){
                    scope.data.score = level;
                    scope.action(scope.data);
                };
            },
            templateUrl: Common.getDirectiveTemplateUrl("rating")
        };

    });