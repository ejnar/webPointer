'use strict';

/* Services */

var userService = angular.module('root.webpointer');

userService.factory('UserApi', ['$resource', '$log', '$exceptionHandler', 
  function ($resource, $log, $exceptionHandler) {
	$log.debug(' --- UserApi.factory --- ');
	
	return	{ 
			User: $resource('api/user/:Id', {Id: '@Id'},
					{
           				'list': { method:'GET', isArray:true, cache:false, interceptor : {responseError : $exceptionHandler}},
           				'get': { method:'GET', interceptor : {responseError : $exceptionHandler} },   // 
           				'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
           				'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}}
					})
			};
	}
]);

userService.factory('AuthorityApi', ['$resource', '$log', '$exceptionHandler', 
	function ($resource, $log, $exceptionHandler) {
		$log.debug(' --- AuthorityApi.factory --- ');
		
		return	{ 
				Auth: $resource('api/auth/:Id', {Id: '@Id'},
						{
	           				'password': { method: 'PUT', url: 'api/auth/password', interceptor : {responseError : $exceptionHandler}}
						})
				};
		}
]);



userService.factory('RoleApi', ['$resource', '$exceptionHandler', 
  function ($resource, $exceptionHandler) {
	return $resource('api/roles/:Id', {Id: '@Id'},
			{
       			'list': { method:'GET', isArray:true, cache:false, interceptor : {responseError : $exceptionHandler}},
       			'get': { method:'GET', interceptor : {responseError : $exceptionHandler} }
			});
  }
]);

userService.factory('RoleGroupApi', ['$resource', '$exceptionHandler',
  function ($resource, $exceptionHandler) {
	return $resource('api/rolegroups/:Id', {Id: '@Id'},
			{
       			'list': { method:'GET', isArray:true, cache:false, interceptor : {responseError : $exceptionHandler}},
       			'get': { method:'GET', interceptor : {responseError : $exceptionHandler} },
       			'save': { method:'POST', interceptor : {responseError : $exceptionHandler}},
       			'update': { method:'PUT', interceptor : {responseError : $exceptionHandler}}
			});
  }
]);