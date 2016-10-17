'use strict';

var appDirectives = angular.module('webpoint.core');



appDirectives.directive('ngFileModel', ['$parse', '$log', function ($parse, $log) {
    $log.debug(' --- ngFileModel ---');
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                $log.debug(' --- change ---');
                scope.$apply(function(){
                    $log.debug(element);
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
};}])

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

            }
        },
        template:
            "<button type='button' class='btn btn-xs {{btncss}}' tooltip='Section type' >{{tt}}</button> {{info}}"
    };
}]);