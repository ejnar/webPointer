'use strict';

/* Controllers */

var app = angular.module('root.webpointer');

app.controller('AppController', ['$rootScope', '$scope', '$http', //'SettingsApi', 'UserApi',
    function ($rootScope, $scope, $http, SettingsApi, UserApi) {

//    	$scope.settings = SettingsApi.Setting.setting();
//    	$scope.currentUser = UserApi.User.profile();

    	$scope.logout = function () {
    		console.log('logOut called');

    		$http.post('auth/api/logout', {}, getHttpConfig()).
            	success(function () {
            		console.log('logout success');
            		$rootScope.$broadcast('event:auth-logoutRequest');
            	}).
            	error(function (data) {
            		console.log('logout error: ' + data);
            	});
    	};
}]);
