'use strict';

/* Controllers */

var sectionController = angular.module('userApp');

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

