BeetApp
    .directive('btTheme', ["$compile","Common",function ($compile, Common) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var object = element[0];
                var theme = Common.getTheme(attr.btTheme);

                var check_value = function(v){
                    if (typeof (v)!="object"){
                        if (v.indexOf("color.")>-1){
                            return Common.getColor(v.replace("color.",""));
                        }
                    }
                    return v;
                };

                angular.forEach(theme, function(value, key){
                    if (key=="style"){
                        var style = (object.getAttribute("style")) ? object.getAttribute("style") : "";
                        angular.forEach(theme["style"], function(cssValue, cssKey){
                            style += cssKey+":"+check_value(cssValue)+";";
                        });
                        object.setAttribute("style" ,style);
                    }else if (key=="bt-style") {
                        var style = "";
                        angular.forEach(value, function(v, key){
                            style += key + ":" + check_value(v) + ";";
                        });
                        object.setAttribute(key, style);
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

/*

 (function() {
 var app = angular.module('store-directives', []);

 app.directive("productDescription", function() {
 return {
 restrict: 'E',
 templateUrl: "product-description.html"
 };
 });

 app.directive("productReviews", function() {
 return {
 restrict: 'E',
 templateUrl: "product-reviews.html"
 };
 });

 app.directive("productSpecs", function() {
 return {
 restrict:"A",
 templateUrl: "product-specs.html"
 };
 });

 app.directive("productTabs", function() {
 return {
 restrict: "E",
 templateUrl: "product-tabs.html",
 controller: function() {
 this.tab = 1;

 this.isSet = function(checkTab) {
 return this.tab === checkTab;
 };

 this.setTab = function(activeTab) {
 this.tab = activeTab;
 };
 },
 controllerAs: "tab"
 };
 });

 app.directive("productGallery", function() {
 return {
 restrict: "E",
 templateUrl: "product-gallery.html",
 controller: function() {
 this.current = 0;
 this.setCurrent = function(imageNumber){
 this.current = imageNumber || 0;
 };
 },
 controllerAs: "gallery"
 };
 });
 })();

*/
