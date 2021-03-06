﻿"use strict";
/*
 MyApp.factory('errorInterceptor', ['$q', '$rootScope', '$location',
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
MyApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
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
            controller: "LoginController",
            resolve:{
                viewMode:  function(){
                    return "login";
                }
            }
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



        .state("movie", {
            url: "/movie",
            templateUrl: "app/features/movie/movieView.html",
            controller: "MovieController"
        })
        .state("movie/edit", {
            url: "/movie/:uuid",
            templateUrl: "app/features/movie/movieView.html",
            controller: "MovieController"
        })

        .state("category", {
            url: "/category",
            templateUrl: "app/features/category/categoryView.html",
            controller: "CategoryController"
        })
        .state("category/edit", {
            url: "/category/:uuid",
            templateUrl: "app/features/category/categoryView.html",
            controller: "CategoryController"
        })

        .state("home", {
            url: "/main",
            templateUrl: "app/features/main/mainView.html",
            controller: "MainController"
        })



        .state("expense-person", {
            url: "/expense-person",
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
        .state("exam", {
            url: "/exam",
            templateUrl: "app/features/exam/examView.html",
            controller: "ExamController"
        })
        .state("exam/edit", {
            url: "/exam/:uuid",
            templateUrl: "app/features/exam/examView.html",
            controller: "ExamController"
        })
        .state("candidate", {
            url: "/candidate",
            templateUrl: "app/features/exam/candidateView.html",
            controller: "CandidateController"
        })
        .state("candidate/exam", {
            url: "/candidate/exam/:uuid",
            templateUrl: "app/features/candidate/candidateView.html",
            controller: "CandidateController"
        })
        .state("candidate/exam/edit", {
            url: "/candidate/exam/:uuid/:candidate_uuid",
            templateUrl: "app/features/candidate/candidateView.html",
            controller: "CandidateController"
        })
        .state("exam/rating", {
            url: "/exam/rating/view",
            templateUrl: "app/features/exam/examRatingView.html",
            controller: "ExamRatingController"
        })
        .state("exam/rating/view", {
            url: "/exam/rating/view/:uuid",
            templateUrl: "app/features/exam/examRatingView.html",
            controller: "ExamRatingController"
        })
    ;
});










