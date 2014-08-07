'use strict';

/* Services */

var postService = angular.module('webApp');

//postService.factory('BookApi', ['$resource',
//    function ($resource) {
//		console.log(' --- postService.factory');
//		
//		return $resource('api/guest/books/:bookId', null,
//			{
//	           	'list': { method:'GET', isArray:true },
//	           	'get': { method:'GET' },
//	           	'save': { method:'POST'},
//	           	'update': { method:'PATCH'},
//				'remove': { method:'DELETE'}
//	       });
//		
////        return {
////            Book: $resource('api/books/:postId', {postId: '@id'}),
////            BookUpdate: $resource('api/books/:bookId/book', {bookId: '@id'}),
//////            PostTags: $resource('v1/posts/tags/:tag', {tag: '@id'})
////        };
//
//    }]);

postService.factory('BookApi', ['$resource', '$q', '$timeout',
    function ($resource, $q, $timeout) {
	
		console.log(' --- postService.factory ----------------------------------------');
		
//		var getResources = function() {
//			var deferred = $q.defer();
//			    
//			resource = $resource('api/guest/books/:bookId', null,
//					{
//		           		'list': { method:'GET', isArray:true },
//		           		'get': { method:'GET' },
//		           		'save': { method:'POST'},
//		           		'update': { method:'PATCH'},
//		           		'remove': { method:'DELETE'}
//					});
//			  
//			  
//			$timeout(function() {
//				deferred.resolve(resource);
//			}, 2000);
//
//			return deferred.promise;
//		};

//		return {
//			getResources: getResources
//		};
		
		
		
		return $resource('api/books/:bookId', null,
				{
           			'list': { method:'GET', isArray:true },
           			'get': { method:'GET' },
           			'save': { method:'POST'},
           			'update': { method:'PATCH'},
           			'remove': { method:'DELETE'}
				});
	


}]);

//myModule.factory('HelloWorld', function($q, $timeout) {
//
//	  var getMessages = function() {
//	    var deferred = $q.defer();
//
//	    $timeout(function() {
//	      deferred.resolve(['Hello', 'world!']);
//	    }, 2000);
//
//	    return deferred.promise;
//	  };
//
//	  return {
//	    getMessages: getMessages
//	  };
//
//	});
