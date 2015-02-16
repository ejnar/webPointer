'use strict';

var appDirectives = angular.module('root.webpointer');


//appDirectives.directive('whenActive', ['$location',
//    function ($location) {
//	    
//        return {
//            scope: true,
//            link: function (scope, element, attrs) {
//                scope.$on('$routeChangeSuccess', function () {
//                    if ('#'+$location.path() == element.children().attr('href')) {
//                        element.addClass('active');
//                    }
//                    else {
//                        element.removeClass('active');
//                    }
//                });
//            }
//        };
//    }]);


//appDirectives.directive('shaLoadingSpinner', [ '$log', function($log) {
//	$log.info(' --- AppDirectives ---');
//	  return {
//	    restrict: 'A',
//	    replace: true,
//	    transclude: true,
//	    scope: {
//	      loading: '=shaLoadingSpinner'
//	    },
////	    templateUrl: 'common/views/progress/loading.html',
//	    template: {'<div class="sha-loading-spinner-container"></div>'},
//	    link: function(scope, element, attrs) {
//	      var spinner = new Spinner().spin();
//	      var loadingContainer = element.find('.sha-loading-spinner-container')[0];
//	      console.log(loadingContainer);
//	      loadingContainer.appendChild(spinner.el);
//	    }
//	  };
//}]);


//appDirectives.directive('compareTo', [ '$log', function($log) {
//    return {
//    	require: "ngModel",
//        scope: {
//            otherModelValue: "=compareTo"
//        },
//        link: function(scope, element, attributes, ngModel) {
////        	$log.debug(' --- compareTo --- ');   
//            ngModel.$validators.compareTo = function(modelValue) {
//                return modelValue == scope.otherModelValue;
//            };
// 
//            scope.$watch("otherModelValue", function() {
//                ngModel.$validate();
//            });
//        }
//    };
//}]);

