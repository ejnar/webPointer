'use strict';

/* Controllers */

var module = angular.module('webpoint.user');

    module.controller('UserCtrl', UserCtrl);
    UserCtrl.$inject = ['$scope', '$log', 'cfgAppPath', '$location', 'hashMap', 'UserApi'];

    function UserCtrl ($scope, $log, cfgAppPath, $location, hashMap, UserApi) {
        var userCtrl = this;

    	$scope.doSave = true;
        userCtrl.gotoAddUser = gotoAddUser;
        userCtrl.gotoEditUser = gotoEditUser;
        userCtrl.newPassword = newPassword

        function init(){
            $log.debug(' --- UserCtrl.init: ');
            userCtrl.users =  UserApi.User.list();
//            console.info(userCtrl.users);
        }

        function newPassword(user){
            hashMap.put('DOTOKEN',true);
            gotoEditUser(user)
        }

        function gotoAddUser() {
            $location.path(cfgAppPath.USER_ADD);
        }

        function gotoEditUser(user) {
            $log.debug(user);  // userId
            $location.path(cfgAppPath.USER_EDIT + user.id);
        }
        init();

    }

    module.controller('EditUserCtrl', EditUserCtrl);
    EditUserCtrl.$inject = ['$scope', '$routeParams', '$log', 'cfgAppPath', 'hashMap', 'UserApi', '$uibModal'];
    function EditUserCtrl ($scope, $routeParams, $log, cfgAppPath, hashMap, UserApi, $uibModal) {
        var userCtrl = this;

        $scope.doSave = false;
        userCtrl.rolegroups = []; //UserApi.RoleGroup.list();
        userCtrl.roles = UserApi.Role.list();
        userCtrl.update = update;
        userCtrl.disableGroup = disableGroup;
        userCtrl.onChangeGroup = onChangeGroup;
        userCtrl.editRoles = editRoles;

        (function init() {
            loadUser();
        })();

	    function update() {
			$log.debug(' --- UserController.editUserCtrl_updatUser:');
			$scope.user.rolegroups = collectSelectedRoleGroup(userCtrl.rolegroups);
			$log.debug( $scope.user);
			UserApi.User.update({Id: $scope.user.id}, $scope.user).$promise
				.then( function(resp) {
					$log.debug(resp);
				});
		}

		function loadUser () {
			$log.debug(' --- UserController.loadUser: ' + hashMap.get('DOTOKEN'));
			UserApi.User.get({Id: $routeParams.userId, token: hashMap.get('DOTOKEN')}).$promise
				.then(function(resp) {
					$log.debug(resp);
					$scope.user = resp;
                    if($scope.user.systemRole)
                        $scope.user.systemRole.system = true;
                    else{
                        $scope.user.systemRole = {}
                        $scope.user.systemRole.system = false;
                    }
                    filterRoleGroupList(resp);
				});
			hashMap.remove('DOTOKEN')

		}

        function editRoles(group){
            $log.debug(' --- UserController.editRoles: ' + group);
            createModal(group);
        }

        function disableGroup(name,user){
            return name.equalIgnoreCase('GROUP_'+user.username);
        }

        function onChangeGroup(group,user) {
            $log.debug(' --- UserController.onChangeGroup: ' + group.name);
            console.info(user);

            var item = {};
            item.username = user.username;
            item.roleGroup = group.name;
            item.selected = group.selected;
            var usergroup = {};
            usergroup.userGroupItems = [];
            usergroup.userGroupItems.push(item);
            UserApi.UserRoleGroup.update({Id: '0'}, usergroup).$promise
                .then( function(resp) {
                    $log.debug(resp);
                });
        }

        function createModal(group){
            var modalInstance = $uibModal.open({
                templateUrl: cfgAppPath.createViewRoleModal,
                controller: 'ModalViewRoleCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return group;
                    }
                }
            });
            modalInstance.closed.then(function(){

            });
        }


        function filterRoleGroupList(user){
            UserApi.RoleGroup.list().$promise
                .then( function(resp) {
                    userCtrl.rolegroups = resp;
                    angular.forEach(userCtrl.rolegroups, function(rolegroup) {
                        found = user.rolegroups.filter(function (g) {
                            return g == rolegroup.name;
                        }).length;
                        if(found){
                            rolegroup.selected = true;
                        }else{
                            rolegroup.selected = false;
                        }
                    });
            });
        }


        function collectSelectedRoleGroup(rolegroups){
            var array = [];
            angular.forEach(rolegroups, function(rolegroup) {
                if(rolegroup.select){
                    array.push(rolegroup.name);
                }
            });
            $log.debug(array);
            return array;
        }


    }

    module.controller('AddUserCtrl', AddUserCtrl);
    AddUserCtrl.$inject = ['$scope', '$log', 'UserApi'];

    function AddUserCtrl ($scope, $log, UserApi) {
        var userCtrl = this;

        $scope.doSave = true;
        userCtrl.save = save;

        function init(){
            $log.debug(' --- AddUserCtrl.init: ');
            userCtrl.rolegroups = UserApi.RoleGroup.list();
            userCtrl.roles = UserApi.Role.list();
        }


        function save() {
            $log.debug(' --- UserController.AddUserCtrl_save:');
            $log.debug($scope.user);
            var rolegs = userCtrl.rolegroups.filter(function (rolegroup) {
                return rolegroup.selected
            });
            var rolegroups = [];
            angular.forEach(rolegs, function(rg) {
                rolegroups.push(rg.name);
            });
            $log.debug(rolegroups);

            var user = $scope.user;
            user.email = user.email.toLowerCase();
            user.username = user.username.toLowerCase();
            user.rolegroups = rolegroups;
            $log.debug(user);
            UserApi.User.save(user).$promise
                .then( function(resp) {
                    $log.debug(resp);
                });
        };
        init();
    }


    module.controller('ModalViewRoleCtrl', ModalViewRoleCtrl);
    ModalViewRoleCtrl.$inject = [ '$scope', '$location', '$uibModalInstance', '$log', 'cfgAppPath', 'UserApi', 'data'];

    function ModalViewRoleCtrl ($scope, $location, $uibModalInstance, $log, cfgAppPath, UserApi, data) {

	    function init(){
            $log.debug(" --- EditUserCtrl.ModalViewRoleCtrl.init: " + data.name);

            $scope.group = data.name;
            $scope.roles = UserApi.Role.list();
            $scope.selectedRoles = [];
            UserApi.UserRoleGroup.get({Id: data.id}).$promise
                .then( function(resp) {
                    angular.forEach(resp.roleGroupRoles, function(rolegroup) {
                        $scope.selectedRoles.push(rolegroup.role);
                    });
                });
        }

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


//delete $scope.detail;
//$scope.$watchCollection('detail', function (newVal, oldVal) {
//     console.log(newVal, oldVal);
//});


//var detail;
////detail.message = "";
//detail = {
//	  userName: "",
//	  secret: ""
//};
//$scope.detail = detail; 
 
//console.log($scope);

//$scope.updateUser = function () {
//	$log.debug('updateUser');    	
////	var promise1 = SectionMetaApi.update({Id: $scope.sectionMeta.id }, $scope.sectionMeta);
////	var promise2 = SectionsApi.update({Id: $scope.section.id}, $scope.section);    
////	
////	$q.all([promise1, promise2]).then(function(data) {
////		$location.path(cfgAppPath.groupOfSectionList);
////    });
//};
//
//$scope.saveUser = function() {
//	$log.debug('saveUser'); 
//
//	
////	var section = $scope.section;
////	section.sectionMeta = $scope.sectionMeta;
////	
////	SectionsApi.save(section).$promise
////		.then( function(resp) {
////			$scope.sectionMeta.sectionFK = resp.id;
////			$scope.sectionMeta.sectionType = resp.type;
////			return SectionMetaApi.update({Id: $scope.sectionMeta.id}, $scope.sectionMeta);
////		}).then( function(resp) {
////			$location.path(cfgAppPath.groupOfSectionList);
////		});	
// }


