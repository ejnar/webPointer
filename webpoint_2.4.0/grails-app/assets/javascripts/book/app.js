'use strict';

/* App Module */

var gambApp = angular.module('webApp', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'angulartics'
]);

gambApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.
        	when('/login', {
        		templateUrl: 'book/views/login.html',
        		controller: 'LoginController'
        	}).
            when('/books', {
                templateUrl: 'book/views/books.html',
                controller: 'ListBookCtrl'
            }).
            when('/book/edit/:postId', {
                templateUrl: 'book/views/edit.html',
                controller: 'UpdateBookCtrl'
            }).
            when('/book/new', {
                templateUrl: 'book/views/new.html',
                controller: 'NewBookCtrl'
            }).
            otherwise({
                redirectTo: '/books'
            });
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        console.log('@X-Requested-With@'+$httpProvider.defaults.headers.common["X-Requested-With"])
    }]);



//gambApp.config(function($httpProvider) {
//    //configure $http to catch message responses and show them
//    $httpProvider.responseInterceptors.push(
//            function($q) {
//                console.log('call response interceptor and set message...');
//                var setMessage = function(response) {
//                    //if the response has a text and a type property, it is a message to be shown
//                    //console.log('@data'+response.data);
//                    if (response.data.message) {
//                        message = {
//                            text: response.data.message.text,
//                            type: response.data.message.type,
//                            show: true
//                        };
//                    }
//                };
//                return function(promise) {
//                    return promise.then(
//                            //this is called after each successful server request
//                                    function(response) {
//                                        setMessage(response);
//                                        return response;
//                                    },
//                                    //this is called after each unsuccessful server request
//                                            function(response) {
//                                                setMessage(response);
//                                                return $q.reject(response);
//                                            }
//                                    );
//                                };
//                    });
//
//            //configure $http to show a login dialog whenever a 401 unauthorized response arrives
//            $httpProvider.responseInterceptors.push(
//                    function($rootScope, $q) {
//                        console.log('call response interceptor...');
//                        return function(promise) {
//                            return promise.then(
//                                    //success -> don't intercept			
//                                            function(response) {
//                                                console.log('dont intercept...');
//                                                return response;
//                                            },
//                                            //error -> if 401 save the request and broadcast an event
//                                                    function(response) {
//                                                        console.log('execute interceptor, response@' + response.status);
//                                                        if (response.status === 401) {
//                                                            console.log('catching http status:401');
//                                                            var deferred = $q.defer(),
//                                                                    req = {
//                                                                        config: response.config,
//                                                                        deferred: deferred
//                                                                    };
//                                                            $rootScope.requests401.push(req);
//                                                            $rootScope.$broadcast('event:loginRequired');
//                                                            return deferred.promise;
//                                                        }
//                                                        return $q.reject(response);
//                                                    }
//                                            );
//                                        };
//                            });
//                    httpHeaders = $httpProvider.defaults.headers;
//                    //console.log('http headers:'+ httpHeaders);
//                });
//
//            }());

