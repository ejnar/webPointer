//= wrapped
//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates

//= require /ng-modules/ng-file-upload.min
//= require /angular/ui-bootstrap-tpls

var app = angular.module("webpoint.user", ['webpoint.core', 'ngFileUpload', 'ui.bootstrap']);

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
			GROUP: '/group',
			createViewRoleModal: '/webpoint/user/user_createViewRoleModal.html',
			createEditRoleModal: '/webpoint/user/user_createEditRoleModal.html',
			editGroupModal: '/webpoint/user/songdata_editGroupModal.html',
			ceatePageModal: '/webpoint/user/page_createPageModal.html',
			createAddGroupModal: '/webpoint/user/group_addGroupModal.html',
			updatePassModal: '/webpoint/user/menu_updatePassModal.html',
			settingModal: '/webpoint/user/menu_setting.html'
		});

app.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgAppPath', 'CONFIG',

    function ($routeProvider, $httpProvider, $logProvider, cfgAppPath, CONFIG) {
        $routeProvider.
        	when('/login', {
        		templateUrl: '/webpoint/user/login.html',
        		controller: 'LoginController as vm'
        	}).
            when( cfgAppPath.SONGDATA_LIST, {
                templateUrl: '/webpoint/user/songdata_list.html',
                controller: 'GroupOfSectionCtrl'
            }).
            when( cfgAppPath.SONGDATA_EDIT + ':groupId', {
                templateUrl: '/webpoint/user/songdata_update.html',
                controller: 'UpdateSectionDataCtrl as vm'
            }).
            when( cfgAppPath.SONGDATA_NEW, {
                templateUrl: '/webpoint/user/songdata_update.html',
                controller: 'UpdateSectionDataCtrl as vm'
            }).
            when( cfgAppPath.SONG_NEW, {   //  + ':groupId'
                templateUrl: '/webpoint/user/song_update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.SONG_EDIT, {   //  + ':groupId'
                templateUrl: '/webpoint/user/song_update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.PAGE_LIST, {
                templateUrl: '/webpoint/user/page_list.html',
                controller: 'PageListCtrl as pageList'
            }).
            when( cfgAppPath.PAGE_UPDATE + ':pageListId', {
                templateUrl: '/webpoint/user/page_update.html',
                controller: 'UpdatePageListCtrl as updatePageList'
            }).
            when( cfgAppPath.SONGS_VIEW, {
                templateUrl: '/webpoint/user/page_viewAll.html',
                controller: 'ViewAllSongsCtrl'
            }).
            when( cfgAppPath.USER_ADD , {
                templateUrl: '/webpoint/user/user_item.html',
                controller: 'AddUserCtrl as userCtrl'
            }).
            when( cfgAppPath.USER_EDIT + ':userId', {
                templateUrl: '/webpoint/user/user_item.html',
                controller: 'EditUserCtrl as userCtrl'
            }).
            when( cfgAppPath.USER, {
                templateUrl: '/webpoint/user/user_list.html',
                controller: 'UserCtrl as userCtrl'
            }).
            when( cfgAppPath.GROUP, {
                templateUrl: '/webpoint/user/user_group.html',
                controller: 'GroupCtrl as groupCtrl'
            }).
            when( '/spotify', {
                templateUrl: '/webpoint/user/spotifyList.html',
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