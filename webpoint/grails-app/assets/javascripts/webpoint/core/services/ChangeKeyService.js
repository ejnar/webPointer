'use strict';

/* Services */

var app = angular.module('webpoint.core');

    app.service('ChangeKeyService', ChangeKeyService);
    ChangeKeyService.$inject = ['$log', 'properties', 'UtilService'];

    function ChangeKeyService($log, properties, UtilService) {
        var includePrint = false;

        var LINEBREAK = '\n';
        var SPLIT_LINE = /(\s*[ ]\s*)/;
        var KEYS = ['C','C#:Db','D','D#:Eb','E','F','F#:Gb','G','G#:Ab','A','A#:Bb','H:B:Cb'];
        var KEYS_LOWER = ['c','c#:db','d','d#:eb','e','f','f#:gb','g','g#:ab','a','a#:bb','h:b:cb'];
        var MATCH_KEYROW_REG = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]{1,2}", "gi");

        this.changeKey = function (section, doHtml) {
            print(' - ChangeKeyService.changeKeyConfig: ', section);
            var data = section.data;
            var lines = UtilService.getLines(doHtml,data,LINEBREAK);
            var result = '';
            var keydiff = keyDiff(section.key,section.tokey);
            //print(' - keydiff: ', keydiff);
            for(var l=0; l < lines.length; l++){
                result += l != 0 ? LINEBREAK : '';
                var line = lines[l];
                print(' -- line: ', lines[l]);
                var validKeyRow = UtilService.findValidKeyRow(line);
                var keyRow = line.match(MATCH_KEYROW_REG);
                print(' -- keyRow: ', keyRow);
                if(validKeyRow && keyRow != null){  //
                    var parts = line.split(SPLIT_LINE);
                    print(' -- parts: ', parts);
                    var map = [];
                    var linePart = '';
                    for(var j=0; j < parts.length; j++) {
                        if (/\S/.test(parts[j])) {
                            linePart += findKeys(keydiff, section.tokey, parts[j], map);
                        } else {
                            linePart += reSpace(parts[j], map);
                        }
                        print(' ---- linePart: ', linePart);
                    }
                    line = linePart;
                    print(' ---------- found key row: ', line);
                }
                result += line; // + linebreak;
            }
            return result;
        };

        function reSpace(parts, map) {
            print(' -- reSpace.parts: ', parts);
            print(' -- reSpace.map: ', map);

            if(map.length < 1){
                return parts;
            }
            var count = map[map.length-1]['lineOffset'];
            print(' -- reSpace.lineOffset: ', count);
            if (count > 0) {
                return addSpaces(parts, count);
            } else if (count < 0) {
                return delSpace(parts, (-count));
            }
            return parts;
        }

        var FIND_PARENTHESES_REG = new RegExp(/\((.*)\)/);
        var FIND_KEYROW_REG = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,B#,Cb,^(,^)]", "g");
        function groupKeys(line) {
            //var pKey;
            var parentheses = line.match(FIND_PARENTHESES_REG);
            if(parentheses){
                line = line.replace(parentheses[0],'');
            }
            print(' --- groupKeys.line: ', line);
            print(' --- groupKeys.parentheses: ', parentheses);

            var result = [];
            var index = 0;
            var spliteLine = line.split('/');
            print(' --- groupKeys.spliteLine: ', spliteLine);
            for(var i=0; i < spliteLine.length; i++){
                var keys = spliteLine[i].match(FIND_KEYROW_REG);
                if(keys){
                    for(var k=0; k < keys.length; k++){
                        print(' --- groupKeys.keys: ', keys[k]);
                        if((keys[k] === 'b' && spliteLine[i].indexOf("b") == 1) || (keys[k] === '#' && spliteLine[i].indexOf("#") == 1)  ){
                        //if((keys[k] === 'b') || (keys[k] === '#')  ){
                            result[index-1].suffix = keys[k];     //+= keys[k];
                        } else {     // if(keys[k] != '(' && keys[k] != ')')
                            result[index++] = wrap(keys[k],'','','s');
                        }
                    }
                }
            }
            if(parentheses){
                result[0].parentheses = parentheses[0];
                result[0].type = 'p';
            }
            print(' --- groupKeys.wraps: ', result);
            return result;
        }

        function wrap(value,suffix,parentheses,type){
            var uCase = !isLowerCase(value);
            var val = {
              value  : value,
              suffix : suffix,
              parentheses : parentheses,
              type   : type,
              uCase  : uCase,
              full : function() {
                return this.value + this.suffix;
              }
            };
            return val;
        }

        function isLowerCase(str) {
            return str !== str.toUpperCase();
        }

        function findKeys(keydiff, tokey, line, map) {
            print(' ---- findKeys.in.line: ', line);
            if(line.indexOf('|') >= 0){
                return line;
            }
            var wraps = groupKeys(line); //keys
            var lastIndex = -1;
            var lineInLen = line.length;
            for(var k=0; k < wraps.length; k++){
                var key = wraps[k].full();
                print(' -- findKeys.key: ', key);
                var item = [];
                var keysArray = KEYS;
                if(!wraps[k].uCase){
                    keysArray = KEYS_LOWER;
                }
                for(var i=0; i < keysArray.length; i++){
                    if(isKeyFound(key, keysArray[i])){
                        var newKey = getIndexValue(keysArray,tokey,i,keydiff);
                        lastIndex = line.indexLastOf(lastIndex, key);
                        mapItem(key, newKey, lastIndex, wraps[k], item);
                        line = updateLine(line,item);

                        item['lineOffset'] = lineInLen - line.length;
                        print(' -- findKeys.line: ', line);
                        break;
                    }
                }
                if(item){
                    map[map.length] = item;
                }
            }
            print(' -- findKeys.lineInLen: ', lineInLen);
            print(' -- findKeys.line.length: ', line.length);
            print(' ---- findKeys.out.line: ', line);
            return line;
        }

        function updateLine(line,item){
            try{
                return replaceAt(line, item);
            }catch(err){ $log.info(' ----- ERROR: ', line); }
        }

        function mapItem(key,newKey,lastIndex,wrap,item){
            item['preKey'] = key;  // old key
            item['newKey'] = newKey; // new key
            item['index'] = lastIndex;
            // item['offset'] = key.length - newKey.length;
            item['wrap'] = wrap;

            item['offset'] = newKey.length;
            if(newKey.length == 1 && key.length > 1){
                item['offset'] = 2;
                item['lessThan'] = true;
            }else if(newKey.length > 1 && key.length == 1){
                item['offset'] = 1;
                item['greaterThan'] = true;
            }else if((newKey.length == 1 && key.length == 1) || (newKey.length == 2 && key.length == 2)){
                item['equalThan'] = true;
            }
        }

        function replaceAt(line, map){
            var index = map['index'];
            var preKey = map['preKey'];

            print(' - replaceAt.line: ', line);
            print(' - replaceAt.map: ', map);
            print(' - replaceAt.index: ', index);
            print(' - replaceAt.preKey: ', preKey);
            print(' - replaceAt.newKey: ', map['newKey']);
            print(' - replaceAt.offset: ', map['offset']);

            var slash = (line.indexOf('/', index-1) == index) ? 1 : 0;
            var str1 = line.substr(0, index + slash);
            var str2 = line.substr((index + map['offset']) + slash);
            // ex preKey = D newKey = C#
            if(map['greaterThan']){
                // Check last char in string, if not spaces
                if(str1.substr(-2) == '/'+preKey){
                    str1 = str1.substr(0,str1.length-1);
                }
                else if(startSufix(str2) || str2.indexOf('/') == 0 || str2.indexOf(' ') == 0){
                    str2 = delSpace(str2, 1);
                }
            } // ex preKey = Bb newKey = A
            else if(map['lessThan']){
                if(str1.substr(-2) == '/'+preKey[0]){
                    str2 = addSpace(str2, '  ');
                    str1 = str1.substr(0,str1.length-1);
                }
                else if((str2.indexOf('/') == 0) || (line.length-2) > index && map['wrap'].type != 'p'){
                    str2 = addSpace(str2, ' ');
                }
            } // ex preKey = E newKey = F
            else if(map['equalThan'] && str1.substr(-2) == '/'+preKey[0]){
                str2 = addSpace(str2, ' ');
                str1 = str1.substr(0,str1.length-1);
            }
            var result = str1 + map['newKey'] + str2;
            print(' -- replaceAt.result: ', result);
            return result;
        }

        function newIndex(i,keydiff){
            var newKeyindex = 0;
            if(i+keydiff < 0){
                newKeyindex = KEYS.length + (i+keydiff);
            }else if(i+keydiff > (KEYS.length -1)){
                newKeyindex = (i+keydiff) - KEYS.length;
            }else{
                newKeyindex = i+keydiff;
            }
            return newKeyindex;
        }

        function myReplace(line, index, character) {
            return line.substr(0, index) + character + line.substr(index+character.length);
        }

        function keyDiff(key,tokey){
            //print(' - keyDiff.key: ', key);
            //print(' - keyDiff.tokey: ', tokey);
            var changeToKeyIndex = 0;
            var keyIndex = 0;
            for(var i=0; i < KEYS.length; i++){
                if(isKeyFound(key, KEYS[i])){
                    keyIndex = i;
                }
                if(isKeyFound(tokey, KEYS[i])){
                    changeToKeyIndex = i;
                }
            }
            //print(' -- keyIndex: ', keyIndex);
            //print(' -- changeToKeyIndex: ', changeToKeyIndex);
            var keydiff = changeToKeyIndex - keyIndex;
            //print(' -- keydiff: ', keydiff);
            return keydiff;
        }

        function delSpace(str, count){
            var firstSpace = str.indexOf(' ');
            var s1 = str.substr(0, firstSpace);
            var s2 = str.substr(firstSpace+count);
            return s1 + s2;
        }

        function addSpaces(str, count){
            var spaces = '';
            for(var j=0; j < count; j++){
                spaces += ' ';
            }
            return spaces + str;
        }

        function delSpaceAfter(str, count){
            if(/\s$/.test(str)) {
                return str.substr(0, str.length-count);
            }
            return str;
        }

        function getIndexValue(keyArr,tokey,index,keydiff){
            //print(' - getIndexValue.keyArr: ', keyArr);
            //print(' - getIndexValue.tokey: ', tokey);
            //print(' - getIndexValue.index: ', index);
            //print(' - getIndexValue.keydiff: ', keydiff);
            var newKeyindex = newIndex(index,keydiff);
            var key = keyArr[newKeyindex];
            var cross = getKeyType(tokey);
            var sA = key.split(':');
            print(' - getIndexValue.key: ', key);
            if(key.match(tokey)){
                return tokey;
            } else if(sA.length > 1){
                return cross ? sA[0] : sA[1];
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

        var KEY_SUFIX = ['sus','maj','m','dim', 'add4'];  //add4
        function startSufix(str){
            for(var i=0; i < KEY_SUFIX.length; i++){
                var sufix = KEY_SUFIX[i];
                if(str.indexOf(sufix) == 0){
                    return true;
                }
            }
            return false;
        }
        function isKeyFound(key, keyArray){
            //print(' - isKeyFound.key: ', key);
            //print(' - isKeyFound.keyArray: ', keyArray);
            var keyArr = keyArray.split(':');
            for(var i=0; i < keyArr.length; i++){
                if(keyArr[i] == key){
                    return true;
                }
            }
            return false;
        }

        function addSpaceLast(str, space){
            return str + space;
        }

        var MATCH_KEYS_REG = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]", "g");
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
                if(keys != null){
                    var index = str.indexOf(keys[0]);
                    if(!(str[0] == '/' && index < 2)){
                        st0 = str.insertAt(index, ' ');
                    }
                }
            }
            return st0;
        }

        function debug1(str){
            print('indexOf1 /', str.indexOf('/'));
            print('indexOf2  ', str.indexOf(' '));
        }

        function debug2(str1,str2){
            print('1--',str1);
            printg('2--',str2);
        }

        function print(msg, obj){
            if(includePrint){
                console.info(msg,obj);
            }
        }
    }





