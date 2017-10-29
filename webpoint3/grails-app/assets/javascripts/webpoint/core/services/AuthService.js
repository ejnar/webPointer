'use strict';

/* Services */

var module = angular.module('webpoint.core');


    module.factory('AuthService', AuthService);
    AuthService.$inject = ['$rootScope', '$log', '$http', 'authService', 'SettingService', 'CashService', 'AuthorityApi'];

    function AuthService($rootScope, $log, $http, authService, SettingService, CashService, AuthorityApi){
        $log.info('AppService');
        var service = {
            login : login,
            logout: logout
        };
        return service;


        function login(username,password) {
            $log.debug('login');
            $http.post('auth/api/login', { username: username.toLowerCase(), password: password }, {ignoreAuthModule: true} ).
                success(function (user) {
                    $log.debug(user);
                    $rootScope.currentUser = user.username;
                    sessionStorage.authToken = user.access_token;

                    authService.loginConfirmed({}, function (config) {
                        if (!config.headers["X-Auth-Token"]) {
                            config.headers["X-Auth-Token"] = sessionStorage.authToken;
                        }
                        return config;
                    });
                    CashService.setSessionStorage("roles", user.roles);
                    AuthorityApi.Auth.userRole({}, function(resp) {
                        $log.debug(resp);
                        CashService.setSessionStorage("uRole", resp.authority);
                    });
//                    CashService.setSessionStorage("user", user);
                }).
                error(function (user) {
                    $log.error('login error: ' + user);
                    $rootScope.$broadcast('event:auth-loginFailed', user);
                }).
                finally(function () {
                    $log.error('login finally: ');

                });
        }

        function logout() {
            SettingService.forceCashUpdate();
            var config = {headers: {'X-Auth-Token': sessionStorage.authToken }};
            CashService.setSessionStorage("roles", null);
            $http.post('auth/api/logout', {}, config).
                success(function (user) {
                    $rootScope.$broadcast('event:auth-logoutRequest');
                }).
                error(function (user) {
                    $log.error('logout error: ', user);
                    $rootScope.$broadcast('event:auth-loginRequired');
                });
        }

    }


module.factory('AuthorityApi', ['$resource', '$log',
	function ($resource, $log) {
		$log.debug(' --- AuthorityApi.factory --- ');

		return	{
                    Auth: $resource('api/auth/:Id', {Id: '@Id'},
                            {
                                'password': { method: 'PUT', url: 'api/auth/password'},
                                'userRole': { method: 'GET', url: 'api/auth/userrole'}
                            })
				};
		}
]);