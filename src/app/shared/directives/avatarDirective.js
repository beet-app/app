BeetApp
    .directive("btAvatar", function (Common, $timeout) {
        return {
            replace: true,
            restrict: 'E',
            scope: { feature: '@', photo: '@', scale: '@', btClass: '@', width:'@', height:'@'},
            templateUrl:Common.getDirectiveTemplateUrl("avatar"),
            compile: function(tElem,attrs) {
                return {
                    pre: function (scope, elem, attrs) {
                        var url = Common.getUploadUrl() +"/" + scope.feature + "/" + scope.photo + ".png";
                        $timeout(function(){
                            Common.isValidImage(Common.getUploadUrl() +"/" + scope.feature + "/" + scope.photo + ".png")
                                .success(function () {
                                    scope.url = url;
                                })
                                .error(function () {
                                    scope.url = Common.getUploadUrl() +"/" + scope.feature + "/default.png";
                                });
                        });

                    }

                }
            }
        }
    });