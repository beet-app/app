BeetApp
	.directive("btButton", function (Common, $compile) {
		return {
			restrict: 'E',
			scope: {
				label:'@',
				type:'@',
				icon:'@',
				iconColor:'@',
				iconSize:'@',
				btClass:'@',
				size:'@'
			},
			link: function(scope, element) {
				var bt_class = "";



				if (!Common.isEmpty(scope.size)) {
					scope.mySize = scope.size;
				}else {
					scope.mySize = "32";
				}

				scope.myBorderRadius = (parseInt(scope.mySize)/2).toString();



				if (!Common.isEmpty(scope.icon)) {
					scope.myIcon = scope.icon;
				}
				if (!Common.isEmpty(scope.iconSize)) {
					scope.myIconSize = scope.iconSize;
				}
				if (!Common.isEmpty(scope.iconColor)) {
					scope.myIconColor = scope.iconColor;
				}

				if (!Common.isEmpty(scope.btClass)) {
					bt_class += " " + scope.btClass;
				}
				if (!Common.isEmpty(scope.type)){
					bt_class += " md-" + scope.type;
				}else{
					scope.type = "button";
					bt_class += " fill-horizontal";
				}
				scope.myClass = bt_class.trim();


			},
			templateUrl: Common.getDirectiveTemplateUrl("button")
		};

	});
