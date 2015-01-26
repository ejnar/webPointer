'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('UpdateSectionCtrl', [
    
    '$rootScope', '$scope', '$routeParams', '$location', '$log', '$q',
    'cfgAppPath', 'properties', 'SectionsApi', 'SectionMetaApi', 'GroupsOfSectionsApi', 'sharedProperties',
    
    function($rootScope, $scope, $routeParams, $location, $log, $q, cfgAppPath, properties, SectionsApi, SectionMetaApi, GroupsOfSectionsApi, sharedProperties) {
		
		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		$scope.keys = properties.keys;
		$scope.doSave = true;
		
		SectionMetaApi.get({Id: $routeParams.metaId}, function (resp) {
			$log.debug("SectionMetaApi.get " + $routeParams.metaId);
			$scope.sectionMeta = resp;
		});	
		
		if($routeParams.id != 'null' && $routeParams.id != ''){	
			$log.debug("SectionApi.get " + $routeParams.id);
			SectionsApi.get({Id: $routeParams.id}).$promise
				.then(function(resp) {	
					$scope.section = resp;
					$scope.doSave = false;
				});
		}  
    
	    $scope.updateSection = function () {
	    	$log.debug("updateSection ");    	
	    	var promise1 = SectionMetaApi.update({Id: $scope.sectionMeta.id }, $scope.sectionMeta);
	    	var promise2 = SectionsApi.update({Id: $scope.section.id}, $scope.section);    
	    	
	    	$q.all([promise1, promise2]).then(function(data) {
    			$location.path(cfgAppPath.groupOfSectionList);
    	    });
	    };
	    
		$scope.saveSection = function(form) {
			$log.debug('saveSection'); 
			$log.debug($scope.section); 
			$log.debug($scope.sectionMeta); 
			
			var section = $scope.section;
			section.sectionMeta = $scope.sectionMeta;
			
			SectionsApi.save(section).$promise
        		.then( function(resp) {
        			$scope.sectionMeta.sectionFK = resp.id;
        			$scope.sectionMeta.sectionType = resp.type;
        			return SectionMetaApi.update({Id: $scope.sectionMeta.id}, $scope.sectionMeta);
        		}).then( function(resp) {
        			$location.path(cfgAppPath.groupOfSectionList);
        		});	
	     }
}]);                                               


