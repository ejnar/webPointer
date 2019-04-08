'use strict';

/* Controllers */

var module = angular.module('webpoint.core');

    module.controller('AppController', AppController);
    AppController.$inject = ['$scope', '$log', 'Access', 'AuthService', 'AppStatusService'];

    function AppController ($scope, $log, Access, AuthService, AppStatusService) {

        function init() {
            $log.info('AppController.init');
            $scope.loadingTracker = AppStatusService.getLoadingTracker();
            $scope.errorContainer = AppStatusService.getErrorContainer();
        }

        $scope.isAuthenticated = function () {
            return Access.isAuthenticated ();
        };

        $scope.isAdmin = function () {
            return Access.isAdmin();
        };

    	$scope.logout = function () {
    		AuthService.logout();
    	};
    	init();
    }