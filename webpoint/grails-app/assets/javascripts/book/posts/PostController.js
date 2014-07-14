'use strict';

/* Controllers */

var bookController = angular.module('webApp');

bookController.controller('ListBookCtrl', ['$scope', '$location', '$timeout', '$q', 'BookApi',
     
                                               
    function list ($scope, $location, $timeout, $q, BookApi ) {
	 	
		$scope.viewLoading = true;
		
    	var load = function() {
    		console.log(' --- bookController.controller ListBookCtrl');
    		    
//    	    $timeout(function() { $scope.viewLoading = false; }, 3000);
    		
//    	    var deferred = $q.defer();
//    	    var promise = deferred.promise;
//    	    
//    	    promise.then(function success(data) {
//    	      console.log(data);
//    	    }, function error(msg) {
//    	      console.error(msg);
//    	    });
    		
    		var promise = BookApi.list(
    				function (resp) {
    					$scope.books = resp;
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
    	$scope.editBook = function(index) {
    		console.log('editBook - id ' + index);
    		$location.path('/book/edit/' + index );
    	}
    	$scope.delBook = function(index) {
    		console.log('delBook - '+index);
    		BookApi.remove({bookId: index});
    		load();
    	}
    
    	$scope.addBook = function() {
    		console.log('addBook');
    		$location.path("/book/new");
    	}
    	

}]);


bookController.controller('UpdateBookCtrl', ['$scope', '$routeParams', '$location', '$timeout', 'BookApi',
    function ($scope, $routeParams, $location, $timeout, BookApi) {
		console.log("Get Book ", $routeParams.postId);
		
		$scope.book = BookApi.get({bookId: $routeParams.postId}, 
				function (post) {
		});

	    $scope.updateBook = function () {
	    	console.log("Update book ", $scope.book);
	        var book = $scope.book;
	        var res = BookApi.update({bookId: book.id}, book,
	                function (resp) {
	                    console.log("success");
	                }, function (resp) {
	                    console.log("error");
	                });
//	            $location.path('/books');    
	    };
	    
	    var timeout = null;
	    
	    var debounceSaveUpdates = function(newVal, oldVal) {
	    	console.log('debounceSaveUpdates');
	        if (newVal != oldVal) {
	          if (timeout) {
	            $timeout.cancel(timeout)
	          }
	          timeout = $timeout($scope.updateBook, 3000);  // 1000 = 1 second
	        }
	    };
	    
	    $scope.$watch('book.title', debounceSaveUpdates);
	    $scope.$watch('book.author', debounceSaveUpdates);
	    $scope.$watch('book.price', debounceSaveUpdates);
	    
}]);


bookController.controller('NewBookCtrl', ['$scope', '$rootScope', '$location', 'BookApi', 
    function($scope, $rootScope, $location, BookApi) {

    $scope.book = {};
    
    $scope.openDate = function($event) {
    	console.log('openDate');
    	$event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    }
    
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    
    $scope.saveBook = function() {
        console.log('saveBook');
        var res = BookApi.save($scope.book,
                function (resp) {
                    console.log(resp);
                }, function (resp) {
                    console.log(resp);
                });
            console.log(res);
            $location.path('/books');    
    }
}]);