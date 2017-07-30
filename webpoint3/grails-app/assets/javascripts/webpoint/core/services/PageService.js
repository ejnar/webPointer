'use strict';

/* Services */

var pageService = angular.module('webpoint.core');


    pageService.factory('PageService', PageService);
    PageService.$inject = ['$log', 'PageListDataApi'];


    function PageService($log, PageListDataApi){
        $log.info('PageService');

        var service = {
            addSectionToList: addSectionToList,
            removeSectionInList: removeSectionInList

        }
        return service;

        function addSectionToList(pageListId, section) {
			$log.debug(" --- PageService.addSectionToList - section:", section);

			var pageItem = {};
			pageItem.key = '';
			pageItem.color = 'white';
			pageItem.style = 'default';
			pageItem.section = section;

            return PageListDataApi.save({pageListId: pageListId}, pageItem);
        }

        function removeSectionInList (pageListId, item) {
            PageListDataApi.remove({pageListId: pageListId, Id: item.key},
                function (resp) {
                    $log.debug(resp);
                });
        }

    }


pageService.factory('VyApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {

		$log.info(' --- PageService.VyApi.factory --- ');  // , interceptor : $resourceInterceptor
		return $resource('api/vy/:group/:pages', {group: '@group', pages: '@pages'},
				{
           			'list': { method:'GET', isArray:true, cache:true },
           			'get': { method:'GET' }

				});
	}

]);

pageService.factory('PageListApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {
	
		$log.info(' --- PageService.PageListApi.factory --- ');
		return $resource('api/pagelist/:Id', {Id: '@Id'},
				{
           			'list': { method:'GET', isArray:true, cache:true},
           			'list2': { method:'GET', isArray:true, cache:false},
           			'get': { method:'GET' },
           			'save': { method:'POST'},
           			'update': { method:'PUT'},
           			'remove': { method:'DELETE'}
				});
	}
]);


pageService.factory('PageListDataApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {
	
		$log.info(' --- PageService.PageListDataApi.factory ');
		return $resource('api/pagelist/:pageListId/pageItem/:Id', {pageListId: '@pageListId', Id: '@Id'},
				{
   					'list': { method:'GET', isArray:true},
   					'get': { method:'GET'},
   					'save': { method:'POST'},
   					'update': { method:'PUT'},
   					'remove': { method:'DELETE'}
				});
	}
]);

pageService.factory('PageDataSectionApi', ['$resource', '$q', '$timeout', '$log',
    function ($resource, $q, $timeout, $log) {

		$log.info(' --- PageService.PageDataSectionApi.factory ');
		return $resource('api/pagedata/:pagedataId/section/:Id', {pagedataId: '@pagedataId', Id: '@Id'},
//		return $resource('api/pagedata/:pageListId', {pageListId: '@pageListId'},
				{
   					'list': { method:'GET', isArray:true},
   					'get': { method:'GET'},
   					'save': { method:'POST'},
   					'update': { method:'PUT'},
   					'remove': { method:'DELETE'}
				});
	}

]);


