'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

sectionController.controller('ListGroupsOfSectionsCtrl', ['$scope', '$location', '$timeout', '$q', 'GroupsOfSectionsApi',
     
                                               
    function list ($scope, $location, $timeout, $q, GroupsOfSectionsApi ) {
	 	
		$scope.viewLoading = true;
		
    	var load = function() {
    		console.log(' --- ListGroupsOfSectionsCtrl.load');
    		  
    		var promise = GroupsOfSectionsApi.list(
    				function (resp) {
    					$scope.sections = resp;
                        console.log("success");
                    }, function (resp) {
                        console.log("error");
                    }).$promise;
    		
    		$q.all([promise]).then(function(data) {
    			$scope.viewLoading = false;
    	    });
    		$scope.orderProp = 'title';
    	}
    	load();
    	
    	$scope.editSection = function(id) {
    		console.log('editSection - id ' + id);
    		$location.path('/sections/edit/' + index );
    	}
    	$scope.delGroup = function(id) {
    		console.log('delGroup - '+id);
    		GroupsOfSectionsApi.remove({bookId: id});
    		load();
    	}
    
    	$scope.addSection = function() {
    		console.log('addSection');
    		$location.path("/sections/new");
    	} 	
    	
    	
    	$scope.addGroup = function() {
    		console.log('addGroup');
    		$location.path("/sections/new");
    	} 	

}]);


//sectionController.controller('UpdateBookCtrl', ['$scope', '$routeParams', '$location', '$timeout', 'GroupsOfSectionsApi',
//    function ($scope, $routeParams, $location, $timeout, BookApi) {
//		console.log("Get Book ", $routeParams.postId);
//		
//		$scope.book = BookApi.get({bookId: $routeParams.postId}, 
//				function (post) {
//		});
//
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
//	    
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
//	    
//}]);




sectionController.controller('NewGroupSectionCtrl', ['$scope', '$rootScope', '$location', 'GroupsOfSectionsApi', 
    function($scope, $rootScope, $location, GroupsOfSectionsApi) {
	
	
	$scope.categories = [
	                 'Worship',
	                 'Christian',
	                 'Hymns'
	               ];
	
    $scope.group = {};
    
    $scope.saveGroup = function() {
        console.log('saveGroup');
        console.log($scope.group);
        var res = GroupsOfSectionsApi.save($scope.group,
                function (resp) {
                    console.log(resp);
                }, function (resp) {
                    console.log(resp);
                });
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

