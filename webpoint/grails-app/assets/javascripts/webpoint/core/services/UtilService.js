'use strict';

/* Services */

var module = angular.module('webpoint.core');
    module.service('UtilService', UtilService);
    UtilService.$inject = [];

    function UtilService() {
        var includePrint = true;
        var MATCH_WORDS = new RegExp("(Chorus|Bridge|Verse)", "g");
        this.findValidKeyRow = function (line) {
            print(' - line: ', line);
            if(line.split("|").length > 1){
                return true;
            }
            var words = line.match(MATCH_WORDS);
            print(' -- words: ', words);
            if(words){
                return false;
            }
            var parts = line.match(/\S+/g)
            print(' -- parts: ', parts);
            if(parts){
                var countFirst = validateFirst(parts);
                print(' --- countFirst: ', countFirst);
                if( (countFirst/parts.length) > 0.2 ){
                    return false;
                }
                var countSecond = validateSecond(parts);
                print(' --- countSecond: ', countSecond);
                if( (countSecond/parts.length) > 0.4 ){
                    return false;
                }
            }
            return true;
        };

        var MATCH_KEYROW = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]", "g");
        function validateFirst (parts) {
            var countNull = 0;
            for(var i=0; i < parts.length; i++){
                var key = parts[i].match(MATCH_KEYROW);
                print(' --- validateFirst.keys: ', key);
                if(!key){ countNull++; }
            }
            return countNull;
        }

        var MATCH_SUFFIX = new RegExp("(m|7|s|b|a|#|9|/)", "g");
        function validateSecond(parts) {
            var countNull = 0;
            for(var i=0; i < parts.length; i++){
                var key = parts[i].match(MATCH_KEYROW);
                if(!key){continue;}
                print(' --- validateSecond.keys: ', key);
                if(parts[i].length > 1 && parts[i].indexOf(key[0]) == 0){
                    var match = parts[i].substr(1, 1).match(MATCH_SUFFIX);
                    print(' ---- validateSecond.match---: ', match);
                    print(' ---- validateSecond.part: ', parts[i] );
                    if(!match){
                        countNull++;
                    }
                }
            }
            return countNull;
        }

        this.getLines = function (doHtml,data,linebreak) {
            var lines;
            if(doHtml){
                lines = data.split('<br />');
                linebreak = '<br />';
            }else{
                lines = data.split('\n');
            }
            print(' - lines:', lines);
            return lines;
        };

        function print(msg, obj){
            if(includePrint){
                console.info(msg,obj);
            }
        }
    }