'use strict';

/* Controllers */

var vyController = angular.module('webpoint.screen');

vyController.controller('MainViewListCtrl', [
    '$scope', '$location', '$log', 'cfgScreenPath', 'PageListApi', 'properties', '$filter',
    function list ($scope, $location, $log, cfgScreenPath, PageListApi, properties, $filter) {

    	$scope.mainViewListCtrl_gotoScreen = function(id) {
            $log.debug(' --- MainViewController.mainViewListCtrl_gotoScreen - id:', id);

            var item = $filter("filter")($scope.items, {id: id});
            $log.debug(item);
            var withoutkeys = item.length > 0 && item[0].special ? '/withoutkeys' : '';

            $location.path(cfgScreenPath.SCREEN + id + withoutkeys);
        }

		$scope.items = []; 
  		$scope.mainViewListCtrl_loadPageList = function() {
			$log.debug(' --- MainViewListController.mainViewListCtrl_loadPageList:');
			$scope.viewLoading = true;
    		PageListApi.list( function (resp) {
//    	        $log.debug(resp);
    			$scope.items = resp;
    			$scope.viewLoading = false;
            });
    	}

    	$scope.mainViewListCtrl_clickExpand = function(p) {
            $log.debug(' --- MainViewController.mainViewListCtrl_clickExpand - id:', p.id );
            if(p.expanded){
                p.expanded = false;
            }else{
                p.expanded = true;
                PageListApi.get({Id: p.id }, function(resp) { $scope.pageList = resp; });
            }
        }

}]);


