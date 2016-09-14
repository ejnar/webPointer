'use strict';

/* Controllers */

var vyController = angular.module('webpoint.screen');

vyController.controller('MainViewListCtrl', [
    '$scope', '$location', '$log', 'cfgScreenPath', 'PageListApi', 'properties',
    function list ($scope, $location, $log, cfgScreenPath, PageListApi, properties) {

    	$scope.mainViewListCtrl_gotoScreen = function(id) {
            $log.debug(' --- MainViewController.mainViewListCtrl_gotoScreen - id:', id);
            $location.path(cfgScreenPath.main + id );
        }

		$scope.items = []; 
  		$scope.mainViewListCtrl_loadPageList = function() {
			$log.debug(' --- MainViewListController.mainViewListCtrl_loadPageList:');
			$scope.viewLoading = true;

    		PageListApi.list(
    				function (resp) {
    				    $log.debug(resp);
    					$scope.items = resp;
    					$scope.viewLoading = false;
                    });
    	}

}]);


