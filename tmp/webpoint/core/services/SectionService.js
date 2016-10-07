'use strict';

/* Services */

var sectionService = angular.module('webpoint.core');


sectionService.factory('SectionsApi', ['$resource', '$resourceInterceptor', '$log',
	function ($resource, $resourceInterceptor, $log) {
		
		$log.info(' --- SectionService.SectionsApi.factory --- ');
		return $resource('api/sections/:Id', {Id: '@Id'},
				{
	       			'list': { method:'GET', isArray:true, interceptor : $resourceInterceptor},
	       			'get': { method:'GET', interceptor : $resourceInterceptor},
	       			'save': { method:'POST', interceptor : $resourceInterceptor},
	       			'update': { method:'PUT', interceptor : $resourceInterceptor}
//	       			'remove': { method:'DELETE'}
				});
	}

]);


sectionService.service('SpotifySearchApi', [ '$log', function ($log){
	$log.info(' --- api.spotify.com --- ');
	this.list = function (query,limit,offset) {
		return $.ajax({
				url: 'https://api.spotify.com/v1/search?q='+query+'&offset='+offset+'&limit='+limit+'&type=track', async:false
		});
	}
}]);
