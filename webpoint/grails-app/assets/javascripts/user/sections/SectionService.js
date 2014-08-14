'use strict';

/* Services */

var sectionService = angular.module('userApp');

sectionService.factory('GroupsOfSectionsApi', ['$resource', '$q', '$timeout',
    function ($resource, $q, $timeout) {
	
		console.log(' --- sectionService.factory ');
		
		return $resource('api/groupsofsections/:groupId', null,
				{
           			'list': { method:'GET', isArray:true },
           			'get': { method:'GET' },
           			'save': { method:'POST'},
           			'update': { method:'PATCH'},
           			'remove': { method:'DELETE'}
				});
	
	}


]);

