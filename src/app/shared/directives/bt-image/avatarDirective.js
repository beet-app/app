BeetApp
    .directive("btAvatar2", function (Common, $compile) {

        var linker = function(scope, element, attrs) {
            console.log("asdasd");


            $compile(element.contents())(scope);
        };

        return {
            replace: true,
            restrict: 'E',
            scope: { feature: '@', company: '@',uuid: '@', scale: '@', class: '@', width:'@', height:'@'}, //, options: '=', placeholder: '@', ngModel: '='
            templateUrl:"app/shared/directives/avatarView.html",
            compile: function(tElem,attrs) {
                //do optional DOM transformation here
                return {
                    pre: function (scope, elem, attrs) {
                        scope.url = Common.getUploadUrl();

                        if (scope.feature === "company"){
                            scope.url += "/company/"+scope.company+"/logo.png"
                        } else if (scope.feature === "contract"){
                            scope.url += "/contract/contract-icon.png"
                        } else{
                            scope.url += "/company/"+scope.company+"/"+scope.feature+"/"+scope.uuid+".png"
                        }
                    },
                    post: function (scope, elem, attrs) {
                        scope.$watch('photo', function (newValue) {
                            Common.isValidImage(attrs.url).success(function () {
                                $("[url='" + attrs.url + "']").attr("src", attrs.url);
                            }).error(function () {
                                $("[url='" + attrs.url + "']").attr("src", Common.getUploadUrl() + "/company/default.png");
                            });
                        });
                    }
                }
            }
        }
    });