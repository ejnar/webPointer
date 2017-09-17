'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('MenuCtrl', MenuCtrl);
    MenuCtrl.$inject = ['$scope', '$location', '$log', 'cfgScreenPath', 'PageListApi', 'properties', '$filter', 'CashService'];

    function MenuCtrl ($scope, $location, $log, cfgScreenPath, PageListApi, properties, $filter, CashService) {

        $scope.goToSongList = function() {
            $log.debug(' --- mainViewListCtrl_goToSongList ');
            $location.path(cfgScreenPath.SONGLIST);

        }

        $scope.cleanCash = function() {
            CashService.clean();
        };
    }