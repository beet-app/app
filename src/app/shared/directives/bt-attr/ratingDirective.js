MyApp
    .directive("btRating", function (Common, $compile) {
        return {
            restrict: 'E',
            link: function(scope, element) {
                if (Common.isEmpty(scope.size)){
                    scope.size = 5;
                }
                if (Common.isEmpty(scope.ngModel)){
                    scope.ngModel = 0;
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
                    scope.ngModel = level;
                };
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/rating")
        };

    });