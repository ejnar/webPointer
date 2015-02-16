'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('GroupOfSectionCtrl', [ 
                                                    
    '$scope', '$rootScope', '$routeParams', '$location', '$filter', '$log', 'cfgAppPath', 
    'UserApi', 'SectionMetaApi', 'SectionsApi', 'sharedProperties', 'usSpinnerService',
     
    function list ($scope, $rootScope, $routeParams, $location, $filter, $log, cfgAppPath, 
    		UserApi, SectionMetaApi, SectionsApi, sharedProperties, usSpinnerService) {
	 	
//		$scope.$on("LOAD_GROUPOFSECTION_EVENT", function () {   // event, args
//			$log.debug(' --- LOAD_GROUPOFSECTION_EVENT');     // + args.eventID
//			$scope.loadSection();	 
//		});
			
    	$scope.editMeta = function(id) {
    		$log.debug('editMeta - id:' + id);	
    		$log.debug(id);	
    		$location.path(cfgAppPath.groupOfSectionEdit + id );
    	}
    	$scope.delMeta = function(meta) {
    		$log.debug('SectionMetaApi.remove ');
    		$log.debug(meta);
    		if(meta.sectionFK == ''){
    			$log.debug('SectionMetaApi.remove ');
    			SectionMetaApi.remove({Id: meta.id}, function (resp) { $scope.loadGroups(); });
    		}else{
    			$log.debug('SectionApi.remove ');
    			SectionsApi.remove({Id: meta.sectionFK},
    				function (resp) { $scope.loadGroups(); });
    		}
    	}
    	$scope.addMeta = function() {
    		$log.debug('addGroup');
    		$location.path(cfgAppPath.groupOfSectionNew);
    	} 
    	$scope.editSection = function(meta) {
    		$log.debug('editSection :');
    		$log.debug(meta);
    		var id = 'null';
    		if(meta.sectionFK != '')
    			id = meta.sectionFK;
    		$location.path(cfgAppPath.sectionEdit.replace(':metaId', meta.id).replace(':id',id) );
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
    		usSpinnerService.spin('spinner-1');
    		SectionMetaApi.list(
    				function (resp) {
    					$scope.items = resp;
    					$scope.totalItems = $scope.items.length;
    					$scope.createSearchList();
    					usSpinnerService.stop('spinner-1');
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
                                                        
    '$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath', 'properties', 'SectionMetaApi', 'sharedProperties',
    
    function($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, SectionMetaApi, sharedProperties) {
	
		$scope.categories = properties.categories;
		$scope.languages = properties.language;
		$scope.stypes = properties.stypes;
		$scope.doSave = true;
//		$scope.$broadcast('show-errors-reset');
		
		if($routeParams.groupId != null){
			$scope.doSave = false;
			SectionMetaApi.get({Id: $routeParams.groupId}, function (resp) {
				$log.debug("SectionMetaApi.get: " + resp);
				$scope.sectionMeta = resp;
			});	
		}
    
	    $scope.updateMeta = function (form) {
	    	$log.debug("updateGroup ", $scope.sectionMeta);
	    	var sectionMeta = $scope.sectionMeta;
	    	SectionMetaApi.update({Id: sectionMeta.id}, sectionMeta, function (resp) {
	    		$location.path(cfgAppPath.groupOfSectionList);
	        });
//	    	$rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    };
	    
	    $scope.saveMeta = function(form) {
	        $log.debug('saveMeta');
//	        $scope.$broadcast('show-errors-check-validity');
	        SectionMetaApi.save($scope.sectionMeta, function (resp) {
	        	$location.path(cfgAppPath.sectionEdit.replace(':metaId', resp.id).replace(':id', 'null') );
	        });
//	         $rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");	           
	    }
}]);                                               