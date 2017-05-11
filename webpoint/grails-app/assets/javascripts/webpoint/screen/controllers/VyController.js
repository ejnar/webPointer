'use strict';

/* Controllers */

var vyController = angular.module('webpoint.screen');

vyController.controller('VyCtrl', [
    '$scope', '$routeParams', '$location', '$timeout', '$mdSidenav', '$log', 'cfgScreenPath',
    'PageListApi', '$mdDialog', 'properties', 'ChangeKeyService', 'VyApi', 'localStorageService', 'CashService',
    function list ($scope, $routeParams, $location, $timeout, $mdSidenav, $log, cfgScreenPath,
                    PageListApi, $mdDialog, properties, ChangeKeyService, VyApi, localStorageService, CashService) {

    	$scope.currentPart = 0;
    	$scope.currentPage = 0;
    	$scope.totalPart = 1;
    	$scope.vyCtrl_loadData = function() {
            $log.debug(' --- VyController.vyCtrl_loadData:');
//            localStorageService.clearAll();
            $log.debug($routeParams);
            if($routeParams.group){
                VyApi.get({group: $routeParams.group, pages: $routeParams.pages}).$promise
                    .then( function(resp) {
                        $log.debug(resp);
                        $scope.pageList = resp;
                        $scope.totalPart = $scope.pageList.pageParts.length;
                    });
            }else{
                var pageList = CashService.pop('PageList', $routeParams.pageListId);
                $log.debug(' ----------------- pageList: ', pageList);
                if(pageList == null){
                    PageListApi.get({Id: $routeParams.pageListId}).$promise
                        .then( function(resp) {
                            $log.debug(resp);
                            $scope.pageList = resp;
                            $scope.totalPart = $scope.pageList.pageParts.length;
                            CashService.stash('PageList',resp);
                        });
                }else{
                    $scope.pageList = pageList;
                    $scope.totalPart = $scope.pageList.pageParts.length;
                }
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


    	$scope.vyCtrl_rightPage = function() {
    		$scope.nextPage(1);
    	};

    	$scope.vyCtrl_leftPage = function() {
    		$scope.nextPage(-1);
    	};

    	$scope.nextPage = function(index) {
    	    console.log($scope.pageList.pageParts[$scope.currentPart].section.objects.length)
    		$scope.currentPage = $scope.currentPage + index;
    		if($scope.currentPage >= $scope.pageList.pageParts[$scope.currentPart].section.objects.length){
    			$scope.currentPage = 0;
    		}else if($scope.currentPage < 0){
    			$scope.currentPage = $scope.pageList.pageParts[$scope.currentPart].section.objects.length-1;
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
            $scope.fontSize = "vyArea_s1";
            if(index != undefined){
                $scope.fontSize = "vyArea_s" + index;
            }

        };
        $scope.vyCtrl_changeSize();

        $scope.vyCtrl_toggleSideNavRight1 = buildToggler('sidenav-right_1', 'sidenav-right_2');
        $scope.vyCtrl_toggleSideNavRight2 = buildToggler('sidenav-right_2', 'sidenav-right_1');

        $scope.vyCtrl_moveUpward = function (index) {
            $log.debug('Sort move up: ', index);

            var updateItem = $scope.pageList.pageParts[index];
            var previosItem = $scope.pageList.pageParts[index-1];

            $scope.pageList.pageParts[index-1] = updateItem;
            $scope.pageList.pageParts[index] = previosItem;

        };


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
        function buildToggler(navID, closeID) {
          return function() {
            // Component lookup should always be available since we are not using `ng-if`
            setKEy();
            if(closeID)
                $scope.vyCtrl_closeSidenav(closeID);
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
            if ($scope.selectedKey) {
                return $scope.selectedKey;
            } else {
                return "Select key";
            }
        };

        $scope.vyCtrl_changeKey = function() {
            $log.debug("Change key: " + $scope.selectedKey );
            var section = $scope.pageList.pageParts[$scope.currentPart].section;
            if(!section.data) return;
            section.tokey = $scope.selectedKey;
            $log.debug(" Section: ", section);
            $scope.pageList.pageParts[$scope.currentPart].section.data = ChangeKeyService.changeKey(section, true);
            section.key = $scope.selectedKey;
            $log.debug(" Data: ", $scope.pageList.pageParts[$scope.currentPart].section.data);
        };

        $scope.vyCtrl_print = function() {
            $log.debug("Go to print page: " + $scope.currentPart );
            var section = $scope.pageList.pageParts[$scope.currentPart].section;
            localStorageService.set('printout', section);
            $location.path(cfgScreenPath.print);
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

vyController.controller('PrintCtrl', [
    '$scope', '$location', '$log', 'cfgScreenPath', 'localStorageService',
    function list ($scope, $location, $log, cfgScreenPath, localStorageService) {

    $scope.vyCtrl_loadItem = function() {
        $log.debug("Print current: " );
        $scope.section = localStorageService.get('printout');
    };

}]);