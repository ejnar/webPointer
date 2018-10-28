'use strict';

/* Controllers */

var sectionController = angular.module('webpoint.user');

sectionController.controller('SpotifyCtrl', function ($scope, $log, $location, SpotifySearchApi) {
	$scope.currentPage = 2;
	$scope.maxSize = 100;
	$scope.itemsPerPage = 5;
	$scope.totalItems = 100;
	$scope.offset = 0;
	$scope.count = 0;
		  
	$scope.pageChanged = function(page) {
	    $log.debug('queryString: ' + $location.search().s);
		$log.debug('page: ' + page);

        var p = $location.search().p;

        if(p > 0)
         page = p;
		$scope.count = page * $scope.itemsPerPage;
		var limit = $scope.itemsPerPage;
		if($scope.count < $scope.totalItems){
			$scope.offset = (page-1) * $scope.itemsPerPage;
		}
		$log.debug('count: ' + $scope.count);
		$log.debug('offset: ' + $scope.offset);
		var promise = SpotifySearchApi.list($location.search().s, limit, $scope.offset);
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

