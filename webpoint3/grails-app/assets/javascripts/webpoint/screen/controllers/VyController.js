'use strict';

/* Controllers */

var vyController = angular.module('webpoint.screen');

vyController.controller('VyCtrl', [
    '$scope', '$routeParams', '$location', '$timeout', '$mdSidenav', '$log', 'cfgScreenPath',
    'PageListApi', '$mdDialog', 'properties', 'ChangeKeyService', 'VyApi',
    function list ($scope, $routeParams, $location, $timeout, $mdSidenav, $log, cfgScreenPath,
                    PageListApi, $mdDialog, properties, ChangeKeyService, VyApi) {

    	$scope.currentPart = 0;
    	$scope.totalPart = 1;
    	$scope.vyCtrl_loadData = function() {
            $log.debug(' --- MainViewListController.mainViewListCtrl_loadData:');
            $log.debug($routeParams);
            if($routeParams.group){
                VyApi.get({group: $routeParams.group, pages: $routeParams.pages}).$promise
                    .then( function(resp) {
                        $scope.pageList = resp;
                        $log.debug(resp);
                        $scope.totalPart = $scope.pageList.pageParts.length;
                    });
            }else{
                PageListApi.get({Id: $routeParams.pageListId}).$promise
                    .then( function(resp) {
                        $scope.pageList = resp;
                        $log.debug(resp);
                        $scope.totalPart = $scope.pageList.pageParts.length;
                    });
			}

    	};

    	$scope.vyCtrl_right = function() {
    		$scope.nextData(1);
    	};
    	
    	$scope.vyCtrl_left = function() {
    		$scope.nextData(-1);
    	};
     	
    	$scope.nextData = function(index) {
    		$scope.currentPart = $scope.currentPart + index;
    		if($scope.currentPart == $scope.totalPart){
    			$scope.currentPart = 0;
    		}else if($scope.currentPart < 0){
    			$scope.currentPart = $scope.totalPart-1;
    		}	
      	};


        $scope.vyCtrl_goBack = function(){
            $location.path(cfgScreenPath.pagelist);
        };

        $scope.vyCtrl_closeSidenav = function (navID) {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID).close()
                .then(function () {
                $log.debug("close RIGHT is done");
            });
        };

        $scope.vyCtrl_clickLNavList = function (index) {
            $log.debug('Click in list: ', index);
            $scope.currentPart = index;
            $scope.vyCtrl_closeSidenav('sidenav-right_1');
        };

        $scope.vyCtrl_changeSize = function (index) {
            $log.debug('Change css: ', index);
            $scope.fontSize = "vyArea_s0";
            if(index != undefined){
                $scope.fontSize = "vyArea_s" + index;
            }

        };
        $scope.vyCtrl_changeSize();

        $scope.vyCtrl_toggleSideNavRight1 = buildToggler('sidenav-right_1');
        $scope.vyCtrl_toggleSideNavRight2 = buildToggler('sidenav-right_2');

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
          var timer;
          return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
              timer = undefined;
              func.apply(context, args);
            }, wait || 100);
          };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
          return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          }, 400);
        }
        function buildToggler(navID) {
          return function() {
            // Component lookup should always be available since we are not using `ng-if`
            setKEy();
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          }
        }

        function setKEy(){
            $scope.selectedKey = $scope.pageList.pageParts[$scope.currentPart].section.key
        }

        $scope.keys = properties.keys;
        $scope.selectedKey;
        $scope.vyCtrl_getSelectedKey = function() {
            $log.debug("Selected key: " + $scope.selectedKey );
            if ($scope.selectedKey !== undefined) {
                return $scope.selectedKey;
            } else {
                return "Select key";
            }
        };

        $scope.vyCtrl_changeKey = function() {
            $log.debug("Change key: " + $scope.selectedKey );
            var section = $scope.pageList.pageParts[$scope.currentPart].section;
            section.tokey = $scope.selectedKey;
            $log.debug(" Section: ", section);
            $scope.pageList.pageParts[$scope.currentPart].section.data = ChangeKeyService.changeKey(section, true);
            section.key = $scope.selectedKey;
            $log.debug(" Data: ", $scope.pageList.pageParts[$scope.currentPart].section.data);
        };


        $scope.showAlert = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };


}]);


