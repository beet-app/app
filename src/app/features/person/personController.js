BeetApp
  .controller('PersonController', function($scope, $rootScope,$sce, $http, $stateParams, $translate, Common, GlobalService) {
    $scope.loadingFeature = true;
    GlobalService.get('person').then(function(response){
      if (!response.error){
        $scope.list = response.data;
      }
    });

    $scope.list = function(){
      GlobalService.get('person').then(function(response){
        $scope.loadingFeature = false;
        $scope.mode = "list";
        if (!response.error){
          $scope.list = response.data;
        }
      });
    };

    $scope.edit = function(uuid){
      $scope.loadingFeature = true;
      GlobalService.getAttributes('person', uuid).then(function(response){
        Common.openFeatureRightMenu("person", $scope.list);

        $scope.uuid = uuid;
        $scope.loadingFeature = false;
        $scope.selected = uuid;
        if (!response.error){
          $scope.mode = "edit";
          $scope.data = response.data;
        }
      });
    };

    $scope.save = function(){
      var blnSave = true;
      angular.forEach($scope.data.person_data, function(attribute){
        if (blnSave){
          if (attribute.required===1 && Common.isEmpty(attribute.value)){
            Common.showMessage("Preencha o campo "+attribute.description+" !", "warning");
            blnSave = false;
            $scope.creatingCompany = false;
          }
        }
      });

      if (blnSave) {
        var objSave = {};
        var mode = "create";
        if (!Common.isEmpty($scope.uuid)){
          mode = "update";
          objSave.uuid = $scope.uuid;
        }
        objSave.attribute = Common.getAttributeObj($scope.data.person_data);
        objSave.company = $rootScope.session.user.company;

        GlobalService.save("person", mode, objSave).then(function (response) {

          if (Common.isEmpty(response.error)) {
            Common.showMessage("Atleta cadastrado com sucesso !", "success");
            Common.goTo("person");

          } else {
            alert("Ocorreu um erro ao cadastrar o atleta.");
          }
        });

      }
    };
    $scope.setFocus = function(id){
      $("#"+id).find("input").focus();
    };

    if (Common.isEmpty($stateParams.uuid)){
      $scope.list();
    }else{
      $scope.edit($stateParams.uuid);
    }
  });
