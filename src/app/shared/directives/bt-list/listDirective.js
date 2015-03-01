BeetApp
    .directive("btList", function ($compile) {

        var linker = function(scope, element, attrs) {

            element.html("<bt-"+scope.type+"></bt-"+scope.type+">").show() ;

            $compile(element.contents())(scope);
        };

        return {
            restrict: "E",
            link: linker,
            scope: {
                data:'=',
                type:'='
            }
        };



    });