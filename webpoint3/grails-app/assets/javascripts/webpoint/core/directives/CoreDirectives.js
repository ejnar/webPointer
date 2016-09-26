'use strict';

var appDirectives = angular.module('webpoint.core');


appDirectives.directive('dynaheight', [ '$window', '$log', function($window, $log) {
	$log.debug(' --- dynaheight ---');
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.css('height', $window.innerHeight - 280 + 'px');
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