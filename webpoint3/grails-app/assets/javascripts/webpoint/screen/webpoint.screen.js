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
//= require /angular-http-auth/http-auth-interceptor
//= require /angular-material/angular-material


var app = angular.module("webpoint.screen", [
    'webpoint.core',
    'ngMaterial', 'ngAnimate', 'ngAria',
    'http-auth-interceptor', 'ngRoute', 'ngResource', 'ngSanitize', 'angularSpinner', 'ui.bootstrap']);


console.log("webpoint.screen manifest load complete.");

app.constant(
		'cfgScreenPath', {
			SCREEN:  '/screen/',
			pagelist:  '/pagelist',
			print:  '/print',
            VY:  '/vy/',
            SONGLIST:  '/songList',
            SONGITEM: '/song/',
            ABOUT: '/about'
		});

app.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgScreenPath', 'CONFIG',

    function ($routeProvider, $httpProvider, $logProvider, cfgScreenPath, CONFIG) {
        $routeProvider.
        	when('/login', {
        		templateUrl: 'static/webpoint/screen/views/auth/login.html',
        		controller: 'LoginController as vm'
        	}).
            when( cfgScreenPath.SCREEN  + ':pageListId', {
                templateUrl: 'static/webpoint/screen/views/vy.html',
                controller: 'VyCtrl'
            }).
            when( cfgScreenPath.SCREEN  + ':pageListId/:withoutkeys', {
                templateUrl: 'static/webpoint/screen/views/vy.html',
                controller: 'VyCtrl'
            }).
            when( cfgScreenPath.VY  + ':group/:pages', {
                templateUrl: 'static/webpoint/screen/views/vy.html',
                controller: 'VyCtrl'
            }).
            when( cfgScreenPath.pagelist, {
                templateUrl: 'static/webpoint/screen/views/list.html',
                controller: 'MainViewListCtrl',
                requireAuth: true,
                requireRoles: ['ROLE_ADMIN','ROLE_VIEW']
            }).
            when( cfgScreenPath.print, {
                templateUrl: 'static/webpoint/screen/views/print.html',
                controller: 'PrintCtrl'
            }).
            when( cfgScreenPath.SONGLIST, {
                templateUrl: 'static/webpoint/screen/views/songList.html',
                controller: 'SongListCtrl'
            }).
            when( cfgScreenPath.SONGITEM + ':id', {
                templateUrl: 'static/webpoint/screen/views/song.html',
                controller: 'SongItemtCtrl'
            }).
            when( cfgScreenPath.ABOUT, {
                templateUrl: 'static/webpoint/screen/views/about.html',
                controller: 'MenuCtrl'
            }).
            otherwise({
                redirectTo: cfgScreenPath.pagelist
            });

        $logProvider.debugEnabled(CONFIG.DEBUG_LOG);
}]);
