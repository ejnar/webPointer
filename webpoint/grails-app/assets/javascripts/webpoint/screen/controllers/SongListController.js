'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SongListCtrl', SongListCtrl);
    SongListCtrl.$inject = ['$scope', '$location', '$log', '$mdDialog', 'cfgScreenPath',
        '$filter', 'SectionsApi', '$timeout', 'SettingService', 'PageListApi', 'PageService', 'Access', 'CashService'];

    function SongListCtrl ($scope, $location, $log, $mdDialog, cfgScreenPath,
        $filter, SectionsApi, $timeout, SettingService, PageListApi, PageService, Access, CashService) {

        var vm = this;
        var MATCH_LETTER = "abcdefghijklmnopqrstuvwxyzåäö".split("");
        var MATCH_NUMBER = new RegExp("[0-9]", "i");
        var MATCH_NO_LETTER = new RegExp("[a-z0-9åäö]", "i");
        var alphabeticalList = [];
        var songList = [];

        vm.taggs = [];
        vm.langs = [];
        vm.search = '';
        vm.currentTagg = '';
        vm.currentLang = '';
        vm.searchByFreeText = searchByFreeText;
        vm.showAdvanced = showAdvanced;
        vm.searchByTagg = searchByTagg;
        vm.searchByLang = searchByLang;
        vm.toggleTabPanel = toggleTabPanel;
        vm.selectedSongListChange = selectedSongListChange;
        vm.addToSongList = addToSongList;
        vm.removeToSongList = removeToSongList;
        vm.activeTabPanel = false;
        vm.onlyView = Access.isViewer();

    	function init () {
            $log.debug(' --- SongListCtrl.init ');
            SettingService.getLang(vm);
            SettingService.getTagg(vm);
            SectionsApi.list({max:1000,publish:true}).$promise
                .then(function(resp) {
                    //$log.debug(resp);
                    songList = resp;
                    createAlphabeticalList (resp);
                });
            console.info(vm.langs);
        }

        function createAlphabeticalList (list) {
            $log.debug(' --- createAlphabeticalList :');
            if(!list) { return; }
            initSelectedSongList(list);
            alphabeticalList = [];
            var nrList = $filter('filter')(list, function(song) {
                var m = song.title.substring(0,1);
                return m.match(MATCH_NUMBER) != null;
            });
            createListObj('0-9', nrList);

            MATCH_LETTER.forEach(function(c) {
                var charList = $filter('filter')(list, function(song) {
                                    return song.title.toLowerCase().indexOf(c) == 0;
                                });
                createListObj(c.toUpperCase(), charList);
            });
            var otherList = $filter('filter')(list, function(song) {
                var m = song.title.substring(0,1);
                return m.match(MATCH_NO_LETTER) == null;
            });
            createListObj('Other', otherList);
            vm.alphabeticalList = alphabeticalList;
        }

        function initSelectedSongList(list){
            $log.debug(' --- initSelectedSongList :');
            vm.selectedSongList = CashService.getSessionStorage("selectedSongList");
            if(!vm.selectedSongList){
                return;
            }
            angular.forEach(list, function(s) {
                var found = vm.selectedSongList.pageParts.filter(function (p) {
                    return p.section.id == s.id;
                }).length;
                s.selected = false;
                if(found > 0){
                    s.selected = true;
                }
            });
        }

        function createListObj (category, list) {
            if(list.length > 0){
                var listObj = {};
                listObj.letter = category;
                listObj.list = list;
                alphabeticalList.push(listObj);
            }
        }

        function selectedSongListChange(){
            // cache list
            // vm.selectedSongList
            CashService.setSessionStorage("selectedSongList", vm.selectedSongList);
            createAlphabeticalList (songList);
        }

        function addToSongList(song){
            PageService.addSectionToList(vm.selectedSongList.id, song).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    song.selected = true;
                    vm.selectedSongList.pageParts.push(resp);
                    CashService.setSessionStorage("selectedSongList", vm.selectedSongList);
                });
        }

        function removeToSongList(song){
            var item;
            var index;
            for(var i=0; i < vm.selectedSongList.pageParts.length; i++){
                item = vm.selectedSongList.pageParts[i];
                if(song.id == item.section.id){
                    index = i;
                    break;
                }
            }
            PageService.removeSectionInList(vm.selectedSongList.id, item).$promise
                .then( function(resp) {
                    $log.debug(resp);
                    song.selected = false;
                });
            if(index > -1) {
                vm.selectedSongList.pageParts.splice(index, 1);
                CashService.setSessionStorage("selectedSongList", vm.selectedSongList);
            }
        }

        function searchByFreeText () {
            var filterList = $filter('filter')(songList, vm.search);
            createAlphabeticalList (filterList);
        }

        function searchByTagg (){
            if(vm.currentTagg) {
                var filterList = $filter('filter')(songList, function(s) {
                    if(s && s.taggs){
                        var index = s.taggs.indexOf(vm.currentTagg);
                        if(index > -1) { return true;}
                        else { return false; }
                    } else { return false; }
                });
                createAlphabeticalList (filterList);
            } else {
                createAlphabeticalList (songList);
            }
        }

        function searchByLang (){
            if(vm.currentLang) {
                var filterList = $filter('filter')(songList, function(s) {
                    if(s.language === vm.currentLang) { return true;}
                    else { return false; }
                });
                createAlphabeticalList (filterList);
            }else {
                createAlphabeticalList (songList);
            }
        }

        function toggleTabPanel() {
           $log.debug(' --- toggleTabPanel :');
           var e = document.getElementById('tabPanel');
           if(vm.activeTabPanel) {
             vm.activeTabPanel = false;
             vm.search = '';
             vm.currentTagg = '';
             createAlphabeticalList (songList);
           } else {
              getSongLists();
              vm.activeTabPanel = true;
           }
        }

        function getSongLists() {
            PageListApi.list2().$promise
                .then( function(resp) {
                    //$log.debug(resp);
                    vm.songLists = resp;
                });
        }

        function showAdvanced (ev,s) {
            $mdDialog.show({
              controller: SongItemCtrl,
              templateUrl: '/webpoint/screen/songDialog.html',
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen,
              locals : {
                song : s
              }
            });
        }
        init();
    }


    module.controller('SongVirtualListCtrl', SongVirtualListCtrl);
    SongVirtualListCtrl.$inject = ['$scope', '$location', '$log', '$timeout',
        '$mdDialog', 'cfgScreenPath', '$filter', 'SectionsApi'];

    function SongVirtualListCtrl ($scope, $location, $log, $timeout,
        $mdDialog, cfgScreenPath, $filter, SectionsApi) {
        var vm = this;
        $log.debug('SongVirtualListCtrl');

        vm.elements = null;
        vm.infiniteItems = { // Start of infinte logic

            stop_: false,
            hold: false,
            numLoaded_: 0,
            toLoad_: 0,
            items: [],

            refresh: function() {
                $log.debug('refresh');
                this.stop_ = false;
                this.hold = false;
                this.numLoaded_ = 0;
                this.toLoad_ = 0;
                this.items = [];
            },
            getItemAtIndex: function(index) {
                if (index > this.numLoaded_) {
                  this.fetchMoreItems_(index);
                  return null;
                }

                return index;
            },
            getLength: function() {
                return this.numLoaded_ + 5;
            },

            fetchMoreItems_: function (index) {
                $log.debug('fetchMoreItems_: ', index);

                if (this.toLoad_ < index) {

                    this.toLoad_ += 20;
                      $timeout(angular.noop, 30).then(angular.bind(this, function() {
                        this.numLoaded_ = this.toLoad_;
                      }));
                }
            }
        }



    }

