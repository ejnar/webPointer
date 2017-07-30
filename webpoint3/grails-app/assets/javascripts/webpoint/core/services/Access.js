'use strict';

/* Services */

var app = angular.module('webpoint.core');


    app.factory('Access', Access);
    Access.$inject = ['$rootScope', '$log', 'CashService'];


    function Access($rootScope, $log, CashService){
        $log.info('Access');

        var access = {
            OK: 200,
            // "we don't know who you are, so we can't say if you're authorized to access
            // this resource or not yet, please sign in first"
            UNAUTHORIZED: 401,
            // "we know who you are, and your profile does not allow you to access this resource"
            FORBIDDEN: 403,
            hasRole: hasRole,
            hasAnyRole: hasAnyRole,
            isAuthenticated: isAuthenticated

        }
        return access;

        function hasRole(role) {
            var roles = CashService.getStorage("roles");
            return roles != null && roles.indexOf(role) >= 0;
        }

        function hasAnyRole (roles){
            var userRoles = CashService.getStorage("roles");
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

    }