'use strict';

/* Services */

var module = angular.module('webpoint.core');
    module.service('RemoveKeyService', RemoveKeyService);
    RemoveKeyService.$inject = ['UtilService'];

    function RemoveKeyService(UtilService) {

        this.removeKeys = function (doHtml,data) {
            return this.removeValidKeyRows(doHtml,data);
        };

        this.removeValidKeyRows = function (doHtml,data) {
            var result = '';
            var linebreak = '\n';
            var lines = UtilService.getLines(doHtml,data,linebreak);
            for(var i=0; i < lines.length; i++){
                if (/^\s+$/.test(lines[i]) || '' === lines[i]){
                    result += lines[i] + linebreak;
                }else if(!UtilService.findValidKeyRow(lines[i])) {
                    result += lines[i] + linebreak;
                }
            }
            data = result;
            return result;
        };

        this.findValidKeyRow = function (line) {
            return UtilService.findValidKeyRow(line);
        };

    }