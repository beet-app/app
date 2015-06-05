﻿"use strict";
MyApp
    .factory("Common", ["$rootScope", "$mdToast", "$location","$state","$http","Config",function ($rootScope, $mdToast, $location, $state,$http, Config) {
        function formatElementName(strName){
            strName = strName.replace("dialog-","");
            var arr = strName.split("-");
            strName = arr[0];
            for (var x=1 ; x<arr.length ; x++){
                strName += arr[x].substring(0, 1).toUpperCase() + arr[x].substring(1, arr[x].length).toLowerCase();
            }
        }

        function toggleDialog(id) {
            var dialog = document.querySelector("#"+id);
            dialog.toggle();
        }

        var Common = {

            loadingPage : function(blnShow, strImageControl){
                if (blnShow){
                    $rootScope.loadingPage = true;
                    $("#container").fadeOut( "fast");
                    $("#lstop").removeClass("opacity");
                    $("#loadingPage").animate({bottom:"45%",left:"47%"}, 300, "swing", function(){
                        loading(true);
                    });
                }else{
                    $rootScope.loadingPage = false;
                    loading(false);
                    $("#loadingPage").animate({bottom:"50px",left:"50px"}, 300, "swing", function(){
                        $("#container").fadeIn("fast");
                        $("#lstop").addClass("opacity");
                    });
                }
                if (strImageControl==="hide"){
                    $("#loadingPage").hide();
                }else{
                    $("#loadingPage").show();
                }
            },
            loading : function (bln){
                loading(bln);
            },
            toggleDialog : function (strName){
                toggleDialog(strName);
            },
            loadingContent : function (bln){
                if (bln){
                    setPage("main-animated-pages", "1");
                    $("#lstop").hide();
                    $("#lplay").show();
                    $(".overlay-transparent").show();
                }else{
                    setPage("main-animated-pages", "0");
                    $("#lstop").show();
                    $("#lplay").hide();
                    $(".overlay-transparent").hide();
                }

            },
            goTo : function (url, data){
                if (!data){
                    data = {};
                }
                $state.transitionTo(url, data, {reload: true});
            },
            isEmpty : function (value){
                if (value===null){
                    return true;
                }
                if (value===undefined){
                    return true;
                }
                if (value===""){
                    return true;
                }
                return false;
            },
            getTimestamp: function () {
                return (new Date().getTime()).toString();
            },
            getTheme: function (theme) {
                var obj = $rootScope.theme;
                var arr = theme.split(".");
                for (var x=0; x<arr.length ; x++){
                    obj = obj[arr[x]];
                }
                return obj;
            },
            getColor: function (color) {
                var obj = $rootScope.colors;
                var arr = color.split(".");
                if (arr.length==1){
                    return obj[arr[0]].value;
                }else{
                    return obj[arr[0]].levels[arr[1]];
                }
            },
            isValidImage: function (src) {
                return $http.get(src,{withCredentials : false});
            },
            isArray:function(obj){
                if (typeof(obj)=="object"){
                    if (obj.length!=undefined){
                        return true;
                    }
                }
                return false;
            },
            getAttributeObj: function(data){
                var arr = [];
                if (Common.isArray(data)){
                    data = {data:data};
                }
                angular.forEach(data, function(group){

                    for (var x=0 ; x<group.length ; x++){
                        if (!Common.isEmpty(group[x].value)){
                            arr.push({
                                uuid:group[x].uuid,
                                value:group[x].value
                            });
                        }
                    }

                });

                return arr;
            },
	        getNewAttributeObj: function(mold, obj){
		        var arr = [];
		        if (Common.isArray(mold)){
			        mold = {data:mold};
		        }
		        angular.forEach(mold, function(group){

			        for (var x=0 ; x<group.length ; x++){
				        if (!Common.isEmpty(obj.attributes[group[x].group][group[x].description])){
					        arr.push({
						        uuid:group[x].uuid,
						        value:obj.attributes[group[x].group][group[x].description]
					        });
				        }
			        }

		        });

		        return arr;
	        },
            showMessage: function(text, type) {
                $mdToast.show({
                    template: "<md-toast class='color-bg-4'>"+text+"</md-toast>",
                    hideDelay: 2500,
                    position:"bottom right"
                });
            },
            getDirectiveTemplateUrl: function(str) {
                return "app/shared/directives/" + str + "View.html";
            },
            getUploadUrl: function() {
                return Config.getUploadUrl();
            }

        };
        return Common;
    }]);


function mcep(v){
    v=v.replace(/\D/g,"");                   //Remove tudo o que não é dígito
    v=v.replace(/^(\d{5})(\d)/,"$1-$2");        //Esse é tão fácil que não merece explicações
    return v;
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function cnpj(v){
    v=v.replace(/\D/g,"");                          //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/,"$1.$2");            //Coloca ponto entre o segundo e o terceiro dígitos
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");//Coloca ponto entre o quinto e o sexto dígitos
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2");          //Coloca uma barra entre o oitavo e o nono dígitos
    v=v.replace(/(\d{4})(\d)/,"$1-$2");             //Coloca um hífen depois do bloco de quatro dígitos
    return v;
}
function mcpf(v){
    v=v.replace(/\D/g,"");                   //Remove tudo o que não é dígito
    v=v.replace(/(\d{3})(\d)/,"$1.$2");      //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2");      //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");//Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
}
function mdata(v){
    v=v.replace(/\D/g,"");                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{2})(\d)/,"$1/$2");
    v=v.replace(/(\d{2})(\d)/,"$1/$2");

    v=v.replace(/(\d{2})(\d{2})$/,"$1$2");
    return v;
}
function mtempo(v){
    v=v.replace(/\D/g,"");                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{1})(\d{2})(\d{2})/,"$1:$2.$3");
    return v;
}
function mhora(v){
    v=v.replace(/\D/g,"");                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{2})(\d)/,"$1h$2");
    return v;
}
function mrg(v){
    v=v.replace(/\D/g,"");                                      //Remove tudo o que não é dígito
    v=v.replace(/(\d)(\d{7})$/,"$1.$2");    //Coloca o . antes dos últimos 3 dígitos, e antes do verificador
    v=v.replace(/(\d)(\d{4})$/,"$1.$2");    //Coloca o . antes dos últimos 3 dígitos, e antes do verificador
    v=v.replace(/(\d)(\d)$/,"$1-$2");               //Coloca o - antes do último dígito
    return v;
}
function mnum(v){
    v=v.replace(/\D/g,"");                                      //Remove tudo o que não é dígito
    return v;
}
function mvalor(v){
    v=v.replace(/\D/g,"");//Remove tudo o que não é dígito
    v=v.replace(/(\d)(\d{8})$/,"$1.$2");//coloca o ponto dos milhões
    v=v.replace(/(\d)(\d{5})$/,"$1.$2");//coloca o ponto dos milhares

    v=v.replace(/(\d)(\d{2})$/,"$1,$2");//coloca a virgula antes dos 2 últimos dígitos
    return v;
}

$(document).ready(function(){

});
