'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('PageListsCtrl', PageListsCtrl);
    MenuCtrl.$inject = ['$scope', '$location', '$log', 'cfgScreenPath', 'PageListApi', 'properties',
                        '$filter', 'CashService'];

    function PageListsCtrl ($scope, $location, $log, cfgScreenPath, PageListApi, properties,
                            $filter, CashService) {

        var vm = this;
        vm.clickList = clickList;
        vm.update = update;
        vm.back = back;

        vm.list = [];
        vm.pageName;
        var index;

        (function init() {
            load();
        })();

         function load() {
            $log.debug(' --- PageListsCtrl.load:');

            PageListApi.list2().$promise
                .then( function(resp) {
                    $log.debug(' --- List: ', resp);
                    vm.list = resp;
                });
        }

        function clickList (i) {
            $log.debug(' --- PageListsCtrl.clickList; ',   vm.list[i].name);
            index = i;
            vm.pageName = vm.list[index].name;

        }

        function update () {
            $log.debug(' --- PageListsCtrl.update; ', vm.list[index].name);
            vm.list[index].name = vm.pageName;

            $log.debug(vm.list[index]);
            PageListApi.update({Id: vm.list[index].id}, vm.list[index],
                function (resp) {
                    $log.debug(resp);
                });
        }

        function back () {
            $log.debug(' --- PageListsCtrl.back ');
            $location.path(cfgScreenPath.PAGELIST);

        }


    }