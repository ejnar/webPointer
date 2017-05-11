'use strict';

/* Controllers */

var module = angular.module('webpoint.core');

    module.controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$scope', '$http', '$log', 'AppService'];

    function LoginController ($rootScope, $scope, $http, $log, AppService) {
        var vm = this;

        vm.authData = {};
        vm.login = login;

        function login () {
        	$log.debug('User try to login - ' + vm.authData.username);
            AppService.login(vm.authData.username, vm.authData.password);
        }
    }







