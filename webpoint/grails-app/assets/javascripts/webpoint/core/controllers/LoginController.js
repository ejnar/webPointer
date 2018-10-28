'use strict';

/* Controllers */

var module = angular.module('webpoint.core');

    module.controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$log'];

    function LoginController (AuthService, $log) {
        var vm = this;

        vm.authData = {};
        vm.login = login;

        function login () {
        	$log.debug('User try to login - ' + vm.authData.username);
            AuthService.login(vm.authData.username, vm.authData.password);
        }
    }







