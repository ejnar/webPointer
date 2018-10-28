'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SlideShowCtrl', SlideShowCtrl);  // '$timeout'
    SlideShowCtrl.$inject = ['$scope', '$routeParams', '$location', '$timeout', '$mdSidenav', '$log', 'cfgScreenPath', '$interval',
                      '$mdDialog', 'properties', 'ChangeKeyService', 'VyApi', 'localStorageService', 'PageService',
                      'Access', 'CashService', 'RemoveKeyService', 'SectionCashService', 'BinaryApi', '$stomp'];

    function SlideShowCtrl ($scope, $routeParams, $location, $timeout, $mdSidenav, $log, cfgScreenPath, $interval,
                     $mdDialog, properties, ChangeKeyService, VyApi, localStorageService, PageService,
                    Access, CashService, RemoveKeyService, SectionCashService, BinaryApi, $stomp) {
        var promiseInterval;
    	$scope.currentPart = 0;
    	$scope.currentPage = 0;
    	$scope.totalPart = 1;

        (function init() {
            if(Access.isClient()){
                socket();
            }
            $scope.activeSong = {};
            $scope.tmpSong = {};
            loadData();
        })();

    	function loadData() {
            $log.debug(' --- SlideShowCtrl.loadData:');
//            $log.debug($routeParams);
            if($routeParams.group){
                VyApi.get({group: $routeParams.group, pages: $routeParams.pages}).$promise
                    .then( function(resp) {
                        initSlideShow(resp);
                    });
            }else{
                var exclude = CashService.getSessionStorage('excludeCache', true);
                $log.debug(' ----------------- pageList: ', exclude);
                var method = PageService.excludeCache(exclude);
                PageService.listApi [method] ({Id: $routeParams.pageListId}, function(resp) {
                        CashService.setSessionStorage('excludeCache', false);
                        initSlideShow(resp);
                    });
			}
    	};

    	function initSlideShow(resp){
            $log.debug(resp);
            $scope.pageList = resp;
            addBinary($scope.pageList);
            $scope.totalPart = $scope.pageList.pageParts.length;
            if($scope.pageList.pageParts){
                $scope.activeSong.section = $scope.pageList.pageParts[0].section;
            }
    	    removeKeys($scope.pageList);
            spliteColumns($scope.pageList);
    	}
        function removeKeys(pageList) {
            if($routeParams.withoutkeys){
                for(var i=0; i < pageList.pageParts.length; i++){
                    var part = pageList.pageParts[i];
                    pageList.pageParts[i].section.data = RemoveKeyService.removeKeys(true,pageList.pageParts[i].section.data);
                }
            }
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
                                                                                                           
        function socket() {
            $stomp.setDebug(function (args) { $log.debug(args) });
            var headers = { login: 'songpoint', passcode: 'qwerty', pageListId: $routeParams.pageListId};
            $stomp.connect('/stomp', headers)
                .then(function (frame) {
                    var subscription = $stomp.subscribe('/topic/'+$routeParams.pageListId, function (payload, headers, res) {
//                        $log.debug(payload)
                        updateActiveSong(payload);
                    }, {'headers': 'are awesome' });
               });
        }
        function updateActiveSong(payload){
            $scope.tmpSong = payload;
            $scope.tmpSong.active = true;
            if($scope.tmpSong.currentSectionId != null){
                $log.debug($scope.pageList);
                $scope.pageList.pageParts.forEach(function(entry) {
                    // TODO test what type of data
                    if(entry.section.id == $scope.tmpSong.currentSectionId){
                        $log.debug(entry.section);
                        $scope.$apply(function () {
                           $scope.tmpSong.section = entry.section;
                           $scope.currentPage = entry.counter;
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
              $scope.activeSong = $scope.tmpSong;
            }, 2000);
        }

        $scope.$on('$destroy',function(){
            if(Access.isClient()){
                $stomp.disconnect().then(function () {
                    $log.info('disconnected')
                });
            }
        });
        function addBinary(page){
            var count = 0;
            angular.forEach(page.pageParts, function(s) {
                s.counter = count;
                if(s.section.type == 'IMAGE'){
                    s.section.binary = BinaryApi.get({Id: s.section.id}).$promise
                }
                count++;
            });
        }
        function updateCash(){
            SectionCashService.updatePageListCach($scope.pageList.id, $scope.pageList.pageParts[$scope.currentPart].section.id, false);
        }

    	$scope.slideShowCtrl_right = function() {
    		$scope.nextData(1);
    	};

    	$scope.slideShowCtrl_left = function() {
    		$scope.nextData(-1);
    	};

    	$scope.nextData = function(index) {
    		$scope.currentPart = $scope.currentPart + index;
    		if($scope.currentPart == $scope.totalPart){
    			$scope.currentPart = 0;
    		}else if($scope.currentPart < 0){
    			$scope.currentPart = $scope.totalPart-1;
    		}

    		angular.forEach($scope.pageList.pageParts, function(s) {
                if($scope.currentPart == s.counter){
                    $scope.activeSong.section = s.section;
                }
            });

            updateCash();
      	};

        $scope.vyCtrl_goBack = function(){
            $location.path(cfgScreenPath.pagelist);
        };

    }