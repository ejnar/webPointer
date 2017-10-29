'use strict';

/* Services */

var module = angular.module('webpoint.core');



    pageService.factory('SectionCashService', SectionCashService);
    SectionCashService.$inject = ['$log', 'SectionCashApi', 'Access'];


    function SectionCashService($log, SectionCashApi, Access){
        $log.info('SectionCashService');
        var service = {
            sectionCashApi: SectionCashApi,
            updatePageListCach: updatePageListCach,

        }
        return service;

        function updatePageListCach (pageListId, currentSectionId, refresh){
           if(Access.isAdmin()){
                var sectionCash = {};
                sectionCash.pageListId = pageListId
                sectionCash.currentSectionId = currentSectionId
                sectionCash.refresh = refresh;
                SectionCashApi.save(sectionCash, function (resp) {
                    $log.debug(resp);
                });
            }
        }

    }



module.factory('SectionCashApi', ['$resource', '$log',
	function ($resource, $log) {
		return $resource('api/sectioncash/:Id', {Id: '@Id'},
				{
	       			'list': { method:'GET', isArray:true},
	       			'get': { method:'GET', cache:false, excludeSpinner:true},
	       			'save': { method:'POST', excludeSpinner:true},
                    'update': { method:'PUT'},
				});
	}
]);