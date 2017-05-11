'use strict';

/* Services */

var app = angular.module('webpoint.core');


app.service('CashService', ['localStorageService', 'properties', '$log',
    function(localStorageService, properties, $log) {

    this.stash = function (key, value) {
        $log.debug(' --- CashService.stash: ', key);

        var arr = localStorageService.get(key);
        arr = removeOldItem(arr);

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
                if(id == entry.obj.id) {
                    var timeStamp_cash = new Date(entry.time).getTime();
                    var timeStamp_obj = new Date(entry.obj.updated ).getTime();
                    if(timeStamp_cash > timeStamp_obj){
                        obj = entry;
                    }
                }
            });
            return obj.obj;
        }
    }

    this.clean = function () {
        localStorageService.clearAll();
    }

}]);

function removeOldItem(localStorageArr){
    var timeStamp_cash = 0, timeStamp_entry;
    if(!localStorageArr){
        return [];
    }
    if(localStorageArr.length > 1){
        localStorageArr.forEach(function(entry) {
            console.log(entry);
            timeStamp_entry = new Date(entry.time).getTime();
            if(timeStamp_cash == 0) {
                timeStamp_cash = timeStamp_entry;
            }else if(timeStamp_cash > timeStamp_entry){
                timeStamp_cash = timeStamp_entry;
            }
        });
    }
    var i = localStorageArr.length;
    while (i--){
        if (localStorageArr[i].time == timeStamp_cash){
            localStorageArr.splice(i, 1);
        }
    }
    return localStorageArr;
}