'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('ScreenCtrl', ScreenCtrl);  // '$timeout'
    ScreenCtrl.$inject = ['$scope', '$routeParams', '$location', '$timeout', '$mdSidenav', '$log', 'cfgScreenPath', '$interval',
                      '$mdDialog', 'properties', 'ChangeKeyService', 'VyApi', 'localStorageService', 'PageService',
                      'Access', 'CashService', 'RemoveKeyService', 'SectionCashService', 'BinaryApi', '$stomp'];

    function ScreenCtrl ($scope, $routeParams, $location, $timeout, $mdSidenav, $log, cfgScreenPath, $interval,
                     $mdDialog, properties, ChangeKeyService, VyApi, localStorageService, PageService,
                    Access, CashService, RemoveKeyService, SectionCashService, BinaryApi, $stomp) {

        var vm = this;
        vm.left = left;
        vm.right = right;
        vm.leftPage = leftPage;
        vm.rightPage = rightPage;
        vm.goBack = goBack;
        vm.closeSidenav = closeSidenav;
        vm.toggle = toggle;
        vm.clickLNavList = clickLNavList;
        vm.changeSize = changeSize;
        vm.moveUpward = moveUpward;
        vm.moveLast = moveLast;
        vm.removeSong = removeSong;
        vm.getSelectedKey = getSelectedKey;
        vm.changeKey = changeKey;
        vm.print = print;
        vm.cleanCash = cleanCash;
        vm.closeUpdateList = closeUpdateList;

        vm.keys = properties.keys;
        vm.activeSong = null;
        vm.currentPart = 0;
        vm.currentPage = 0;
        vm.selectedSize = null;
        vm.fontSize = "vyArea_s1";
        vm.selectedKey = null;
        vm.totalPart = 1;

        var promiseInterval;

        (function init() {
            if(Access.isClient()){
                socket();
            }
            loadData();
        })();

    	function loadData() {
            $log.debug(' --- ScreenCtrl.loadData:');
//            $log.debug($routeParams);
            if($routeParams.group){
                VyApi.get({group: $routeParams.group, pages: $routeParams.pages}).$promise
                    .then( function(resp) {
                        initVy(resp);
                    });
            }else{
                var forceCleanCash = $routeParams.pageListId === CashService.getRefreshId();
                var exclude = forceCleanCash ? true : CashService.getSessionStorage('excludeCache', true);
                $log.debug(' ----------------- pageList: ', exclude);
                var method = PageService.excludeCache(exclude);
                PageService.listApi [method] ({Id: $routeParams.pageListId}, function(resp) {
                        CashService.setSessionStorage('excludeCache', false);
                        initVy(resp);
                    });
			}
    	}

    	function left() {
            nextData(-1);
        }
        function right() {
            nextData(1);
        }
        function rightPage () {
            nextPage(1);
        }
    	function leftPage () {
    	    nextPage(-1);
    	}
        function goBack(){
            $location.path(cfgScreenPath.pagelist);
        }
       function closeSidenav(navID) {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID).close()
                .then(function () {
//                $log.debug("close RIGHT is done");
            });
        }
        function closeUpdateList(){
            PageService.updateList($scope.pageList);
            toggle(1, 2);
        }
        function toggle(openID, closeID){

            if(vm.currentPart){
                vm.selectedKey = $scope.pageList.pageParts[vm.currentPart].section.key;
            }
            if('sidenav-right_'+closeID)
                closeSidenav('sidenav-right_'+closeID);
            $mdSidenav('sidenav-right_'+openID)
              .toggle()
              .then(function () {
//                $log.debug("toggle " + navID + " is done");
              });
        }
        function clickLNavList(index) {
            vm.currentPart = index;
            updateCash();
        }
        function changeSize() {
            vm.fontSize = "vyArea_s1";
            if(vm.selectedSize != undefined){
                vm.fontSize = "vyArea_s" + vm.selectedSize;
            }else{
                vm.selectedSize = 1;
            }
            return ' Size ' + vm.selectedSize;
        }
        function moveUpward (index) {
            $log.debug('Sort move up: ', index);
            var updateItem = $scope.pageList.pageParts[index];
            var prev = index == 0 ? $scope.pageList.pageParts.length : index-1;
            var previosItem = $scope.pageList.pageParts[prev];
            $scope.pageList.pageParts[prev] = updateItem;
            $scope.pageList.pageParts[index] = previosItem;

        }
        function moveLast(index) {
            $log.debug('Move last: ', index);
            var updateItem = $scope.pageList.pageParts[index];
            var nextItem = $scope.pageList.pageParts[index+1];
            $scope.pageList.pageParts[index+1] = updateItem;
            $scope.pageList.pageParts[index] = nextItem;
        }
        function removeSong(index){
            var part = $scope.pageList.pageParts[index];
            PageService.removeSectionInList($scope.pageList.id, part).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    $scope.pageList.pageParts.splice(index,1);
                    vm.totalPart = $scope.pageList.pageParts.length;
                });
            removeFromSelectedSongList(index);
        }

        function removeFromSelectedSongList(index) {
            if(index > -1) {
                var selectedSongList = CashService.getSessionStorage("selectedSongList");
                selectedSongList.pageParts.splice(index, 1);
                CashService.setSessionStorage("selectedSongList", selectedSongList);
            }
        }

        function getSelectedKey() {
//            $log.debug("Selected key: " + vm.selectedKey );
            if (vm.selectedKey) {
                return vm.selectedKey;
            } else {
                return "Select key";
            }
        }
        function changeKey() {
            $log.debug("Change key: " + vm.selectedKey );
            var section = $scope.pageList.pageParts[vm.currentPart].section;
            if(!section.data) return;
            section.tokey = vm.selectedKey;
            $log.debug(" Section: ", section);
            $scope.pageList.pageParts[vm.currentPart].section.fdata = ChangeKeyService.changeKey(section, true);
            section.key = vm.selectedKey;
            $log.debug(" Data: ", $scope.pageList.pageParts[vm.currentPart].section.fdata);
        }
        function print() {
            $log.debug("Go to print page: " + vm.currentPart );
            var section = $scope.pageList.pageParts[vm.currentPart].section;
            localStorageService.set('printout', section);
            $location.path(cfgScreenPath.print);
        }
        function cleanCash() {
            $log.debug("Clean cash ");
            CashService.setSessionStorage('excludeCache', true);
        }

        function initVy(resp){
            $log.debug('------------initVy------------------');
            $log.debug(resp);
            $scope.pageList = resp;
            addBinary($scope.pageList);
            vm.totalPart = $scope.pageList.pageParts.length;
    	    removeKeys($scope.pageList);
            spliteColumns($scope.pageList);

            $log.debug(vm.currentPart);
            //$log.debug($scope.pageList.pageParts[vm.currentPart].section.fdata);

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
            vm.activeSong = payload;
            vm.activeSong.active = true;
            if(vm.activeSong.currentSectionId != null){
                $scope.pageList.pageParts.forEach(function(entry) {
                    // TODO test what type of data
                    $log.debug(entry.section);
                    if(entry.section.id == vm.activeSong.currentSectionId){
                        $scope.$apply(function () {
                           vm.activeSong.section = entry.section;
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
            SectionCashService.updatePageListCach($scope.pageList.id, $scope.pageList.pageParts[vm.currentPart].section.id, false);
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

    	function nextData(index) {
    		vm.currentPart = vm.currentPart + index;
    		if(vm.currentPart == vm.totalPart){
    			vm.currentPart = 0;
    		}else if(vm.currentPart < 0){
    			vm.currentPart = vm.totalPart-1;
    		}
            updateCash();
      	}

    	function nextPage(index) {
    		vm.currentPage = vm.currentPage + index;
    		if(vm.currentPage >= $scope.pageList.pageParts[vm.currentPart].section.objects.length){
    			vm.currentPage = 0;
    		}else if(vm.currentPage < 0){
    			vm.currentPage = $scope.pageList.pageParts[vm.currentPart].section.objects.length-1;
    		}
      	}

        function updateSongList(songListId, item){
            PageService.removeSectionInList(songListId, item).$promise.then( function(resp) {
                      $log.debug(resp);
                      PageService.addSectionToList(songListId, item.section).$promise.then( function(resp) {
                                    $log.debug(resp);
                                });
                  });
        }

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