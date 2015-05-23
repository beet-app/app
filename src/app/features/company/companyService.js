MyApp
    .factory('CompanyService', function($http, Config, Gateway) {
      var service = {
        choose : function(obj){
          obj.email = "example@email.com";
          obj.password = "anything";

                return Gateway.post("/company/choose", obj);


        }

      };
      return service;
    });
