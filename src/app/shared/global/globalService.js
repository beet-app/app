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
            },
            getTheme : function(name){
                return Gateway.getLocal("assets/themes/"+name+"_theme.json");
            },
            getColor : function(name) {
                return Gateway.getLocal("assets/colors/" + name + "_color.json");
            },
            getAllByFilteredAttributes : function(feature, obj){
                return Gateway.post("/"+feature+"/all-by-attributes", obj);
            }
        };
        return service;
    });
