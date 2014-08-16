'use strict';

/* Services */

var sectionService = angular.module('userApp');

sectionService.factory('GroupsOfSectionsApi', ['$resource', '$q', '$timeout',
    function ($resource, $q, $timeout) {
	
		console.log(' --- GroupsOfSectionsApi.factory ');
		
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


sectionService.factory('SectionsApi', ['$resource',
	function ($resource) {
		
		console.log(' --- SectionsApi.factory ');
		
		return $resource('api/sections/:sectionId', null,
				{
	       			'list': { method:'GET', isArray:true },
	       			'get': { method:'GET' },
	       			'save': { method:'POST'},
	       			'update': { method:'PATCH'},
	       			'remove': { method:'DELETE'}
				});
	}

]);


sectionService.service('sharedProperties', function () {
	 var property = {
			 doSave: true
	 };

    return {
    	getProperty: function() {
            return property;
        }
    };
});

