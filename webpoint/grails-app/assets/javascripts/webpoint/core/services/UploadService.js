'use strict';

/* Services */

var uploadService = angular.module('webpoint.core');


uploadService.service('FileUploadService', ['$http', '$log', function ($http, $log) {
    this.uploadSectionObjectFile = function(id, file){
        $log.debug(' --- UploadService.fileUploadService_uploadSectionObjectFile:');
        var fd = new FormData();
        fd.append('file', file);
//        fd.append('filename', filename);
        $http.post("api/sections/upload/" + id, fd, {
            transformRequest: angular.identity,
            headers: {
                'enctype': 'multipart/form-data',
                'Content-Type': undefined
            }
        })
        .success(function(data){
            $log.debug(data)
        })
        .error(function(data){ $log.error(data)
        });
};}]);