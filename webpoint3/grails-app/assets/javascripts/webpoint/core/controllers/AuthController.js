'use strict';

/* Controllers */

var authController = angular.module('webpoint.core');

authController.controller('LoginController', ['$rootScope', '$scope', '$http', '$log', 'authService',
    function ($rootScope, $scope, $http, $log, authService) { 
     
        $scope.logIn = function () {
        	$log.debug('User try to login - ' + $scope.authData.username);

            $http.post('auth/api/login', { username: $scope.authData.username, password: $scope.authData.password }, {ignoreAuthModule: true} ).
                success(function (data) {
                    $log.debug('authentication token: ' + data.access_token);
                    $log.debug('authentication username: ' + data.username);
                    $rootScope.currentUser = data.username;
                    sessionStorage.authToken = data.access_token;
                    authService.loginConfirmed({}, function (config) {
                        if (!config.headers["X-Auth-Token"]) {
                            config.headers["X-Auth-Token"] = sessionStorage.authToken;
                        }
                        return config;
                    });
                }).
                error(function (data) {
                	$log.error('login error: ' + data);
                    $rootScope.$broadcast('event:auth-loginFailed', data);
                });
        }
 }]);







