'use strict';

/* Services */

var app = angular.module('webpoint.core');


    app.factory('AuthService', AuthService);
    AuthService.$inject = ['$rootScope', '$log', '$http', '$resource', 'authService', 'SettingService', 'CashService'];


    function AuthService($rootScope, $log, $http, $resource, authService, SettingService, CashService){
        $log.info('AppService');
        var service = {
            login : login,
            logout: logout
        };
        return service;


        function login(username,password) {
            $log.debug('login');
            $http.post('auth/api/login', { username: username, password: password }, {ignoreAuthModule: true} ).
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
                    CashService.setStorage("roles", user.roles);
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