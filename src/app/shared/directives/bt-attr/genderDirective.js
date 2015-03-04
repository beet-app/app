BeetApp
  .directive("btGender", function (Common, $compile) {


    return {
      //replace: true,
      restrict: 'E',
      link: function(scope, element) {
        //scope.label = scope.data.description;
        scope.type = "text";
      },
      templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
    };

  });
