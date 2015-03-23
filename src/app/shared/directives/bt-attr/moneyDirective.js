BeetApp
    .directive("btMoney", function (Common, $compile, $timeout) {


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
                            $("#" + scope.data.group + '_' + scope.data.description).keyup(function(){
                                var v = $(this).val();
	                            v=v.replace(/\D/g,"");//Remove tudo o que não é dígito
	                            v=v.replace(/(\d)(\d{8})$/,"$1.$2");//coloca o ponto dos milhões
	                            v=v.replace(/(\d)(\d{5})$/,"$1.$2");//coloca o ponto dos milhares
	                            v=v.replace(/(\d)(\d{2})$/,"$1,$2");//coloca a virgula antes dos 2 últimos dígitos
                                $(this).val(v);
                            });
                        });

                    }
                };
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
        };

    });
