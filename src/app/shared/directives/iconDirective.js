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
            scope.mySize = (!Common.isEmpty(scope.size)) ? scope.size : "24";
            scope.myColor = (!Common.isEmpty(scope.color)) ? scope.color : "black";
            scope.myIcon = "assets/images/icons/"+arrIcon[0]+"/ic_"+arrIcon[1]+"_"+scope.mySize+"px.svg";
            scope.myId = "icon-"+Common.getTimestamp();
          }

        },
        post: function postLink(scope, iElement, iAttrs, controller) {

          $timeout(function(){
            jQuery('#'+scope.myId).each(function(){
              var $img = jQuery(this);
              var imgID = $img.attr('id');
              var imgClass = $img.attr('class');
              var imgURL = $img.attr('src');

              jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                  $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                  $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                $svg.css('fill', scope.color);

                // Replace image with new SVG
                $img.replaceWith($svg);

              }, 'xml');

            });
          },1000);



        }



      },
      templateUrl: Common.getDirectiveTemplateUrl("icon")
    };

  });
