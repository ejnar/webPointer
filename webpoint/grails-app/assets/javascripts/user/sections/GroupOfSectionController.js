'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('GroupOfSectionCtrl', [ 
                                                    
    '$scope', '$routeParams', '$location', '$timeout', '$q', '$log','cfgAppPath', 'GroupsOfSectionsApi', 'sharedProperties',
     
    function list ($scope, $routeParams, $location, $timeout, $q, $log, cfgAppPath, GroupsOfSectionsApi, sharedProperties) {
	 	
		$scope.viewLoading = true;
	 	
//		$scope.$on("LOAD_GROUPOFSECTION_EVENT", function () {   // event, args
//			$log.debug(' --- LOAD_GROUPOFSECTION_EVENT');     // + args.eventID
//			$scope.loadSection();	 
//		});
			
    	$scope.editGroup = function(id) {
    		$log.debug('editSection - id ' + id);		
    		$scope.group = GroupsOfSectionsApi.get( {groupId: id}, 
	    		function (resp) {
		    		$log.debug("success");
		    	}, function (resp) {
		    		$log.error("error");
		    	});	
    		$log.debug($scope.group);	
    		sharedProperties.getProperty().doSave = false;
    		$location.path(cfgAppPath.groupOfSectionEdit + id );
    	}
    	$scope.delGroup = function(id) {
    		$log.debug('delGroup - '+id);
    		GroupsOfSectionsApi.remove({groupId: id});
    		$scope.loadGroups();
    	}
    	$scope.addGroup = function() {
    		$log.debug('addGroup');
    		$scope.group = {};
    		sharedProperties.getProperty().doSave = true;
    		$location.path(cfgAppPath.groupOfSectionNew);
    	} 
    	
    	
    	$scope.toggleDetail = function($index) {
            //$scope.isVisible = $scope.isVisible == 0 ? true : false;
            $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
        };
    	
		$scope.loadGroups = function() {
    		$log.debug(' --- ListGroupOfSectionCtrl.load ');
    		var promise = GroupsOfSectionsApi.list(
    				function (resp) {
    					$scope.groups = resp;
    					$log.debug("success");
                    }, function (resp) {
                    	$log.error("error");
                    }).$promise;
    		
    		$q.all([promise]).then(function(data) {
    			$scope.viewLoading = false;
//    			if($scope.groups[0] != undefined)
//    				$scope.pickedSection = $scope.groups[0].sectionsMeta[0];
//    			$log.debug($scope.groups);
//    			$log.debug($scope.groups[0].sectionsMeta[0].language);
    	    });
    		
    		$scope.orderProp = 'title';
    	}
		$scope.loadGroups();
	    

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
                                                        
    '$rootScope', '$scope', '$routeParams', '$location', '$log', 'cfgAppPath', 'properties', 'GroupsOfSectionsApi', 'sharedProperties',
    
    function($rootScope, $scope, $routeParams, $location, $log, cfgAppPath, properties, GroupsOfSectionsApi, sharedProperties) {
	
		$scope.categories = properties.categories;
	
		$scope.doSave = sharedProperties.getProperty().doSave;
    
		if(!$scope.doSave){
			$scope.group = GroupsOfSectionsApi.get({groupId: $routeParams.groupId}, function (post) {});
		} 
    
	    $scope.updateGroup = function () {
	    	$log.debug("updateGroup ", $scope.group);
	    	var group = $scope.group;
	    	var res = GroupsOfSectionsApi.update({groupId: group.id}, group,
	            function (resp) {
	                $log.debug("success");
	            }, function (resp) {
	                $log.debug("error");
	            });
//	    	$rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    	$location.path(cfgAppPath.groupOfSectionList);   
	    };
	    
	    $scope.saveGroup = function() {
	        $log.debug('saveGroup');
	        $rootScope.group = $scope.group;
	        var res = GroupsOfSectionsApi.save($scope.group,
	                function (resp) {
	        			$rootScope.groupId = resp.id;
	        			 $rootScope.group.id = resp.id;
	                    $location.path(cfgAppPath.sectionNew); 
	                }, function (resp) {
	                    $log.debug(resp);
	                });
//	         $rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");	           
	    }
	    
	    $scope.addSection = function() {
	        $log.debug('addSection');
	        $location.path('/section/new');    
	    }
}]);                                               