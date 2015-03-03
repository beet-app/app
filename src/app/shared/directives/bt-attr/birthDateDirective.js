BeetApp
    .directive("btBirthDate", function (Common, $compile, $timeout) {


        return {
            //replace: true,
            restrict: 'E',
            compile: function(element, attributes){

                return {
                    pre: function(scope, element, attributes, controller, transcludeFn){
                        scope.label = scope.data.description;
                    },
                    post: function(scope, element, attributes, controller, transcludeFn){
                        $timeout(function(){
                            $("#"+scope.data.group+'_'+ scope.data.description).find("input").pickadate({
                                format: 'dd/mm/yyyy',
                                formatSubmit: 'yyyy-mm-dd',
                                selectYears: true,
                                monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
                                monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
                                weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
                                weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
                                today: 'hoje',
                                clear: 'limpar',
                                close: 'fechar',
                                onOpen: function() {
                                    $("#"+scope.data.group+'_'+ scope.data.description).find("input").val(".");
                                    $("#"+scope.data.group+'_'+ scope.data.description).find("input").trigger("focus");
                                }
                            });
                            $("#" + scope.data.group+'_'+ scope.data.description).click(function(){
                                $(this).val(Common.isEmpty($(this).val()) ? "teste" : $(this).val());
                            });
                        });

                    }
                }
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/date")
        };

    });
