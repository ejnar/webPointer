'use strict';

/* Services */

var settingService = angular.module('webpoint.core');



settingService.service('SettingService', ['SettingApi', '$rootScope', 'localStorageService', '$log',
    function(SettingApi, $rootScope, localStorageService, $log) {

    this.getCategory = function (scope) {
        $log.debug(' --- SettingService.getSetting:');
        var category = null;// = localStorageService.get('category');
        if (category === null) {
            SettingApi.get({Id: 'category'}, function (resp) {
                $log.debug(resp);
                scope.categories = resp.values;
                localStorageService.set('category', resp);
            });
        }else{
            scope.categories = category.values;
        }
    };

    this.getTagg = function (scope) {
        $log.debug(' --- SettingService.getTagg:');
        var list = null; //localStorageService.get('tagg');
        if (list === null) {
            SettingApi.get({Id: 'tagg'}, function (resp) {
                $log.debug(resp);
                scope.taggs = resp.values;
                localStorageService.set('tagg', resp);
            });
        }else{
            scope.taggs = list.values;
        }
    };


    this.updateTaggs = function (tagg) {
        $log.debug(' --- SettingService.updateTaggs:' + tagg);

        var taggs = localStorageService.get('tagg');
        $log.debug(taggs);
        taggs.values.push(tagg);

        SettingApi.update({Id: taggs.id}, taggs, function (resp) {
            $log.debug(resp);
        });
    };

}]);



settingService.factory('SettingApi', ['$resource', '$resourceInterceptor', '$log',
    function ($resource, $resourceInterceptor, $log) {
	
		$log.info(' --- SettingService.SettingApi.factory --- ');
		return $resource('api/setting/:Id', {Id: '@Id'},
		    {
           	    'list': { method:'GET', isArray:true, cache:false, interceptor : $resourceInterceptor },
           		'get': { method:'GET', interceptor : $resourceInterceptor },
           		'update': { method:'PUT', interceptor : $resourceInterceptor }
			});
	}

]);


