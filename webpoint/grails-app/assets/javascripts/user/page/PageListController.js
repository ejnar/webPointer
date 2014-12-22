'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('PageListCtrl', [ 
                                                    
    '$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$q', '$log', 'tmpCash', 'cfgAppPath', 'PageListApi', 'sharedProperties',
     
    function list ($scope, $rootScope, $routeParams, $location, $timeout, $q, $log, tmpCash, cfgAppPath, PageListApi, sharedProperties) {
	 	
    	$log.info(" --- PageListCtrl --- ");  
    	$scope.viewLoading = true;
    	
    	$scope.addPageList = function() {
    		$log.debug('addPageLis:');
    		PageListApi.save($scope.pageList, 
					function (resp) {
    					$log.debug(resp);
    					tmpCash.put('PageList', resp);
    					$location.path(cfgAppPath.groupOfPagesUpdate + resp.id);
			    	});	
    		
    	}
    	
    	$scope.editPageList = function(id) {
    		$log.debug('editPageList - id:' + id);	
//    		PageListApi.get({Id: id}, 
//					function (resp) {
//	    				$scope.item = resp;
//    					
//			    	});	   
    		$location.path(cfgAppPath.groupOfPagesUpdate + id );
    	}
  	
    	$scope.delPageList = function(id) {
    		PageListApi.remove({Id: id},
    			function (resp) {
    				$log.debug("remove success PageList");
    				$scope.loadPageList();
    			});
    	}
    	$scope.updatePageList = function(form) {
	        $log.debug('addPageList');	        
	        $log.debug($scope.item);
	        if($scope.item.id == undefined || $scope.item.id == ""){
	        	PageListApi.save($scope.item,
	        			function (resp) {
	        				$log.debug(resp);
	        				tmpCash.put('PageList', resp);
	        				$scope.loadPageList();
	                    	$location.path(cfgAppPath.groupOfPagesUpdate); 
	        		});    
	        }else{
	        	PageListApi.update({Id: $scope.item.id}, $scope.item, 
	        			function (resp) { 
	        				$scope.item = "";
	        				$scope.loadPageList(); 
	        			});
	        }
	    }
	    
		$scope.loadPageList = function() {
			$log.debug('loadPageList');
    		PageListApi.list(
    				function (resp) {
    					$scope.listOfPages = resp;
    					$scope.viewLoading = false;
                    });
    		
    		$scope.orderProp = 'name';
    	}
    	
}]);


sectionController.controller('UpdatePageListCtrl', [
                                                  
	'$rootScope', '$scope', '$routeParams', '$location', '$log', 'tmpCash', 'cfgAppPath', 'properties', 'SectionMetaApi', 'SectionsApi', 'PageListApi', 'PageListDataApi',
                                                    
    function($rootScope, $scope, $routeParams, $location, $log, tmpCash, cfgAppPath, properties, SectionMetaApi, SectionsApi, PageListApi, PageListDataApi) {
                                                	
		$log.info(" --- UpdatePageListCtrl --- ");  
		
		$scope.loadPageList = function() {
			if($routeParams.pageListId != null){
				
				PageListApi.get({Id: $routeParams.pageListId}).$promise
					.then( function(resp) {	
//						$log.debug(resp);
//						$log.debug(resp.pageParts[0].sectionMetas[0]);
	    				$scope.pageList = resp;
	    				$scope.pageListTmp = resp;
	    				
	    				SectionMetaApi.list(function (resp) {
	    					$scope.sections = resp;
	    					for(var i=0;i<$scope.pageListTmp.pageParts.length;i++){
	    						var pagePart = $scope.pageListTmp.pageParts[i];
	    						for(var j=0;j<pagePart.sectionMetas.length;j++){
	    							var meta = pagePart.sectionMetas[j];
	    							angular.forEach($scope.sections, function(sectionMeta) {
	    								if(sectionMeta.id == meta.id){
	    									$scope.pageList.pageParts[i].sectionMetas[j] = sectionMeta;
	    								}
	    								
	    							});
	    						}	
	    					}	
	    						
	    				});
	    			
			    	});
				
			}else{
				SectionMetaApi.list(
    				function (resp) {
    					$scope.sections = resp;
                    });
			
			}
    		$scope.orderProp = 'title';
		}
		
		$scope.addSectionToList = function(meta) {
			$log.info("addSectionToList meta: "+meta.id); 
			
			$scope.pageList.pageParts.push(meta);
			
			var pageData = {};
			pageData.color = 'white';
			pageData.style = 'default';
			pageData.sectionMetas = [];
			pageData.sectionMetas.push(meta);
			$log.debug(pageData); 
			$log.debug($routeParams.pageListId);
			PageListDataApi.save({pageListId: $routeParams.pageListId}, pageData,
					function (resp) {
						$log.debug(resp);  
					});
			
		}
		$scope.delPage = function(index) {
			$log.info("delPage: " + index); 
			
		}
		
}]);


