'use strict';

/* Services */

var app = angular.module('webpoint.core');


    app.factory('Access', Access);
    Access.$inject = ['$rootScope', '$log', '$location', 'CashService'];


    function Access($rootScope, $log, $location, CashService){
        $log.info('Access');

        var access = {
            OK: 200,
            // "we don't know who you are, so we can't say if you're authorized to access
            // this resource or not yet, please sign in first"
            UNAUTHORIZED: 401,
            // "we know who you are, and your profile does not allow you to access this resource"
            FORBIDDEN: 403,
            isAdmin: isAdmin,
            hasRole: hasRole,
            hasAnyRole: hasAnyRole,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        }
        return access;

        function isAdmin(){return hasRole("ROLE_ADMIN");}

        function hasRole(role) {
            var roles = CashService.getSessionStorage("roles");
            return roles != null && roles.indexOf(role) >= 0;
        }

        function hasAnyRole (roles){
            var userRoles = CashService.getSessionStorage("roles");
            return !!userRoles.filter(function (role) {
                return roles.indexOf(role) >= 0;
            }).length;
        }

        function isAuthenticated () {
            if(sessionStorage.authToken == undefined || sessionStorage.authToken == '')
                return false;
            else
                return true;
        }

        function isAuthorized(templateUrl) {
            var pass = $location.url().indexOf('pass/');
            if(!isAuthenticated() && pass != 1){
                $location.path('/login');
            }

            if(templateUrl.indexOf('webpoint/user') > 0){
                if(!hasRole("ROLE_ADMIN")){
                    $log.debug('not authorized - hasRole');
                    $location.url('/login');
                }
            }
        }

    }