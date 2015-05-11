MyApp
    .directive("btDate", function (Common, $compile, $timeout) {

		function formatDate(date, format){
			if (format=="dd/mm/yyyy"){
				arr = date.split("-");
				return arr[2] + "/" + arr[1] + "/" + arr[0];
			}else{
				arr = date.split("/");
				return arr[2] + "-" + arr[1] + "-" + arr[0];
			}

		}
        return {
            //replace: true,
            restrict: 'E',
            compile: function(element, attributes){

                return {
                    pre: function(scope, element, attributes, controller, transcludeFn){
                    },
                    post: function(scope, element, attributes, controller, transcludeFn){
	                    /*
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
                        */
	                    $timeout(function () {


		                    var value = $("#" + scope.data.group + '_' + scope.data.description).val();
		                    if (!Common.isEmpty(value)){
			                    $("#" + scope.data.group + '_' + scope.data.description).val(formatDate(value, "dd/mm/yyyy"));
		                    }

		                    $("#" + scope.data.group + '_' + scope.data.description).attr("maxlength","10");
		                    $("#" + scope.data.group + '_' + scope.data.description).keyup(function(){
			                    var v = $(this).val();
			                    v=v.replace(/\D/g,"");
			                    v=v.replace(/(\d{2})(\d)/,"$1/$2");
			                    v=v.replace(/(\d{2})(\d)/,"$1/$2");
			                    v=v.replace(/(\d{2})(\d{2})$/,"$1$2");
			                    $(this).val(v);
		                    });
	                    });

                    }
                }
            },
            templateUrl: Common.getDirectiveTemplateUrl("bt-attr/text")
        };

    });
