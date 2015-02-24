BeetApp
  .factory('GlobalService', function(Gateway) {
    var service = {
      getAttributes : function(feature, uuid){
        uuid = (!uuid) ? "" : "/" + uuid;
        return Gateway.get("/attribute/" + feature + uuid);
      },
      save : function(feature, mode, obj){
        return Gateway.post("/"+feature+"/"+mode, obj);
      },
      getAll : function(feature){
        return Gateway.get("/"+feature+"/all");
      },
      get : function(feature){
        return Gateway.get("/"+feature);
      },
      getAllByUser : function(feature, uuid){
        uuid = (!uuid) ? "" : "/" + uuid;
        return Gateway.get("/"+feature+"/all-by-user" + uuid);
      }

    };
    return service;
  });
