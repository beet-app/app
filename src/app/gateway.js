"use strict";
MyApp
    .factory("Gateway", function($http, Config, $q) {
        var service = {
            post : function(path, obj){
                var d = $q.defer();

                $http.post(Config.getApiUrl() + path, obj)
                    .success(function(data) {
                        d.resolve(data);
                    })
                    .error(function(data) {
                        d.resolve({error:data});
                    });
                return d.promise;
            },
            get : function(path){
                var d = $q.defer();

                $http.get(Config.getApiUrl() + path)
                    .success(function(data) {
                        d.resolve(data);
                    })
                    .error(function(data) {
                        d.resolve({error:data});
                    });
                return d.promise;
            },
            getLocal : function(path){
                var d = $q.defer();

                $http.get(path)
                    .success(function(data) {
                        d.resolve({data:data});
                    })
                    .error(function(data) {
                        d.resolve({error:data});
                    });
                return d.promise;
            }
        };
        return service;
    });
