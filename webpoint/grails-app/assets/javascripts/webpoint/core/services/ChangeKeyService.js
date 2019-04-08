'use strict';

/* Services */

var app = angular.module('webpoint.core');

    app.service('ChangeKeyService', ChangeKeyService);
    ChangeKeyService.$inject = ['$log', 'properties', 'UtilService'];

    function ChangeKeyService($log, properties, UtilService) {
        var includePrint = true;

        var LINEBREAK = '\n';
        var SPLIT_LINE = /(\s*[ ]\s*)/;
        var KEYS = ['C','C#:Db','D','D#:Eb','E','F','F#:Gb','G','G#:Ab','A','A#:Bb','H:B:Cb'];
        var MATCH_KEYROW_REG = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]{1,2}", "gi");
        this.changeKey = function (section, doHtml) {
            print(' - ChangeKeyService.changeKeyConfig: ', section);
            var data = section.data;
            var lines = UtilService.getLines(doHtml,data,LINEBREAK);
            var result = '';
            var keydiff = keyDiff(section.key,section.tokey);

            for(var l=0; l < lines.length; l++){
                result += l != 0 ? LINEBREAK : '';
                var line = lines[l];
                var parts = line.split(SPLIT_LINE);
                print(' -- parts: ', parts);
                var validKeyRow = UtilService.findValidKeyRow(line);
                var keyRow = line.match(MATCH_KEYROW_REG);
                print(' --  keyRow: ', keyRow);
                if(validKeyRow && keyRow != null){
                    var last = -1;
                    var matrix = [];
                    for(var k=0; k < keyRow.length; k++){
                        var key = keyRow[k];
                        key = key.removeLast('/');
                        for(var i=0; i < KEYS.length; i++){
                            if(isKeyFound(key, KEYS[i])){
                                var newKeyindex = 0;
                                if(i+keydiff < 0){
                                    newKeyindex = KEYS.length + (i+keydiff);
                                }else if(i+keydiff > (KEYS.length -1)){
                                    newKeyindex = (i+keydiff) - (KEYS.length);
                                }else{
                                    newKeyindex = i+keydiff;
                                }
                                var a = [];
                                a['oldKey'] = key;  // old key
                                a['newKey'] = getIndexValue(KEYS[newKeyindex], getKeyType(section.tokey)); // new key
                                a['index'] = last = line.indexLastOf(last, key); // index
                                a['addSpace'] = false;
                                if(matrix[k-1]){
                                    if(matrix[k-1]['oldKey'].length > 1){
                                        a['addSpace'] = true;
                                    }
                                }
                                matrix[k] = a;

                                try{
                                    line = this.replaceAt(line, matrix[k]);
                                }catch(err){ $log.info(' ----- ERROR: ', line); }
                                // print(' ---  found key: ', KEYS[i] + ':' + i);
                                // print(' ---  new key: ', KEYS[newKeyindex] + ':' + newKeyindex);
                                break;
                            }
                        }
                        print(' - - - - :', line);
                    }
//                    try{  // matrix[i][2], matrix[i][1], matrix[i][0]
//                        for(var i=0; i < matrix.length; i++){
//                            line = this.replaceAt(line, matrix[i]);
//                        }
//                    }catch(err){ $log.info(' ----- ERROR: ', line); }
                    print(' ---------- found key row: ', line);
                }
                result += line; // + linebreak;
            }
            return result;
        };

        this.replaceAt = function (line, map){
            var index = map['index'];
            var oldChar = map['oldKey'];
            var newChar = map['newKey'];
            print(' - replaceAt.line: ', line);
            print(' - replaceAt.index: ', index);
            print(' - replaceAt.oldChar: ', oldChar);
            print(' - replaceAt.newChar: ', newChar);

//            if(map['addSpace']){
//                index = index - 1;
//                newChar = ' ' + newChar;
//            }

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
            // ex oldChar = D newChar = C#
            if(newChar.length > 1 && oldChar.length == 1){
                // Check last char in string, if not spaces
                if(str1.substr(-2) == '/'+oldChar){
                    str1 = str1.substr(0,str1.length-1);
                    print('1--',str1);
                }
                else if(startSufix(str2)){
                    str2 = delSpace(str2, 1);
                }
                else if(str2.indexOf('/') == 0 || str2.indexOf(' ') == 0){
                    str2 = delSpace(str2, 1);
                }

            } // ex oldChar = Bb newChar = A
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
            } // ex oldChar = E newChar = F
            else if((newChar.length == 1 && oldChar.length == 1) || (newChar.length == 2 && oldChar.length == 2)){
                if(str1.substr(-2) == '/'+oldChar[0]){
                    str2 = addSpace(str2, ' ');
                    str1 = str1.substr(0,str1.length-1);
                }
            }
            var result = str1 + nChar + str2;
            print(' -- result: ', result);
            return result;
        };

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

        function delSpaceAfter(str, count){
            if(/\s$/.test(str)) {   // /\s$/.     /(.*)\s+$/
                return str.substr(0, str.length-count);
            }
            return str;
        }

        function getIndexValue(arr, cross){
            print(' - getIndexValue.arr: ', arr);
            print(' - getIndexValue.cross: ', cross);
            var sA = arr.split(':');
            if(sA.length > 1){
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

        var KEY_SUFIX = ['sus','maj','m'];
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

        var MATCH_KEYS_REG = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]", "gi");
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





