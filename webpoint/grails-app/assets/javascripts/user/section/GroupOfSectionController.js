'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('GroupOfSectionCtrl', [ 
                                                    
    '$scope', '$rootScope', '$routeParams', '$location', '$timeout', '$q', '$log','cfgAppPath', 'GroupsOfSectionsApi', 'sharedProperties',
     
    function list ($scope, $rootScope, $routeParams, $location, $timeout, $q, $log, cfgAppPath, GroupsOfSectionsApi, sharedProperties) {
	 	
		$scope.viewLoading = true;
	 	
//		$scope.$on("LOAD_GROUPOFSECTION_EVENT", function () {   // event, args
//			$log.debug(' --- LOAD_GROUPOFSECTION_EVENT');     // + args.eventID
//			$scope.loadSection();	 
//		});
			
    	$scope.editGroup = function(id) {
    		$log.debug('editGroup - id:' + id);	
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
            //$scope.isVisible = $scope.isVisible == 0 ? true : false;
            $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
        };
    	
		$scope.loadGroups = function() {
    		$log.debug(' --- ListGroupOfSectionCtrl.load ');
    		GroupsOfSectionsApi.list(
    				function (resp) {
    					$scope.groups = resp;
    					$scope.viewLoading = false;
                    });
    		
//    		$q.all([promise]).then(function(data) {
//    			
////    			if($scope.groups[0] != undefined)
////    				$scope.pickedSection = $scope.groups[0].sectionsMeta[0];
////    			$log.debug($scope.groups);
////    			$log.debug($scope.groups[0].sectionsMeta[0].language);
//    	    });
//    		
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
//		$scope.$broadcast('show-errors-reset');
		
		if(!$scope.doSave){
			$scope.invalid = false
			GroupsOfSectionsApi.get({Id: $routeParams.groupId}, 
					function (resp) {
	    				$scope.group = resp;
			    	});	
		} 
    
	    $scope.updateGroup = function (form) {
	    	$log.debug("updateGroup ", $scope.group);
	    	var group = $scope.group;
	    	var res = GroupsOfSectionsApi.update({Id: group.id}, group,
	            function (resp) {
	                $location.path(cfgAppPath.groupOfSectionList);
	            });
//	    	$rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");
	    };
	    
	    
	    $scope.saveGroup = function(form) {
	        $log.debug('saveGroup');
	        
	        console.log(form.orgTitle.$valid);
//	        $scope.$broadcast('show-errors-check-validity');
	        
//	        if (form.$valid) {
	        	GroupsOfSectionsApi.save($scope.group,
	                function (resp) {
	        			$rootScope.groupId = resp.id;
	        			sharedProperties.getProperty().doSave = true;
	                    $location.path(cfgAppPath.sectionNew); 
	                });
//	        }
//	         $rootScope.$broadcast("LOAD_GROUPOFSECTION_EVENT");	           
	    }
	    
//	    $scope.reset = function() {
//	    	  $scope.$broadcast('show-errors-reset');
//	    }

}]);                                               