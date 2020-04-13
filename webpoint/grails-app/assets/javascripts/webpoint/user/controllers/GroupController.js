'use strict';

/* Controllers */

var module = angular.module('webpoint.user');

    module.controller('GroupCtrl', GroupCtrl);
    GroupCtrl.$inject = ['$scope', '$log', 'cfgAppPath', '$location', 'hashMap', 'UserApi', '$uibModal'];

    function GroupCtrl ($scope, $log, cfgAppPath, $location, hashMap, UserApi, $uibModal) {
        var groupCtrl = this;

        groupCtrl.editRoles = editRoles;
        groupCtrl.removeGroup = removeGroup;
        groupCtrl.openGroupModel = openGroupModel;

        function init(){
            $log.debug(' --- GroupCtrl.init: ');
            groupCtrl.rolegroups = UserApi.RoleGroup.list();
        }

        function editRoles(group){
            $log.debug(' --- GroupCtrl.editRoles: ' + group);
            var modalInstance = $uibModal.open({
                templateUrl: cfgAppPath.createEditRoleModal,
                controller: 'ModalEditRoleCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return group;
                    }
                }
            });
        }

        function removeGroup(group) {
            $log.debug('removeGroup');
        }

        function openGroupModel() {
			$log.debug('openGroupModel');
	    	var modalInstance = $uibModal.open({
	    		templateUrl: cfgAppPath.createAddGroupModal,
	    		controller: 'ModalAddGroupCtrl as vm',
	    		size: 'lg'
	    	});
	    	modalInstance.closed.then(function(){
                init();
            });
	    }
        init();
    }

    module.controller('ModalEditRoleCtrl', ModalEditRoleCtrl);
    ModalEditRoleCtrl.$inject = [ '$scope', '$location', '$uibModalInstance', '$log', 'cfgAppPath', 'UserApi', 'data'];

    function ModalEditRoleCtrl ($scope, $location, $uibModalInstance, $log, cfgAppPath, UserApi, data) {

	    function init(){
            $log.debug(" --- EditUserCtrl.ModalEditRoleCtrl.init: " + data.name);
            $scope.group = data.name;
            $scope.roles = [];
            $scope.selectedRoles = [];
            UserApi.Role.list().$promise
                .then( function(respRoles) {
                    $log.debug(respRoles);

                    UserApi.UserRoleGroup.get({Id: data.id}).$promise
                        .then( function(resp) {
                            $log.debug(resp);

                            angular.forEach(resp.roleGroupRoles, function(rolegroup) {
                                $scope.selectedRoles.push(rolegroup.role);

                                for(i=0;i<respRoles.length;i++){
                                    if(respRoles[i].authority === rolegroup.role.authority){
                                        $log.debug('Test: ' +respRoles[i].authority);
                                        respRoles.splice(i, 1);
                                        break;
                                    }
                                }
                            });
                            $scope.roles = respRoles;
                        });

                });
        }
	    $scope.addRole = function (role) {
	        $log.debug(" --- ModalEditRoleCtrl.addRole: " + role.authority);
            UserApi.RoleGroupRole.update({Id: data.name}, detail(false,data.name,role)).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    init();
                });

	    };
	    $scope.removeRole = function (role) {
            $log.debug(" --- ModalEditRoleCtrl.removeRole: " + role.authority);
            UserApi.RoleGroupRole.update({Id: data.name}, detail(true,data.name,role)).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    init();
                });
        };
	    $scope.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	    };

	    function detail(remove,roleGroup,role){
            var detail = {};
            detail.remove = remove;
            detail.roleGroup = roleGroup;
            detail.roles = [];
            detail.roles.push(role);
            return detail;
	    }

	    init();
    }

    module.controller('ModalAddGroupCtrl', ModalAddGroupCtrl);
    ModalAddGroupCtrl.$inject = ['$scope', '$location', '$uibModalInstance', '$log', 'UserApi'];
	function ModalAddGroupCtrl($scope, $location, $uibModalInstance, $log, UserApi ) {
        var vm = this;

        vm.addGroup = addGroup;
        vm.cancel = cancel;

		function addGroup() {
			$log.debug('addGroup');
		 	$log.debug($scope.group);

		 	UserApi.RoleGroup.save($scope.group).$promise
		 		.then( function(resp) {
		 			$log.debug(resp);
					$uibModalInstance.close('close');
			});
		}
		function cancel () {
			$log.debug('cancel');
			$uibModalInstance.dismiss('cancel');
		}
    }