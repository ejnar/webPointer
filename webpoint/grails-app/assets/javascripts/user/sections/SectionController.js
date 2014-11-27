'use strict';

/* Controllers */

var sectionController = angular.module('userApp');



sectionController.controller('UpdateSectionCtrl', [
    
    '$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath', 'properties', 'SectionsApi', 'GroupsOfSectionsApi', 'sharedProperties',
    
    function($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, SectionsApi, GroupsOfSectionsApi, sharedProperties) {
			
		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		
		$scope.doSave = sharedProperties.getProperty().doSave;
    
		if($scope.doSave){
			$scope.section = {};
		}else{
			$scope.section = GroupsOfSectionsApi.get({groupId: $routeParams.groupId}, function (post) {});
		}  
    
//	    $scope.updateGroup = function () {
//	    	console.log("updateGroup ", $scope.group);
//	    	var group = $scope.group;
//	    	var res = GroupsOfSectionsApi.update({groupId: group.id}, group,
//	            function (resp) {
//	                console.log("success");
//	            }, function (resp) {
//	                console.log("error");
//	            });
//	    	$location.path('/groupOfSection');   
//	    };
	    
		console.log('routeParams: ' + $rootScope.groupId);
		
		$scope.saveSection = function() {
			$log.info('saveSection');    
			
			var group = GroupsOfSectionsApi.get({Id: $rootScope.groupId});
			
			
	        var section = $scope.section;
	        section.groupId = $rootScope.groupId;
	        section.id;
	        
	        var meta = $scope.meta;
	        
	        $log.debug($rootScope.group);
	        var res = SectionsApi.save(section,
	                function (resp) {
//	                    console.log(resp);
	                    
	                    meta.sectionId = resp.id;
	                    group.sectionsMeta = [];
	                    group.sectionsMeta.push(meta);
	                    console.log('-----------------');
	                    $log.debug(group);
	                    GroupsOfSectionsApi.update(group, {Id: $rootScope.groupId},
	                      function (resp) {
	                    	
	                    	console.log(resp);
	                    	$location.path(cfgAppPath.groupOfSectionList);
	                      }, function (resp) {
	  	                    console.log(resp.statusText);
	  	                  } ); 
	                    	
	                }, function (resp) {
	                    console.log(resp.statusText);
	                });
//	        $log.debug(res);
	        $rootScope.group = {};      
	     }
	    	
	   
}]);                                               


