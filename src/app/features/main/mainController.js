BeetApp
  .controller('MainController', function($scope, $rootScope,$sce, $http, $location, $translate, Common) {
    setTimeout(function(){
      $("#loadingApp").hide();
      $("#container").fadeIn("slow");
    },1000);


        console.log($rootScope.session);
  });
