'use strict';

/* Controllers */

var appController = angular.module('webApp');

//appController.controller('AppController', ['$scope', '$location',
//    function ($scope, $location ) {
//		console.log(' --- appController.controller');
////        $scope.settings = SettingsApi.Setting.setting();
////        console.log(JSON.stringify($scope.settings));
////        $scope.menu = PageApi.Page.menu();
//        
////		$scope.startSpin = function(){
////	      console.log('start spinnner');
////		  usSpinnerService.spin('spinner-1');
////		}
////		$scope.stopSpin = function(){
////		  usSpinnerService.stop('spinner-1');
////		}
//		
////		$scope.startSpin();
//        
//    }]);


appController.controller('AppController', ['$rootScope', '$scope', '$http', //'SettingsApi', 'UserApi',
    function ($rootScope, $scope, $http, SettingsApi, UserApi) {

//    	$scope.settings = SettingsApi.Setting.setting();
//    	$scope.currentUser = UserApi.User.profile();

    	$scope.logout = function () {
    		console.log('logOut called');

    		$http.post('auth/api/logout', {}, getHttpConfig()).
            	success(function () {
            		console.log('logout success');
            		$rootScope.$broadcast('event:auth-logoutRequest');
            	}).
            	error(function (data) {
            		console.log('logout error: ' + data);
            	});
    	};
}]);