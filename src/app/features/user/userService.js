BeetApp
  .factory('UserService', function($http, Config, Gateway) {
    var service = {
      checkLogin : function(obj){
        return Gateway.post("/login", obj);
      },
      getActiveUser : function(){
        return Gateway.get("/login");
      },
      validateUser : function(obj){
        return Gateway.post("/user/validate", obj);
      },
      save : function(obj){
        return Gateway.post("/signup", obj);
      }
    };
    return service;
  });
