MyApp
    .factory('GlobalService', function(Gateway, Common) {
        var service = {
            getAttributes : function(feature, uuid){
                uuid = (!uuid) ? "" : "/" + uuid;
                return Gateway.get("/attribute/" + feature + uuid);
            },
	        getAttributeFile : function(feature){
		        return Gateway.getLocal("/app/features/" + feature + "/" + feature + "Attribute.json");
	        },
	        getAllAttributes : function(feature){
		        var uuid =  "/sadsasdds";
		        return Gateway.get("/attribute/" + feature + uuid);
	        },
            save : function(feature, mode, obj){
		            return Gateway.post("/"+feature+"/"+mode, obj);
            },
            getAll : function(feature){
                return Gateway.get("/"+feature+"/all");
            },
            get : function(feature, obj){
	            var queryString = "";
	            if (!Common.isEmpty(obj)){
		            angular.forEach(obj, function(value, key){
			            queryString += (queryString=="") ? "?" + key + "=" + value : "&" + key + "=" + value;
		            });
	            }
                return Gateway.get("/"+feature+"/" + queryString);
            },
	        getOne : function(feature, uuid){
		        return Gateway.get("/"+feature+"/"+uuid+"/");
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
            },
	        delete : function(feature, uuid){
		        return Gateway.delete("/"+feature+"/"+uuid+"/");
	        }
        };
        return service;
    });
