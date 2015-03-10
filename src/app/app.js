"use strict";
var BeetApp = angular.module("BeetApp", ["ngCookies","ngSanitize","ui.router","pascalprecht.translate","ngAnimate", "ngMaterial", "ngAnimate"]);

BeetApp
    .controller("AppController", function($scope, $rootScope, Common, UserService, CompanyService, btApp, $mdSidenav, $mdMedia) {

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
                btApp.loadDefaults().then(function(){
                    $rootScope.singleViewMode = true;
                    Common.goTo("login");
                });

            }

	        $rootScope.toogleLeftMenu = function(){
		        if ($mdMedia("gt-md")){
			        $rootScope.session
		        }else{
			        $mdSidenav('left').toggle()
				        .then(function(){
					        //$log.debug("toggle left is done");
				        });
		        }



	        };

        });
    });

BeetApp
    .factory("btApp", function($rootScope, $q, Common, UserService, CompanyService, GlobalService, btFn) {


        var factory = {

            init: function () {
                var defer = $q.defer();

                $rootScope._app = {

					sidebar : {
						left: {
							opened: true
						},
						right: {
							feature: {
								selected: false
							},
							notifications: {
								selected: false
							},
							configs: {
								selected: false
							},
							user: {
								selected: false
							}
						}
					}
                };
                $rootScope.btFn = btFn;
                factory.loadDefaults().then(function(response){
                    defer.resolve(response);
                });




                return defer.promise;

            },
            loadDefaults: function () {
                var defer = $q.defer();


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
        };
        return factory;

    });



BeetApp
    .factory("btFn", function($rootScope, $q, Common, UserService, CompanyService, GlobalService, $translate, $timeout) {


        var factory = {

            getTranslation: function (str) {
                var translation = $translate.instant(str);
                if (str==translation){
                    translation = $translate.instant(str+".description");
                }
                if (typeof(translation)=="object"){
                    translation = translation.description;
                }else{
                    translation = translation;
                }
                return translation;

            },
            changeCompany : function(intIndex) {
                $rootScope.session.menus = $rootScope.session.companies[intIndex].menus;
                $rootScope.session.company = $rootScope.session.companies[intIndex];
                $("#modal-companies-close").trigger("click");
                $scope.toggleDialog();
                $location.path('home');

            },
            changeMenu : function(menu) {
                $rootScope.session.menu = menu;
                $location.path(menu.url);
            },
            changeLanguage : function (key) {
                $translate.use(key);
            },
            toggleDialog : function(strDialog){
                if ($rootScope.dialogCompany){
                    $rootScope.dialogCompany = false;
                }else{
                    $rootScope.dialogCompany = true;
                }

                //var d = document.querySelector("#" + strDialog);
                //d.toggle();
            },
            changeViewMode : function(mode){
                if (mode=="simple_item"){
                    $rootScope.session.currentFeature.viewMode = "card";
                }else if (mode=="post_card"){
                    $rootScope.session.currentFeature.viewMode = "simple_item";
                }else{
                    $rootScope.session.currentFeature.viewMode = "post_card";
                }
                $timeout(function(){
                    $rootScope.$apply();
                });
            }
        };
        return factory;

    });
