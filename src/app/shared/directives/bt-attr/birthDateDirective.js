BeetApp
    .directive("btBirthDate", function (Common, $compile, $timeout) {


        return {
            //replace: true,
            restrict: 'E',
            compile: function(element, attributes){

                return {
                    pre: function(scope, element, attributes, controller, transcludeFn){
                    },
                    post: function(scope, element, attributes, controller, transcludeFn){
                        $timeout(function(){
                            $("#"+scope.data.group+'_'+ scope.data.description).pickadate({
                                format: 'dd/mm/yyyy',
                                formatSubmit: 'yyyy-mm-dd',
                                labelYearSelect: 'Pick a year from the dropdown',
                                selectMonths: true,
                                selectYears: 100,
                                hiddenName: true,
                                today: 'hoje',
                                clear: 'limpar',
                                close: 'fechar',
                                onOpen: function() {
                                    $("#"+scope.data.group+'_'+ scope.data.description).find("input").val(".");
                                    $("#"+scope.data.group+'_'+ scope.data.description).find("input").trigger("focus");
                                }
                            });
                        });

                    }
                }
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
        };

    });
