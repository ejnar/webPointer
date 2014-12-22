'use strict';

/* Controllers */

var sectionController = angular.module('userApp');



sectionController.controller('UpdateSectionCtrl', [
    
    '$rootScope', '$scope', '$routeParams', '$location', '$log', '$q',
    'cfgAppPath', 'properties', 'SectionsApi', 'GroupsOfSectionMetaApi', 'GroupsOfSectionsApi', 'sharedProperties',
    
    function($rootScope, $scope, $routeParams, $location, $log, $q, cfgAppPath, properties, SectionsApi, GroupsOfSectionMetaApi, GroupsOfSectionsApi, sharedProperties) {
		
		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		
		$scope.doSave = sharedProperties.getProperty().doSave;
    
		if(!$scope.doSave){
			
			GroupsOfSectionMetaApi.get({groupId: $routeParams.groupId, Id: $routeParams.id}).$promise
				.then( function(resp) {	
					$scope.sectionMeta = resp;
					return SectionsApi.get({Id: resp.section.id}).$promise;
				})
				.then(function(resp) {	
					$scope.section = resp;
				});
		}  
    
	    $scope.updateSection = function () {
	    	$log.info("updateSection ");    	
	    	var promise1 = GroupsOfSectionMetaApi.update({groupId: $routeParams.groupId, Id: $scope.sectionMeta.id}, $scope.sectionMeta);
	    	var promise2 = SectionsApi.update({Id: $scope.section.id}, $scope.section);    
	    	
	    	$q.all([promise1, promise2]).then(function(data) {
    			$scope.viewLoading = false;
    			$location.path(cfgAppPath.groupOfSectionList);
    	    });
	    };
	    
		
		
		$scope.saveSection = function(form) {
			$log.info('saveSection');    
			
			if (form.$valid) {
				var section = $scope.section;
				section.groupId = $rootScope.groupId;
				var sectionMeta = $scope.sectionMeta;
				sectionMeta.section = section;
	        
				GroupsOfSectionMetaApi.save({groupId: $rootScope.groupId}, sectionMeta).$promise
        			.then( function(response) {
        				$location.path(cfgAppPath.groupOfSectionList);
        		});	      
			}
	     }
	    	
	   
}]);                                               


