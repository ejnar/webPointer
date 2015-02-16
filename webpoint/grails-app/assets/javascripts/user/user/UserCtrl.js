'use strict';

/* Controllers */

var detailController = angular.module('userApp');

detailController.controller('UserCtrl', [
    '$rootScope', '$scope', '$routeParams', '$location', '$log', '$q', 'cfgAppPath', 'properties', 'sharedProperties',
    'UserApi', 'RoleApi', 'RoleGroupApi',
    
    function($rootScope, $scope, $routeParams, $location, $log, $q, cfgAppPath, properties, sharedProperties, 
    		UserApi, RoleApi, RoleGroupApi) {
    	$log.debug(' --- UserCtrl --- ');  
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
	   $log.debug(' --- EditEmailCtrl --- ');  
	   $scope.doSave = true;
	   
	   
	   $scope.updatUser = function () {
			$log.debug('updatEmail'); 
			
		};
	   
	   

}]); 

detailController.controller('AddUserCtrl', [
	'$scope', '$routeParams', '$location', '$log', '$q', 'cfgAppPath', 'properties', 'sharedProperties',
	'UserApi', 'RoleApi', 'RoleGroupApi', 
	
	 function($scope, $routeParams, $location, $log, $q, cfgAppPath, properties, sharedProperties, 
			 UserApi, RoleApi, RoleGroupApi) {
		$log.debug(' --- AddUserCtrl --- ');  
		$scope.doSave = true;
	   
		RoleGroupApi.list( function (resp) { $log.debug(resp); $scope.rolegroups = resp; });
		RoleApi.list( function (resp) { $log.debug(resp); $scope.roles = resp; });
	   
		$scope.addUser = function () {
			$log.debug('addUser'); 
			var user = $scope.user;
			user.password = 'tmp';
			$log.debug(user); 
			UserApi.save(user).$promise
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


