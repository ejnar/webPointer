'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('MainViewListCtrl', MainViewListCtrl);
    MainViewListCtrl.$inject = ['$scope', '$location', '$log', 'cfgScreenPath', 'PageListApi', 'properties', '$filter', 'CashService'];

    function MainViewListCtrl ($scope, $location, $log, cfgScreenPath, PageListApi, properties, $filter, CashService) {

        (function init() {
            loadPageList();
        })();

    	$scope.mainViewListCtrl_gotoScreen = function(id) {
            $log.debug(' --- MainViewController.mainViewListCtrl_gotoScreen - id:', id);

            var item = $filter("filter")($scope.items, {id: id});
            var withoutkeys = item.length > 0 && $scope.withoutkeys ? '/withoutkeys' : '';

            $location.path(cfgScreenPath.SCREEN + id + withoutkeys);
        }

		$scope.items = []; 
  	    function loadPageList() {
			$log.debug(' --- MainViewListController.mainViewListCtrl_loadPageList:');

            if($location.search().cleancash){
                $log.debug(' --- clean cash: ');
                CashService.setSessionStorage('excludeCache', true);
            }
    		PageListApi.list().$promise
    		    .then( function(resp) {
                    $log.debug(resp);
                    $scope.items = resp;
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

    }


