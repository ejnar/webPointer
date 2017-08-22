//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

//= require /angular/angular
//= require /ng-modules/ng-file-upload
//= require /angular-bootstrap/ui-bootstrap-tpls


var app = angular.module("webpoint.user", ['webpoint.core', 'ngFileUpload', 'ui.bootstrap']);

console.log("webpoint.user manifest load complete.");

app.value( 'testkey', 'testValue');

app.constant(
		'cfgAppPath', {
			SONGDATA_LIST:  '/songdata',
			SONGDATA_EDIT:	 '/songdata/edit/',
			SONGDATA_NEW:	 '/songdata/new',
			SONG_NEW: '/song/new',
			SONG_EDIT: '/song/:id',
			PAGE_LIST: '/page',
			PAGE_UPDATE: '/page/update/',
			SONGS_VIEW: '/songs/view',
			USER: '/user',
			USER_EDIT: '/user/',
			USER_ADD: '/user/add',
			ceatePageModal: 'static/webpoint/user/views/page/ceatePageModal.html'
		});

app.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgAppPath', 'CONFIG',

    function ($routeProvider, $httpProvider, $logProvider, cfgAppPath, CONFIG) {
        $routeProvider.
        	when('/login', {
        		templateUrl: 'static/webpoint/user/views/auth/login.html',
        		controller: 'LoginController as vm'
        	}).
            when( cfgAppPath.SONGDATA_LIST, {
                templateUrl: 'static/webpoint/user/views/songdata/list.html',
                controller: 'GroupOfSectionCtrl'
            }).
            when( cfgAppPath.SONGDATA_EDIT + ':groupId', {
                templateUrl: 'static/webpoint/user/views/songdata/update.html',
                controller: 'UpdateGroupSectionCtrl'
            }).
            when( cfgAppPath.SONGDATA_NEW, {
                templateUrl: 'static/webpoint/user/views/songdata/update.html',
                controller: 'UpdateGroupSectionCtrl'
            }).
            when( cfgAppPath.SONG_NEW, {   //  + ':groupId'
                templateUrl: 'static/webpoint/user/views/song/update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.SONG_EDIT, {   //  + ':groupId'
                templateUrl: 'static/webpoint/user/views/song/update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.PAGE_LIST, {
                templateUrl: 'static/webpoint/user/views/page/list.html',
                controller: 'PageListCtrl'
            }).
            when( cfgAppPath.PAGE_UPDATE + ':pageListId', {
                templateUrl: 'static/webpoint/user/views/page/update.html',
                controller: 'UpdatePageListCtrl'
            }).
            when( cfgAppPath.SONGS_VIEW, {
                templateUrl: 'static/webpoint/user/views/page/viewAll.html',
                controller: 'ViewAllSongsCtrl'
            }).
            when( cfgAppPath.USER_ADD , {
                templateUrl: 'static/webpoint/user/views/user/user.html',
                controller: 'AddUserCtrl as userCtrl'
            }).
            when( cfgAppPath.USER_EDIT + ':userId', {
                templateUrl: 'static/webpoint/user/views/user/user.html',
                controller: 'EditUserCtrl as userCtrl'
            }).
            when( cfgAppPath.USER, {
                templateUrl: 'static/webpoint/user/views/user/list.html',
                controller: 'UserCtrl as userCtrl'
            }).
            when( '/spotify', {
                templateUrl: 'static/webpoint/user/views/spotify/list.html',
                controller: 'SpotifyCtrl'
            }).
            otherwise({
                redirectTo: cfgAppPath.SONGDATA_LIST
            });

        $logProvider.debugEnabled(CONFIG.DEBUG_LOG);
//        $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://api.spotify.com/v1/**', 'http://ws.spotify.com/search/1/**']);

//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common["X-Requested-With"];
//        console.log('@X-Requested-With@'+$httpProvider.defaults.headers.common["X-Requested-With"])
    }]);