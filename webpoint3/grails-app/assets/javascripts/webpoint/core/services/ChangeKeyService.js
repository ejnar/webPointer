'use strict';

/* Services */

var app = angular.module('webpoint.core');


app.service('ChangeKeyService', ['properties', '$log', function(properties, $log) {

    this.changeKey = function (section, doHtml) {
        $log.debug(' --- ChangeKeyService.ChangeKeyService:');
//        $log.debug(' section: ', section);
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
        $log.debug('keys: ', keys);

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
        $log.debug(' - keyIndex diff: ', keyIndex);

        var result = '';
        for(var l=0; l < lines.length; l++){
            var line = lines[l];
            $log.debug(' --- line: ', line);
            var keyRow = line.match(new RegExp("\\b["+ keys + "]{1,2}", "gi"));
            var containWord = line.match(new RegExp("\\w{2,}[^"+ keys + ",' ']\\w", "gi"));
            $log.debug(' --- keyRow: ', keyRow);
            $log.debug(' --- wordRow: ', containWord);

            if(keyRow != null && keyRow.length > 0){
                var isKeyRow = false;
                if(containWord != null){
                    var keyPrefix = ['sus', 'maj'];
                    for(var i=0; i < containWord.length; i++){
                        $log.debug(' --- containWord[i]: ', containWord[i]);
                        var word = containWord[i].match(new RegExp("\\w{3}["+ keyPrefix + "]\\w", "gi"));
                        $log.debug(' ----- word: ', word);
                        if(word != null){
                            isKeyRow = true;
                            break;
                        }
                    }
                }

                var matrix = [];
                if((containWord == null) || (containWord != null && isKeyRow) ){
                    $log.debug(' - match keyRow and wordRow' );
                    var last = 0;
//                    angular.forEach(keyRow, function(key) {
                    for(var k=0; k < keyRow.length; k++){
                        var key = keyRow[k];
                        $log.debug(' - key: ', key);
                        key = key.removeLast('/');

                        for(var i=0; i < keys.length; i++){
                            var keyArr = keys[i].split(':');
                            for(var j=0; j < keyArr.length; j++){
                                if(keyArr[j] == key){
                                    var newKeyindex = 0;
                                    if(i+keyIndex < 0){
                                        newKeyindex = keys.length + (i+keyIndex);
                                        $log.debug(' --- 1 newKeyindex: ', newKeyindex);
                                    }else if(i+keyIndex > (keys.length -1)){
                                        newKeyindex = (i+keyIndex) - (keys.length);
                                        $log.debug(' --- 2 newKeyindex: ', newKeyindex);
                                    }else{
                                        newKeyindex = i+keyIndex;
                                        $log.debug(' --- 3 newKeyindex: ', newKeyindex);
                                    }

                                    var a = [];
                                    a[0] = keyArr[j];
                                    a[1] = keys[newKeyindex].split(':')[j];
                                    a[2] = last = line.indexLastOf(last, keyArr[j]);
                                    a[3] = i;
                                    a[4] = newKeyindex;
                                    a[5] = j;

                                    matrix.push(a);
                                    $log.debug(' -----  found key: ', keys[i] + ':' + i);
                                    $log.debug(' -----  new key: ', keys[newKeyindex] + ':' + newKeyindex);
                                    break;
                                }
                            }
                        }
                    }
                    $log.debug('---------------------: ');
                    for(var i=0; i < matrix.length; i++){
                        var keeys = matrix[i];
                        $log.debug(' - keeys: ', keeys);

                        var slash = '';
                        if(line.charAt(keeys[2]-1) == '/' && keeys[1].length > 1) slash = '/';
                        $log.debug(' - slash: ', line.charAt(keeys[2]-1));

                        if(keeys[0].length > 1 && keeys[1].length < 2){
                            line = line.replaceAt(keeys[2], keeys[1] + ' ');  //' ' +
                            $log.debug(' --- first 0 : ', keeys[0].length);
                            $log.debug(' --- first 1  : ', keeys[1].length);
                        }else if(keeys[0].length < 2 && keeys[1].length > 1){
                            line = line.replaceAt(keeys[2]-1, slash + keeys[1]);
                            $log.debug(' --- second 0 : ', keeys[0].length);
                            $log.debug(' --- second 1  : ', keeys[1].length);
                        }else{
                            line = line.replaceAt(keeys[2], slash + keeys[1]);
                            $log.debug(' --- thired 0 : ', keeys[0].length);
                            $log.debug(' --- thired 1  : ', keeys[1].length);
                        }
                        $log.debug(' ----- line: ', line);
                    }
                    $log.debug(' ---------- found key row: ', line);
                }
            }
            result += line + linebreak;
        }
        return result;
    }
}]);