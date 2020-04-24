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

        var vm = this;

        vm.right = right;
        vm.left = left;
        vm.activeSong = {};
        vm.fontSize = {};
        vm.pageList = [];

        var tmpSong = {};
        var promiseInterval;
    	var currentPart = 0;
    	var currentPage = 0;
    	var totalPart = 1;

        (function init() {
            if(Access.isClient()){
                socket();
            }
            loadData(false);
        })();

    	function loadData(forceCleanCash) {
            $log.debug(' --- SlideShowCtrl.loadData:');
//            $log.debug($routeParams);
            if($routeParams.group){
                VyApi.get({group: $routeParams.group, pages: $routeParams.pages}).$promise
                    .then( function(resp) {
                        initSlideShow(resp);
                    });
            }else{
                var exclude = forceCleanCash ? true : CashService.getSessionStorage('excludeCache', true);
                $log.debug(' ----------------- pageList: ', exclude);
                var method = PageService.excludeCache(exclude);
                PageService.listApi [method] ({Id: $routeParams.pageListId}, function(resp) {
                        CashService.setSessionStorage('excludeCache', false);
                        initSlideShow(resp);
                    });
			}
    	}

    	function initSlideShow(resp){
            $log.debug(resp);
            vm.pageList = {};
            vm.pageList = resp;
            removeKeys(vm.pageList);
            totalPart = vm.pageList.pageParts.length;
            if(vm.pageList.pageParts){
                setActiveSong(vm.pageList.pageParts[0].section);  // <br />
            }
            addBinary(resp);
            spliteColumns(vm.pageList);
    	}

    	function setActiveSong(song){
    	    $log.debug(song);
    	    if($routeParams.withoutkeys){
    	        setFontSize(song, '\n');
    	    } else {
    	        setFontSize(song, '<br />');
    	    }
    	    vm.activeSong.section = song;
    	}

        function setFontSize(section,delimeter){
            var len = 0;
            var lines = section.data.split(delimeter);
            lines.forEach(function(line) {
                 if(len < line.length){
                    len = line.length
                    //$log.debug(len);
                    //$log.debug(line);
                 }
            });
            var size = (82 - len) / 10;
            size = size < 3 ? 3:size;
            $log.debug(size);
            vm.fontSize = {"font-size" : size+"vw" };
        }

        function removeKeys(pageList) {
            if($routeParams.withoutkeys){
                for(var i=0; i < pageList.pageParts.length; i++){
                    var part = pageList.pageParts[i];
                    pageList.pageParts[i].section.data = RemoveKeyService.removeValidKeyRows(true,pageList.pageParts[i].section.data);
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
            $log.debug(payload);
            tmpSong = payload;
            tmpSong.active = true;
            if (tmpSong.refresh == 'true') {
                $log.debug('payload');
                loadData(true);
            }else if(tmpSong.currentSectionId != null) {
                $log.debug('vm.pageList');
                applySong();
            }

        }

        function applySong(){
           vm.pageList.pageParts.forEach(function(entry) {
                // TODO test what type of data
                if(entry.section.id == tmpSong.currentSectionId){
                    $log.debug('entry.section');
                    $scope.$apply(function () {
                       tmpSong.section = entry.section;
                       currentPage = entry.counter;
                       document.getElementById("snackbar").innerHTML = tmpSong.section.title;
                       document.getElementById("snackbar").className = "show";
                    });
                    showDelay();
                }
            });
        }

        var oneTimer;
        function showDelay(){
            $interval.cancel(oneTimer);
            oneTimer = $interval(function() {
              if(document.getElementById("snackbar") != null){
                document.getElementById("snackbar").className = "";
              }
              vm.activeSong = tmpSong;
              $interval.cancel(oneTimer);
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
            SectionCashService.updatePageListCach(vm.pageList.id, vm.pageList.pageParts[currentPart].section.id, false);
        }

    	function right() {
    		nextData(1);
    	};

    	function left() {
    		nextData(-1);
    	};

        function nextData(index) {
    		currentPart = currentPart + index;
    		if(currentPart == totalPart){
    			currentPart = 0;
    		}else if(currentPart < 0){
    			currentPart = totalPart-1;
    		}
    		angular.forEach(vm.pageList.pageParts, function(s) {
                if(currentPart === s.counter){
                    setActiveSong(s.section, '\n');
                }
            });
            updateCash();



      	};

        $scope.vyCtrl_goBack = function(){
            $location.path(cfgScreenPath.pagelist);
        };

//        init();
    }