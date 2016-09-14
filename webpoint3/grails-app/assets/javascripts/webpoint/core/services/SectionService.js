'use strict';

/* Services */

var sectionService = angular.module('webpoint.core');

sectionService.factory('GroupsOfSectionsApi', ['$resource', '$q', '$timeout', '$resourceInterceptor', '$log',
    function ($resource, $q, $timeout, $resourceInterceptor, $log) {

	    $log.info(' --- SectionService.GroupsOfSectionsApi.factory --- ');
		return $resource('api/groupsofsections/:Id', {Id: '@Id'},
				{
           			'list': { method:'GET', isArray:true, cache:false, interceptor : $resourceInterceptor},
           			'get': { method:'GET', interceptor : $resourceInterceptor },   //
           			'save': { method:'POST', interceptor : $resourceInterceptor},
           			'update': { method:'PUT', interceptor : $resourceInterceptor},   //PATCH
           			'remove': { method:'DELETE', interceptor : $resourceInterceptor}
				});
	}

]);

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

sectionService.factory('GroupsOfSectionMetaApi', ['$resource', '$resourceInterceptor', '$log',
    function ($resource, $resourceInterceptor, $log) {
	
		$log.info(' --- SectionService.GroupsOfSectionMetaApi.factory --- ');
		return $resource('api/groupsofsections/:groupId/sectionmetas/:Id', {groupId: '@groupId', Id: '@Id'},	
				{
	       			'list': { method:'GET', isArray:true, interceptor : $resourceInterceptor },
	       			'get': { method:'GET', interceptor : $resourceInterceptor},
	       			'save': { method:'POST', interceptor : $resourceInterceptor},
	       			'update': { method:'PUT', interceptor : $resourceInterceptor}
//	       			'remove': { method:'DELETE'}
				});
	}               
]);

sectionService.factory('SectionMetaApi', ['$resource', '$q', '$timeout', '$resourceInterceptor', '$log',
    function ($resource, $q, $timeout, $resourceInterceptor, $log) {
	
		$log.info(' --- SectionService.SectionMetaApi.factory --- ');
		return $resource('api/sectionmetas/:Id', {Id: '@Id'},
				{
       				'list': { method:'GET', isArray:true, cache:false, interceptor : $resourceInterceptor },
       				'get': { method:'GET', interceptor : $resourceInterceptor },   //
       				'save': { method:'POST', interceptor : $resourceInterceptor },
       				'update': { method:'PUT', interceptor : $resourceInterceptor },   //PATCH
       				'remove': { method:'DELETE', interceptor : $resourceInterceptor }
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

//sectionService.service('sharedProperties', function () {
//	 var property = {
//			 doSave: true,
////			 categories: {'Worship','Christian','Hymns'}
//	 };
//
//    return {
//    	getProperty: function() {
//            return property;
//        }
//    };
//});

