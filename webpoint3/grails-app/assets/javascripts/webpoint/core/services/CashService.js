'use strict';

/* Services */

var app = angular.module('webpoint.core');


    app.service('CashService', CashService);
    CashService.$inject = ['localStorageService', 'properties', '$log', '$filter'];

    function CashService (localStorageService, properties, $log, $filter) {

        this.stash = function (key, value) {
            this.stash(key, value, 3);
        }


        this.stash = function (key, value, storageSize) {
            $log.debug(' --- CashService.stash: ', key);

            var arr = localStorageService.get(key);
            arr = $filter('orderBy')(arr, 'time');
            var arr = removeOldItem(arr, value, storageSize);
            $log.debug(arr);

            var cashObj = {name: value.name, obj: value, time: new Date()};
            arr.push(cashObj);
            localStorageService.set(key, arr);
    //        $log.debug(arr);
        };

        this.pop = function (key,id) {
            $log.debug(' --- CashService.pop: ', id);
            var obj = null;
            var arr = localStorageService.get(key);
            if(arr){
                arr.forEach(function(entry) {
                    if(entry.obj.id == id) {
                        obj = entry;
                    }
                });
            }
            return obj != null ? obj.obj : null;
        }

        this.clean = function () {
            $log.debug('Clean all');
            localStorageService.clearAll();
        }

        this.setStorage = function (key, val){
            localStorageService.set(key, val);
        };

        this.getStorage = function (key){
            if(!key) return;
            return localStorageService.get(key);
        };


        this.setSessionStorage = function (key, val){
            localStorageService.set(key, val, 'sessionStorage');
        };

        this.getSessionStorage = function (key){
            return localStorageService.get(key, 'sessionStorage');
        };

    }

    function removeOldItem(localStorageArr,value,storageSize){
        var timeStamp_cash = 0, timeStamp_entry;
        if(!localStorageArr){
            return [];
        }
        var i = localStorageArr.length;
        while (i--){
            if (localStorageArr[i].obj.id == value.id){
                localStorageArr.splice(i, 1);
            }
        }
        var count = localStorageArr.length - storageSize;
        localStorageArr.splice(0, count);

        return localStorageArr;
    }