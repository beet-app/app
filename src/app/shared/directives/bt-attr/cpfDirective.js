MyApp
    .directive("btCpf", function (Common, $compile, $timeout) {


        return {
            //replace: true,
            restrict: 'E',
            compile: function(element, attributes) {

                return {
                    pre: function (scope, element, attributes, controller, transcludeFn) {
                        scope.type = "text";
                    },
                    post: function (scope, element, attributes, controller, transcludeFn) {
                        $timeout(function () {
                            $("#" + scope.data.group + '_' + scope.data.description).attr("maxlength","14");
                            $("#" + scope.data.group + '_' + scope.data.description).keypress(function(){
                                var v = $(this).val();
                                v=v.replace(/\D/g,"").replace(/(\d{3})(\d)/,"$1.$2");
                                v=v.replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2");
                                $(this).val(v);
                            });
                        });

                    }
                };
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
        };

    });
