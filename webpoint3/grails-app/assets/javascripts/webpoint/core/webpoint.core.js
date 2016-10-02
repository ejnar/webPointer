//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree filter
//= require_tree templates

//= require /angular/angular
//= require /angular/angular-resource
//= require /angular/angular-route
//= require /angular/angular-sanitize
//= require /angular/angular-local-storage
//= require spin.js/spin
//= require /angular/angular-spinner
//= require /angular-http-auth/http-auth-interceptor
//= require /angular-bootstrap/ui-bootstrap-tpls


var app = angular.module("webpoint.core", [
    'http-auth-interceptor', 'ngRoute', 'ngResource', 'ngSanitize', 'angularSpinner', 'ui.bootstrap', 'LocalStorageModule'])
    .constant("contextPath", window.contextPath)
    .config(config);

console.log("webpoint.core manifest load complete.");


app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('webpoint')
    .setNotify(false, false)
});

function config($httpProvider) {
//    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
//    $httpProvider.interceptors.push(httpRequestInterceptor);
    $httpProvider.interceptors.push('authInterceptor');
}


app.factory('authInterceptor', function ($rootScope, $window, $log) {
    return {
        request: function (config) {
//          $log.debug('authInterceptor');
//          $log.debug(config);
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        }
    };
});


app.factory('$resourceInterceptor', function ($q, $log, $location, usSpinnerService) {
    return {
        'responseError': function(responseError) {
            if (responseError.status === 403) { // authentication issue
                usSpinnerService.stop('spinner-1');
                $location.url('/login');
            }
            if (responseError.status === 500) { // authentication issue
                usSpinnerService.stop('spinner-1');
            }
//            $log.debug(responseError);
            if (responseError.status < 0) {
                $log.debug(' Server down:');
            }
            else{
                $log.debug('status: ' + responseError.status + ' info: ' + responseError.statusText);
            }
            return $q.reject(responseError);
        }
    };
});

app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
//    usSpinnerConfigProvider.setDefaults({color: 'blue'});
    usSpinnerConfigProvider.setTheme('bigBlue', {color: 'blue', radius: 20});
}]);

app.run(['$rootScope', '$http', '$location', '$log', 'usSpinnerService', 'localStorageService',
    function ($rootScope, $http, $location, $log, usSpinnerService, localStorageService) {
		$log.debug(' --- startup -------- LocalToken: ' + sessionStorage.authToken);
        $http.defaults.headers.common['X-Auth-Token'] = sessionStorage.authToken;

        $rootScope.$on('event:auth-loginRequired', function () {
            $log.debug('Showing login form');
            usSpinnerService.stop('spinner-1');
            $location.path('/login');
        });
        $rootScope.$on('event:auth-loginFailed', function () {
            $log.debug('Showing login error message');
            usSpinnerService.stop('spinner-1');
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
            $log.debug($http.defaults.headers.common["X-Auth-Token"]);
            delete $http.defaults.headers.common["X-Auth-Token"]
            $rootScope.isAuthenticated = false;
            $rootScope.currentUser = null;
            sessionStorage.clear();
            localStorageService.clearAll();
            usSpinnerService.stop('spinner-1');
            $location.path("/login");
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
}

app.service('sharedProperties', function () {
	 var property = {
			 doSave: true,
//			 categories: {'Worship','Christian','Hymns'}
	 };

   return {
   	getProperty: function() {
           return property;
       }
   };
});


app.factory('hashMap', ['$rootScope', function ($rootScope) {
	var mem = {};
    return {
        put: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
}]);


app.factory('tmpCash', ['$rootScope', function ($rootScope) {
	var mem = {};
    return {
        put: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
}]);

//app.factory('$exceptionHandler', function ($log) {
//    return function (exception, cause) {
//    	$log.debug('********** - Exception: ' + exception.status + ' ' + exception.statusText + ' - **********');
//    	$log.debug(exception);
//    	$log.debug('**********');
////    	$log.debug(cause);
//    	alert(exception.status + '  ' + exception.statusText);
//    };
//});

//function httpRequestInterceptor(contextPath) {
//    return {
//        request: function (config) {
//            console.info('httpRequestInterceptor');
////            console.info(config);
////            console.info(contextPath);
//            if (!config.url.indexOf("/") == 0 && contextPath) {
//                config.url = contextPath + "/" + config.url;
//            }
//            return config;
//        }
//    };
//}

// Redirect to login page
//app.factory('httpInterceptor', function ($q, $window, $location, $log) {
//
//    return function (promise) {
//        $log.debug('httpInterceptor');
//        var success = function (response) {
//            $log.debug(response);
//            return response;
//        };
//        var error = function (response) {
//            $log.debug(response);
//            if (response.status === 401) {
//                $location.url('/login');
//                $log.debug('status: 401' + response.status);
//            }
//            return $q.reject(response);
//        };
//        return promise.then(success, error);
//    };
//});


String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
String.prototype.removeLast = function(character) {
    if(this[this.length-1] == character)
        return this.substring(0, this.length-1);
    else
        return this;
};
String.prototype.indexLastOf = function(preIndex, character) {
    if(preIndex < 0)
        return this.indexOf(character);
    else
        return preIndex + 1 + this.substr(preIndex + 1).indexOf(character);
};
String.prototype.stripHtml = function() {
    return this.replace(/(<([^>]+)>)/ig,"");
};