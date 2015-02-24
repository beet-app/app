"use strict";
var BeetApp = angular.module("BeetApp", ["ngCookies","ngSanitize","ui.router","pascalprecht.translate","ngAnimate", "ngMaterial", "ngAnimate"]);

BeetApp
  .controller("AppController", function($scope, $rootScope, Common, UserService, CompanyService) {

    UserService.getActiveUser().then(function(response){

      if (Common.isEmpty(response.error)){
        var user = response.data;


        $rootScope.session = {user:response.data};

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

        if (Common.isEmpty(user.company)){
          $rootScope.singleViewMode = true;
          Common.goTo("company/select");
        }else{

          CompanyService.choose({company:user.company}).then(function(response){

            $rootScope.session.features = response.data;
            $rootScope.fullViewMode = true;
          });

        }
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
