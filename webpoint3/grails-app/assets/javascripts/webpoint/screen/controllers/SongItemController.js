'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SongItemtCtrl', SongItemtCtrl);
    SongItemtCtrl.$inject = ['$scope', '$location', '$log', '$mdDialog', 'song', 'PageListApi', 'SectionsApi'];

    function SongItemtCtrl($scope, $location, $log, $mdDialog, song, PageListApi, SectionsApi) {


    	init();
    	function init () {
            $log.debug(' --- SongItemtCtrl.init ' + song.id);
//            $log.debug(song);
            $scope.song = song;

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