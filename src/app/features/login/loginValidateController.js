MyApp
  .controller('LoginValidateController', function($scope, $rootScope,$sce, $http, $location, $translate, Common, UserService, $state) {

    $rootScope.singleViewMode = true;


    setTimeout(function(){
      $("#loadingApp").hide();
      $("#single_view").fadeIn("slow");
      $("#login-validate").fadeIn("slow");
    },1000);

    UserService.validateUser({uuid:$state.params.uuid}).then(function(response){
      if (Common.isEmpty(response.error)){
        $scope.message = "user_validated";
      }else{
        $scope.message = "user_not_found";
      }
    });

  });
