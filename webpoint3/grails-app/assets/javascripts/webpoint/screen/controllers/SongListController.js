'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SongListCtrl', SongListCtrl);
    SongListCtrl.$inject = ['$scope', '$location', '$log', '$mdDialog', 'cfgScreenPath', 'PageListApi', 'SectionsApi'];

    function SongListCtrl ($scope, $location, $log, $mdDialog, cfgScreenPath, PageListApi, SectionsApi) {

        $scope.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");


    	init();
    	function init () {
            $log.debug(' --- SongListCtrl.init ');

            SectionsApi.list({max:1000}).$promise
                .then(function(resp) {
//                    $log.debug(resp);
                    $scope.songs = resp;
                });
        }

        $scope.songListCtrl_gotoSong = function(p) {
            $log.debug(' --- songListCtrl_gotoSong - id:', p.id );
            $location.path(cfgScreenPath.SONGITEM);
        }


        $scope.showAdvanced = function(ev,s) {

            $mdDialog.show({
              controller: SongItemtCtrl,
              templateUrl: 'static/webpoint/screen/views/songDialog.tmpl.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
              locals : {
                song : s
              }
            });
//            .then(function(answer) {
//              $scope.status = 'You said the information was "' + answer + '".';
//            }, function() {
//              $scope.status = 'You cancelled the dialog.';
//            });
          };



//       // In this example, we set up our model using a plain object.
//        // Using a class works too. All that matters is that we implement
//        // getItemAtIndex and getLength.
//        this.infiniteItems = {
//          numLoaded_: 0,
//          toLoad_: 0,
//
//          // Required.
//          getItemAtIndex: function(index) {
//            if (index > this.numLoaded_) {
//              this.fetchMoreItems_(index);
//              return null;
//            }
//
//            return index;
//          },
//
//          // Required.
//          // For infinite scroll behavior, we always return a slightly higher
//          // number than the previously loaded items.
//          getLength: function() {
//            return this.numLoaded_ + 5;
//          },
//
//          fetchMoreItems_: function(index) {
//            // For demo purposes, we simulate loading more items with a timed
//            // promise. In real code, this function would likely contain an
//            // $http request.
//
//            if (this.toLoad_ < index) {
//              this.toLoad_ += 20;
//
//              $timeout(angular.noop, 300).then(angular.bind(this, function() {
//                this.numLoaded_ = this.toLoad_;
//              }));
//            }
//          }
//        };



//        // In this example, we set up our model using a class.
//        // Using a plain object works too. All that matters
//        // is that we implement getItemAtIndex and getLength.
//        var DynamicItems = function() {
//          /**
//           * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
//           */
//          this.loadedPages = {};
//          /** @type {number} Total number of items. */
//          this.numItems = 1;
//          /** @const {number} Number of items to fetch per request. */
//          this.PAGE_SIZE = 50;
//
//          this.fetchNumItems_();
//        };
//        // Required.
//        DynamicItems.prototype.getItemAtIndex = function(index) {
//          var pageNumber = Math.floor(index / this.PAGE_SIZE);
//          console.info('pageNumber: ', pageNumber);
//          var page = this.loadedPages[pageNumber];
//          console.info('module: ', index % this.PAGE_SIZE);
//          if (page) {
//            return page[index % this.PAGE_SIZE];
//          } else if (page !== null) {
//            this.fetchPage_(pageNumber);
//          }
//        };
//
//        // Required.
//        DynamicItems.prototype.getLength = function() {
//          return this.numItems;
//        };
//
//        DynamicItems.prototype.fetchPage_ = function(pageNumber) {
//          // Set the page to null so we know it is already being fetched.
//          this.loadedPages[pageNumber] = null;
//          this.loadedPages[pageNumber] = SectionsApi.list();
//
////          if (this.toLoad_ < index) {
////            this.toLoad_ += 5;
////
////
////            $http.get('items.json').then(angular.bind(this, function (obj) {
////                this.items = this.items.concat(obj.data);
////                this.numLoaded_ = this.toLoad_;
////            }));
////          }
//
//        };
//
//        DynamicItems.prototype.fetchNumItems_ = function() {
//          // For demo purposes, we simulate loading the item count with a timed
//          // promise. In real code, this function would likely contain an
//          // $http request.
//          this.loadedPages[0] = SectionsApi.list();
//          this.numItems = 1;
////          $timeout(angular.noop, 300).then(angular.bind(this, function() {
////            this.numItems = 50000;
////          }));
//        };
//
//        $scope.dynamicItems = new DynamicItems();



    }


