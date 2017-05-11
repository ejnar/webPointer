'use strict';

/* Controllers */

var app = angular.module('webpoint.core');

    app.controller('AppController', AppController);
    AppController.$inject = ['$rootScope', '$scope', '$http', '$uibModal', '$log', 'usSpinnerService', 'AppService'];

    function AppController ($rootScope, $scope, $http, $uibModal, $log, usSpinnerService, AppService) {
        $log.info('AppController');
        $log.info(AppService.isAuthenticated());
//        $scope.isAuthenticated = $rootScope.isAuthenticated != '';

    	$scope.logout = function () {
    		AppService.logout();
    	};

		$scope.openPasswordModel = function () {
			$log.debug('openPasswordModel');
	    	var modalInstance = $uibModal.open({
	    		templateUrl: 'static/common/views/auth/updatePassModal.html',
	    		controller: 'ModalInstancePassCtrl',
	    		size: 'lg'
	    	});
	    };

		$scope.openGroupModel = function () {
			$log.debug('openGroupModel');
	    	var modalInstance = $uibModal.open({
	    		templateUrl: 'static/common/views/auth/addGroupModal.html',
	    		controller: 'ModalInstanceGroupCtrl',
	    		size: 'lg'
	    	});
	    };
    }

app.controller(
	'ModalInstancePassCtrl',[ '$scope', '$location', '$uibModalInstance', '$log', 'AuthorityApi',
	function ($scope, $location, $uibModalInstance, $log, AuthorityApi) {

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
			$uibModalInstance.dismiss('cancel');
		};
}]);

app.controller(
	'ModalInstanceGroupCtrl',[ '$scope', '$location', '$uibModalInstance', '$log', 'RoleGroupApi',
	function ($scope, $location, $uibModalInstance, $log, RoleGroupApi ) {

		$scope.addGroup = function () {
			$log.debug('addGroup');
		 	$log.debug($scope.group);

		 	RoleGroupApi.save($scope.group).$promise
		 		.then( function(resp) {
		 			$log.debug(resp);
					$uibModalInstance.close('close');
			});
		};
		$scope.cancel = function () {
			$log.debug('cancel');
			$uibModalInstance.dismiss('cancel');
		};
}]);


function getHttpConfig(authToken) {
    console.log('getHttpConfig' + authToken);
    return {
        headers: {
            'X-Auth-Token': authToken
        }
    };
}