MyApp
  .directive("btRadiogroup", function (Common, $compile) {


    return {
      //replace: true,
      restrict: 'E',
      link: function(scope, element) {
          scope.options = scope.data.type.options ? scope.data.type.options : [];
	      scope.orientation = scope.data.orientation ? scope.data.orientation : "column";
      },
      templateUrl: Common.getDirectiveTemplateUrl("bt-attr/radioGroup")
    };

  });
