'use strict';

var appDirectives = angular.module('webpoint.core');

//appDirectives.directive('ngFileModel', ['$parse', '$log', function ($parse, $log) {
//    $log.debug(' --- ngFileModel ---');
//    return {
//        restrict: 'A',
//        link: function(scope, element, attrs) {
//            function bindEvent(scope, element, type, handler) {
//                if (element[0].addEventListener) {
//                    element[0].addEventListener(type, handler, false);
//                } else {
//                    element[0].attachEvent('on' + type, handler);
//                }
//            }
//            bindEvent(scope, element, 'change', function() {
//                scope.file_size_warning = this.files[0].size > 1000000 ? true: false
//                $log.debug(' --- file size: ', this.files[0].size);
//            });
//            var model = $parse(attrs.ngFileModel);
//            var modelSetter = model.assign;
//            element.bind('change', function(){
//                $log.debug(' --- change ---');
//                scope.$apply(function(){
//                    $log.debug(element);
//                    modelSetter(scope, element[0].files[0]);
//                });
//            });
//        }
//};}])

appDirectives.directive('ngConfirmClick', [
  function() {
    return {
      priority: 1,
      link: function(scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.ngClick;
        attr.ngClick = "";
        element.bind('click', function(event) {
          if (window.confirm(msg)) {
            scope.$eval(clickAction)
          }
        });
      }
    };
  }
])

appDirectives.directive('mwConfirmClick',[confirmDialog]);
function confirmDialog() {
    return {
        priority: -1,
        restrict: 'A',
        scope: { confirmFunction: "&mwConfirmClick" },
        link: function( scope, element, attrs ){
            element.bind( 'click', function( e ){
                // message defaults to "Are you sure?"
                var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
                // confirm() requires jQuery
                if( confirm( message ) ) {
                    scope.confirmFunction();
                }
            });
        }
    }
}





appDirectives.directive('dynaheight', [ '$window', '$log', function($window, $log) {
//	$log.debug(' --- dynaheight ---');
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.css('height', $window.innerHeight - 280 + 'px');
		}
	};
}]);

appDirectives.directive('back', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]);

appDirectives.directive('directiveSectiontype', [ '$log', 'SettingService',  function($log, SettingService){
    $log.debug(' --- directiveSectiontype ---');
    return {
        restrict:'E',
        scope: {
            sectiontype: '@sectiontype',
            text: '@text'
        },
        controller: function ($scope) {
            $scope.tt = SettingService.getSectionType($scope.sectiontype)
            if('TEXTCHORDS' === $scope.sectiontype){
                $scope.btncss = 'btn-info'
                if($scope.text)
                    $scope.info = 'Song text with chords'
                else
                    $scope.info = ''

            }else if('TEXT' === $scope.sectiontype){
                $scope.btncss = 'btn-primary'
                if($scope.text)
                    $scope.info = 'Song text'
                else
                    $scope.info = ''

            }else if('IMAGE' === $scope.sectiontype){
                 $scope.btncss = 'btn-primary'
                 if($scope.text)
                     $scope.info = 'Image with a song'
                 else
                     $scope.info = ''

             }

        },
        template:
            "<button type='button' class='btn btn-xs {{btncss}}' tooltip='Section type' >{{tt}}</button> {{info}}"
    };
}]);

//appDirectives.directive('infiniteScroll', [
//  '$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout) {
//    return {
//      link: function(scope, elem, attrs) {
//        var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
//        $window = angular.element($window);
//        scrollDistance = 0;
//        if (attrs.infiniteScrollDistance != null) {
//          scope.$watch(attrs.infiniteScrollDistance, function(value) {
//            return scrollDistance = parseInt(value, 10);
//          });
//        }
//        scrollEnabled = true;
//        checkWhenEnabled = false;
//        if (attrs.infiniteScrollDisabled != null) {
//          scope.$watch(attrs.infiniteScrollDisabled, function(value) {
//            scrollEnabled = !value;
//            if (scrollEnabled && checkWhenEnabled) {
//              checkWhenEnabled = false;
//              return handler();
//            }
//          });
//        }
//        handler = function() {
//          console.info($window);
//          var windowEl = angular.element($window);
//          console.info(windowEl);
//
//          var offset = $(window).scrollTop();
//          console.info(offset);
//          console.info(elem);
//
//          var elementBottom, remaining, shouldScroll, windowBottom;
//          windowBottom = $window.innerHeight + offset;
//          elementBottom = 0; //elem.offset().top + elem.height();
//          remaining = elementBottom - windowBottom;
//          shouldScroll = remaining <= $window.innerHeight * scrollDistance;
//          if (shouldScroll && scrollEnabled) {
//            if ($rootScope.$$phase) {
//              return scope.$eval(attrs.infiniteScroll);
//            } else {
//              return scope.$apply(attrs.infiniteScroll);
//            }
//          } else if (shouldScroll) {
//            return checkWhenEnabled = true;
//          }
//        };
//        $window.on('scroll', handler);
//        scope.$on('$destroy', function() {
//          return $window.off('scroll', handler);
//        });
//        return $timeout((function() {
//          if (attrs.infiniteScrollImmediateCheck) {
//            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
//              return handler();
//            }
//          } else {
//            return handler();
//          }
//        }), 0);
//      }
//    };
//  }
//]);
