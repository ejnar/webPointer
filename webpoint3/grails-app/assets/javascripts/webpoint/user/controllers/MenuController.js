'use strict';

/* Controllers */

var module = angular.module('webpoint.core');

    module.controller('MenuController', MenuController);
    MenuController.$inject = ['$scope', '$uibModal', '$log', 'Access', 'AuthService', 'AppStatusService'];
    function MenuController ($scope, $uibModal, $log, Access, AuthService, AppStatusService) {

        init();
        function init() {
            $log.info('MenuController.init');
        }

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

    module.controller('ModalInstancePassCtrl', ModalInstancePassCtrl);
    ModalInstancePassCtrl.$inject = ['$scope', '$location', '$uibModalInstance', '$log', 'AuthorityApi'];
	function ModalInstancePassCtrl ($scope, $location, $uibModalInstance, $log, AuthorityApi) {

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
    }

    module.controller('ModalInstanceGroupCtrl', ModalInstanceGroupCtrl);
    ModalInstanceGroupCtrl.$inject = ['$scope', '$location', '$uibModalInstance', '$log', 'RoleGroupApi'];
	function ModalInstanceGroupCtrl ($scope, $location, $uibModalInstance, $log, RoleGroupApi ) {

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
    }


    function getHttpConfig(authToken) {
        console.log('getHttpConfig' + authToken);
        return {
            headers: {
                'X-Auth-Token': authToken
            }
        };
    }