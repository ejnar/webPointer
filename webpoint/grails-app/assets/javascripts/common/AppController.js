'use strict';

/* Controllers */

var app = angular.module('root.webpointer');

app.controller('AppController', ['$rootScope', '$scope', '$http', '$modal', '$log', 'usSpinnerService', //'UserApi',
    function ($rootScope, $scope, $http, $modal, $log, usSpinnerService) {

//    	$scope.settings = SettingsApi.Setting.setting();
//    	$scope.currentUser = UserApi.User.profile();

    	$scope.logout = function () {
    		$log.debug('logOut called');

    		$http.post('auth/api/logout', {}, getHttpConfig()).
            	success(function () {
            		console.log('logout success');
            		$rootScope.$broadcast('event:auth-logoutRequest');
            	}).
            	error(function (data) {
            		console.log('logout error: ' + data);
            		usSpinnerService.stop('spinner-1');
            		$rootScope.$broadcast('event:auth-loginRequired');
            	});
    	};
    	
		$scope.openPasswordModel = function () {
			$log.debug('openPasswordModel');
	    	var modalInstance = $modal.open({
	    		templateUrl: 'common/views/auth/updatePassModal.html',
	    		controller: 'ModalInstancePassCtrl',
	    		size: 'lg'
	    	});
	    };   
	    
		$scope.openGroupModel = function () {
			$log.debug('openGroupModel');
	    	var modalInstance = $modal.open({
	    		templateUrl: 'common/views/auth/addGroupModal.html',
	    		controller: 'ModalInstanceGroupCtrl',
	    		size: 'lg'
	    	});
	    };   	
}]);

app.controller(
	'ModalInstancePassCtrl',[ '$scope', '$location', '$modalInstance', '$log', 'AuthorityApi', 
	function ($scope, $location, $modalInstance, $log, AuthorityApi ) {

		$scope.updatePassword = function () {
			$log.debug('updatePassword');
	 		$log.debug($scope.userPassword);
	 		
			AuthorityApi.Auth.password({}, $scope.userPassword).$promise   //, $scope.userPassword
				.then( function(resp) {
					$log.debug(resp);
					$modalInstance.close('close');
			});
		};

		$scope.cancel = function () {
			$log.debug('cancel');
			$modalInstance.dismiss('cancel');
		};
}]);

app.controller(
	'ModalInstanceGroupCtrl',[ '$scope', '$location', '$modalInstance', '$log', 'RoleGroupApi', 
	function ($scope, $location, $modalInstance, $log, RoleGroupApi ) {
		
		$scope.addGroup = function () {
			$log.debug('addGroup');
		 	$log.debug($scope.group);
		 		
		 	RoleGroupApi.save($scope.group).$promise 
		 		.then( function(resp) {
		 			$log.debug(resp);
					$modalInstance.close('close');
			});
		};
		$scope.cancel = function () {
			$log.debug('cancel');
			$modalInstance.dismiss('cancel');
		};
}]);

//app.controller('UserCtrl', [
//    '$rootScope', '$scope', '$routeParams', '$location', '$log', '$q', 'cfgAppPath', 'properties', 'sharedProperties',
//    'UserApi', 'RoleApi', 'RoleGroupApi',
//    
//    function($rootScope, $scope, $routeParams, $location, $log, $q, cfgAppPath, properties, sharedProperties, 
//    		UserApi, RoleApi, RoleGroupApi) {
//    	$log.debug(' --- UserCtrl --- ');  
//    	$scope.doSave = true;
//		RoleGroupApi.list( function (resp) { $scope.rolegroups = resp; });
//		RoleApi.list( function (resp) { $scope.roles = resp; });
//		UserApi.list( function (resp) { $log.debug(resp); });
//		
//
//			
//		$scope.openModel = function () {
//	    	var modalInstance = $modal.open({
//	    		templateUrl: 'user/views/page/ceatePageModal.html',
//	    		controller: 'ModalInstanceCtrl',
//	    		size: 'lg'
//	    	});
//	    };		
//		
//}]); 

