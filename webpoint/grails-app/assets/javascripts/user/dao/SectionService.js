'use strict';

/* Services */

var sectionService = angular.module('userApp');

sectionService.factory('GroupsOfSectionsApi', ['$resource', '$q', '$timeout', '$exceptionHandler', 
    function ($resource, $q, $timeout, $exceptionHandler) {
	
		return $resource('api/groupsofsections/:Id', {Id: '@Id'},
				{
           			'list': { method:'GET', isArray:true, cache:false, interceptor : {responseError : $exceptionHandler}},
           			'get': { method:'GET', interceptor : {responseError : $exceptionHandler} },   // 
           			'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
           			'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}},   //PATCH
           			'remove': { method:'DELETE', interceptor : {responseError : $exceptionHandler}}
				});
	}

]);

sectionService.factory('SectionsApi', ['$resource', '$exceptionHandler',
	function ($resource, $exceptionHandler) {
		
		console.log(' --- SectionsApi.factory ');
		return $resource('api/sections/:Id', {Id: '@Id'},
				{
	       			'list': { method:'GET', isArray:true, interceptor : {responseError : $exceptionHandler}},
	       			'get': { method:'GET', interceptor : {responseError : $exceptionHandler}},
	       			'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
	       			'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}}
//	       			'remove': { method:'DELETE'}
				});
	}

]);

sectionService.factory('GroupsOfSectionMetaApi', ['$resource', '$exceptionHandler',
    function ($resource, $exceptionHandler) {
	
		console.log(' --- GroupsOfSectionMetaApi.factory ');
		return $resource('api/groupsofsections/:groupId/sectionmetas/:Id', {groupId: '@groupId', Id: '@Id'},	
				{
	       			'list': { method:'GET', isArray:true, interceptor : {responseError : $exceptionHandler}},
	       			'get': { method:'GET', interceptor : {responseError : $exceptionHandler}},
	       			'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
	       			'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}}
//	       			'remove': { method:'DELETE'}
				});
	}               
]);

sectionService.factory('SectionMetaApi', ['$resource', '$q', '$timeout', '$exceptionHandler', '$log',
    function ($resource, $q, $timeout, $exceptionHandler, $log) {
	
		$log.info(' --- SectionMetaApi.factory --- ');
		return $resource('api/sectionmetas/:Id', {Id: '@Id'},
				{
       				'list': { method:'GET', isArray:true, cache:false, interceptor : {responseError : $exceptionHandler}},
       				'get': { method:'GET', interceptor : {responseError : $exceptionHandler} },   // 
       				'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
       				'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}},   //PATCH
       				'remove': { method:'DELETE', interceptor : {responseError : $exceptionHandler}}
		});
	}
]);

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

