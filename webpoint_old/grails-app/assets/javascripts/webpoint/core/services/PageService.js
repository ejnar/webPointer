'use strict';

/* Services */

var pageService = angular.module('webpoint.core');


pageService.factory('VyApi', ['$resource', '$q', '$timeout', '$resourceInterceptor', '$log',
    function ($resource, $q, $timeout, $resourceInterceptor, $log) {

		$log.info(' --- PageService.VyApi.factory --- ');
		return $resource('api/vy/:group/:pages', {group: '@group', pages: '@pages'},
				{
           			'list': { method:'GET', isArray:true, cache:false, interceptor : $resourceInterceptor },
           			'get': { method:'GET', interceptor : $resourceInterceptor }

				});
	}

]);



pageService.factory('PageListApi', ['$resource', '$q', '$timeout', '$resourceInterceptor', '$log',
    function ($resource, $q, $timeout, $resourceInterceptor, $log) {
	
		$log.info(' --- PageService.PageListApi.factory --- ');
		return $resource('api/pagelist/:Id', {Id: '@Id'},
				{
           			'list': { method:'GET', isArray:true, cache:false, interceptor : $resourceInterceptor },
           			'get': { method:'GET', interceptor : $resourceInterceptor },   //
           			'save': { method:'POST', interceptor : $resourceInterceptor },
           			'update': { method:'PUT', interceptor : $resourceInterceptor },   //PATCH
           			'remove': { method:'DELETE', interceptor : $resourceInterceptor }
				});
	}

]);


pageService.factory('PageListDataApi', ['$resource', '$q', '$timeout', '$resourceInterceptor', '$log',
    function ($resource, $q, $timeout, $resourceInterceptor, $log) {
	
		$log.info(' --- PageService.PageListDataApi.factory ');
		return $resource('api/pagelist/:pageListId/pageItem/:Id', {pageListId: '@pageListId', Id: '@Id'},
//		return $resource('api/pagedata/:pageListId', {pageListId: '@pageListId'},
				{
   					'list': { method:'GET', isArray:true, interceptor : $resourceInterceptor},
   					'get': { method:'GET', interceptor : $resourceInterceptor},
   					'save': { method:'POST', interceptor : $resourceInterceptor},
   					'update': { method:'PUT', interceptor : $resourceInterceptor},
   					'remove': { method:'DELETE'}
				});
	}

]);

pageService.factory('PageDataSectionApi', ['$resource', '$q', '$timeout', '$resourceInterceptor', '$log',
    function ($resource, $q, $timeout, $resourceInterceptor, $log) {

		$log.info(' --- PageService.PageDataSectionApi.factory ');
		return $resource('api/pagedata/:pagedataId/section/:Id', {pagedataId: '@pagedataId', Id: '@Id'},
//		return $resource('api/pagedata/:pageListId', {pageListId: '@pageListId'},
				{
   					'list': { method:'GET', isArray:true, interceptor : $resourceInterceptor},
   					'get': { method:'GET', interceptor : $resourceInterceptor},
   					'save': { method:'POST', interceptor : $resourceInterceptor},
   					'update': { method:'PUT', interceptor : $resourceInterceptor},
   					'remove': { method:'DELETE'}
				});
	}

]);


