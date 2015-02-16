'use strict';

/* App Module */

var userApp = angular.module('userApp', [
	'root.webpointer'
]);


//function getProperty() {
//    return 'test property';
//}
//
//function getLocalToken() {
//    return sessionStorage["authToken"];
//}
//
//function setLocalToken(value) {
//    sessionStorage["authToken"] = value;
//}
//
//function getHttpConfig() {
//    return {
//        headers: {
//            'X-Auth-Token': getLocalToken()
//        }
//    };
//}
//
//function getAuthenticateHttpConfig() {
////	console.log('getAuthenticateHttpConfig --------');
//    return {
//        ignoreAuthModule: true
//    };
//}
//
//userApp.run(['$rootScope', '$http', '$location',
//    function ($rootScope, $http, $location) {
//		console.log(' --- startup -------- LocalToken: ' + getLocalToken());
//        $http.defaults.headers.common['X-AUTH-TOKEN'] = getLocalToken();
//        
//        $rootScope.$on('event:auth-loginRequired', function () {
//            console.log('showing login form');
//            $location.path('/login');
//        });
//        $rootScope.$on('event:auth-loginFailed', function () {
//            console.log('showing login error message');
//            $('#login-error').show();
//        });
//        $rootScope.$on('event:auth-loginConfirmed', function () {
//            console.log('redirecting to home');
//            $http.defaults.headers.common['X-AUTH-TOKEN'] = getLocalToken();
//            $location.path('/');
//        });
//        $rootScope.$on('event:auth-logoutRequest', function () {
//            console.log('Logging out user');
//            delete $http.defaults.headers.common["X-AUTH-TOKEN"]
//            $rootScope.isAuthenticated = false;
//            $rootScope.currentUser = null;
//            sessionStorage.clear();
//            $location.path("/login")
//        });
//    }]);

