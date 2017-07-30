'use strict';

/* Services */

var module = angular.module('webpoint.core');

    module.service('RemoveKeyService', RemoveKeyService);
    RemoveKeyService.$inject = ['properties', '$log', 'ChangeKeyService'];

    function RemoveKeyService(properties, $log, ChangeKeyService) {

        this.removeKeys = function (doHtml,data) {
            var result = '';
            var linebreak = '\n';
            var lines = ChangeKeyService.getLines(doHtml,data,linebreak); //data.split('<br />');

            angular.forEach(lines, function(l) {
                if(!ChangeKeyService.validKeyRow(l)) {
//                    $log.debug('validKeyRow:', l);
                    result += l + linebreak;
                }
            });
            data = result;
            $log.debug(result);
            return result;
        };
    }
