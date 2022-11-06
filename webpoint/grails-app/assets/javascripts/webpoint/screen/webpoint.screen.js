//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

//= require /angular/angular-aria
//= require /angular/angular-animate

//= require /angular-material/angular-material

var app = angular.module("webpoint.screen", ['webpoint.core', 'ngMaterial', 'ngAnimate', 'ngAria']);

app.constant(
		'cfgScreenPath', {
			SCREEN:  '/screen/',
			PAGELIST:  '/pagelist',
			print:  '/print',
            VY:  '/vy/',
            SONGLIST:  '/songList',
            SONG: '/song/',
            ABOUT: '/about',
            ADDPASS: '/pass/',
            SLIDESHOW: '/slideshow/',
            PAGELISTS: '/pagetLists'
		});

app.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgScreenPath', 'CONFIG',

    function ($routeProvider, $httpProvider, $logProvider, cfgScreenPath, CONFIG) {
        // 'static/webpoint/screen/views/auth/login.html'
        $routeProvider.
        	when('/login', {
        		templateUrl: '/webpoint/screen/login.html',
        		controller: 'LoginController as vm'
        	}).
            when( cfgScreenPath.SCREEN  + ':pageListId', {
                templateUrl: '/webpoint/screen/screen.html',
                controller: 'ScreenCtrl as vm'
            }).
            when( cfgScreenPath.SCREEN  + ':pageListId/:withoutkeys', {
                templateUrl: '/webpoint/screen/screen.html',
                controller: 'ScreenCtrl as vm'
            }).
            when( cfgScreenPath.SLIDESHOW  + ':pageListId', {
                templateUrl: '/webpoint/screen/slideshow.html',
                controller: 'SlideShowCtrl as vm'
            }).
            when( cfgScreenPath.SLIDESHOW  + ':pageListId/:withoutkeys', {
                templateUrl: '/webpoint/screen/slideshow.html',
                controller: 'SlideShowCtrl as vm'
            }).
            when( cfgScreenPath.VY  + ':group/:pages', {
                templateUrl: '/webpoint/screen/screen.html',
                controller: 'ScreenCtrl as vm'
            }).
            when( cfgScreenPath.PAGELIST, {
                templateUrl: '/webpoint/screen/list.html',
                controller: 'MainViewListCtrl as mainViewList',
                requireAuth: true,
                requireRoles: ['ROLE_ADMIN','ROLE_VIEW']
            }).
            when( cfgScreenPath.print, {
                templateUrl: '/webpoint/screen/print.html',
                controller: 'PrintCtrl'
            }).
            when( cfgScreenPath.SONGLIST, {
                templateUrl: '/webpoint/screen/songList.html',
                controller: 'SongListCtrl as vm'
            }).
//            when( cfgScreenPath.SONG + ':id', {
//                templateUrl: 'static/webpoint/screen/views/song.html',
//                controller: 'SongCtrl'
//            }).
            when( cfgScreenPath.ABOUT, {
                templateUrl: '/webpoint/screen/about.html',
                controller: 'MenuCtrl as vm'
            }).
            when( cfgScreenPath.ADDPASS  + ':token', {
                templateUrl: '/webpoint/screen/addpass.html',
                controller: 'AddPassCtrl as vm'
            }).
            when( cfgScreenPath.PAGELISTS , {
                templateUrl: '/webpoint/screen/pageLists.html',
                controller: 'PageListsCtrl as vm'
            }).
            otherwise({
                redirectTo: cfgScreenPath.PAGELIST
            });

        $logProvider.debugEnabled(CONFIG.DEBUG_LOG);
}]);
