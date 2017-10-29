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
            $log.debug(value);

            var arr = localStorageService.get(key);
            arr = $filter('orderBy')(arr, 'time');
            var arr = removeOldItem(arr, value, storageSize);
            $log.debug(arr);

            var cashObj = {name: value.name, obj: value, time: new Date()};
            arr.push(cashObj);
            localStorageService.set(key, arr);
    //        $log.debug(arr);
        };

        this.pop = function (key,id,expiredDays){
            return this.pop(key,id,expiredDays,null);
        }

        this.pop = function (key,id,expiredDays,def) {
            $log.debug(' --- CashService.pop: ', id);
            var obj = null;
            var arr = localStorageService.get(key);

            if(arr){
                arr.forEach(function(entry) {
                    if(entry.obj.id == id) {
                        if(!isExpired(entry.time, expiredDays) || expiredDays == null || expiredDays < 1){
                            obj = entry;
                        }
                    }
                });
            }
            return obj != null ? obj.obj : def;
        };

        this.clean = function () {
            $log.debug('Clean all');
            localStorageService.clearAll();
        };

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

        this.getSessionStorage = function (key,def){
            var val = localStorageService.get(key, 'sessionStorage');
            return val != null ? val : def;
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

    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // a and b are javascript Date objects
    // var remainingDays    = dateDiffInDays(a, b);
    function dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
    }
    function isExpired(date, days) {
        var remainingDays = dateDiffInDays(new Date(), new Date(date));
        return (remainingDays > days) ? true: false;
    }