MyApp
    .controller('ExpenseCompanyController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q, $mdDialog) {
        $scope.loadingFeature = true;
        var now = new Date();
        var initialDate;
        var finalDate;
        if (initialDate==undefined){
            initialDate = now.getFullYear();
            if ((now.getMonth()+1).toString().length==1){
                initialDate = initialDate + "-" + "0" + (parseInt(now.getMonth())+1).toString();
            }else{
                initialDate = initialDate + "-" + (parseInt(now.getMonth())+1).toString();
            }
            initialDate = initialDate + "-01";
        }

        if (finalDate==undefined){
            finalDate = now.getFullYear();
            if ((now.getMonth()+2).toString().length==1){
                finalDate = finalDate + "-" + "0" + (parseInt(now.getMonth())+2).toString();
            }else{
                finalDate = finalDate + "-" + (parseInt(now.getMonth())+2).toString();
            }
            finalDate = finalDate + "-01";
        }
        $scope.initialDate = initialDate;
        $scope.finalDate = finalDate;

        $scope.list = function(){
            $rootScope._app.sidebar.right.unLoad();
            $scope.edit({uuid:$rootScope.session.user.company});
        };

        $scope.edit = function(company){
            $scope.loadingFeature = true;
            GlobalService.getAllAttributes('expense_company').then(function(attributeResponse){
                GlobalService.getOne('expense_company', company.uuid).then(function(expenseResponse){

                    $scope.company = company;
                    $scope.selected = company.uuid;

                    $scope.expenses = expenseResponse.data;
                    $scope.loadingFeature = false;

                    $scope.mode = "edit";
                    $scope.formData = attributeResponse.data;
                });
            });
        };


        $scope.getExpenseValue = function(item){
            var value = 0;
            angular.forEach(item.detail, function(detail){
                if (Common.isEmpty(detail.attributes.expense_detail_data.value)){
                    detail.attributes.expense_detail_data.value = 0;
                }
                if (Common.isEmpty(detail.attributes.expense_detail_data.quantity)){
                    detail.attributes.expense_detail_data.quantity = 1;
                }
                value += parseFloat(detail.attributes.expense_detail_data.value.replace(",",".")) * parseFloat(detail.attributes.expense_detail_data.quantity);
            });
            return value;
        };
        $scope.editExpense = function(expense, $event){
            $scope.expense = expense;
            if (Common.isEmpty(expense.uuid)){
                $scope.expense = {
                    "attributes":{
                        "expense_data":{}
                    },
                    "detail":[
                        {
                            "attributes":{
                                "expense_detail_data":{}
                            }
                        }
                    ]
                };
            }
            $scope.showDialog($event);
        };
        $scope.showDialog = function($event){
            $mdDialog.show({
                targetEvent: $event,
                locals: {
                    expense: $scope.expense,
                    formData:$scope.formData
                },
                controller: DialogController,
                templateUrl:"app/features/expense/expenseEditView.html"
            }).then(function(blnSave) {

                if (blnSave){
                    save($scope.expense);
                }

            });
        };


        function save(obj){
            $scope.loadingFeature = true;
            var blnSave = true;

            var objSave = {};
            var mode = "create";
            if (!Common.isEmpty($scope.expense.uuid)){
                mode = "update";
                objSave.uuid = $scope.expense.uuid;
            }
            $scope.expense.attributes.expense_data.date = formatDate($scope.expense.attributes.expense_data.date);
            objSave.attribute = Common.getNewAttributeObj($scope.formData.expense_data, $scope.expense);
            objSave.company = $scope.company.uuid;

            GlobalService.save("expense_company", mode, objSave).then(function (response) {

                if (Common.isEmpty(response.error)) {

                    angular.forEach($scope.expense.detail, function(detail){
                        detail.attributes.expense_detail_data.value = formatCurrency(detail.attributes.expense_detail_data.value);
                        detail.attribute = Common.getNewAttributeObj($scope.formData.detail.expense_detail_data, detail);
                        delete detail.attributes;
                        detail.expense_company = response.data.uuid[0];
                    });

                    GlobalService.save("expense_company_detail", "save", $scope.expense.detail).then(function (responseDetail) {
                        if (Common.isEmpty(responseDetail.error)) {
                            Common.showMessage("Despesa cadastrada com sucesso !", "success");
                            $scope.list();
                        } else {
                            console.log("Ocorreu um erro ao cadastrar o detalhe da despesa.");
                            $scope.list();
                        }
                    });

                } else {
                    console.log("Ocorreu um erro ao cadastrar a despesa.");
                    $scope.list();
                }
            });



        };
        function formatDate(date, format){
            if (format=="dd/mm/yyyy"){
                var arr = date.split("-");
                return arr[2] + "/" + arr[1] + "/" + arr[0];
            }else{
                if (date.indexOf("/")>0){
                    var arr = date.split("/");
                    return arr[2] + "-" + arr[1] + "-" + arr[0];
                }else{
                    return date;
                }

            }

        }
        function formatCurrency(value){
            if (Common.isEmpty(value)){
                value = "0";
            }
            value = value.toString().replace(".","").replace(",", "");

            if (value.length==1 || value.length==2){
                value += ".00";
            }else if (value.length==3){
                value = value.substr(0, 1) + "." + value.substr(1, 2);
            }else{
                value = value.substr(0, value.length-2) + "." + value.substr(value.length-2, value.length-1);
            }
            return value;
        }

        function DialogController($scope, $mdDialog, expense, formData, $timeout) {
            $scope.formData = formData;
            $scope.expense = expense;
            $scope.save = function() {
                $timeout(function(){
                    $scope.$apply();
                });
                $mdDialog.hide(true);
            };
            $scope.cancel = function() {
                $mdDialog.hide(false);
            };
            $scope.add = function() {
                $scope.expense.detail.push({
                    "attributes":{
                        "expense_detail_data":{}
                    }
                });
            };
            $scope.remove = function(index) {
                $scope.expense.detail.splice(index, 1);
            };
        }

        $scope.formatDateToLabel = function(date){
            var arrDate = date.split("-");
            var arr = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
            return arr[arrDate[1]-1] + " / " + arrDate[0];
        };

        $scope.visibleDate = function(date){
            var arrDate = date.split("-");
            var arrInitialDate = $scope.initialDate.split("-");
            return (arrDate[0] == arrInitialDate[0] && arrDate[1] == arrInitialDate[1]);
        };
        $scope.next = function() {
            var arr;

            var initialDate = $scope.initialDate;
            arr = initialDate.split("-");
            if (parseInt(arr[1])==12){
                arr[1] = "01";
                arr[0] = (parseInt(arr[0]) + 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) + 1).toString();
            }
            initialDate = arr[0];
            if ((arr[1]).toString().length==1){
                initialDate = initialDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                initialDate = initialDate + "-" + (parseInt(arr[1])).toString();
            }
            initialDate = initialDate + "-01";


            var finalDate = $scope.finalDate;
            arr = finalDate.split("-");
            if (parseInt(arr[1])==12){
                arr[1] = "01";
                arr[0] = (parseInt(arr[0]) + 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) + 1).toString();
            }
            finalDate = arr[0];
            if ((arr[1]).toString().length==1){
                finalDate = finalDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                finalDate = finalDate + "-" + (parseInt(arr[1])).toString();
            }
            finalDate = finalDate + "-01";

            $scope.initialDate = initialDate;
            $scope.finalDate = finalDate;
        };
        $scope.prev = function() {
            var arr;

            var initialDate = $scope.initialDate;
            arr = initialDate.split("-");
            if (parseInt(arr[1])==1){
                arr[1] = "12";
                arr[0] = (parseInt(arr[0]) - 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) - 1).toString();
            }
            initialDate = arr[0];
            if ((arr[1]).toString().length==1){
                initialDate = initialDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                initialDate = initialDate + "-" + (parseInt(arr[1])).toString();
            }
            initialDate = initialDate + "-01";


            var finalDate = $scope.finalDate;
            arr = finalDate.split("-");
            if (parseInt(arr[1])==1){
                arr[1] = "12";
                arr[0] = (parseInt(arr[0]) - 1).toString();
            }else{
                arr[1] = (parseInt(arr[1]) - 1).toString();
            }
            finalDate = arr[0];
            if ((arr[1]).toString().length==1){
                finalDate = finalDate + "-" + "0" + (parseInt(arr[1])).toString();
            }else{
                finalDate = finalDate + "-" + (parseInt(arr[1])).toString();
            }
            finalDate = finalDate + "-01";

            $scope.initialDate = initialDate;
            $scope.finalDate = finalDate;
        };
        $scope.list();
    });
