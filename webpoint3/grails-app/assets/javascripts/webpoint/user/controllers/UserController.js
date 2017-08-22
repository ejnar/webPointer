'use strict';

/* Controllers */

var module = angular.module('webpoint.user');

    module.controller('UserCtrl', UserCtrl);
    UserCtrl.$inject = ['$scope', '$log', 'cfgAppPath', '$location', 'hashMap', 'UserApi', 'RoleApi', 'RoleGroupApi'];

    function UserCtrl ($scope, $log, cfgAppPath, $location, hashMap, UserApi, RoleApi, RoleGroupApi) {
        var userCtrl = this;

    	$scope.doSave = true;
//		RoleGroupApi.list( function (resp) { $scope.rolegroups = resp; });
//		RoleApi.list( function (resp) { $log.debug(resp);  $scope.roles = resp; });
        userCtrl.gotoAddUser = gotoAddUser;
        userCtrl.gotoEditUser = gotoEditUser;
        userCtrl.newPassword = newPassword

        function init(){
            $log.debug(' --- UserController.userCtrl: ');
            userCtrl.users =  UserApi.User.list();
            console.info(userCtrl.users);
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
    EditUserCtrl.$inject = ['$scope', '$routeParams', '$log', 'cfgAppPath', 'hashMap', 'UserApi', 'RoleApi', 'RoleGroupApi'];
    function EditUserCtrl ($scope, $routeParams, $log, cfgAppPath, hashMap, UserApi, RoleApi, RoleGroupApi) {
        var userCtrl = this;

        $log.debug( $routeParams);
        loadUser () ;

        $scope.doSave = false;
        userCtrl.rolegroups = RoleGroupApi.list();
        userCtrl.roles = RoleApi.list();
        userCtrl.update = update;


	    function update() {
			$log.debug(' --- UserController.editUserCtrl_updatUser:');
			$log.debug( $scope.user);
			UserApi.User.update({Id: $scope.user.id}, $scope.user).$promise
				.then( function(resp) {
					$log.debug(resp);
				});
		}

		function loadUser () {
			$log.debug(' --- UserController.editUserCtrl_loadUser: ' + hashMap.get('DOTOKEN'));
			UserApi.User.get({Id: $routeParams.userId, token: hashMap.get('DOTOKEN')}).$promise
				.then(function(resp) {
					$log.debug(resp);
					$scope.user = resp;
//					$scope.user.confirm_email = resp.email;
				});
			hashMap.remove('DOTOKEN')
		}
    }

    module.controller('AddUserCtrl', AddUserCtrl);
    AddUserCtrl.$inject = ['$scope', '$log', 'UserApi', 'RoleApi', 'RoleGroupApi'];

    function AddUserCtrl ($scope, $log, UserApi, RoleApi, RoleGroupApi) {
        var userCtrl = this;

        $scope.doSave = true;
        userCtrl.save = save;

        function init(){
            $log.debug(' --- AddUserCtrl.init: ');
            userCtrl.rolegroups = RoleGroupApi.list();
            userCtrl.roles = RoleApi.list();
        }


        function save() {
            $log.debug(' --- UserController.AddUserCtrl_save:');
            $log.debug($scope.user);
            var user = $scope.user;
            $log.debug(user);
            UserApi.User.save(user).$promise
                .then( function(resp) {
                    $log.debug(resp);

                });
        };
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


