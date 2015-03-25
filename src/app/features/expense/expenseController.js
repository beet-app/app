﻿BeetApp
	.controller('ExpenseController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q, $mdDialog) {
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
            GlobalService.get('person').then(function(response){

                if (!response.error){
                    $scope.data = response.data;

                    if (Common.isEmpty($stateParams.uuid)){
                        $scope.loadingFeature = false;
                        $scope.mode = "list";
                    }else{
	                    var objFind = null;
	                    angular.forEach($scope.data, function(element){
		                    if (element.uuid==$stateParams.uuid){
			                    objFind = element;
		                    }
	                    });
	                    if (Common.isEmpty(objFind)){
		                    $scope.loadingFeature = false;
		                    $scope.mode = "list";
                        }else{
		                    $scope.edit(objFind);
	                    }

                    }
                }
            });
        };

        $scope.edit = function(person){
            $scope.loadingFeature = true;
            GlobalService.getAllAttributes('expense_person').then(function(attributeResponse){
	            GlobalService.getOne('expense_person', person.uuid).then(function(expenseResponse){
		            $rootScope._app.sidebar.right.load("expense", $scope.data);



		            $scope.person = person;
		            $scope.selected = person.uuid;

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
				value += parseFloat(detail.attributes.expense_detail_data.value);
			});
			return value;
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
			objSave.person = $scope.person.uuid;




			GlobalService.save("expense_person", mode, objSave).then(function (response) {

				if (Common.isEmpty(response.error)) {

					angular.forEach($scope.expense.detail, function(detail){
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
		function formatDate(date, format){
			if (format=="dd/mm/yyyy"){
				arr = date.split("-");
				return arr[2] + "/" + arr[1] + "/" + arr[0];
			}else{
				arr = date.split("/");
				return arr[2] + "-" + arr[1] + "-" + arr[0];
			}

		}
		function DialogController($scope, $mdDialog, expense, formData) {
			$scope.formData = formData;
			$scope.expense = expense;
			$scope.save = function() {
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
			arrDate = date.split("-");
			var arr = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
			return arr[arrDate[1]-1] + " / " + arrDate[0];
		};

        $scope.list();
    });