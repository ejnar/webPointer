'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('VyCtrl', VyCtrl);  // '$timeout'
    VyCtrl.$inject = ['$scope', '$routeParams', '$location', '$timeout', '$mdSidenav', '$log', 'cfgScreenPath', '$interval',
                      '$mdDialog', 'properties', 'ChangeKeyService', 'VyApi', 'localStorageService', 'PageService',
                      'Access', 'CashService', 'RemoveKeyService', 'SectionCashService', 'BinaryApi', '$stomp'];

    function VyCtrl ($scope, $routeParams, $location, $timeout, $mdSidenav, $log, cfgScreenPath, $interval,
                     $mdDialog, properties, ChangeKeyService, VyApi, localStorageService, PageService,
                    Access, CashService, RemoveKeyService, SectionCashService, BinaryApi, $stomp) {
        var promiseInterval;
        $scope.activeSong = null;
    	$scope.currentPart = 0;
    	$scope.currentPage = 0;
    	$scope.totalPart = 1;

        (function init() {
            if(Access.isClient()){
                socket();
            }
            vyCtrl_loadData();
        })();

    	function vyCtrl_loadData() {
            $log.debug(' --- VyController.vyCtrl_loadData:');
//            $log.debug($routeParams);
            if($routeParams.group){
                VyApi.get({group: $routeParams.group, pages: $routeParams.pages}).$promise
                    .then( function(resp) {
                        initVy();
                    });
            }else{
                var exclude = CashService.getSessionStorage('excludeCache', true);
                $log.debug(' ----------------- pageList: ', exclude);
                var method = PageService.excludeCache(exclude);
                PageService.listApi [method] ({Id: $routeParams.pageListId}, function(resp) {
                        CashService.setSessionStorage('excludeCache', false);
                        initVy(resp);
                    });
			}
    	};

        function initVy(resp){
            $log.debug(resp);
            $scope.pageList = resp;
            addBinary($scope.pageList);
            $scope.totalPart = $scope.pageList.pageParts.length;
    	    removeKeys($scope.pageList);
            spliteColumns($scope.pageList);
    	}



        function socket() {
            $stomp.setDebug(function (args) { $log.debug(args) });
            var headers = { login: 'songpoint', passcode: 'qwerty', pageListId: $routeParams.pageListId};
            $stomp.connect('/stomp', headers)
                .then(function (frame) {
                    var subscription = $stomp.subscribe('/topic/'+$routeParams.pageListId, function (payload, headers, res) {
                        $log.debug(payload)
                        updateActiveSong(payload);
                    }, {'headers': 'are awesome' });
               });
        }
        function updateActiveSong(payload){
            $scope.activeSong = payload;
            $scope.activeSong.active = true;
            if($scope.activeSong.currentSectionId != null){
                $scope.pageList.pageParts.forEach(function(entry) {
                    // TODO test what type of data
                    $log.debug(entry.section);
                    if(entry.section.id == $scope.activeSong.currentSectionId){
                        $scope.$apply(function () {
                           $scope.activeSong.section = entry.section;
                           document.getElementById("snackbar").className = "show";
                        });
                        showDelay();
                    }
                });
            }
        }
        var oneTimer;
        function showDelay(){
            $interval.cancel(oneTimer);
            oneTimer = $interval(function() {
              if(document.getElementById("snackbar") != null){
                document.getElementById("snackbar").className = "";
              }
              $interval.cancel(oneTimer);
            }, 5000);
        }

        $scope.$on('$destroy',function(){
            if(Access.isClient()){
                $stomp.disconnect().then(function () {
                    $log.info('disconnected')
                });
            }
        });
        function addBinary(page){
            angular.forEach(page.pageParts, function(s) {
                if(s.section.type == 'IMAGE'){
                    s.section.binary = BinaryApi.get({Id: s.section.id}).$promise
                }
            });
        }

        function removeKeys(pageList) {
            if($routeParams.withoutkeys){
                for(var i=0; i < pageList.pageParts.length; i++){
                    var part = pageList.pageParts[i];
                    pageList.pageParts[i].section.data = RemoveKeyService.removeKeys(true,pageList.pageParts[i].section.data);
                }
            }
        }


        function updateCash(){
            SectionCashService.updatePageListCach($scope.pageList.id, $scope.pageList.pageParts[$scope.currentPart].section.id, false);
        }

        function spliteColumns(pageList) {
            for(var i=0; i < pageList.pageParts.length; i++){
                var part = pageList.pageParts[i];
                if(pageList.pageParts[i].section.data != null){
                    var columns = pageList.pageParts[i].section.data.split('-column2-');
                    if(columns.length > 1){
                        pageList.pageParts[i].section.fdata = '<div class="vyColumn">';
                        pageList.pageParts[i].section.fdata += '<p>' + columns[0] + '</p>';
                        pageList.pageParts[i].section.fdata += '</div>';

                        pageList.pageParts[i].section.fdata += '<div class="vyColumn">';
                        pageList.pageParts[i].section.fdata += '<p>' + columns[1] + '</p>';
                        pageList.pageParts[i].section.fdata += '</div>';
                    }else{
                        pageList.pageParts[i].section.fdata = '<p>' + pageList.pageParts[i].section.data + '</p>';
                    }
                }
            }
        }

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
            updateCash();
      	};


    	$scope.vyCtrl_rightPage = function() {
    		$scope.nextPage(1);
    	};

    	$scope.vyCtrl_leftPage = function() {
    		$scope.nextPage(-1);
    	};

    	$scope.nextPage = function(index) {
//    	    console.log($scope.pageList.pageParts[$scope.currentPart].section.objects.length)
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
//                $log.debug("close RIGHT is done");
            });
        };

        $scope.vyCtrl_clickLNavList = function (index) {
//            $log.debug('Click in list: ', index);
            $scope.currentPart = index;
            $scope.vyCtrl_closeSidenav('sidenav-right_1');
            updateCash();
        };

        $scope.vyCtrl_changeSize = function () {
            $scope.fontSize = "vyArea_s1";
            if($scope.selectedSize != undefined){
                $scope.fontSize = "vyArea_s" + $scope.selectedSize;
            }else{
                $scope.selectedSize = 1;
            }
            return ' Size ' + $scope.selectedSize;
        };
        $scope.vyCtrl_changeSize(1);

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
//                $log.debug("toggle " + navID + " is done");
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
//                $log.debug("toggle " + navID + " is done");
              });
          }
        }

        function setKEy(){
            $scope.selectedKey = $scope.pageList.pageParts[$scope.currentPart].section.key
        }

        $scope.keys = properties.keys;
        $scope.selectedKey;
        $scope.vyCtrl_getSelectedKey = function() {
//            $log.debug("Selected key: " + $scope.selectedKey );
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
            formatText();
        };

        $scope.vyCtrl_print = function() {
            $log.debug("Go to print page: " + $scope.currentPart );
            var section = $scope.pageList.pageParts[$scope.currentPart].section;
            localStorageService.set('printout', section);
            $location.path(cfgScreenPath.print);
        };

        $scope.vyCtrl_cleanCash = function() {
            $log.debug("Clean cash ");
            CashService.setSessionStorage('excludeCache', true);
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
    }