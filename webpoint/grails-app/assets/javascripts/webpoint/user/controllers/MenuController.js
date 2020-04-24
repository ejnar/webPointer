'use strict';

/* Controllers */

var module = angular.module('webpoint.core');

    module.controller('MenuController', MenuController);
    MenuController.$inject = ['$scope', '$uibModal', '$log', 'cfgAppPath', 'Access', 'AuthService', 'AppStatusService'];
    function MenuController ($scope, $uibModal, $log, cfgAppPath, Access, AuthService, AppStatusService) {

        var vm = this;

        function init() {
            $log.debug('MenuController.init');
        }

		$scope.openPasswordModel = function () {
			$log.debug('openPasswordModel');
	    	var modalInstance = $uibModal.open({
	    		templateUrl: cfgAppPath.updatePassModal,
	    		controller: 'ModalInstancePassCtrl as vm',
	    		size: 'lg'
	    	});
	    };

	    $scope.openSetting = function () {
            $log.debug('openSetting');
            var modalInstance = $uibModal.open({
                templateUrl: cfgAppPath.settingModal,
                controller: 'ModalInstanceSettingCtrl as vm',
                size: 'lg'
            });
        };
        init();
    }

    module.controller('ModalInstanceSettingCtrl', ModalInstanceSettingCtrl);
    ModalInstanceSettingCtrl.$inject = ['$scope', '$location', '$uibModalInstance', '$log', 'SettingService', 'SettingApi'];
	function ModalInstanceSettingCtrl ($scope, $location, $uibModalInstance, $log, SettingService, SettingApi) {
        var vm = this;

        SettingService.getTaggObj(vm);
        vm.cancel = cancel;
        vm.updateSetting = updateSetting;
        vm.otaggs = []


        function init(){
            $log.debug(' --- ModalInstanceSettingCtrl.init: ');
            SettingApi.get({Id: 'tagg'}, function (resp) {
                $log.debug(resp);
                vm.tagg = resp;
                convert(vm.tagg);
            });
        }

        function convert(tagg){
            angular.forEach(tagg.values, function(s) {
                var o = {}
                o.tagg = s;
                o.check = true;
                vm.otaggs.push(o);
            });
        }

        function updateSetting () {
            $log.debug('updateSetting');
            vm.tagg.values = []
            angular.forEach(vm.otaggs, function(s) {
                if(s.check)
                    vm.tagg.values.push(s.tagg)
            });
            SettingService.updateTaggs(vm.tagg);
            cancel();
        }

        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
        init();
    }

    module.controller('ModalInstancePassCtrl', ModalInstancePassCtrl);
    ModalInstancePassCtrl.$inject = ['$scope', '$location', '$uibModalInstance', '$log', 'AuthorityApi'];
	function ModalInstancePassCtrl ($scope, $location, $uibModalInstance, $log, AuthorityApi) {
        var vm = this;
        vm.updatePassword = updatePassword;
        vm.cancel = cancel;

		function updatePassword () {
			$log.debug('updatePassword');
	 		$log.debug($scope.userPassword);

			AuthorityApi.Auth.password({}, $scope.userPassword).$promise   //, $scope.userPassword
				.then( function(resp) {
					$log.debug(resp);
					$modalInstance.close('close');
			});
		}
		function cancel () {
			$log.debug('cancel');
			$uibModalInstance.dismiss('cancel');
		}
    }