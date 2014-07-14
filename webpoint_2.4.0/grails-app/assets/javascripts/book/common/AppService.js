'use strict';

/* Services */

var appService = angular.module('webApp');

appService.factory('SettingsApi', ['$resource',
    function ($resource) {
	    console.log(' --- appService.factory');
        return {
            Setting: $resource('api/settings', {}, {
                'setting': { method: 'GET' }
            })
        };
    }]);