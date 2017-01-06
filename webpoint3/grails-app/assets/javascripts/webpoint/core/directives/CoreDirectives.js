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

appDirectives.directive('dynaheight', [ '$window', '$log', function($window, $log) {
	$log.debug(' --- dynaheight ---');
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