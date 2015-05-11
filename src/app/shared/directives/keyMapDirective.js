MyApp.directive('tabNext',function() {

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
MyApp.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
});