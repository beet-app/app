MyApp
	.directive("btList", function ($compile, Common, $rootScope, GlobalService, $state, $timeout) {

		var linker = function(scope, element, attrs) {
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

				if(scope.data.editFeature){
					path = scope.data.editFeature.path;
					var params = "";
					for(var i = 0; i < scope.data.editFeature.params.length; i++){
						params += scope.data.editFeature.params[i].param + ":" + scope.data.editFeature.params[i].value;
						params += ",";
					}
					//params += scope.data.editFeature.main_param + ":" + obj.uuid;
				}

				$state.transitionTo(path + '/edit', {uuid:obj.uuid});
			};
			scope.delete = function(obj){
				GlobalService.delete(scope.feature.current.description, obj.id).then(function(){
					Common.showMessage("Item deletado.");
					obj.deleted = true;



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
