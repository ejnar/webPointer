'use strict';

/* Services */

var settingService = angular.module('webpoint.core');

settingService.constant(
		'properties', {
			categories: ['Worship','Christian','Hymns', 'Gospel', 'Christmas carols', 'Traditional'],
			language: ['swe','eng','dan'],
			stypes: ['TEXT', 'TEXTCHORDS'],
			keys: ['C','C#:Db','D','D#:Eb','E','F','F#:Gb','G','G#:Ab','A','A#:Bb','H:B:Cb'],
			test: 'value',
		});

settingService.service('SettingService', ['SettingApi', '$rootScope', 'localStorageService', '$log', 'hashMap',
    function(SettingApi, $rootScope, localStorageService, $log, hashMap) {

    hashMap.put('TEXT','TX');
    hashMap.put('TEXTCHORDS','TC');

    this.getSectionType = function (type) {
        $log.debug(' --- SettingService.getSectionType:');
        return hashMap.get(type);
    };


    this.getCategory = function (scope) {
        $log.debug(' --- SettingService.getSetting:');
        var category = localStorageService.get('category');
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
        var list = localStorageService.get('tagg');
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

    this.getFilterItems = function (scope) {
        $log.debug(' --- SettingService.getTagg:');
        var list = localStorageService.get('filterItems');
        if (true) {
            SettingApi.get({Id: 'category'}).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    scope.filterItems = resp.values;
                    return SettingApi.get({Id: 'tagg'}).$promise;
                }).then( function(resp) {
                    $log.debug(resp);
                    angular.forEach(resp.values, function(v) {
                        scope.filterItems.push(v);
                    });
                });
        }else{
            scope.filterItems = list.values;
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


