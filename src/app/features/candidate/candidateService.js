MyApp
    .factory('CandidateService', function($http, Config, Gateway) {
      var service = {
        getByExam : function(uuid){
            return Gateway.get("/candidate/exam/"+uuid);


        }

      };
      return service;
    });
