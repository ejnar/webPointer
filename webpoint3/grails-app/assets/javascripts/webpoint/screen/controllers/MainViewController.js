'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('MainViewListCtrl', MainViewListCtrl);
    MainViewListCtrl.$inject = ['$scope', '$location', '$log', 'cfgScreenPath', 'PageListApi', 'properties', '$filter', 'CashService'];

    function MainViewListCtrl ($scope, $location, $log, cfgScreenPath, PageListApi, properties, $filter, CashService) {

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

            if($location.search().cleancash){
                $log.debug(' --- clean cash: ');
                CashService.clean();
            }
			$scope.viewLoading = true;
    		PageListApi.list( function (resp) {
    	        $log.debug(resp);
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

        $scope.mainViewListCtrl_goToSongList = function() {
            $log.debug(' --- mainViewListCtrl_goToSongList ');
            $location.path(cfgScreenPath.SONGLIST);

        }

    }


