'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('PrintCtrl', PrintCtrl);
    PrintCtrl.$inject = ['$scope', '$log', 'localStorageService', 'RemoveKeyService'];

    function PrintCtrl ($scope, $log, localStorageService, RemoveKeyService) {

        $scope.printCtrl_loadItem = function() {
            $log.debug("Print current: " );
            $scope.section = localStorageService.get('printout');
            $log.debug($scope.section.data);
            if($scope.section.withoutkeys){
                $scope.section.data = RemoveKeyService.removeKeys(false,$scope.section.data);
                $log.debug($scope.section.data);
            }
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