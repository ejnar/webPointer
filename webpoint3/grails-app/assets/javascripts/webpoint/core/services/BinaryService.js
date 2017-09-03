'use strict';

/* Services */

var module = angular.module('webpoint.core');

module.factory('BinaryApi', ['$resource', '$log',
	function ($resource, $log) {
		return $resource('api/binarydoc/:Id', {Id: '@Id'},
				{
	       			'list': { method:'GET', isArray:true},
	       			'get': { method:'GET', cache:true, isArray:true}
				});
	}
]);