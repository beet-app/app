MyApp
    .directive("btList", function ($compile, Common, $rootScope, GlobalService, $state, $mdDialog) {

        var linker = function(scope, element) {
            if (Common.isEmpty(scope.type)){
                scope.type = "simple-item"
            }
            if (Common.isEmpty(scope.data.selection)){
                scope.data.selection = {};
            }
            if (Common.isEmpty(scope.data.selection.condition)){
                scope.data.selection.condition = function(){
                    return true;
                }
            }
            if (Common.isEmpty(scope.data.visible)){
                scope.data.visible = function(){
                    return true;
                }
            }
            if (!Common.isEmpty(scope.data.icon)){
                if (typeof(scope.data.icon =="string")){
                    scope.data.icon = $rootScope._app.feature.dict[scope.data.icon].attributes.sidebar;
                }
            }

            scope.feature = $rootScope._app.feature;

            scope.edit = function(obj){
                var path = scope.feature.current.description;
                var params = {};

                if(scope.data.editFeature){
                    path = scope.data.editFeature.path;

                    for(var i = 0; i < scope.data.editFeature.params.length; i++){
                        params[scope.data.editFeature.params[i].param] = scope.data.editFeature.params[i].value;
                    }
                }

                if(scope.data.editFeature)
                    params[scope.data.editFeature.mainParam] = obj.uuid;
                else
                    params["uuid"] = obj.uuid;

                $state.transitionTo(path + "/edit", params);
            };

            scope.delete = function(obj){
                GlobalService.delete(scope.feature.current.description, obj.uuid).then(function(){
                    Common.showMessage("Item removido com sucesso.");
                    obj.deleted = true;
                });
            };

            scope.delete = function(ev, obj){
                var confirm = $mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .title('Deseja realmente remover este item?')
                    //.content(obj.description)
                    .ok('Sim')
                    .cancel('Não')
                    .targetEvent(ev);
                $mdDialog.show(confirm).then(function() {
                    GlobalService.delete(scope.feature.current.description, obj.uuid).then(function(){
                        Common.showMessage("Item removido com sucesso.");
                        obj.deleted = true;
                    });
                });
            };

            element.html("<bt-"+scope.type+" class='fill' layout='column' flex></bt-"+scope.type+">").show() ;

            $compile(element.contents())(scope);

        };

        return {
            restrict: "E",
            link: linker,
            scope: {
                data:'=',
                type:'='
            }
        };
    });