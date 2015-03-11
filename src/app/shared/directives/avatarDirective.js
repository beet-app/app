BeetApp
	.directive("btAvatar", function (Common) {
		return {
			replace: true,
			restrict: 'E',
			scope: { feature: '@', photo: '@', scale: '@', class: '@', width:'@', height:'@'},
			templateUrl:Common.getDirectiveTemplateUrl("avatar"),
			compile: function(tElem,attrs) {
				return {
					pre: function (scope, elem, attrs) {




						scope.url = Common.getUploadUrl() +"/" + scope.feature + "/" + scope.photo + ".png";

						Common.isValidImage(scope.url).error(function () {
							scope.url = Common.getUploadUrl() +"/" + scope.feature + "/default.png";
						});

					}

				}
			}
		}
	});

/*
 */