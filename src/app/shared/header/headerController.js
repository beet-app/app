MyApp
    .controller('HeaderController', function($scope, $rootScope,$sce, $http, $location, $translate, Common,$state) {


        $rootScope.languages = new Array("pt_br", "en", "es");
        setTimeout(function(){
            $("#loadingApp").hide();
            $("#container").fadeIn("slow");
        },1000);

        $rootScope.menutest = [
            {
                "description" : "Provas",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"contract",
                "background_color":"purple",
                "text_color":"white"
            },
            {
                "description" : "Correções",
                "url" : "accomodation",
                "icon_class" : "home",
                "flat_icon":"correction",
                "background_color":"blue",
                "text_color":"black"
            },
            {
                "description" : "Relatórios",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"graphics",
                "background_color":"yellow",
                "text_color":"black"
            },
            {
                "description" : "Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"student",
                "background_color":"grey",
                "text_color":"white"
            },
            {
                "description" : "Melhores Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"medal",
                "background_color":"green",
                "text_color":"black"
            },
            {
                "description" : "Calendário",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"calendar",
                "background_color":"red",
                "text_color":"white"
            },
            {
                "description" : "Turmas",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"class",
                "background_color":"blue",
                "text_color":"black"
            },
            {
                "description" : "Pesquisar",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"search",
                "background_color":"red",
                "text_color":"white"
            },
            {
                "description" : "Escolas",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"world",
                "background_color":"yellow",
                "text_color":"black"
            }      ,      {
                "description" : "Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"student",
                "background_color":"grey",
                "text_color":"white"
            },
            {
                "description" : "Melhores Alunos",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"medal",
                "background_color":"green",
                "text_color":"black"
            },
            {
                "description" : "Calendário",
                "url" : "expense",
                "icon_class" : "home",
                "flat_icon":"calendar",
                "background_color":"red",
                "text_color":"white"
            }
        ];


    });



