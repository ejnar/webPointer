'use strict';

/* Services */

var app = angular.module('webpoint.core');

app.service('RemoveKeyService', ['properties', '$log', 'ChangeKeyService', function(properties, $log, ChangeKeyService) {

    this.removeKeys = function (doHtml,data) {
        var result = '';
        var linebreak = '\n';
        var lines = ChangeKeyService.getLines(doHtml,data,linebreak); //data.split('<br />');

        angular.forEach(lines, function(l) {
            if(!ChangeKeyService.validKeyRow(l)) {
//                $log.debug(l);
                result += l + linebreak;
            }
        });
        data = result;
        $log.debug(result);
        return result;
    };


}]);
