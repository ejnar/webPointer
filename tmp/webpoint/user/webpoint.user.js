//= wrapped
//= require_self
//= require_tree controllers
//= require_tree templates

//= require /angular/angular
//= require /angular/angular-resource
//= require /angular/angular-route
//= require /angular/angular-sanitize
//= require spin.js/spin
//= require /angular/angular-spinner
//= require /angular-http-auth/http-auth-interceptor
//= require /angular-bootstrap/ui-bootstrap-tpls

//= require jquery/jquery


var app = angular.module("webpoint.user", [
    'webpoint.core',
    'http-auth-interceptor', 'ngRoute', 'ngResource', 'ngSanitize', 'angularSpinner', 'ui.bootstrap']);


console.log("webpoint.user manifest load complete.");



app.value( 'testkey', 'testValue');

app.constant(
		'cfgAppPath', {
			groupOfSectionList:  '/groupOfSection',
			groupOfSectionEdit:	 '/groupOfSection/edit/',
			groupOfSectionNew:	 '/groupOfSection/new',
			sectionNew: '/section/new',
			sectionEdit: '/section/:id',
			groupOfPagesList: '/groupOfPagesList',
			groupOfPagesUpdate: '/groupOfPagesUpdate/',
			viewAllSongs: '/viewAllSongs',
			user: '/user',
			editUser: '/edituser',
			addUser: '/adduser',
			ceatePageModal: 'static/webpoint/user/views/page/ceatePageModal.html'
		});

app.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgAppPath',

    function ($routeProvider, $httpProvider, $logProvider, cfgAppPath) {
        $routeProvider.
        	when('/login', {
        		templateUrl: 'static/common/views/auth/login.html',
        		controller: 'LoginController'
        	}).
            when( cfgAppPath.groupOfSectionList, {
                templateUrl: 'static/webpoint/user/views/groupOfSection/list.html',
                controller: 'GroupOfSectionCtrl'
            }).
            when( cfgAppPath.groupOfSectionEdit + ':groupId', {
                templateUrl: 'static/webpoint/user/views/groupOfSection/update.html',
                controller: 'UpdateGroupSectionCtrl'
            }).
            when( cfgAppPath.groupOfSectionNew, {
                templateUrl: 'static/webpoint/user/views/groupOfSection/update.html',
                controller: 'UpdateGroupSectionCtrl'
            }).
            when( cfgAppPath.sectionNew, {   //  + ':groupId'
                templateUrl: 'static/webpoint/user/views/section/update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.sectionEdit, {   //  + ':groupId'
                templateUrl: 'static/webpoint/user/views/section/update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.groupOfPagesList, {
                templateUrl: 'static/webpoint/user/views/page/list.html',
                controller: 'PageListCtrl'
            }).
            when( cfgAppPath.groupOfPagesUpdate + ':pageListId', {
                templateUrl: 'static/webpoint/user/views/page/update.html',
                controller: 'UpdatePageListCtrl'
            }).
            when( cfgAppPath.viewAllSongs, {
                templateUrl: 'static/webpoint/user/views/page/viewAll.html',
                controller: 'ViewAllSongsCtrl'
            }).
            when( cfgAppPath.addUser , {
                templateUrl: 'static/webpoint/user/views/user/addUser.html',
                controller: 'AddUserCtrl'
            }).
            when( cfgAppPath.editUser , {
                templateUrl: 'static/webpoint/user/views/user/editUser.html',
                controller: 'EditUserCtrl'
            }).
            when( cfgAppPath.user , {
                templateUrl: 'static/webpoint/user/views/user/editUser.html',
                controller: 'UserCtrl'
            }).
            when( '/spotify', {
                templateUrl: 'static/webpoint/user/views/spotify/list.html',
                controller: 'SpotifyCtrl'
            }).
            otherwise({
                redirectTo: cfgAppPath.groupOfSectionList
            });

        $logProvider.debugEnabled(true);
//        $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://api.spotify.com/v1/**', 'http://ws.spotify.com/search/1/**']);

//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common["X-Requested-With"];
//        console.log('@X-Requested-With@'+$httpProvider.defaults.headers.common["X-Requested-With"])
    }]);