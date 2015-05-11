MyApp
  .directive("btEmail", function (Common, $compile) {


    return {
      //replace: true,
      restrict: 'E',
      compile: function(element, attributes){

        return {
          pre: function(scope, element, attributes, controller, transcludeFn){
            scope.type = "email";
          },
          post: function(scope, element, attributes, controller, transcludeFn){

          }
        }
      },
      templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
    };

  });
