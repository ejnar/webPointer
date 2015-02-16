'use strict';

/* Controllers */



var authController = angular.module('root.webpointer');

authController.controller('LoginController', ['$rootScope', '$scope', '$http', '$log', 'authService',
    function ($rootScope, $scope, $http, $log, authService) { 
     
        $scope.logIn = function () {
        	$log.debug('User try to login - ' + $scope.authData.username);
        																											// getAuthenticateHttpConfig()		
            $http.post('auth/api/login', { username: $scope.authData.username, password: $scope.authData.password }, {ignoreAuthModule: true} ).
                success(function (data) {
//                    console.log('authentication token: ' + data.access_token);
//                    console.log('authentication username: ' + data.username);
                    $rootScope.isAuthenticated = true;
                    $rootScope.currentUser = data.username;
                    setLocalToken(data.access_token);
                    $log.debug('User have succefully login - ' + $scope.authData.username);
                    authService.loginConfirmed({}, function (config) {
                        if (!config.headers["X-Auth-Token"]) {
                            config.headers["X-Auth-Token"] = getLocalToken();
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







