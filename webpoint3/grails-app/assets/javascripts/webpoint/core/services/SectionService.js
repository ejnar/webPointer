'use strict';

/* Services */

var sectionService = angular.module('webpoint.core');


sectionService.factory('SectionsApi', ['$resource', '$log',
	function ($resource, $log) {
		$log.info(' --- SectionService.SectionsApi.factory --- '); //, interceptor : $resourceInterceptor
		return $resource('api/sections/:Id', {Id: '@Id'},
				{
	       			'list': { method:'GET', isArray:true},
	       			'get': { method:'GET'},
	       			'save': { method:'POST'},
	       			'update': { method:'PUT'}
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
