MyApp
    .directive("btDatetime", function (Common, $compile, $timeout) {


        return {
            //replace: true,
            restrict: 'E',
            compile: function(element, attributes){

                return {
                    pre: function(scope, element, attributes, controller, transcludeFn){
	                    scope.type="datetime";
                    },
                    post: function(scope, element, attributes, controller, transcludeFn){


                    }
                }
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/datetime")
        };

    });
