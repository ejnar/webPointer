'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('MainViewListCtrl', MainViewListCtrl);
    MainViewListCtrl.$inject = ['$scope', '$location', '$log', 'cfgScreenPath', 'PageListApi', 'properties', '$filter', 'CashService', '$stomp'];

    function MainViewListCtrl ($scope, $location, $log, cfgScreenPath, PageListApi, properties, $filter, CashService, $stomp) {

        (function init() {
            loadPageList();
        })();

        $stomp.setDebug(function (args) {
            $log.debug(args)
        })

        var headers = {
              login: 'mylogin',
              passcode: 'mypasscode',
              // additional header
              'client-id': 'my-client-id'
            };

//        $stomp
//          .connect('/stomp', headers)
//
//          // frame = CONNECTED headers
//          .then(function (frame) {
//            var subscription = $stomp.subscribe('/topic/hello', function (payload, headers, res) {
////              console.info(res);
//
//              $scope.payload = payload
//
//                }, {
//                  'headers': 'are awesome'
//                });
//
//            // Unsubscribe
////            subscription.unsubscribe()
//
//            // Send message
//            $stomp.send('/app/hello', { "message": "Sigurd"},
//            {
//              priority: 9,
//              custom: 42 // Custom Headers
//            })
//
//            // Disconnect
////            $stomp.disconnect().then(function () {
////              $log.info('disconnected')
////            })
//
//          })











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
//                    $log.debug(resp);
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


