'use strict';

/* Controllers */

var module = angular.module('webpoint.screen');

    module.controller('SongListCtrl', SongListCtrl);
    SongListCtrl.$inject = ['$scope', '$location', '$log', '$mdDialog', 'cfgScreenPath',
        '$filter', 'SectionsApi', '$timeout'];

    function SongListCtrl ($scope, $location, $log, $mdDialog, cfgScreenPath,
        $filter, SectionsApi, $timeout) {

        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        var alphabeticalList = [];

        $scope.alphabeticalList = alphabeticalList;

    	init();
    	function init () {
            $log.debug(' --- SongListCtrl.init ');
            SectionsApi.cachedList({max:1000,publish:true}).$promise
                .then(function(resp) {
                    $log.debug(resp);
                    $scope.songs = resp;
                    createAlphabeticalList (resp);
                });
        }

        var MATCH_NO_LETTER = new RegExp("[a-zA-Z]", "i");
        function createAlphabeticalList (list) {
            $log.debug(' --- createAlphabeticalList :');
            var listObj = {};
            alphabet.forEach(function(c) {
                listObj = {};
                listObj.letter = c.toUpperCase();
                listObj.list = $filter('filter')(list, function(song) {
                                    return song.title.toLowerCase().indexOf(c) == 0;
                                });
                if(listObj.list.length > 0){
                    alphabeticalList.push(listObj);
                }
            });
            var other = $filter('filter')(list, function(song) {
                var m = song.title.substring(0,1);
                return m.match(MATCH_NO_LETTER) == null;
            });
            listObj = {};
            listObj.letter = 'Other';
            listObj.list = other;
            alphabeticalList.push(listObj);
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

        // In this example, we set up our model using a plain object.
        // Using a class works too. All that matters is that we implement
        // getItemAtIndex and getLength.
        $scope.infiniteItems = {
          numLoaded_: 0,
          toLoad_: 0,

          // Required.
          getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
              this.fetchMoreItems_(index);
              return null;
            }

            return index;
          },

          // Required.
          // For infinite scroll behavior, we always return a slightly higher
          // number than the previously loaded items.
          getLength: function() {
            return this.numLoaded_ + 3;
          },

          fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            if (this.toLoad_ < index) {
              this.toLoad_ += 50;

              $timeout(angular.noop, 300).then(angular.bind(this, function() {
                this.numLoaded_ = this.toLoad_;
              }));
            }
          }
        };
    }

var module = angular.module('webpoint.screen');

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

//            getItemAtIndex: function (index) {
//                $log.debug('getItemAtIndex: ', index);
//                if (!this.hold) {
//                    if (index > this.numLoaded_) {
//                        this.fetchMoreItems_(index);
//                        return null;
//                    }
//                }
//                return this.items[index];
//            },
//
//            getLength: function () {
//                $log.debug('getLength');
//                if (this.stop_) {
//                    return this.items.length;
//                }
//                return this.numLoaded_ + 10;
//            },

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


//                    this.hold = true;
//                    this.toLoad_ += 5;
//
//                    var start = this.numLoaded_;
//                    if (start > 0) start++;
//
////                    MyService.getData(parameters)
//                    SectionsApi.list({max:10}).$promise
//                     .then(angular.bind(this, function (obj) {
//                     $log.debug(obj);
//
//                      if (obj && obj.length > 0) {
//                        vm.elements = obj.length;
//                        this.items = this.items.concat(obj);
//
//                        if (obj.length < this.toLoad_) {
//                            this.stop_ = true;
//                        }
//                        this.numLoaded_ = this.items.length;
//                        this.hold = false;
//
//                      } else { // if no data
//                        vm.elements = 0;
//                      }

//                     if (obj && obj.elements > 0) {
//                        vm.elements = obj.elements;
//                        this.items = this.items.concat(obj.data);
//
//                        if (obj.elements < this.toLoad_) {
//                            this.stop_ = true;
//                        }
//                        this.numLoaded_ = this.items.length;
//                        this.hold = false;
//
//                      } else { // if no data
//                        vm.elements = 0;
//                      }
//                    });


                }
            }
        }



    }

