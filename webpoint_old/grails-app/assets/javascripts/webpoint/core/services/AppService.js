'use strict';

/* Services */

var app = angular.module('webpoint.core');


    app.service('AppService', AppService);
    AppService.$inject = ['$rootScope', '$log', '$http', '$resource', 'usSpinnerService', 'authService'];


    function AppService($rootScope, $log, $http, $resource, usSpinnerService, authService){
        $log.info('AppService');


        this.isAuthenticated = function() {
            if(sessionStorage.authToken == undefined || sessionStorage.authToken == '')
                return false;
            else
                return true;
        };

        this.login = function(username,password) {

            $http.post('auth/api/login', { username: username, password: password }, {ignoreAuthModule: true} ).
                success(function (data) {
                    $log.debug(data);
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
                    $log.error('login error: ', data);
                    $rootScope.$broadcast('event:auth-loginFailed');
                });

        };


        this.logout = function() {

            var config = {headers: {'X-Auth-Token': sessionStorage.authToken }};
            $http.post('auth/api/logout', {}, config).
                success(function (data) {
//                    $log.debug(data);
                    $rootScope.$broadcast('event:auth-logoutRequest');
                }).
                error(function (data) {
                    $log.error('logout error: ');
                    $log.error(data);
                    usSpinnerService.stop('spinner-1');
                    $rootScope.$broadcast('event:auth-loginRequired');
                });
        }


    }