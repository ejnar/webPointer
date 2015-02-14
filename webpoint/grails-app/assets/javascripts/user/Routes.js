/**
 * 
 */

var userApp = angular.module('userApp');
userApp.constant(
		'cfgAppPath', {
			groupOfSectionList:  '/groupOfSection',
			groupOfSectionEdit:	 '/groupOfSection/edit/',
			groupOfSectionNew:	 '/groupOfSection/new',
			sectionNew: '/section/new',
			sectionEdit: '/meta/:metaId/section/:id',
			groupOfPagesList: '/groupOfPagesList',
			groupOfPagesUpdate: '/groupOfPagesUpdate/',
			user: '/user',
			editEmail: '/editemail',
			addUser: '/adduser'	
		});




userApp.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgAppPath',
                                        
    function ($routeProvider, $httpProvider, $logProvider, cfgAppPath) {
        $routeProvider.
        	when('/login', {
        		templateUrl: 'common/views/auth/login.html',
        		controller: 'LoginController'
        	}).
            when( cfgAppPath.groupOfSectionList, {
                templateUrl: 'user/views/groupOfSection/list.html',             
                controller: 'GroupOfSectionCtrl'
            }).
            when( cfgAppPath.groupOfSectionEdit + ':groupId', {
                templateUrl: 'user/views/groupOfSection/update.html',
                controller: 'UpdateGroupSectionCtrl'
            }).
            when( cfgAppPath.groupOfSectionNew, {
                templateUrl: 'user/views/groupOfSection/update.html',
                controller: 'UpdateGroupSectionCtrl'
            }).
            when( cfgAppPath.sectionNew, {   //  + ':groupId'
                templateUrl: 'user/views/section/update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.sectionEdit, {   //  + ':groupId'
                templateUrl: 'user/views/section/update.html',
                controller: 'UpdateSectionCtrl'
            }).
            when( cfgAppPath.groupOfPagesList, {  
                templateUrl: 'user/views/page/list.html',
                controller: 'PageListCtrl'
            }).
            when( cfgAppPath.groupOfPagesUpdate + ':pageListId', {   
                templateUrl: 'user/views/page/update.html',
                controller: 'UpdatePageListCtrl'
            }).
            when( cfgAppPath.addUser , {   
                templateUrl: 'user/views/user/addUser.html',
                controller: 'AddUserCtrl'
            }).
            when( cfgAppPath.editEmail , {   
                templateUrl: 'user/views/user/editEmail.html',
                controller: 'EditEmailCtrl'
            }).
            when( cfgAppPath.user , {   
                templateUrl: 'user/views/user/editUser.html',
                controller: 'UserCtrl'
            }).
            when( '/spotify', {   
                templateUrl: 'user/views/spotify/list.html',
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
