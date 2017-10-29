'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SongItemtCtrl', SongItemtCtrl);
    SongItemtCtrl.$inject = ['$scope', '$location', '$filter', '$log', '$mdDialog', 'song', 'localStorageService', 'cfgScreenPath',
        'PageListApi', 'SectionsApi', 'PageService', 'BinaryApi', 'SectionCashService'];

    function SongItemtCtrl($scope, $location, $filter, $log, $mdDialog, song, localStorageService, cfgScreenPath,
        PageListApi, SectionsApi, PageService, BinaryApi, SectionCashService) {

        $scope.cancel = cancel;
        $scope.vyCtrl_print = print;
        $scope.vyCtrl_printExcludeKeys = printExcludeKeys;

        (function init() {
             load ();
        })();
    	function load () {
            $log.debug(' --- SongItemtCtrl.init ' + song.id);
//            $log.debug(song);
            $scope.selectedSongLists = [];
            $scope.song = song;
            addBinary($scope.song);
            PageListApi.list2().$promise
                .then( function(resp) {
//                    $log.debug(resp);
                    $scope.songLists = resp;
                    initSelectedSongLists(resp, $scope.selectedSongLists );
                });
            spliteColumns();
        }

        $scope.songItemtCtrl_selectedSongList = function() {
            $log.debug(' --- SongItemtCtrl.songItemtCtrl_selectedSongList ');
            angular.forEach($scope.selectedSongLists, function(s) {
                if(!s.selected){
                    SectionCashService.updatePageListCach(s.id, null, true);
                    PageService.addSectionToList(s.id, $scope.song).$promise
                        .then( function(resp) {
                            $log.debug(resp);
                            s.pageParts.push(resp);
                        });
                    s.selected = true;
                }
            });
            findRemovedSongInList($scope.song,$scope.songLists,$scope.selectedSongLists);
        };

        function print () {
            $log.debug("Go to print page: " + $scope.currentPart );
            localStorageService.set('printout', $scope.song);
            $location.path(cfgScreenPath.print);
            cancel ();
        }

        function printExcludeKeys () {
            $scope.song.withoutkeys = true
            print ();
        }

        function addBinary(section){
            if(section.type == 'IMAGE'){
                section.binary = BinaryApi.get({Id: section.id}).$promise
            }
        }

        function findRemovedSongInList(song,songLists,selectedSongLists){
            angular.forEach(songLists, function(i) {
                var found = i.pageParts.filter(function (p) {
                    return p.section.id == song.id;
                });
                 $log.debug(found);
                if(found.length){
                    var foundSelected = $filter('filter')(selectedSongLists, { id: i.id });
                    if(!foundSelected.length){
                        PageService.removeSectionInList(i.id, found[0]);
                    }
                }
            });
        }

        function initSelectedSongLists(songLists, selectedSongLists){
            angular.forEach(songLists, function(i) {
                var found = i.pageParts.filter(function (p) {
                    return p.section.id == song.id;
                }).length;
                i.selected = false;
                if(found > 0){
                    i.selected = true;
                    $scope.selectedSongLists.push(i);
                }
            });
        }

        function spliteColumns() {

            var columns = $scope.song.data.split('-column2-');
            if(columns.length > 1){
                $scope.song.fdata = '<div class="vyColumn">';
                $scope.song.fdata += '<p>' + columns[0] + '</p>';
                $scope.song.fdata += '</div>';

                $scope.song.fdata += '<div class="vyColumn">';
                $scope.song.fdata += '<p>' + columns[1] + '</p>';
                $scope.song.fdata += '</div>';
            }else{
                $scope.song.fdata = '<p>' + $scope.song.data + '</p>';
            }

        }

        function cancel () {
              $mdDialog.cancel();
              var getLocation = function(href) {
                  var l = document.createElement("a");
                  l.href = href;
                  return l;
              };
        };

        $scope.hostname = function(href) {
            var l = document.createElement("a");
            l.href = href;
            return l.hostname;
        };

    }


    function hostname (href) {
            var l = document.createElement("a");
            l.href = href;
            return l.hostname;
    }