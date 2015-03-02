BeetApp
    .directive("btBirthDate", function (Common, $compile, $timeout) {


        return {
            //replace: true,
            restrict: 'E',
            compile: function(element, attributes){

                return {
                    pre: function(scope, element, attributes, controller, transcludeFn){
                        scope.label = scope.data.description;
                        //scope.type = "password";
                        scope.timestamp = Common.getTimestamp();
                        console.log(scope.timestamp);
                    },
                    post: function(scope, element, attributes, controller, transcludeFn){
                        console.log(scope.timestamp);
                        $compile(element.contents())(scope);
                        $timeout(function(){
                            $("#date"+scope.timestamp).pickadate({
                                format: 'dd/mm/yyyy',
                                formatSubmit: 'yyyy-mm-dd',
                                selectYears: true,
                                monthsFull: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
                                monthsShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
                                weekdaysFull: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
                                weekdaysShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab' ],
                                today: 'hoje',
                                clear: 'limpar',
                                close: 'fechar'
                            });
                        });

                    }
                }
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/date")
        };

    });
