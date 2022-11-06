'use strict';

/* Services */

var pageService = angular.module('webpoint.core');
    pageService.factory('PageService', PageService);
    PageService.$inject = ['$log', 'PageListDataApi', 'PageListApi', 'VyApi', 'PageListUtilApi'];

    function PageService($log, PageListDataApi, PageListApi, VyApi, PageListUtilApi){
        $log.info('PageService');
        var service = {
            addSectionToList: addSectionToList,
            removeSectionInList: removeSectionInList,
            listApi: PageListApi,
            updateList: updateList,
            excludeCache: excludeCache
        }
        return service;

        function updateList(pageList){
            var pageListUtil = {};
            pageListUtil.id = pageList.id
            pageListUtil.parts = []
            angular.forEach(pageList.pageParts, function(p) {
                pageListUtil.parts.push(p.key);
            });
            PageListUtilApi.Util.updatelist({}, pageListUtil);
        }

        function excludeCache(exclude){
            var method = 'getCache';
            if(exclude) method = 'get';
            return method;
        }

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
            return PageListDataApi.remove({pageListId: pageListId, Id: item.key});
//                function (resp) {
//                    $log.debug(resp);
//                });
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
           			'getCache': { method:'GET', cache:true},
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

pageService.factory('PageListUtilApi', ['$resource', '$log',
	function ($resource, $log) {
		$log.debug(' --- PageListUtilApi.factory --- ');

        return {
                    Util: $resource('api/pagelistutil/:Id', {Id: '@Id'},
                            {
                                'test': { method: 'GET', url: 'api/pagelistutil/test'},
                                'updatelist': { method: 'PUT', url: 'api/pagelistutil/updatelist'}
                            })
               };
	    }
]);


