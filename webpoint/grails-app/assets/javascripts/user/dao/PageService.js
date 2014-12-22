'use strict';

/* Services */

var pageService = angular.module('userApp');


pageService.factory('PageListApi', ['$resource', '$q', '$timeout', '$exceptionHandler', '$log',
    function ($resource, $q, $timeout, $exceptionHandler, $log) {
	
		$log.info(' --- PageListApi.factory --- ');
		return $resource('api/pagelist/:Id', {Id: '@Id'},
				{
           			'list': { method:'GET', isArray:true, cache:false, interceptor : {responseError : $exceptionHandler}},
           			'get': { method:'GET', interceptor : {responseError : $exceptionHandler} },   // 
           			'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
           			'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}},   //PATCH
           			'remove': { method:'DELETE', interceptor : {responseError : $exceptionHandler}}
				});
	}

]);


pageService.factory('PageListDataApi', ['$resource', '$q', '$timeout', '$exceptionHandler', '$log',
    function ($resource, $q, $timeout, $exceptionHandler, $log) {   
	
		$log.info(' --- PageListDataApi.factory ');
		return $resource('api/pagelist/:pageListId/pagedata/:Id', {pageListId: '@pageListId', Id: '@Id'},	
				{
   					'list': { method:'GET', isArray:true, interceptor : {responseError : $exceptionHandler}},
   					'get': { method:'GET', interceptor : {responseError : $exceptionHandler}},
   					'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
   					'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}}
//   				'remove': { method:'DELETE'}
				});
	}

]);


