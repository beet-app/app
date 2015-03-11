BeetApp
  .controller('LoginValidateController', function($scope, $rootScope,$sce, $http, $location, $translate, Common, UserService, $state) {

    $rootScope.singleViewMode = true;


    setTimeout(function(){
      $("#loadingApp").hide();
      $("#single_view").fadeIn("slow");
      $("#login-validate").fadeIn("slow");
    },1000);

    UserService.validateUser({uuid:$state.params.uuid}).then(function(response){
      if (Common.isEmpty(response.error)){
        $scope.message = "Seu cadastro foi efetuado com sucesso! Clique no botão abaixo para acessar sua conta.";
      }else{
        $scope.message = "Usuário não encontrado.";
      }
      console.log($scope.message);
    });

  });
