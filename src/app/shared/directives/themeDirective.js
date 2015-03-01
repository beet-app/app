BeetApp
    .directive('btTheme', ["$compile","Common",function ($compile, Common) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var object = element[0];

                var theme = Common.getTheme(attr.btTheme);

                var check_value = function(v){
                    if (v.indexOf("color.")>-1){
                        return Common.getColor(v.replace("color.",""));
                    }else{
                        return v;
                    }

                };
                angular.forEach(theme, function(value, key){
                    if (key=="style"){
                        var style = (object.getAttribute("style")) ? object.getAttribute("style") : "";
                        angular.forEach(theme["style"], function(cssValue, cssKey){
                            style += cssKey+":"+check_value(cssValue)+";";
                        });
                        object.setAttribute("style" ,style);
                    }else if (typeof (value)!="object"){
                        object.setAttribute(key, check_value(value));
                    }

                });

                object.removeAttribute("bt-theme");

                if (object.nodeName=="BT-BUTTON"){
                    element.html(object.outerHTML);
                    $compile(element.contents())(scope);
                }
            }
        };
    }]);
