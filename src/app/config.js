"use strict";
BeetApp.config(function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
      prefix: "/assets/languages/",
      suffix: ".json"
    }
  );
  $translateProvider.preferredLanguage("pt_br");
});

BeetApp
  .factory("Config", ["$rootScope",function () {
    var factory = {
      getApiUrl : function () {
        //return "http://beetapi.herokuapp.com/api";
        //return "http://192.168.16.58:1313/api";
        //return "http://api.beet.cc/api";
        return "http://127.0.0.1:1313/api";
      },
      getUploadUrl : function () {
        return "https://s3-us-west-2.amazonaws.com/upload.beet.cc";
      }
    };
    return factory;
  }]);



