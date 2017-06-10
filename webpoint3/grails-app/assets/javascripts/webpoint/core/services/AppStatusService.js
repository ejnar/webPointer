'use strict';

/* Services */

var app = angular.module('webpoint.core');


    app.factory('AppStatusService', AppStatusService);
    AppStatusService.$inject = ['$rootScope', '$log', 'usSpinnerService', '$timeout', '$location'];


    function AppStatusService($rootScope, $log, usSpinnerService, $timeout, $location){
        $log.info('AppStatusService');
        var service = {
        		isLoading : isLoading,
                updateStatus : updateStatus,
                xhrCreationsCountUp : xhrCreationsCountUp,
                xhrResolutionsCountUp: xhrResolutionsCountUp,
                getLoadingTracker: getLoadingTracker,
                setBusy: setBusy,
        		getErrorContainer : getErrorContainer,
        		submitError : submitError,
        		submitPromiseToError : submitPromiseToError,
        		statusMessageResolver: statusMessageResolver,
        		messageResolver: messageResolver
        };

        var xhrCreations = 0;
        var xhrResolutions = 0;

        var loadingTracker = {
        		active: false
        	};

        function xhrCreationsCountUp() {
            xhrCreations++;
        }

        function xhrResolutionsCountUp() {
            xhrResolutions++;
        }

        function updateStatus() {
            loadingTracker.active = isLoading();
            if(loadingTracker.active){
                usSpinnerService.spin('spinner-1');
            }else{
                $timeout(function(){
                    usSpinnerService.stop('spinner-1');
                },200);
            }
        }

        function setBusy() {
            loadingTracker.active = true;
        }

        function isLoading() {
            return xhrResolutions < xhrCreations;
        }

        function getLoadingTracker() {
            return loadingTracker;
        }

// Error
        var errorContainer = {
            message: "",
            active: false
        };

        function submitPromiseToError(promise) {
            promise.$promise.then(
                function(success){},
                function (error) {
                    submitError(error.data.data);
            })
        }

        function getErrorContainer() {
            return errorContainer;
        }

        function submitError(message) {
        	console.info(message);
            errorContainer.message = message;

            $timeout(function(){
            	errorContainer.message = '';
            },5000);
        }

        function statusMessageResolver(responseError){
            if (responseError.status === 403) { // authentication issue
                $location.url('/login');
            }
            if (responseError.status === 500) { // authentication issue
            }
            if (responseError.status < 0) {
                $log.debug(' Server down:');
            }
            else{
                $log.debug('status: ' + responseError.status + ' info: ' + responseError.statusText);
            }
        }

        function messageResolver(rejection){

            if(rejection.status != 401 && !rejection.data){
                submitError(rejection.data.message);
            }

        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState) {
            errorContainer.message = undefined;
        });

        return service;
    }