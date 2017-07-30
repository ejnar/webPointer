'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SongItemtCtrl', SongItemtCtrl);
    SongItemtCtrl.$inject = ['$scope', '$location', '$filter', '$log', '$mdDialog', 'song', 'PageListApi', 'SectionsApi', 'PageService'];

    function SongItemtCtrl($scope, $location, $filter, $log, $mdDialog, song, PageListApi, SectionsApi, PageService) {

    	init();
    	function init () {
            $log.debug(' --- SongItemtCtrl.init ' + song.id);
//            $log.debug(song);
            $scope.selectedSongLists = [];
            $scope.song = song;
            PageListApi.list2().$promise
                .then( function(resp) {
                    $log.debug(resp);
                    $scope.songLists = resp;
                    initSelectedSongLists(resp, $scope.selectedSongLists );
                });

        }

        $scope.songItemtCtrl_selectedSongList = function() {
            $log.debug(' --- SongItemtCtrl.songItemtCtrl_selectedSongList ');
            $log.debug($scope.song);
            $log.debug($scope.selectedSongLists);
            angular.forEach($scope.selectedSongLists, function(s) {
                if(!s.selected){
                    PageService.addSectionToList(s.id, $scope.song).$promise
                        .then( function(resp) {
                            $log.debug(resp);
                            s.pageParts.push(resp);

                            $log.debug($scope.selectedSongLists);
                        });
                    s.selected = true;
                }
            });
            findRemovedSongInList($scope.song,$scope.songLists,$scope.selectedSongLists);
        };

        function findRemovedSongInList(song,songLists,selectedSongLists){
            $log.debug('findSongInList');
            angular.forEach(songLists, function(i) {
                var found = i.pageParts.filter(function (p) {
                    return p.section.id == song.id;
                });
                 $log.debug(found);
                if(found.length){
                    var foundSelected = $filter('filter')(selectedSongLists, { id: i.id });
                    $log.debug(' reminded: ',foundSelected);
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

        $scope.cancel = function() {
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