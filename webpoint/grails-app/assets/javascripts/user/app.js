'use strict';

/* App Module */

var gambApp = angular.module('userApp', [
	'http-auth-interceptor',                                    
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
        		templateUrl: 'common/views/auth/login.html',
        		controller: 'LoginController'
        	}).
            when('/sections', {
                templateUrl: 'user/views/sections.html',
                controller: 'ListGroupsOfSectionsCtrl'
            }).
//            when('/book/edit/:postId', {
//                templateUrl: 'book/views/edit.html',
//                controller: 'UpdateBookCtrl'
//            }).
            when('/sections/new', {
                templateUrl: 'user/views/section/new.html',
                controller: 'NewGroupSectionCtrl'
            }).
            otherwise({
                redirectTo: '/sections'
            });
//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common["X-Requested-With"];
//        console.log('@X-Requested-With@'+$httpProvider.defaults.headers.common["X-Requested-With"])
    }]);



function getLocalToken() {
    return sessionStorage["authToken"];
}

function setLocalToken(value) {
    sessionStorage["authToken"] = value;
}

function getHttpConfig() {
    return {
        headers: {
            'X-Auth-Token': getLocalToken()
        }
    };
}

function getAuthenticateHttpConfig() {
	console.log('getAuthenticateHttpConfig --------');
    return {
        ignoreAuthModule: true
    };
}

gambApp.run(['$rootScope', '$http', '$location',
    function ($rootScope, $http, $location) {
		console.log(' --- startup --------' + getLocalToken());
        $http.defaults.headers.common['X-AUTH-TOKEN'] = getLocalToken();

        $rootScope.$on('event:auth-loginRequired', function () {
            console.log('showing login form');
            $location.path('/login');
        });
        $rootScope.$on('event:auth-loginFailed', function () {
            console.log('showing login error message');
            $('#login-error').show();
        });
        $rootScope.$on('event:auth-loginConfirmed', function () {
            console.log('redirecting to home');
            $http.defaults.headers.common['X-AUTH-TOKEN'] = getLocalToken();
            $location.path('/');
        });
        $rootScope.$on('event:auth-logoutRequest', function () {
            console.log('Logging out user');
            delete $http.defaults.headers.common["X-AUTH-TOKEN"]
            $rootScope.isAuthenticated = false;
            $rootScope.currentUser = null;
            sessionStorage.clear();
            $location.path("/login")
        });
    }]);

console.log('gamb app load complete');