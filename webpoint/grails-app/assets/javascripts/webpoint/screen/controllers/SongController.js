'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SongCtrl', SongCtrl);
    SongCtrl.$inject = ['$scope', '$location', '$filter', '$log', '$routeParams', 'SectionCashApi'];
    function SongCtrl($scope, $location, $filter, $log, $routeParams, SectionCashApi) {

    	function init () {
            $log.debug(' --- SongCtrl.init ' + $routeParams.id);
//            $log.debug(song);

            SectionCashApi.get({Id: $routeParams.id}).$promise
                .then( function(resp) {
                    $log.debug(resp);

                });
        }
//        init();

    }