'use strict';

/* Controllers */

var appController = angular.module('webApp');

appController.controller('AppController', ['$scope', '$location',
    function ($scope, $location ) {
		console.log(' --- appController.controller');
//        $scope.settings = SettingsApi.Setting.setting();
//        console.log(JSON.stringify($scope.settings));
//        $scope.menu = PageApi.Page.menu();
        
//		$scope.startSpin = function(){
//	      console.log('start spinnner');
//		  usSpinnerService.spin('spinner-1');
//		}
//		$scope.stopSpin = function(){
//		  usSpinnerService.stop('spinner-1');
//		}
		
//		$scope.startSpin();
        
    }]);
