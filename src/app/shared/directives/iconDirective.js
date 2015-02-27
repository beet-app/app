BeetApp
  .directive("btIcon", function (Common, $timeout) {
    return {
      restrict: 'E',
      scope: {
        icon:'@',
        size:'@',
        color:'@'
      },
      link: {
        pre: function preLink(scope, iElement, iAttrs, controller) {
          if (!Common.isEmpty(scope.icon)) {
            var arrIcon = scope.icon.split(".");
            var size = (!Common.isEmpty(scope.size)) ? scope.size : "24";
console.log(scope.icon);
            scope.mySize = size;

            if (scope.size!=24 && scope.size!=48){
              size = 48;
            }


            scope.myColor = (!Common.isEmpty(scope.color)) ? scope.color : "black";
            scope.myIcon = "assets/images/icons/"+arrIcon[0]+"/ic_"+arrIcon[1]+"_"+size.toString()+"px.svg";
            scope.myId = "icon-"+Common.getTimestamp();
          }

        },
        post: function postLink(scope, iElement, iAttrs, controller) {





        }



      },
      templateUrl: Common.getDirectiveTemplateUrl("icon")
    };

  });
