﻿BeetApp
  .directive("btSimpletext", function (Common, $compile) {


    return {
      //replace: true,
      restrict: 'E',
      link: function(scope, element) {
        scope.type = "text";
      },
      templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
    };

  });
