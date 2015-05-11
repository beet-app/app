MyApp
    .directive("btEditor", function (Common, $compile, $timeout) {


        return {
            //replace: true,
            restrict: 'E',
            compile: function(element, attributes) {

                return {
                    pre: function (scope, element, attributes, controller, transcludeFn) {
	                    scope.editorOptions = {
		                    language: 'pt-br',
		                    allowedContent: true,
		                    entities: false,
		                    height:"256px"
	                    };
                    },
                    post: function (scope, element, attributes, controller, transcludeFn) {


                    }
                };
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/editor")
        };

    });
