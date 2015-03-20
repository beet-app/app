BeetApp
    .controller('LoginController', function($scope, $rootScope,$sce, $http, $location, $translate, Common, UserService, $state, btApp, viewMode) {
        $rootScope.fullViewMode = false;
        $rootScope.singleViewMode = true;

        if (viewMode=="signup"){
            $scope.signUpMode = true;
        }else{
            $scope.loginMode = true;
        }

        setTimeout(function(){
            $("#loadingApp").hide();
            $("#single_view").fadeIn("slow");
        },1000);

        $scope.password = "";
        $scope.email = "";
        $scope.emailData = {
            "value" : "",
            "description" : "mail",
            "type" : {
                "description":"simpletext",
                "template" :"text"
            },
            "group" :"login_data",
            "size" : "40",
            "order" : 1
        };
        $scope.passwordData = {
            "value" : "",
            "description" : "password",
            "type" : {
                "description":"password",
                "template" :"text"
            },
            "group" : "login_data",
            "size" : "40",
            "order" : 1
        };
        $scope.confirmPasswordData = {
            "value" : "",
            "description" : "password_confirm",
            "type" : {
                "description":"password",
                "template" : {
                    "description":"text"
                }
            },
            "group" :"login_data",
            "size" : "40",
            "order" : 1
        };
        $scope.showLogin = function(){
            changeMode();
            $scope.loginMode = true;
            $scope.rememberPasswordMode = false;
            $scope.signUpMode = false;
        };

        $scope.showRememberPassword = function(){
            changeMode();
            $scope.rememberPasswordMode = true;
            $scope.loginMode = false;
            $scope.signUpMode = false;
        };
        $scope.showSignUp = function(){
            changeMode();
            $scope.rememberPasswordMode = false;
            $scope.loginMode = false;
            $scope.signUpMode = true;
        };
        function changeMode(){
            $("#login").hide();
            $("#login").fadeIn();
        }
        $scope.checkLogin = function(){
            if (Common.isEmpty($scope.emailData.value)){
                Common.showMessage("Digite seu email!", "warning");
                return;
            }
            if (Common.isEmpty($scope.passwordData.value)){
                Common.showMessage("Digite sua senha!", "warning");
                return;
            }
            $scope.checkingLogin = true;

            UserService.checkLogin({email:$scope.emailData.value, password:$scope.passwordData.value}).then(function(response){

                if (Common.isEmpty(response.error)){

                    $rootScope.session = {user:response.data};
                    btApp.init().then(function(){
                        $("#login").fadeOut();
                        Common.goTo("company/select");
                    });
                }else{
                    alert("nao foi");
                }



            });
        };


        $scope.signUp = function(){
            if (Common.isEmpty($scope.emailData.value)){
                Common.showMessage("Digite seu email!", "warning");
                return;
            }
            if (Common.isEmpty($scope.passwordData.value)){
                Common.showMessage("Digite sua senha!", "warning");
                return;
            }
            if ($scope.passwordData.value != $scope.confirmPasswordData.value){
                Common.showMessage("Senhas digitadas não conferem!", "warning");
                return;
            }
            $scope.checkingLogin = true;

            UserService.save({email:$scope.emailData.value, password:$scope.passwordData.value}).then(function(response){
                if (Common.isEmpty(response.error)){
                    Common.showMessage("Enviamos um email para confirmar seu cadastro.", "warning");
                    Common.goTo("index");
                }else{
                    //alterarr !!
                    if(response.error.error.description==="user_exists"){
                        Common.showMessage("Este usuário já foi cadastrado.")
                    } else {
                        Common.showMessage("Email de confirmação não enviado.");
                    }
                    $scope.checkingLogin = false;
                }
            });
        };

        /*
         STAGING MODE
         */
        $scope.stagingMode = function(x){
            if (x==1){
                $scope.emailData.value = "gustavo.ferreira08@gmail.com";
                $scope.passwordData.value = "123";
            }else if(x==2){
                $scope.emailData.value = "thiagokroger@gmail.com";
                $scope.passwordData.value = "123";
            }else if(x==3){
                $scope.emailData.value = "gustavo@beet.cc";
                $scope.passwordData.value = "123";
            }else if(x==4){
                $scope.emailData.value = "thiago@beet.cc";
                $scope.passwordData.value = "123";
            }

            $scope.checkLogin();

        };
    });
