'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('PageListCtrl', [ 
                                                    
    '$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$q', '$log', '$modal', 'tmpCash', 'cfgAppPath', 'PageListApi', 'sharedProperties',
     
    function list ($scope, $rootScope, $routeParams, $location, $timeout, $q, $log, $modal, tmpCash, cfgAppPath, PageListApi, sharedProperties) {
	 	
    	$log.info(" --- PageListCtrl --- ");  
    	
    	$scope.openModel = function () {
    		var modalInstance = $modal.open({
    			templateUrl: 'user/views/page/ceatePageModal.html',
    			controller: 'ModalInstanceCtrl',
    			size: 'lg'
    		});
    	};
    	
    	$scope.addPageList = function(form) {
    		$log.debug('addPageList:');
    		PageListApi.save($scope.pageList, 
					function (resp) {
    					$log.debug(resp);
//    					tmpCash.put('PageList', resp);
    					$location.path(cfgAppPath.groupOfPagesUpdate + resp.id);
			    	});	
    	}
    	
    	$scope.editPageList = function(id) {
    		$log.debug('editPageList - id:' + id);	
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
//	        				tmpCash.put('PageList', resp);
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
			$scope.viewLoading = true;
    		PageListApi.list(
    				function (resp) {
    					$scope.listOfPages = resp;
    					$scope.viewLoading = false;
                    });
    		
    		$scope.orderProp = 'name';
    	}
    	
}]);



sectionController.controller('ModalInstanceCtrl',[ '$scope', '$location', '$modalInstance', '$log', 'cfgAppPath', 'PageListApi',   
		function ($scope, $location, $modalInstance, $log, cfgAppPath, PageListApi) {

	  $scope.addPageList = function () {
	    $modalInstance.close('close'); 
	    
   		$log.debug('addPageList:');
		PageListApi.save($scope.pageList, 
			function (resp) {
				$log.debug(resp);
				$location.path(cfgAppPath.groupOfPagesUpdate + resp.id);
			});	
	 
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
}]);




sectionController.controller('UpdatePageListCtrl', [
                                                  
	'$rootScope', '$scope', '$routeParams', '$location', '$log', 'tmpCash', 'cfgAppPath', 'properties', 'SectionMetaApi', 'SectionsApi', 'PageListApi', 'PageListDataApi',
                                                    
    function($rootScope, $scope, $routeParams, $location, $log, tmpCash, cfgAppPath, properties, SectionMetaApi, SectionsApi, PageListApi, PageListDataApi) {
                                                	
		$log.info(" --- UpdatePageListCtrl --- ");  
		
		$scope.loadPageList = function() {
			if($routeParams.pageListId != null){
				
				PageListApi.get({Id: $routeParams.pageListId}).$promise
					.then( function(resp) {	
	    				$scope.pageList = resp;
	    				$scope.pageListTmp = resp;
	    				
	    				SectionMetaApi.list(function (resp) {
	    					$scope.sections = resp;
	    					for(var i=0;i<$scope.pageListTmp.pageParts.length;i++){
	    						var pageData = $scope.pageListTmp.pageParts[i];
	    						for(var j=0;j<pageData.sections.length;j++){
	    							var section = pageData.sections[j];
	    							
	    							angular.forEach($scope.sections, function(sectionMeta) {
	    								if(sectionMeta.section.id == section.id){
	    									$scope.pageList.pageParts[i].sections[j].meta = sectionMeta;
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

			var pageData = {};
			pageData.key = '';
			pageData.color = 'white';
			pageData.style = 'default';
			pageData.sections = [];
			
			SectionsApi.get({Id: meta.section.id}).$promise
				.then( function(resp) {	
					$log.debug(resp);
					var section = resp;
					section.meta = meta;
					pageData.sections.push(section);
					
					$log.debug(pageData);
					$log.debug($routeParams.pageListId);
					PageListDataApi.save({pageListId: $routeParams.pageListId}, pageData,
							function (resp) {
								$log.debug(resp);  
								$scope.loadPageList();
							});
				});
		
		}
		$scope.delPageData = function(pageData) {
			$log.info("delPageData: "); 
			$log.info(pageData); 
			PageListDataApi.remove({pageListId: $routeParams.pageListId, Id: pageData.key},
					function (resp) {
						$log.debug(resp);
						$scope.loadPageList();
					});
			
		}
		$scope.backToList = function() {
			$location.path(cfgAppPath.groupOfPagesList);
		}
		
}]);


