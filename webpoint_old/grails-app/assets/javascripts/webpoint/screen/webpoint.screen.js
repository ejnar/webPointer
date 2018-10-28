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
//= require /angular/angular-aria
//= require /angular/angular-animate
//= require spin.js/spin
//= require /angular/angular-spinner
//= require /angular/http-auth-interceptor
//= require /angular/ui-bootstrap-tpls
//= require /angular-material/angular-material



var app = angular.module("webpoint.screen", [
    'webpoint.core',
    'ngMaterial', 'ngAnimate', 'ngAria',
    'http-auth-interceptor', 'ngRoute', 'ngResource', 'ngSanitize', 'angularSpinner', 'ui.bootstrap']);


console.log("webpoint.screen manifest load complete.");

app.constant(
		'cfgScreenPath', {
			main:  '/screen/',
			pagelist:  '/pagelist',
			print:  '/print',
            vy:  '/vy/',
		});

app.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgScreenPath',

    function ($routeProvider, $httpProvider, $logProvider, cfgScreenPath) {
        $routeProvider.
        	when('/login', {
        		templateUrl: 'static/common/views/auth/login.html',
        		controller: 'LoginController'
        	}).
            when( cfgScreenPath.main  + ':pageListId', {
                templateUrl: 'static/webpoint/screen/views/vy.html',
                controller: 'VyCtrl'
            }).
            when( cfgScreenPath.vy  + ':group/:pages', {
                templateUrl: 'static/webpoint/screen/views/vy.html',
                controller: 'VyCtrl'
            }).
            when( cfgScreenPath.pagelist, {
                templateUrl: 'static/webpoint/screen/views/list.html',
                controller: 'MainViewListCtrl'
            }).
            when( cfgScreenPath.print, {
                templateUrl: 'static/webpoint/screen/views/print.html',
                controller: 'PrintCtrl'
            }).
            otherwise({
                redirectTo: cfgScreenPath.pagelist
            });

        $logProvider.debugEnabled(true);
}]);
