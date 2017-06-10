'use strict';

/* Services */

var userService = angular.module('webpoint.core');

userService.factory('UserApi', ['$resource', '$log',
  function ($resource, $log) {
	$log.debug(' --- UserApi.factory --- '); // interceptor :$resourceInterceptor
	
	return	{ 
			User: $resource('api/user/:Id', {Id: '@Id'},
					{
           				'list': { method:'GET', isArray:true, cache:false},
           				'get': { method:'GET'},
           				'save': { method:'POST'},
           				'update': { method:'PUT'}
					})
			};
	}
]);

userService.factory('AuthorityApi', ['$resource', '$log',
	function ($resource, $log) {
		$log.debug(' --- AuthorityApi.factory --- ');
		
		return	{ 
				Auth: $resource('api/auth/:Id', {Id: '@Id'},
						{
	           				'password': { method: 'PUT', url: 'api/auth/password'}
						})
				};
		}
]);



userService.factory('RoleApi', ['$resource',
  function ($resource) {
	return $resource('api/roles/:Id', {Id: '@Id'},
			{
       			'list': { method:'GET', isArray:true, cache:false},
       			'get': { method:'GET'}
			});
  }
]);

userService.factory('RoleGroupApi', ['$resource', '$resourceInterceptor',
  function ($resource, $resourceInterceptor) {
	return $resource('api/rolegroups/:Id', {Id: '@Id'},
			{
       			'list': { method:'GET', isArray:true, cache:false},
       			'get': { method:'GET'},
       			'save': { method:'POST'},
       			'update': { method:'PUT'}
			});
  }
]);
