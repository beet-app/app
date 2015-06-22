MyApp
    .controller('ExamRatingController', function($scope, $rootScope, $sce, $http, $stateParams, $translate, Common, GlobalService, btFn, $q, CandidateService) {

        $rootScope.loadingFeature = true;
        var feature = "exam";

        function loadFeature(){
            var d = $q.defer();
                GlobalService.get(feature, $stateParams).then(function(response){
                    $scope.data = response.data;
                    $scope.listData = {
                        fields:[
                            {
                                description:"attributes.exam_data.initial_date"
                            }
                        ],
                        commands:[
                            {
                                label:"rating",
                                icon:"action.swap_vert",
                                iconColor:"#000000",
                                click:function(obj){
                                    $scope.view(obj.uuid);
                                }
                            }

                        ],
                        items:$scope.data
                    };
                    d.resolve(true);
                });

            return d.promise;
        }

        $scope.rating = {
            action:function(trip){
                var obj = {
                    _id:trip._id,
                    score:trip.score
                };

                TripService.update(obj).then(function(response){

                    if (!Common.isError(response)){

                    }else{

                    }

                });

            }
        };

        $scope.list = function(){
            $rootScope._app.sidebar.right.unLoad();
            $scope.mode = "list";
        };

        $scope.view = function(uuid){
            $scope.mode = "view";
            $rootScope.loadingFeature = true;
            CandidateService.getByExam(uuid).then(function(response){
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
