"use strict";
/*
 BeetApp.factory('errorInterceptor', ['$q', '$rootScope', '$location',
 function ($q, $rootScope, $location) {
 return {
 request: function (config) {
 return config || $q.when(config);
 },
 requestError: function(request){
 return $q.reject(request);
 },
 response: function (response) {
 return response || $q.when(response);
 },
 responseError: function (response) {
 if (response && response.status === 401) {
 $location.url('/login');
 }
 if (response && response.status >= 500) {
 alert("error 500");
 }
 return $q.reject(response);
 }
 };
 }]);
 */
BeetApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.defaults.withCredentials = true;



    $urlRouterProvider.otherwise("/login");

    $stateProvider

        .state("login", {
            url: "/login",
            templateUrl: "app/features/login/loginView.html",
            controller: "LoginController",
            resolve:{
                viewMode:  function(){
                    return "login";
                }
            }
        })
        .state("signup", {
            url: "/signup",
            templateUrl: "app/features/login/loginView.html",
            controller: "LoginController",
            resolve:{
                viewMode:  function(){
                    return "signup";
                }
            }
        })

        .state("index", {
            url: "/login",
            templateUrl: "app/features/login/loginView.html",
            controller: "LoginController"
        })
        .state("user/validate", {
            url: "/user/validate/:uuid",
            templateUrl: "app/features/login/loginValidateView.html",
            controller: "LoginValidateController"
        })

        .state("company/select", {
            url: "/company/select",
            templateUrl: "app/features/company/companySelectView.html",
            controller: "CompanySelectController"
        })
        .state("company/create", {
            url: "/company/create",
            templateUrl: "app/features/company/companyCreateView.html",
            controller: "CompanyController"
        })

        .state("main", {
            url: "/main",
            templateUrl: "app/features/main/mainView.html",
            controller: "MainController"
        })

        .state("person", {
            url: "/person",
            templateUrl: "app/features/person/personView.html",
            controller: "PersonController"
        })
        .state("person/edit", {
            url: "/person/:uuid",
            templateUrl: "app/features/person/personView.html",
            controller: "PersonController"
        })

        .state("expense", {
            url: "/expense",
            templateUrl: "app/features/expense/expenseView.html",
            controller: "ExpenseController"
        })
	    .state("expense/edit", {
		    url: "/expense/:uuid",
		    templateUrl: "app/features/expense/expenseView.html",
		    controller: "ExpenseController"
	    })
        .state("expense-company", {
            url: "/expense-company",
            templateUrl: "app/features/expense-company/expenseCompanyView.html",
            controller: "ExpenseCompanyController"
        })
        .state("expense-company/edit", {
            url: "/expense-company/:uuid",
            templateUrl: "app/features/expense-company/expenseCompanyView.html",
            controller: "ExpenseCompanyController"
        })
        .state("contract", {
            url: "/contract",
            templateUrl: "app/features/contract/contractView.html",
            controller: "ContractController"
        })
        .state("contract/list", {
            url: "/contract/:uuid",
            templateUrl: "app/features/contract/contractView.html",
            controller: "ContractController"
        })
        .state("contract/edit", {
            url: "/contract/params?:group&:uuid",
            templateUrl: "app/features/contract/contractView.html",
            controller: "ContractController"
        })
    ;
});










