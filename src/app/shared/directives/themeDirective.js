
BeetApp
    .directive('btTheme', ["$compile","Common",function ($compile, Common) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var object = element[0];

                var theme = Common.getTheme(attr.btTheme);

                angular.forEach(theme, function(value, key){
                    object.setAttribute(key ,value);
                });

                object.removeAttribute("bt-theme");

                //object.style.backgroundColor = "red";
                //object.attributes.append("asd");
                //attr.icon = "action.grade";
console.log(angular.element(object));
                //element.html("<bt-"+scope.data.type.description+" class='fill-horizontal'></bt-"+scope.data.type.description+">").show() ;
                element.html(object.outerHTML);
                $compile(element.contents())(scope);
                //attr.icon="action.grade";
                //$(element).attr("icon","action.grade");
                //object.style.backgroundColor = "white";
                //var template = "";
                //var linkFn = $compile(object.outerHTML);
                //var content = linkFn(scope);
                //element.append(content);
            }
        };
    }]);
