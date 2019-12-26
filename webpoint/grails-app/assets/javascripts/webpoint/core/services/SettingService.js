'use strict';

/* Services */

var settingService = angular.module('webpoint.core');


// https://www.w3.org/WAI/ER/IG/ert/iso639.htm
settingService.constant(
		'properties', {
			categories: ['Worship','Christian','Hymns', 'Gospel', 'Christmas carols', 'Traditional'],
			language: ['swe','eng','dan','nor'],
			stypes: ['TEXT', 'TEXTCHORDS', 'IMAGE'],  // , 'PDF'
			keys: ['C','C#:Db','D','D#:Eb','E','F','F#:Gb','G','G#:Ab','A','A#:Bb','H:B:Cb'],
			keyList: ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','H','B','Cb'],
			test: 'value',
});

settingService.service('SettingService', ['SettingApi', '$rootScope', 'CashService', '$log', 'hashMap',
    function(SettingApi, $rootScope, CashService, $log, hashMap) {

    hashMap.put('TEXT','TX');
    hashMap.put('TEXTCHORDS','TC');
    hashMap.put('IMAGE','IM');

    this.getSectionType = function (type) {
        $log.debug(' --- SettingService.getSectionType:');
        return hashMap.get(type);
    };


    this.getCategory = function (scope) {
        $log.debug(' --- SettingService.getSetting:');
        var category = CashService.getStorage('category');
        if (category === null) {
            SettingApi.get({Id: 'category'}, function (resp) {
//                $log.debug(resp);
                scope.categories = resp.values;
                CashService.setStorage('category', resp);
            });
        }else{
            scope.categories = category.values;
        }
    };



    this.getFilterItems = function (scope) {
        $log.debug(' --- SettingService.getTagg:');
        var list = CashService.getStorage('filterItems');
        if (true) {
            SettingApi.get({Id: 'category'}).$promise
                .then( function(resp) {
//                    $log.debug(resp);
                    scope.filterItems = resp.values;
                    return SettingApi.get({Id: 'tagg'}).$promise;
                }).then( function(resp) {
//                    $log.debug(resp);
                    angular.forEach(resp.values, function(v) {
                        scope.filterItems.push(v);
                    });
                });
        }else{
            scope.filterItems = list.values;
        }
    };

    this.getLang = function (scope) {
        $log.debug(' --- SettingService.getLang:');

        if(!scope.langs){
            scope.langs = [];
        }
        scope.langs.push('eng');
        scope.langs.push('swe');
    };

   this.getTagg = function (scope) {
        $log.debug(' --- SettingService.getTagg:');

        if(!scope.taggs){
            scope.taggs = [];
        }

        SettingApi.get({Id: 'tagg'}, function (resp) {
            $log.debug(resp);
            scope.taggs = resp.values;
            CashService.setStorage('tagg', resp);
        });
    };

    this.getTaggObj = function (scope) {
        $log.debug(' --- SettingService.getTagg:');

        SettingApi.get({Id: 'tagg'}, function (resp) {
            $log.debug(resp);
            scope.tagg = resp;
        });
    };

    this.updateTagg = function (tagg) {
        $log.debug(' --- SettingService.updateTagg:' + tagg);
        var taggs = CashService.getStorage('tagg');
        $log.debug(taggs);
        taggs.values.push(tagg);

        SettingApi.update({Id: taggs.id}, taggs, function (resp) {
            $log.debug(resp);
        });
    };

    this.updateTaggs = function (taggs) {
        $log.debug(' --- SettingService.updateTaggs:' + taggs);
        CashService.setStorage('tagg', taggs);

        SettingApi.update({Id: taggs.id}, taggs, function (resp) {
            $log.debug(resp);
        });
    };

    this.forceCashUpdate = function (){
        SettingApi.get({Id: 'cashUpdate'}, function (resp) {
            $log.debug(resp.values[0]);
            if(resp.values[0] == 'true') {
                CashService.clean();
            }
            CashService.setStorage('cashUpdate', resp);
        });
    };



}]);

settingService.factory('SettingApi', ['$resource', '$log',
    function ($resource, $log) {
		$log.info(' --- SettingService.SettingApi.factory --- ');
		return $resource('api/setting/:Id', {Id: '@Id'},
		    {
           	    'list': { method:'GET', isArray:true, cache:false},
           		'get': { method:'GET'},
           		'update': { method:'PUT'}
			});
	}
]);