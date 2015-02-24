BeetApp.directive('tabNext',function() {

  var linkFn = function(scope,element,attrs) {
    element.bind("keydown", function(event) {
      if(event.which === 9) {
        scope.$apply(function() {
            $(element).parents().next().find("input").focus();
        });
        event.preventDefault();
      }
    });
  };

  return {
    link:linkFn
  };
});
