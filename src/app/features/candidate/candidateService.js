MyApp
    .factory('CandidateService', function($http, Config, Gateway) {
        var service = {
            getByExam : function(uuid){
                return Gateway.get("/candidate/exam/"+uuid);
            },
            rate : function(obj){
                return Gateway.post("/candidate/rate", obj);
            }

        };
        return service;
    });
