'use strict';

/* Services */

var sectionService = angular.module('userApp');

sectionService.factory('GroupsOfSectionsApi', ['$resource', '$q', '$timeout',
    function ($resource, $q, $timeout) {
	
		console.log(' --- GroupsOfSectionsApi.factory ');
		
		return $resource('api/groupsofsections/:Id', {Id: '@Id'},
				{
           			'list': { method:'GET', isArray:true, cache:false },
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
		
		return $resource('api/sections/:Id', {Id: '@Id'},
				{
	       			'list': { method:'GET', isArray:true },
	       			'get': { method:'GET' },
	       			'save': { method:'POST'},
	       			'update': { method:'PATCH'},
	       			'remove': { method:'DELETE'}
				});
	}

]);


sectionService.factory('SectionsMetaApi', ['$resource',
    function ($resource) {
	
		console.log(' --- SectionsMetaApi.factory ');
		
		return $resource('api/groupsofsections/:GroupOfSectionId/sectionsmeta/:Id', {GroupOfSectionId: '@GroupOfSectionId', Id: '@Id'},
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
			 doSave: true,
//			 categories: {'Worship','Christian','Hymns'}
	 };

    return {
    	getProperty: function() {
            return property;
        }
    };
});

