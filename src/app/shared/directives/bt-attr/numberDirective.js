BeetApp
  .directive("btNumber", function (Common, $compile) {


    return {
      //replace: true,
      restrict: 'E',
      link: function(scope, element) {
        scope.type = "number";
      },
      templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
    };

  });
