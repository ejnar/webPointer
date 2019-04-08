'use strict';

/* Services */

var module = angular.module('webpoint.core');
    module.service('UtilService', UtilService);
    UtilService.$inject = [];

    function UtilService() {
        var includePrint = false;
        var MATCH_KEYROW = new RegExp("[C,C#,Db,D,D#,Eb,E,F,F#,Gb,G,G#,Ab,A,A#,Bb,H,B,Cb]{1,2}", "g");
        this.findValidKeyRow = function (line) {
            print(' - line: ', line);
            var parts = line.match(/\S+/g)
            print(' -- parts: ', parts);
            if(parts){
                var countNull = 0;
                for(var i=0; i < parts.length; i++){
                    var key = parts[i].match(MATCH_KEYROW);
                    print(' --- key: ', key);
                    if(!key){ countNull++; }
                }
                if( (countNull/parts.length) > 0.2 ){
                    return false;
                }
            }
            return true;
        };

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