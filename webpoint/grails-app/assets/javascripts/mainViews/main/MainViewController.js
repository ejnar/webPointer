'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('MainViewListCtrl', [ 
                                                    
    '$scope', '$rootScope', '$routeParams', '$location', '$log', 'cfgAppPath', 'PageListApi',
     
    function list ($scope, $rootScope, $routeParams, $location, $log, cfgAppPath, PageListApi, SectionsApi) {
	 	
 
    	$scope.currentPart = 0;
    	$scope.totalPart = 1;
    	$scope.loadData = function() {
    		
    		PageListApi.get({Id: $routeParams.pageListId}).$promise
				.then( function(resp) {	
					$scope.pageList = resp;	
					$scope.totalPart = $scope.pageList.pageParts.length;
				});
    	};
    	
    	$scope.right = function() {
    		$scope.nextData(1);
    	};
    	
    	$scope.left = function() {
    		$scope.nextData(-1);
    	};
     	
    	$scope.nextData = function(index) {
    		$scope.currentPart = $scope.currentPart + index;
    		if($scope.currentPart == $scope.totalPart){
    			$scope.currentPart = 0;
    		}else if($scope.currentPart < 0){
    			$scope.currentPart = $scope.totalPart-1;
    		}	
      	};
    	
    			
      	// List
       	// Total number of items in all pages.
		$scope.totalItems = 64;
		// Current page number. First page is 1
		$scope.currentPage = 1;
		// Limit number for pagination size.
		$scope.maxSize = 5;
		// Maximum number of items per page. A value less than one indicates all items on one page.
		$scope.itemsPerPage = 1;
		$scope.items = []; 
  		$scope.loadPageList = function() {
			$log.debug('loadPageList');
			$scope.viewLoading = true;
			$scope.maxSize = 5;
			$scope.itemsPerPage = 1;
    		PageListApi.list(
    				function (resp) {
    					$scope.items = resp;
    					$scope.viewLoading = false;
    					$scope.totalItems = $scope.items.length;
    		  	  		$scope.pageChanged($scope.currentPage);
                    });
    	}
    	$scope.pageChanged = function(page) {
    		$log.debug('Page changed to: ' + page);
    		var begin = ((page - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
  	  		$scope.listOfPages = $scope.items.slice(begin, end);
    	};
    	$scope.loadPageList();
    	
    	
    	
    	
}]);


