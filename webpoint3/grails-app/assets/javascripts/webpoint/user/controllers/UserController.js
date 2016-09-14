'use strict';

/* Controllers */

var detailController = angular.module('webpoint.user');

detailController.controller('UserCtrl', [
    '$rootScope', '$scope', '$routeParams', '$location', '$log', '$q', 'cfgAppPath', 'properties', 'sharedProperties',
    'UserApi', 'RoleApi', 'RoleGroupApi',
    
    function($rootScope, $scope, $routeParams, $location, $log, $q, cfgAppPath, properties, sharedProperties, 
    		UserApi, RoleApi, RoleGroupApi) {
    	$log.debug(' --- UserController.userCtrl:');
    	$scope.doSave = true;
		RoleGroupApi.list( function (resp) { $scope.rolegroups = resp; });
		RoleApi.list( function (resp) { $scope.roles = resp; });
		UserApi.list( function (resp) { $log.debug(resp); });
}]);                                               

detailController.controller('EditUserCtrl', [
    '$scope', '$routeParams', '$location', '$log', '$q', 'cfgAppPath', 'properties', 'sharedProperties',
    'UserApi', 'RoleApi', 'RoleGroupApi',

    function($scope, $routeParams, $location, $log, $q, cfgAppPath, properties, sharedProperties, 
		    UserApi, RoleApi, RoleGroupApi) {

	   $scope.updatUser = function () {
			$log.debug(' --- UserController.editUserCtrl_updatUser:');
			$log.debug( $scope.user); 
			UserApi.User.update({Id: $scope.user.username}, $scope.user).$promise
				.then( function(resp) {
					$log.debug(resp);
				});
		};
	   
		$scope.loadUser = function () {
			$log.debug(' --- UserController.editUserCtrl_loadUser:');
			UserApi.User.list().$promise       // {Id: 'dummy'}
				.then(function(resp) {	
					$log.debug(resp); 
					$scope.user = resp[0]; 
					$scope.user.confirm_email = resp[0].email;
				});
		};
}]); 

detailController.controller('AddUserCtrl', [ '$scope', '$log', 'UserApi', 'RoleApi', 'RoleGroupApi',
	 function($scope, $log, UserApi, RoleApi, RoleGroupApi) {
		$scope.doSave = true;
		RoleGroupApi.list( function (resp) { $log.debug(resp); $scope.rolegroups = resp; });
		RoleApi.list( function (resp) { $log.debug(resp); $scope.roles = resp; });
	   
		$scope.addUser = function () {
			$log.debug(' --- UserController.addUserCtrl_addUser:');
			var user = $scope.user;
			user.password = 'tmp';
			$log.debug(user);
			UserApi.User.save(user).$promise
    			.then( function(resp) {
    				$log.debug(resp);

    			});
		};
}]); 


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


