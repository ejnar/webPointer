'use strict';

/* Services */

var pageService = angular.module('webpoint.core');


pageService.factory('VyApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {

		$log.info(' --- PageService.VyApi.factory --- ');  // , interceptor : $resourceInterceptor
		return $resource('api/vy/:group/:pages', {group: '@group', pages: '@pages'},
				{
           			'list': { method:'GET', isArray:true, cache:true },
           			'get': { method:'GET' }

				});
	}

]);



pageService.factory('PageListApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {
	
		$log.info(' --- PageService.PageListApi.factory --- ');
		return $resource('api/pagelist/:Id', {Id: '@Id'},
				{
           			'list': { method:'GET', isArray:true, cache:true},
           			'get': { method:'GET' },
           			'save': { method:'POST'},
           			'update': { method:'PUT'},
           			'remove': { method:'DELETE'}
				});
	}

]);


pageService.factory('PageListDataApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {
	
		$log.info(' --- PageService.PageListDataApi.factory ');
		return $resource('api/pagelist/:pageListId/pageItem/:Id', {pageListId: '@pageListId', Id: '@Id'},
//		return $resource('api/pagedata/:pageListId', {pageListId: '@pageListId'},
				{
   					'list': { method:'GET', isArray:true},
   					'get': { method:'GET'},
   					'save': { method:'POST'},
   					'update': { method:'PUT'},
   					'remove': { method:'DELETE'}
				});
	}

]);

pageService.factory('PageDataSectionApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {

		$log.info(' --- PageService.PageDataSectionApi.factory ');
		return $resource('api/pagedata/:pagedataId/section/:Id', {pagedataId: '@pagedataId', Id: '@Id'},
//		return $resource('api/pagedata/:pageListId', {pageListId: '@pageListId'},
				{
   					'list': { method:'GET', isArray:true},
   					'get': { method:'GET'},
   					'save': { method:'POST'},
   					'update': { method:'PUT'},
   					'remove': { method:'DELETE'}
				});
	}

]);


