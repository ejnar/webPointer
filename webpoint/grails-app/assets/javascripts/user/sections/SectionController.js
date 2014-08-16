'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('ListGroupOfSectionCtrl', ['$scope', '$location', '$timeout', '$q', 'GroupsOfSectionsApi', 'sharedProperties',
     
                                               
    function list ($scope, $location, $timeout, $q, GroupsOfSectionsApi, sharedProperties) {
	 	
		$scope.viewLoading = true;
		
		$scope.loadSection = function() {
    		console.log(' --- ListGroupOfSectionCtrl.load');
    		  
    		var promise = GroupsOfSectionsApi.list(
    				function (resp) {
    					$scope.sections = resp;
    					
                        console.log("success");
                    }, function (resp) {
                        console.log("error");
                    }).$promise;
    		
    		$q.all([promise]).then(function(data) {
    			$scope.viewLoading = false;
    			console.log($scope.sections);
    	    });
    		$scope.orderProp = 'title';
    	}
		$scope.loadSection();
    	
//		$scope.$on("loadSectionEvent", function (event, args) {
//			console.log(' --- loadSectionEvent ' + args.eventID);
//			$scope.loadSection();	 
//		});
			
    	$scope.editSection = function(id) {
    		console.log('editSection - id ' + id);
    		sharedProperties.getProperty().doSave = false;
    		$location.path('/sections/edit/' + id );
    	}
    	$scope.delGroup = function(id) {
    		console.log('delGroup - '+id);
    		GroupsOfSectionsApi.remove({groupId: id});
    		$scope.loadSection();
    	}
    	$scope.addGroup = function() {
    		console.log('addGroup');
    		sharedProperties.getProperty().doSave = true;
    		$location.path("/sections/new");
    	} 
    	
    	$scope.getSection = function(id) {
    		console.log('getSection - id ' + id);
    		
    		SectionsApi.get({sectionId: id}, function (post) {});
    	}
    	
    	
//    	$scope.addSection = function() {
//    		console.log('addSection');
//    		$location.path("/sections/new");
//    	} 	

}]);


//sectionController.controller('UpdateGroupOfSectionCtrl', ['$scope', '$routeParams', '$location', '$timeout', 'GroupsOfSectionsApi',
//    function ($scope, $routeParams, $location, $timeout, BookApi) {
//		console.log( " --- UpdateGroupOfSectionCtrl ", $routeParams.groupId);
//		
//		$scope.group = GroupsOfSectionsApi.get({groupId: $routeParams.groupId}, 
//				function (post) {
//		});
//	    $scope.updateBook = function () {
//	    	console.log("Update book ", $scope.book);
//	        var book = $scope.book;
//	        var res = BookApi.update({bookId: book.id}, book,
//	                function (resp) {
//	                    console.log("success");
//	                }, function (resp) {
//	                    console.log("error");
//	                });
////	            $location.path('/books');    
//	    };
//	    
//	    var timeout = null;
//	    var debounceSaveUpdates = function(newVal, oldVal) {
//	    	console.log('debounceSaveUpdates');
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




sectionController.controller('UpdateGroupSectionCtrl', ['$scope', '$routeParams', '$location', 'GroupsOfSectionsApi', 'sharedProperties',
    function($scope, $routeParams, $location, GroupsOfSectionsApi, sharedProperties) {
	
	
		$scope.categories = [
	                 'Worship',
	                 'Christian',
	                 'Hymns'
	               ];
	
		$scope.group = {};
		$scope.doSave = sharedProperties.getProperty().doSave;
    
		if($scope.doSave){
			$scope.group = {};
		}else{
			$scope.group = GroupsOfSectionsApi.get({groupId: $routeParams.groupId}, function (post) {});
		}
    
    
	    $scope.updateGroup = function () {
	    	console.log("updateGroup ", $scope.group);
	    	var group = $scope.group;
	    	var res = GroupsOfSectionsApi.update({groupId: group.id}, group,
	            function (resp) {
	                console.log("success");
	            }, function (resp) {
	                console.log("error");
	            });
	    	$location.path('/sections');   
	    };
	    
	    $scope.saveGroup = function() {
	        console.log('saveGroup');
	        console.log(sharedProperties.getProperty().doSave);
	        console.log($scope.group);
	        var res = GroupsOfSectionsApi.save($scope.group,
	                function (resp) {
	                    console.log(resp);
	                }, function (resp) {
	                    console.log(resp);
	                });
//	        $scope.$broadcast("loadSectionEvent", {eventID: 'new'});
	        $location.path('/sections');    
	    }
}]);                                               



//sectionController.controller('NewSectionCtrl', ['$scope', '$rootScope', '$location', 'GroupsOfSectionsApi', 
//    function($scope, $rootScope, $location, BookApi) {
//
//    $scope.book = {};
//    
//    $scope.openDate = function($event) {
//    	console.log('openDate');
//    	$event.preventDefault();
//        $event.stopPropagation();
//        $scope.opened = true;
//    }
//    
//    $scope.disabled = function(date, mode) {
//        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
//    };
//    
//    $scope.saveBook = function() {
//        console.log('saveBook');
//        var res = BookApi.save($scope.book,
//                function (resp) {
//                    console.log(resp);
//                }, function (resp) {
//                    console.log(resp);
//                });
//            console.log(res);
//            $location.path('/books');    
//    }
//}]);

