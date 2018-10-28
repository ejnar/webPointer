'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');


    module.controller('AddPassCtrl', AddPassCtrl);
    AddPassCtrl.$inject = ['$scope', '$routeParams', '$log', '$location', 'UserApi', '$filter'];

    function AddPassCtrl ($scope, $routeParams, $log, $location, UserApi, $filter) {
        var vm = this;

        vm.update = update;

        function init() {
            $log.debug(' --- AddPassCtrl.init ');
            if($routeParams.token){
                UserApi.Token.get({token: $routeParams.token}).$promise
                    .then(function(resp) {
                        $log.debug(resp);
                        $scope.user = resp;
                    },function(error) {
                        $location.path('/login');
                    });
            }
        }

        function update() {
            $log.debug(' --- AddPassCtrl.update ');
			UserApi.Pass.update({token: $routeParams.token}, $scope.user).$promise
				.then( function(resp) {
					$log.debug(resp);
					$scope.user = {};
					$location.path('/login');
				});
        }

        init();
    }
