'use strict';

/* Services */

var userService = angular.module('webpoint.core');

userService.factory('UserApi', ['$resource', '$log', '$resourceInterceptor',
  function ($resource, $log, $resourceInterceptor) {
	$log.debug(' --- UserApi.factory --- ');
	
	return	{ 
			User: $resource('api/user/:Id', {Id: '@Id'},
					{
           				'list': { method:'GET', isArray:true, cache:false, interceptor :$resourceInterceptor},
           				'get': { method:'GET', interceptor : $resourceInterceptor },
           				'save': { method:'POST', interceptor : $resourceInterceptor},
           				'update': { method:'PUT', interceptor : $resourceInterceptor}
					})
			};
	}
]);

userService.factory('AuthorityApi', ['$resource', '$log', '$resourceInterceptor',
	function ($resource, $log, $resourceInterceptor) {
		$log.debug(' --- AuthorityApi.factory --- ');
		
		return	{ 
				Auth: $resource('api/auth/:Id', {Id: '@Id'},
						{
	           				'password': { method: 'PUT', url: 'api/auth/password', interceptor : $resourceInterceptor}
						})
				};
		}
]);



userService.factory('RoleApi', ['$resource', '$resourceInterceptor',
  function ($resource, $resourceInterceptor) {
	return $resource('api/roles/:Id', {Id: '@Id'},
			{
       			'list': { method:'GET', isArray:true, cache:false, interceptor : $resourceInterceptor},
       			'get': { method:'GET', interceptor : $resourceInterceptor }
			});
  }
]);

userService.factory('RoleGroupApi', ['$resource', '$resourceInterceptor',
  function ($resource, $resourceInterceptor) {
	return $resource('api/rolegroups/:Id', {Id: '@Id'},
			{
       			'list': { method:'GET', isArray:true, cache:false, interceptor : $resourceInterceptor},
       			'get': { method:'GET', interceptor : $resourceInterceptor },
       			'save': { method:'POST', interceptor : $resourceInterceptor },
       			'update': { method:'PUT', interceptor : $resourceInterceptor }
			});
  }
]);
