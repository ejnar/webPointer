//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

//= require /angular/angular
//= require /angular/angular-aria
//= require /angular/angular-animate

//= require /angular-material/angular-material


var app = angular.module("webpoint.screen", ['webpoint.core', 'ngMaterial', 'ngAnimate', 'ngAria']);

console.log("webpoint.screen manifest load complete.");

app.constant(
		'cfgScreenPath', {
			SCREEN:  '/screen/',
			pagelist:  '/pagelist',
			print:  '/print',
            VY:  '/vy/',
            SONGLIST:  '/songList',
            SONGITEM: '/song/',
            ABOUT: '/about',
            ADDPASS: '/pass/'
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
            when( cfgScreenPath.ADDPASS  + ':token', {
                templateUrl: 'static/webpoint/screen/views/auth/addpass.html',
                controller: 'AddPassCtrl as vm'
            }).
            otherwise({
                redirectTo: cfgScreenPath.pagelist
            });

        $logProvider.debugEnabled(CONFIG.DEBUG_LOG);
}]);
