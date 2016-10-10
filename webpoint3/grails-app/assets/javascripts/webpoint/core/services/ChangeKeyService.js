'use strict';

/* Services */

var app = angular.module('webpoint.core');

var keySufix = ['sus','maj','m'];

app.service('ChangeKeyService', ['properties', '$log', function(properties, $log) {

    this.foundKeyRow = function (containWord) {
        var isKeyRow = false;
        if(containWord != null){
            for(var i=0; i < containWord.length; i++){
                $log.debug(' --- containWord[i]: ', containWord[i]);
                var word = containWord[i].match(new RegExp("\\w{1}["+ keySufix + "]{2}\\w", "gi"));
                $log.debug(' ----- word: ', word);
                if(word != null){
                    isKeyRow = true;
                    break;
                }
            }
        }
        return isKeyRow;
    };


    this.validKeyRow = function (line, keys) {
        var row = null;
        $log.debug(' --- line: ', line);
        var keyRow = line.matchKeyRow(keys);
        var containWord = line.matchContainWord(keys);
        $log.debug(' --- keyRow: ', keyRow);
        $log.debug(' --- containWord: ', containWord);
        var isKeyRow = this.foundKeyRow(containWord);
        if((keyRow != null && keyRow.length > 0) &&
            ( (containWord == null) || (containWord != null && isKeyRow) ))
        {
            row = keyRow;
        }
        return row;
    };

    this.changeKey = function (section, doHtml) {
        $log.debug(' --- ChangeKeyService.changeKey:');
        return this.changeKeyConfig(section, doHtml, 0);
    };

    this.changeKeyConfig = function (section, doHtml, major) {
        $log.debug(' --- ChangeKeyService.changeKeyConfig:');

        var result = '';
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

        for(var l=0; l < lines.length; l++){
            result += l != 0 ? linebreak : '';
            var line = lines[l];
            var keyRow = this.validKeyRow(line, keys);
            if(keyRow != null){
                var matrix = [];
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
                                a[1] = getIndexValue(keys[newKeyindex], j, getKeyType(section.tokey, major));
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
    //    console.log(str1);
    //    console.log(str2);
        // ex newChar = C#  oldChar = D
        if(newChar.length > 1 && oldChar.length == 1){
            // Check last char in string, if not spaces
            if(startSufix(str2) || str2.indexOf('/') == 0 || str2.indexOf(' ') == 0 || str1.slice(-1) != ' '){
                var firstSpace = str2.indexOf(' ');
                var s1 = str2.substr(0, firstSpace);
                var s2 = str2.substr(firstSpace+1);
                str2 = s1 + s2;
            }
            else{
                str1 = str1.substr(0, str1.length-1);
            }
        } // ex newChar = A  oldChar = Bb
        else if(newChar.length == 1 && oldChar.length > 1){
//            console.log(' if old: '+ oldChar +' - new: '+ newChar +' -|'+ nChar +'|' + str1 + nChar + str2);
//            console.log(' -- |' + str1);
//            console.log(' -- |' + str2);
//            console.log('----|' + line.substr(0, index));
//            console.log('----|' + line.substr(index+offset));
//            console.log('----|' + '/'+oldChar[0]);
            if(str2.indexOf('/') == 0){  //
                str2 = addSpace(str2, ' ')
            }
            else if(str1.slice(-2) == '/'+oldChar[0]){
                str2 = addSpace(str2, '  ')
                str1 = str1.substr(0,str1.length-1);
            }
            else if((line.length-2) > index){
                nChar = newChar + ' ';
            }
            else{
                nChar = newChar;
            }
//            console.log(' -- |' + str1 + nChar + str2);
//            console.log(' -- |' + str1);
//            console.log(' -- |' + str2);
//            console.log(' else old: '+ oldChar +' - new: '+ newChar +' -|'+ nChar +'|' + str1 + nChar + str2);
        } // ex newChar = F  oldChar = E
        else if(newChar.length == 1 && oldChar.length == 1){
//            if(str2.indexOf('/') == 0){
//                str2 = addSpace(str2, ' ')
//            }
            if(str1.slice(-2) == '/'+oldChar[0]){
                str2 = addSpace(str2, ' ')
                str1 = str1.substr(0,str1.length-1);
            }
        }
        return str1 + nChar + str2;
    };

}]);

function addSpace(str, space){
    var firstSpace = str.indexOf(' ');
    var s1 = str.substr(0, firstSpace);
    var s2 = str.substr(firstSpace);
    return s1 + space + s2;
}

function getIndexValue(arr, i, cross){
    var sA = arr.split(':');
    if(sA.length > 1){
        if(cross)
            return sA[0];
        else
            return sA[1];
    }
    else { return sA[0];}
}

function getKeyType(toKey, major){
    var type = ['D,true', 'A,true', 'A#:Bb,false'];
    var typ = false;
    if(major == 0){
        for(var j=0; j < type.length; j++){
            var t = type[j].split(',');
            if(t[0] == toKey){
                typ = t[1];
                break;
            }
        }
    }else if(major == 1){
        typ = true;
    }
    return typ;
}

function startSufix(str){
    for(var i=0; i < keySufix.length; i++){
        var sufix = keySufix[i];
        if(str.indexOf(sufix) == 0){
            return true;
        }
    }
}


String.prototype.matchKeyRow = function(keys) {
    return this.match(new RegExp("\\b["+ keys + "]{1,2}", "gi"));
}
String.prototype.matchContainWord = function(keys) {
    return this.match(new RegExp("\\w{2,}[^"+ keys + ",'/',' ']\\w", "gi"));
}