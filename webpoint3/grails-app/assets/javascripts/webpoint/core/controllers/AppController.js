'use strict';

/* Controllers */

var app = angular.module('webpoint.core');

app.controller('AppController', [ '$rootScope', '$scope', '$http', '$uibModal', '$log', 'usSpinnerService',
    function ($rootScope, $scope, $http, $uibModal, $log, usSpinnerService) {
        $log.info('AppController');

    	$scope.logout = function () {
    		$log.debug('logOut called');
            var config = {headers: {
                           'X-Auth-Token': sessionStorage.authToken
                            }
                         };
    		$http.post('auth/api/logout', {}, config).
            	success(function () {
            		$log.debug('logout success');
            		$rootScope.$broadcast('event:auth-logoutRequest');
            	}).
            	error(function (data) {
            		$log.error('logout error: ');
            		$log.error(data);
            		usSpinnerService.stop('spinner-1');
            		$rootScope.$broadcast('event:auth-loginRequired');
            	});
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
}]);

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