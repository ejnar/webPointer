'use strict';

var appDirectives = angular.module('webpoint.core');

appDirectives.directive('keyright', [ '$document', '$parse', '$log', function($document, $parse, $log) {
	$log.debug(' --- keyright ---');
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			$log.debug(scope);
			$log.debug(iElement);
			$log.debug(iAttrs);
			var onClick = $parse( iAttrs.ngClick );
			$document.bind('keydown', function(e) {
				if(e.which == 39){
					scope.$apply(function () {onClick(scope);});
				}
			});
		}
	};	
}]);

appDirectives.directive('keyleft', [ '$document', '$parse', '$log', function($document, $parse, $log) {
	$log.debug(' --- keyleft ---');
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			var onClick = $parse( iAttrs.ngClick );
			$document.bind('keydown', function(e) {
				if(e.which == 37){
					scope.$apply(function () {onClick(scope);});
				}
			});
		}
	};	
}]);

function isNumericKeyCode(keyCode) {
    return (event.keyCode >= 48 && event.keyCode <= 57)
        || (event.keyCode >= 96 && event.keyCode <= 105);
}

function isForwardSlashKeyCode(keyCode) {
    return event.keyCode === 191;
}

function isNavigationKeycode(keyCode) {
	$log.debug('isNavigationKeycode: ' + keyCode);
    switch (keyCode) {
        case 8: //backspace
        case 35: //end
        case 36: //home
        case 37: //left
        case 38: //up
        case 39: //right
        case 40: //down
        case 45: //ins
        case 46: //del
            return true;
        default:
            return false;
    }
}

