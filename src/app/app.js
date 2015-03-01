"use strict";
var BeetApp = angular.module("BeetApp", ["ngCookies","ngSanitize","ui.router","pascalprecht.translate","ngAnimate", "ngMaterial", "ngAnimate"]);

BeetApp
    .controller("AppController", function($scope, $rootScope, Common, UserService, CompanyService, btApp) {

        UserService.getActiveUser().then(function(response){

            if (Common.isEmpty(response.error)){
                var user = response.data;

                //UserService.getSessionData().then(function(){

                //});
                $rootScope.session = {user:response.data};


                btApp.init().then(function(){
                    if (Common.isEmpty(user.company)){
                        $rootScope.singleViewMode = true;
                        Common.goTo("company/select");
                    }else{

                        CompanyService.choose({company:user.company}).then(function(response){
                            $rootScope.session.features = response.data;
                            $rootScope.fullViewMode = true;
                        });
                    }
                });



                /*
                 $rootScope.session = {user:response.data};



                 $rootScope.singleViewMode = true;

                 $location.path($state.current.url);
                 setTimeout(function(){
                 $("#loadingApp").fadeOut("fast");
                 $("#single-view").fadeIn("slow");
                 },1000);
                 }else{


                 Common.goTo("login");
                 setTimeout(function(){
                 $("#loadingApp").fadeOut("fast");
                 $("#single-view").fadeIn("slow");
                 },1000);
                 */
            }else{
                $rootScope.singleViewMode = true;
                Common.goTo("login");
            }



        });
    });

BeetApp
    .factory("btApp", function($rootScope, $q, Common, UserService, CompanyService, GlobalService) {


        var factory = {

            init: function () {
                var defer = $q.defer();

                $rootScope.sidebar = {
                    left:{

                    },
                    right:{
                        feature:{
                            selected:false
                        },
                        notifications:{
                            selected:false
                        },
                        configs:{
                            selected:false
                        },
                        user:{
                            selected:false
                        }
                    }
                };

                GlobalService.getTheme("default").then(function(response){
                    $rootScope.theme = response.data;
                    GlobalService.getColor("default").then(function(response){
                        $rootScope.colors = response.data;

                        $rootScope.ready = true;

                        defer.resolve(true);
                    });

                });




                return defer.promise;

            }
        }
        return factory;

    });
