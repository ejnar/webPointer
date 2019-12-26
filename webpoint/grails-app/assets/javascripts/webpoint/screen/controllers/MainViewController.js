'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('MainViewListCtrl', MainViewListCtrl);
    MainViewListCtrl.$inject = ['$scope', '$location', '$log', 'cfgScreenPath',
        'PageListApi', 'properties', '$filter', 'CashService', 'Access', 'SectionCashService', '$stomp'];

    function MainViewListCtrl ($scope, $location, $log, cfgScreenPath,
        PageListApi, properties, $filter, CashService, Access, SectionCashService, $stomp) {
        var mainViewList = this;

        mainViewList.isAdmin = Access.isAdmin();
        mainViewList.gotoScreen = gotoScreen;
        mainViewList.gotoSlideShow = gotoSlideShow;
        mainViewList.gotoSlideShowExludeKeys = gotoSlideShowExludeKeys;
        mainViewList.updateSlideShowList = updateSlideShowList;
        mainViewList.clickExpand = clickExpand;

        (function init() {
            loadPageList();
        })();

        $scope.mainViewListCtrl_isAdmin = Access.isAdmin();

    	function gotoScreen(id) {
            $log.debug(' --- MainViewController.mainViewListCtrl_gotoScreen - id:', id);
            var item = $filter("filter")($scope.items, {id: id});
            var withoutkeys = item.length > 0 && $scope.withoutkeys ? '/withoutkeys' : '';
            $location.path(cfgScreenPath.SCREEN + id + withoutkeys);
        }

        function gotoSlideShow(id) {
            $log.debug(' --- MainViewController.mainViewListCtrl_gotoSlideShow - id:', id);
            $location.path(cfgScreenPath.SLIDESHOW + id);
        }

        function gotoSlideShowExludeKeys(id) {
            $log.debug(' --- MainViewController.mainViewListCtrl_gotoSlideShowExludeKeys - id:', id);
            $location.path(cfgScreenPath.SLIDESHOW + id + '/withoutkeys');
        }

        function updateSlideShowList(id) {
            $log.debug(' --- MainViewController.mainViewListCtrl_updateSlideShowList - id:', id);
            SectionCashService.updatePageListCach(id, null, true);
        }

		$scope.items = [];

  	    function loadPageList() {
			$log.debug(' --- MainViewListController.mainViewListCtrl_loadPageList:');

            if($location.search().cleancash){
                $log.debug(' --- clean cash: ');
                CashService.setSessionStorage('excludeCache', true);
                PageListApi.list2().$promise
                    .then( function(resp) {
                        $scope.items = resp;
                    });
            }else{
                PageListApi.list().$promise
                    .then( function(resp) {
                        $scope.items = resp;
                    });
            }
    	}

    	function clickExpand(p) {
            $log.debug(' --- MainViewController.mainViewListCtrl_clickExpand - id:', p.id );
            if(p.expanded){
                p.expanded = false;
            }else{
                p.expanded = true;
                PageListApi.get({Id: p.id }, function(resp) {
                        $scope.pageList = resp;
                        $scope.items.forEach(function(item) {
                            if(item.id == resp.id){
                                item.pageParts = resp.pageParts;
                            }
                        });
                    }
                );
            }
        }

    }


