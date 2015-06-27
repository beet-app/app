MyApp
    .controller('ExamRatingController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q, CandidateService) {

        $rootScope.loadingFeature = true;
        var feature = "exam";

        function loadFeature(){
            var d = $q.defer();
            GlobalService.getAttributes("exam_detail", 333).then(function(attributeResponse) {
                $scope.attributeData = attributeResponse.data;
                GlobalService.get(feature, $stateParams).then(function (response) {
                    $scope.data = response.data;
                    $scope.listData = {
                        fields: [
                            {
                                description: "attributes.exam_data.initial_date"
                            }
                        ],
                        commands: [
                            {
                                label: "rating",
                                icon: "action.swap_vert",
                                iconColor: "#000000",
                                click: function (obj) {
                                    $scope.view(obj.uuid);
                                }
                            }

                        ],
                        items: $scope.data
                    };
                    d.resolve(true);
                });
            });
            return d.promise;
        }

        $scope.rating = {
            action:function(candidate){
                var obj = {
                    candidate_uuid:candidate.uuid,
                    exam_uuid:$stateParams.uuid,
                    score:candidate.score
                };

                CandidateService.rate(obj).then(function(response){

                    if (!Common.isError(response)){

                    }else{
                        candidate.score = null;
                    }

                });

            }
        };

        $scope.list = function(){
            $rootScope._app.sidebar.right.unLoad();
            $scope.mode = "list";
        };

        $scope.save = function(){

            console.log($scope.ratingData);
        };

        $scope.view = function(uuid){
            $scope.mode = "view";
            $rootScope.loadingFeature = true;
            GlobalService.getAllByFeature("exam_detail","exam",uuid).then(function(response){
                $scope.ratingData = response.data;

                $rootScope.loadingFeature = false;
            });
        };

        loadFeature().then(function(){
            if (Common.isEmpty($stateParams.uuid)) {
                $rootScope.loadingFeature = false;
                $scope.list();
            }else{
                $rootScope.loadingFeature = true;
                $scope.view($stateParams.uuid);
            }
        });
    });
