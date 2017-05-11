'use strict';

/* Services */

var app = angular.module('webpoint.core');

var KEY_SUFIX = ['sus','maj','m'];
var KEYS = ['C','C#:Db','D','D#:Eb','E','F','F#:Gb','G','G#:Ab','A','A#:Bb','H:B:Cb'];
var KEYS = ['C','C#:Db','D','D#:Eb','E','F','F#:Gb','G','G#:Ab','A','A#:Bb','H:B:Cb'];
var KEYLIST = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','H','B','Cb'];

var MATCH_KEY_SUFIX = new RegExp("\\w{1}['sus','maj','m']{2}\\w", "gi");
//var MATCH_KEY_SUFIX = new RegExp("["+KEYLIST+"]+["+KEY_SUFIX+"]", "gi");
var MATCH_KEYS_REG = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]", "gi");
var MATCH_FIRST_KEYS_REG = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]", "g");
var MATCH_KEYROW_REG = new RegExp("\\b[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]{1,2}", "gi");
var MATCH_CONTAINWORD_REG = new RegExp("\\w{2,}[^C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb,/,' ']\\w", "g")

app.service('ChangeKeyService', ['properties', '$log', function(properties, $log) {

    this.foundKeyRow = function (containWord) {
        var isKeyRow = false;
        if(containWord != null){
            for(var i=0; i < containWord.length; i++){
                $log.debug(' --- containWord[i]: ', containWord[i]);
                var word = containWord[i].match(MATCH_KEY_SUFIX);
                $log.debug(' word: ', word);
                if(word != null ){
                    $log.debug(word[0].match(MATCH_KEYS_REG) + ' ------------------- word: ', word);
                    for(var j=0; j < word.length; j++){
                        isKeyRow = false;
                        if(word[j].match(MATCH_FIRST_KEYS_REG)){
                           isKeyRow = true;
                           $log.debug(' isKeyRow: ', isKeyRow);
                           $log.debug(' word[j]: ', word[j]);

                           $log.debug('MATCH_KEY_SUFIX', word[j].match(MATCH_KEY_SUFIX));
                        }
                    }
                    break;
                }
            }
        }
        return isKeyRow;
    };


    this.validKeyRow = function (line) {
        var row = null;
        $log.debug(' --- line: ', line);
        var keyRow = line.match(MATCH_KEYROW_REG);
        var containWord = line.match(MATCH_CONTAINWORD_REG);
        $log.debug(' --- keyRow: ', keyRow);
        $log.debug(' --- containWord: ', containWord);
        var isKeyRow = this.foundKeyRow(containWord);

        if((keyRow != null && keyRow.length > 0) &&
            (containWord == null || (containWord != null && isKeyRow) ))
        {
            row = keyRow;
            $log.debug(' isKeyRow: ', isKeyRow);
        }
        return row;
    };


    this.getLines = function (doHtml,data,linebreak) {
        var lines;
        if(doHtml){
            lines = data.split('<br />');
            linebreak = '<br />';
        }else{
            lines = data.split('\n');
        }
        return lines;
    }

    this.changeKey = function (section, doHtml) {
        $log.debug(' --- ChangeKeyService.changeKeyConfig:');

        var result = '';
        var data = section.data;
        var linebreak = '\n';
        var lines = this.getLines(doHtml,data,linebreak);
//        $log.debug('keys: ', KEYS);
        var changeToKeyIndex = 0;
        var keyIndex = 0;
        for(var i=0; i < KEYS.length; i++){
            if(isKeyFound(section.key, KEYS[i])){
                keyIndex = i;
            }
            if(isKeyFound(section.tokey, KEYS[i])){
                changeToKeyIndex = i;
            }
        }
        $log.debug('keyIndex: ', keyIndex);
        $log.debug('changeToKeyIndex: ', changeToKeyIndex);
        var keyDiff = changeToKeyIndex - keyIndex;
        $log.debug(' - keyDiff: ', keyDiff);

        for(var l=0; l < lines.length; l++){
            result += l != 0 ? linebreak : '';
            var line = lines[l];
            var keyRow = this.validKeyRow(line);
            if(keyRow != null){
                var matrix = [];
                var last = -1;
                for(var k=0; k < keyRow.length; k++){
                    var key = keyRow[k];
                    key = key.removeLast('/');
                    for(var i=0; i < KEYS.length; i++){
                        if(isKeyFound(key, KEYS[i])){
                            var newKeyindex = 0;
                            if(i+keyDiff < 0){
                                newKeyindex = KEYS.length + (i+keyDiff);
                            }else if(i+keyDiff > (KEYS.length -1)){
                                newKeyindex = (i+keyDiff) - (KEYS.length);
                            }else{
                                newKeyindex = i+keyDiff;
                            }
                            var a = [];
                            a[0] = key;
                            a[1] = getIndexValue(KEYS[newKeyindex], getKeyType(section.tokey));
                            a[2] = last = line.indexLastOf(last, key);
                            a[3] = i;
                            a[4] = newKeyindex;
                            matrix.push(a);
                            $log.debug(' -----  found key: ', KEYS[i] + ':' + i);
                            $log.debug(' -----  new key: ', KEYS[newKeyindex] + ':' + newKeyindex);
                            break;
                        }
                    }
                }
                for(var i=0; i < matrix.length; i++){
                    var keeys = matrix[i];
                    $log.debug(' - keeys: ', keeys);
                    try{
                        line = this.replaceAt(line, keeys[2], keeys[1], keeys[0]);
                        $log.debug(' ----- line: ', line);
                    }catch(err){ $log.debug(' ----- ERROR: ', line); }
                }
                $log.debug(' ---------- found key row: ', line);
            }
            result += line; // + linebreak;
        }
        return result;
    };

    this.replaceAt = function (line, index, newChar, oldChar){
        var nChar = newChar;
        var offset = newChar.length;
        if(newChar.length == 1 && oldChar.length > 1){
            offset = 2;
        }else if(newChar.length > 1 && oldChar.length == 1){
            offset = 1;
        }
        var slash = (line.indexOf('/', index-1) == index) ? 1 : 0;
        var str1 = line.substr(0, index + slash);
        var str2 = line.substr((index + offset) + slash);
//        console.log(' if old: '+ oldChar +' - new: '+ newChar + '|' + str1 + nChar + str2);
//        console.log(' -- |' + str1);
//        console.log(' -- |' + str2);
        // ex newChar = C#  oldChar = D
        if(newChar.length > 1 && oldChar.length == 1){
            // Check last char in string, if not spaces
            if(str1.substr(-2) == '/'+oldChar){
//                str2 = addSpace(str2, ' ')
                str1 = str1.substr(0,str1.length-1);
            }
            else if(startSufix(str2) || str2.indexOf('/') == 0 || str2.indexOf(' ') == 0){
                str2 = delSpace(str2, 1);
            }

        } // ex newChar = A  oldChar = Bb
        else if(newChar.length == 1 && oldChar.length > 1){
            if(str2.indexOf('/') == 0){
                str2 = addSpace(str2, ' ');
            }
            else if(str1.substr(-2) == '/'+oldChar[0]){
                str2 = addSpace(str2, '  ');
                str1 = str1.substr(0,str1.length-1);
            }
            else if((line.length-2) > index){
                str2 = addSpace(str2, ' ');
            }
        } // ex newChar = F  oldChar = E
        else if((newChar.length == 1 && oldChar.length == 1) || (newChar.length == 2 && oldChar.length == 2)){
            if(str1.substr(-2) == '/'+oldChar[0]){
                str2 = addSpace(str2, ' ');
                str1 = str1.substr(0,str1.length-1);
            }
        }
//        console.log(' -- |' + str1 + nChar + str2);
//        console.log(' -- |' + str1);
//        console.log(' -- |' + str2);
//        console.log(' --------   else old: '+ oldChar +' - new: '+ newChar + ' -----------------');
        return str1 + nChar + str2;
    };

}]);

function addSpace(str, space){
    var st0 = str;
    var firstSpace = str.indexOf(' ');
    if(firstSpace >= 0){
        var s1 = str.substr(0, firstSpace);
        var s2 = str.substr(firstSpace);
        st0 = s1 + space + s2;
    }
    else{
        var keys = str.match(MATCH_KEYS_REG);
//        console.log(str + '|----------keys----------------|' + keys);
        if(keys != null){
            var index = str.indexOf(keys[0]);
            if(!(str[0] == '/' && index < 2)){
                st0 = str.insertAt(index, ' ');
            }
        }
//        console.log(st0 + '|----------keys----------------|' + index);
    }
    return st0;
}
function delSpace(str, count){
    var firstSpace = str.indexOf(' ');
    var s1 = str.substr(0, firstSpace);
    var s2 = str.substr(firstSpace+count);
    return s1 + s2;
}

function getIndexValue(arr, cross){
    var sA = arr.split(':');
    if(sA.length > 1){
        if(cross){
            return sA[0];
        }else{
            return sA[1];
        }
    }
    else { return sA[0];}
}

function getKeyType(toKey){
    var type = ['D,true', 'A,true', 'A#:Bb,false'];
    var typ = false;
    for(var j=0; j < type.length; j++){
        var t = type[j].split(',');
        if(t[0] == toKey){
            typ = t[1];
            break;
        }
    }
    return typ;
}

function startSufix(str){
    for(var i=0; i < KEY_SUFIX.length; i++){
        var sufix = KEY_SUFIX[i];
        if(str.indexOf(sufix) == 0){
            return true;
        }
    }
}

function isKeyFound(key, keyArray){
    var keyArr = keyArray.split(':');
    if(keyArr[0] == key){
        return true;
    }
    if(keyArr.length == 2 && keyArr[1] == key){
        return true;
    }
    if(keyArr.length == 3 && keyArr[2] == key){
            return true;
        }
    return false;
}