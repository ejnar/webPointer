'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');


    module.controller('PrintCtrl', PrintCtrl);
    PrintCtrl.$inject = ['$scope', '$log', 'localStorageService'];

    function PrintCtrl ($scope, $log, localStorageService) {

        $scope.printCtrl_loadItem = function() {
            $log.debug("Print current: " );
            $scope.section = localStorageService.get('printout');
            spliteColumns();
        };

        function spliteColumns() {
            var columns = $scope.section.data.split('-column2-');
            if(columns.length > 1){
                $scope.section.fdata = '<div class="vyColumn">';
                $scope.section.fdata += '<p>' + columns[0] + '</p>';
                $scope.section.fdata += '</div>';

                $scope.section.fdata += '<div class="vyColumn">';
                $scope.section.fdata += '<p>' + columns[1] + '</p>';
                $scope.section.fdata += '</div>';
            }else{
                $scope.section.fdata = '<p>' + $scope.section.data + '</p>';
            }

        }

    }