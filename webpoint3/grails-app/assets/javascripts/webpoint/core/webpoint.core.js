//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

//= require /angular/angular
//= require /angular/angular-resource
//= require /angular/angular-route
//= require /angular/angular-sanitize
//= require /angular/angular-local-storage
//= require spin.js/spin
//= require /angular/angular-spinner
//= require /angular-http-auth/http-auth-interceptor

//= require jquery/jquery

var app = angular.module("webpoint.core", [
    'http-auth-interceptor', 'ngRoute', 'ngResource', 'ngSanitize', 'angularSpinner', 'LocalStorageModule'])
    .constant("contextPath", window.contextPath)
    .config(config);

console.log("webpoint.core manifest load complete.");


app.constant(
		'CONFIG', {
			DEBUG_LOG: true
		});


app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('webpoint')
    .setNotify(false, false)
});

function config($httpProvider) {
//    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    $httpProvider.interceptors.push('$resourceInterceptor');
};

app.factory('$resourceInterceptor', ['$q', '$log', '$rootScope', '$location', 'AppStatusService',
    function($q, $log, $rootScope, $location, AppStatusService) {
//    $log.debug('$resourceInterceptor');
    var responseInterceptor = {
        request: function(config) {
            AppStatusService.resolveXSS(config);
            AppStatusService.xhrCreationsCountUp();
            AppStatusService.updateStatus();
            config.headers = config.headers || {};
            if (sessionStorage.authToken) {
                config.headers.Authorization = 'Bearer ' + sessionStorage.authToken;
            }
            return config;
        },
        requestError: function (rejection) {
            AppStatusService.xhrResolutionsCountUp();
            AppStatusService.updateStatus();
            return $q.reject(rejection);
        },
        response: function(response) {
            AppStatusService.initXSS(response);
            AppStatusService.xhrResolutionsCountUp();
            AppStatusService.updateStatus();
            return response;
        },
        responseError: function(responseError) {
            AppStatusService.xhrResolutionsCountUp();
            AppStatusService.updateStatus();
            AppStatusService.messageResolver(responseError);
            AppStatusService.statusMessageResolver(responseError);
            return $q.reject(responseError);
        }
    };
    return responseInterceptor;
}]);


app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
//    usSpinnerConfigProvider.setDefaults({color: 'blue'});
    usSpinnerConfigProvider.setTheme('bigBlue', {color: 'blue', radius: 20});
}]);

app.run(['$rootScope', '$http', '$location', '$log', 'CashService', 'Access',
    function ($rootScope, $http, $location, $log, CashService, Access) {
//		$log.debug(' --- startup -------- LocalToken: ' + sessionStorage.authToken);
        $http.defaults.headers.common['X-Auth-Token'] = sessionStorage.authToken;

        $rootScope.$on('event:auth-loginRequired', function () {
            $log.debug('Showing login form');
            $location.path('/login');
        });
        $rootScope.$on('event:auth-loginFailed', function () {
            $log.debug('Showing login error message');
            $('#login-error').show();
        });
        $rootScope.$on('event:auth-loginConfirmed', function () {
            $log.debug('Redirecting to home');
            $rootScope.isAuthenticated = true;
            $http.defaults.headers.common['X-Auth-Token'] = sessionStorage.authToken;
            $log.debug('User have succefully login - ' + $rootScope.currentUser);
            $location.path('/');
        });
        $rootScope.$on('event:auth-logoutRequest', function () {
            $log.debug('Logging out user');
            delete $http.defaults.headers.common["X-Auth-Token"]
            $rootScope.isAuthenticated = false;
            $rootScope.currentUser = null;
            sessionStorage.clear();
            CashService.clean();
            $location.path("/login");
        });

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            var templateUrl = "";
            var requireRoles = [];
            if(next && next.$$route != undefined){
                templateUrl = next.$$route.templateUrl;
                requireRoles = next.requireRoles;

            }else if(current && current.$$route != undefined){
                templateUrl = current.$$route.templateUrl;
                requireRoles = current.requireRoles;
            }
            Access.isAuthorized(templateUrl);
//            if(requireRoles && !Access.hasAnyRole(requireRoles)){
//                $log.debug('not authorized - hasAnyRole');
//                $location.url('/login');
//            }
//            if(templateUrl.indexOf('webpoint/user') > 0){
//                if(!Access.hasRole("ROLE_ADMIN")){
//                    $log.debug('not authorized - hasRole');
//                    $location.url('/login');
//                }
//            }

         });

         $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
//            $log.debug('$routeChangeError');
         });

         $rootScope.$on("$locationChangeStart", function (event, next, current) {
//            $log.debug('$locationChangeStart');
//            $log.debug('event', event);
//            $log.debug('next', next);
//            $log.debug('current', current);
         });

}]);

function empty(e) {
    switch(e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case typeof this == "undefined":
            return true;
                default : return false;
    }
};

app.factory('hashMap', ['$rootScope', function ($rootScope) {
	var mem = {};
    return {
        put: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        },
        remove: function (key) {
            return mem[key] = null;
        }
    };
}]);

String.prototype.insertAt = function(index, string) {
  if((this.length) <= index || index < 0)
    return this + string;
  else
    return this.substr(0, index) + string + this.substr(index);
}
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
}
String.prototype.removeLast = function(character) {
    if(this[this.length-1] == character)
        return this.substring(0, this.length-1);
    else
        return this;
}
String.prototype.indexLastOf = function(preIndex, character) {
    if(preIndex < 0)
        return this.indexOf(character);
    else
        return preIndex + 1 + this.substr(preIndex + 1).indexOf(character);
}
String.prototype.stripHtml = function() {
    return this.replace(/(<([^>]+)>)/ig,"");
}
String.prototype.ltrim = function( chars ) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("^[" + chars + "]+", "g"), "" );
}
String.prototype.rtrim = function( chars ) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("[" + chars + "]+$", "g"), "" );
}
String.prototype.trim = function( chars ) {
    return this.rtrim(chars).ltrim(chars);
}