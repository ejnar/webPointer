'use strict';

/* Services */

var module = angular.module('webpoint.core');

module.factory('UserApi', ['$resource', '$log',
  function ($resource, $log) {
	return	{ 
			    User: $resource('api/user/:Id', {Id: '@Id'},
					{
           				'list': { method:'GET', isArray:true, cache:false},
           				'get': { method:'GET'},
           				'save': { method:'POST'},
           				'update': { method:'PUT'}
					}),
				Token: $resource('api/guest/token/:token', {token: '@token'},
                    {
                        'get': { method:'GET'},
                        'update': { method:'PUT'}
                    }),
                Pass: $resource('api/guest/update/:token', {token: '@token'},
                    {
                        'update': { method:'PUT'}
                    }),
                Role: $resource('api/roles/:Id', {Id: '@Id'},
                    {
                        'list': { method:'GET', isArray:true, cache:false},
                        'get': { method:'GET'}
                    }),
                RoleGroup: $resource('api/rolegroups/:Id', {Id: '@Id'},
                    {
                        'list': { method:'GET', isArray:true, cache:false},
                        'get': { method:'GET'},
                        'save': { method:'POST'},
                        'update': { method:'PUT'}
                    }),
                UserRole: $resource('api/userroles/:Id', {Id: '@Id'},
                    {
                        'list': { method:'GET', isArray:true, cache:false},
                        'get': { method:'GET'}
                    })

			};
	}
]);



//userService.factory('RoleApi', ['$resource',
//  function ($resource) {
//	return $resource('api/roles/:Id', {Id: '@Id'},
//			{
//       			'list': { method:'GET', isArray:true, cache:false},
//       			'get': { method:'GET'}
//			});
//  }
//]);
//
//userService.factory('RoleGroupApi', ['$resource', '$resourceInterceptor',
//  function ($resource, $resourceInterceptor) {
//	return $resource('api/rolegroups/:Id', {Id: '@Id'},
//			{
//       			'list': { method:'GET', isArray:true, cache:false},
//       			'get': { method:'GET'},
//       			'save': { method:'POST'},
//       			'update': { method:'PUT'}
//			});
//  }
//]);
