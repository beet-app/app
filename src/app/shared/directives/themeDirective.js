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

                //object.style.backgroundColor = "red";
                //object.attributes.append("asd");
                //attr.icon = "action.grade";
<<<<<<< HEAD
=======
                console.log(angular.element(object));
>>>>>>> 0f713d8645ad9b05823b12d3b5ff35b4414c5bf8
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
