'use strict';

/* Services */

var app = angular.module('webpoint.core');


app.service('ChangeKeyService', ['properties', '$log', function(properties, $log) {

    this.isKeyRow = function (containWord) {
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
        return isKeyRow;
    };

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
            var keyRow = line.matchKeyRow(keys);
            var containWord = line.matchContainWord(keys);
            $log.debug(' --- keyRow: ', keyRow);
            $log.debug(' --- containWord: ', containWord);

            var matrix = [];

            var isKeyRow = this.isKeyRow(containWord);
            if((keyRow != null && keyRow.length > 0) && ( (containWord == null) || (containWord != null && isKeyRow) )){
                var last = -1;
                for(var k=0; k < keyRow.length; k++){
                    var key = keyRow[k];
                    key = key.removeLast('/');

                    for(var i=0; i < keys.length; i++){
                        var keyArr = keys[i].split(':');
                        for(var j=0; j < keyArr.length; j++){
                            if(keyArr[j] == key){
                                var newKeyindex = 0;
                                if(i+keyIndex < 0){
                                    newKeyindex = keys.length + (i+keyIndex);
                                }else if(i+keyIndex > (keys.length -1)){
                                    newKeyindex = (i+keyIndex) - (keys.length);
                                }else{
                                    newKeyindex = i+keyIndex;
                                }

                                var a = [];
                                a[0] = keyArr[j];
                                a[1] = getIndexValue(keys[newKeyindex], j);    //keys[newKeyindex].split(':')[j];
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
                    try{
                        line = replaceAt(line, keeys[2], keeys[1], keeys[0]);
                    }catch(err){ $log.debug(' ----- ERROR '); }
                    $log.debug(' ----- line: ', line);
                }
                $log.debug(' ---------- found key row: ', line);
            }
            result += line + linebreak;
        }
        return result;
    };
}]);

String.prototype.matchKeyRow = function(keys) {
    return this.match(new RegExp("\\b["+ keys + "]{1,2}", "gi"));
};
String.prototype.matchContainWord = function(keys) {
    return this.match(new RegExp("\\w{2,}[^"+ keys + ",'/',' ']\\w", "gi"));
};


function replaceAt(str, index, newChar, oldChar){
    var nChar = newChar;
    var offset = newChar.length;
    if(newChar.length == 1 && oldChar.length > 1){
        offset = 2;
    }else if(newChar.length > 1 && oldChar.length == 1){
        offset = 1;
    }
    var slash = (str.indexOf('/', index-1) == index) ? 1 : 0;
    var str1 = str.substr(0, index + slash);
    var str2 = str.substr((index + offset) + slash);
//    console.log(str1);
//    console.log(str2);
    if(newChar.length > 1 && oldChar.length == 1){
        var firstSpace = str2.indexOf(' ');
        var s1 = str2.substr(0, firstSpace);
        var s2 = str2.substr(firstSpace+1);
        str2 = s1 + s2;
    }else if(newChar.length == 1 && oldChar.length > 1){
        if(str2.indexOf('/') == 0){
            nChar = ' ' + newChar;
        }
        else{
            var firstSpace = str2.indexOf(' ');
            str2 = str2.insertAt(firstSpace, ' ');
        }
        console.log(str2);
    }
    return str1 + nChar + str2;
}
function getIndexValue(arr, i){
    var sA = arr.split(':');
    if(sA.length > 1){ return sA[i]; }
    else { return sA[0];}
}