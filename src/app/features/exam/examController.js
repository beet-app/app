BeetApp
    .controller('ExamController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q, $mdDialog) {
        $scope.loadingFeature = true;

        var now = new Date();
        var initialDate;
        var finalDate;

        if (initialDate == undefined){
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
            $scope.edit();
        };

        $scope.edit = function(uuid){
            $scope.loadingFeature = true;
            uuid = (Common.isEmpty(uuid)) ? 333 : uuid;
            GlobalService.getAttributes('exam', uuid).then(function(response){
                $scope.loadingFeature = false;
                $scope.mode = "edit";
                $scope.formData = response.data;
            });
        };

        $scope.save = function(){
            $scope.loadingFeature = true;
            var blnSave = true;
            angular.forEach($scope.data.person_data, function(attribute){
                if (blnSave){
                    if (attribute.required===1 && Common.isEmpty(attribute.value)){
                        $scope.loadingFeature = false;
                        Common.showMessage("Preencha o campo "+attribute.description+" !", "warning");
                        blnSave = false;
                        $scope.creatingCompany = false;
                    }
                }
            });

            if (blnSave) {
                var objSave = {};
                var mode = "create";
                if (!Common.isEmpty($scope.uuid)){
                    mode = "update";
                    objSave.uuid = $scope.uuid;
                }
                objSave.attribute = Common.getAttributeObj($scope.formData);
                objSave.company = Common.isEmpty($rootScope.session.user.company) ? $rootScope.session.user.companies[0].uuid : $rootScope.session.user.company;

                GlobalService.save("person", mode, objSave).then(function (response) {

                    if (Common.isEmpty(response.error)) {
                        Common.showMessage("Atleta cadastrado com sucesso !", "success");
                        Common.goTo("person");

                    } else {
                        alert("Ocorreu um erro ao cadastrar o atleta.");
                    }
                });

            }
        };

        $scope.editExam = function(exam, $event){
            $scope.exam = exam;
            if (Common.isEmpty(exam.uuid)){
                $scope.exam = {
                    "attributes":{
                        "exam_data":{}
                    },
                    "candidates":[
                        {
                            "attributes":{
                                "candidate_data":{}
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
                    exam: $scope.exam,
                    formData:$scope.formData
                },
                controller: DialogController,
                templateUrl:"app/features/exam/examEditView.html"
            }).then(function(blnSave) {

                if (blnSave){
                    save($scope.exam);
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
            objSave.person = $scope.person.uuid;

            GlobalService.save("expense_person", mode, objSave).then(function (response) {

                if (Common.isEmpty(response.error)) {

                    angular.forEach($scope.expense.detail, function(detail){
                        detail.attributes.expense_detail_data.value = formatCurrency(detail.attributes.expense_detail_data.value);
                        detail.attribute = Common.getNewAttributeObj($scope.formData.detail.expense_detail_data, detail);
                        delete detail.attributes;
                        detail.expense_person = response.data.uuid[0];
                    });

                    GlobalService.save("expense_person_detail", "save", $scope.expense.detail).then(function (responseDetail) {
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

        function DialogController($scope, $mdDialog, exam, formData, $timeout) {
            $scope.formData = formData;
            $scope.exam = exam;
            $scope.save = function() {
                $timeout(function(){
                    $scope.$apply();
                });
                $mdDialog.hide(true);
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.add = function() {
                $scope.exam.detail.push({
                    "attributes":{
                        "expense_detail_data":{}
                    }
                });
            };
            $scope.remove = function(index) {
                $scope.exam.detail.splice(index, 1);
            };
        };

        $scope.visibleDate = function(date){
            var arrDate = date.split("-");
            var arrInitialDate = $scope.initialDate.split("-");
            return (arrDate[0] == arrInitialDate[0] && arrDate[1] == arrInitialDate[1]);
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
        };

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
        };

        $scope.list();
    });