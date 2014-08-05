'use strict';

/* Services */

var postService = angular.module('webApp');

postService.factory('BookApi', ['$resource',
    function ($resource) {
		console.log(' --- postService.factory');
		
		return $resource('api/guest/books/:bookId', null,
			{
	           	'list': { method:'GET', isArray:true },
	           	'get': { method:'GET' },
	           	'save': { method:'POST'},
	           	'update': { method:'PATCH'},
				'remove': { method:'DELETE'}
	       });
		
//        return {
//            Book: $resource('api/books/:postId', {postId: '@id'}),
//            BookUpdate: $resource('api/books/:bookId/book', {bookId: '@id'}),
////            PostTags: $resource('v1/posts/tags/:tag', {tag: '@id'})
//        };

    }]);