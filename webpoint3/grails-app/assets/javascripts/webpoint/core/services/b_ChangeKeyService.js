'use strict';

/* Services */

var app = angular.module('webpoint.core');


app.service('b_ChangeKeyService', ['properties', '$log', function(properties, $log) {

    this.changeKey = function (section, doHtml) {
        $log.debug(' --- ChangeKeyService.ChangeKeyService:');

        $log.debug(' section: ', section)
        var data = section.data;
        var linebreak = '\n';
        var lines;
        if(doHtml){
            lines = data.split('<br />');
            linebreak = '<br />';
        }else{
            lines = data.split('\n');
        }
        var keys = properties.keys;
        var result = '';

        var changeToKeyIndex = 0;
        var keyIndex = 0;
        for(var i=0; i < keys.length; i++){
            if(keys[i] == section.key){
                keyIndex = i;
            }
            if(keys[i] == section.tokey){
                changeToKeyIndex = i;
            }
        }
        $log.debug('keyIndex: ', keyIndex);
        $log.debug('changeToKeyIndex: ', changeToKeyIndex);
        keyIndex = changeToKeyIndex - keyIndex;
        $log.debug(' -- keyIndex: ', keyIndex);

        angular.forEach(lines, function(line) {

            var ex = "\\b["+ keys + "]{1,2}";
            var keyRow = line.match(new RegExp(ex, "gi"));

            var containWord = line.match(new RegExp("\\w{2,}[^"+ keys +"]\\w", "gi"));
            $log.debug(' -- containWord: ', containWord);

            var matrix = [];
            $log.debug('line: ', line);
            if(keyRow != null && keyRow.length >= 0 && containWord == null){
                $log.debug('match1: ', keyRow);
                angular.forEach(keyRow, function(key) {
                    $log.debug('key1: ', key);
                    for(var i=0; i < keys.length; i++){
                        var keyArr = keys[i].split(':');
                        for(var j=0; j < keyArr.length; j++){
                            var k = keyArr[j];
                            if(k == key){
                                $log.debug(' i : ', i );
                                $log.debug(' length : ', keys.length);
                                var kindex = 0;
                                if(i+keyIndex < 0){
                                    kindex = keys.length + (i+keyIndex);
                                    $log.debug(' 1 kindex: ', kindex);
                                }else if(i+keyIndex > (keys.length -1)){
                                    kindex = (i+keyIndex) - (keys.length);
                                    $log.debug(' 2 kindex: ', kindex);
                                }else{
                                    kindex = i+keyIndex;
                                    $log.debug(' 3 kindex: ', kindex);
                                }

                                var a = [];
                                a[0] = k
                                a[1] = keys[kindex].split(':')[j];
                                a[2] = i;
                                a[3] = kindex;
                                a[4] = j;
                                a[5] = line.indexOf(k);
                                matrix.push(a);
                                $log.debug('--  found key: ', keys[i] + ':' + i);
                                $log.debug('--  new key: ', keys[kindex] + ':' + kindex);
                            }
                        }
                    }
                });
                $log.debug('---------------------: ');
                angular.forEach(matrix, function(keeys) {
                    $log.debug('----- keeys: ', keeys);

                    var len = keeys[0].length;
                    $log.debug('-- len: ', len);

                    if(keeys[0].length > 1 && keeys[1].length < 2){
                        line = line.replaceAt(keeys[5], ' ' + keeys[1]);
                        $log.debug(' first 0 : ', keeys[0].length);
                        $log.debug(' first 1  : ', keeys[1].length);
                    }else if(keeys[0].length < 2 && keeys[1].length > 1){
                        line = line.replaceAt(keeys[5]-1, keeys[1]);
                        $log.debug(' second 0 : ', keeys[0].length);
                        $log.debug(' second 1  : ', keeys[1].length);
                    }else{
                        line = line.replaceAt(keeys[5], keeys[1]);
                        $log.debug(' thired 0 : ', keeys[0].length);
                        $log.debug(' thired 1  : ', keeys[1].length);
                    }
                    $log.debug(' line: ', line);
                    $log.debug('--------------');
                });
                $log.debug('-- found key row1: ', line);
                $log.debug('--------------------------');
            }
            result += line + linebreak;
        });
        return result;
    }
}]);