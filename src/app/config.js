"use strict";
MyApp.config(function($translateProvider, $mdThemingProvider) {
  $translateProvider.useStaticFilesLoader({
      prefix: "/assets/languages/",
      suffix: ".json"
    }
  );
  $translateProvider.preferredLanguage("pt_br");

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey', {
            'default': '900'
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('brown', {
            'default': '900' // use shade 200 for default, and keep all other shades the same
        });
});

MyApp
  .factory("Config", ["$rootScope",function () {
    var factory = {
      getApiUrl : function () {
        //return "http://beetapi.herokuapp.com/api";
        //return "http://192.168.16.58:1313/api";
        return "http://api.beet.com.br/api";
          //return "http://192.168.25.32:1313/api";
          //return "http://192.168.16.127:1313/api";
          //return "http://localhost:1313/api";
      },
      getUploadUrl : function () {
        return "https://s3-us-west-2.amazonaws.com/upload.beet.com.br";
        //return "http://localhost:3000/assets/images/uploads";
      }
    };
    return factory;
  }]);



