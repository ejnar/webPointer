'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('GroupOfSectionCtrl', [ 
                                                    
    '$scope', '$rootScope', '$routeParams', '$location', '$filter', '$log', 'cfgAppPath', 'GroupsOfSectionsApi', 'sharedProperties',
     
    function list ($scope, $rootScope, $routeParams, $location, $filter, $log, cfgAppPath, GroupsOfSectionsApi, sharedProperties) {
	 	
//		$scope.$on("LOAD_GROUPOFSECTION_EVENT", function () {   // event, args
//			$log.debug(' --- LOAD_GROUPOFSECTION_EVENT');     // + args.eventID
//			$scope.loadSection();	 
//		});
			
    	$scope.editGroup = function(id) {
    		$log.debug('editGroup - id:' + id);	
    		$log.debug(id);	
    		sharedProperties.getProperty().doSave = false;
    		$location.path(cfgAppPath.groupOfSectionEdit + id );
    	}
    	$scope.delGroup = function(id) {
    		$log.debug('delGroup - id:' + id);
    		GroupsOfSectionsApi.remove({Id: id},
    			function (resp) {
    				$log.debug("remove success GroupsOfSection");
    				$scope.loadGroups();
    			});
    	}
    	$scope.addGroup = function() {
    		$log.debug('addGroup');
    		sharedProperties.getProperty().doSave = true;
    		$location.path(cfgAppPath.groupOfSectionNew);
    	} 
    	$scope.addSection = function(id) {
    		$log.debug('addSection groupId:' + id);
    		$rootScope.groupId = id;
    		sharedProperties.getProperty().doSave = true;
            $location.path(cfgAppPath.sectionNew); 
    	} 
    	
    	$scope.editSection = function(groupId,metaId) {
    		$log.debug('editSection id:'+metaId);
    		sharedProperties.getProperty().doSave = false;
    		$location.path(cfgAppPath.sectionEdit.replace(':groupId', groupId).replace(':id', metaId) );
    	}
    
    	
    	$scope.toggleDetail = function($index) {
            $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
        };
      	
    	
		// Total number of items in all pages.
		$scope.totalItems = 64;
		// Current page number. First page is 1
		$scope.currentPage = 1;
		// Limit number for pagination size.
		$scope.maxSize = 5;
		// Maximum number of items per page. A value less than one indicates all items on one page.
		$scope.itemsPerPage = 2;
		$scope.items = []; 
		$scope.groups = [];
		$scope.search = '';
		$scope.predicate;
    	$scope.reverse;
		var orderBy = $filter('orderBy');
		var filter = $filter('filter');
		$scope.loadGroups = function() {
    		$log.debug(' --- ListGroupOfSectionCtrl.load ');
    		$scope.viewLoading = true;
    		GroupsOfSectionsApi.list(
    				function (resp) {
    					$scope.items = resp;
    					$scope.viewLoading = false;
    					$scope.totalItems = $scope.items.length;
    					$scope.createSearchList();
                    });

    	};
    	$scope.loadGroups();
    	
    	$scope.createSearchList = function (){
    		var filterList = filter($scope.items, $scope.search);
    		var orderByList = orderBy(filterList, $scope.predicate, $scope.reverse);
    		
    		$scope.totalItems = orderByList.length;
    		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage), end = begin + $scope.itemsPerPage;
    		$scope.groups = orderByList.slice(begin, end);
    	}
    	
    	$scope.order = function(predicate, reverse) {
    		$scope.predicate = predicate; 
    		$scope.reverse = reverse;
    		$scope.createSearchList();
    	};
    	$scope.order('originalTitle',true);
    	
    	$scope.pageChanged = function(page) {
    		$log.debug('Page changed to: ' + page);
    		$scope.currentPage = page;
    		$scope.createSearchList();
    	};
    	
    	$scope.searchTable = function(search) {
    		$scope.search = search;
    		$log.debug('Search: ' + $scope.search);
    		$scope.createSearchList();
    	}
    	
//    	$scope.$watch("search", function(query){
//    		$log.debug('$watch ' + query);
////	    	$scope.groups = $filter("filter")($scope.items, query);
//    	}, 350);
//    	 $scope.$watch( function( $scope ) {
//    		 console.log( "Function watched" );
//    			 // This becomes the value we're "watching".
//    		 
////    		 var list = $filter("filter")($scope.items, $scope.search);
////    		 $scope.groups = list.slice(begin, end);
//    		 return  ( $scope.search )
//    	 	}
//    	); 
       	
    	
}]);



sectionController.controller('SpotifyCtrl', function ($scope, $log, SpotifySearchApi) {
	
	$scope.currentPage = 1;
	$scope.maxSize = 100;
	$scope.itemsPerPage = 2;
	$scope.totalItems = 100;
	$scope.offset = 0;
	$scope.count = 0;
		  
	$scope.pageChanged = function(page) {
		$scope.count = page * $scope.itemsPerPage; 
		var limit = $scope.itemsPerPage;
		if($scope.count < $scope.totalItems){
			$scope.offset = (page-1) * $scope.itemsPerPage;
		}
		$log.debug('count: ' + $scope.count);
		var promise = SpotifySearchApi.list('jesus', limit, $scope.offset);
		promise.then(function(resp) { 
			$scope.tracks = resp.tracks.items;
			$scope.totalItems = resp.tracks.total;
		}, 
		function() { console.log(' --- error'); });
	};
	
	$scope.$watch('currentPage', function(newPage){
		$scope.watchPage = newPage;
	    //or any other code here
		$scope.pageChanged(newPage);
		$log.debug('$watch ' + newPage);
	});
	

});


//sectionController.controller('UpdateGroupOfSectionCtrl', ['$scope', '$routeParams', '$location', '$timeout', 'GroupsOfSectionsApi',
//    function ($scope, $routeParams, $location, $timeout, BookApi) {
//		$log.debug( " --- UpdateGroupOfSectionCtrl ", $routeParams.groupId);
//		
//		$scope.group = GroupsOfSectionsApi.get({groupId: $routeParams.groupId}, 
//				function (post) {
//		});
//	    $scope.updateBook = function () {
//	    	$log.debug("Update book ", $scope.book);
//	        var book = $scope.book;
//	        var res = BookApi.update({bookId: book.id}, book,
//	                function (resp) {
//	                    $log.debug("success");
//	                }, function (resp) {
//	                    $log.debug("error");
//	                });
////	            $location.path('/books');    
//	    };
//	    
//	    var timeout = null;
//	    var debounceSaveUpdates = function(newVal, oldVal) {
//	    	$log.debug('debounceSaveUpdates');
//	        if (newVal != oldVal) {
//	          if (timeout) {
//	            $timeout.cancel(timeout)
//	          }
//	          timeout = $timeout($scope.updateBook, 3000);  // 1000 = 1 second
//	        }
//	    };
//	    
//	    $scope.$watch('book.title', debounceSaveUpdates);
//	    $scope.$watch('book.author', debounceSaveUpdates);
//	    $scope.$watch('book.price', debounceSaveUpdates);    
//}]);




sectionController.controller('UpdateGroupSectionCtrl', [
                                                        
    '$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath', 'properties', 'GroupsOfSectionsApi', 'sharedProperties',
    
    function($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, GroupsOfSectionsApi, sharedProperties) {
	
		$scope.categories = properties.categories;
		$scope.doSave = sharedProperties.getProperty().doSave;
//		$scope.$broadcast('show-errors-reset');
		
		if(!$scope.doSave){
			$scope.invalid = false
			GroupsOfSectionsApi.get({Id: $routeParams.groupId}, function (resp) {
				$scope.group = resp;
			});	
		} 
    
	    $scope.updateGroup = function (form) {
	    	$log.debug("updateGroup ", $scope.group);
	    	var group = $scope.group;
	    	GroupsOfSectionsApi.update({Id: group.id}, group, function (resp) {
	    		$location.path(cfgAppPath.groupOfSectionList);
	        });
//	    	$rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    };
	    
	    $scope.saveGroup = function(form) {
	        $log.debug('saveGroup');
//	        $scope.$broadcast('show-errors-check-validity');
	        GroupsOfSectionsApi.save($scope.group, function (resp) {
	        	$rootScope.groupId = resp.id;
	        	sharedProperties.getProperty().doSave = true;
	            $location.path(cfgAppPath.sectionNew); 
	        });
//	         $rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");	           
	    }
	    

}]);                                               