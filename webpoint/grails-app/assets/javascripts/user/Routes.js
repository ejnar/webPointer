/**
 * 
 */


angular.module('userApp').constant(
		'cfgAppPath', {
			groupOfSectionList:  '/groupOfSection',
			groupOfSectionEdit:	 '/groupOfSection/edit/',
			groupOfSectionNew:	 '/groupOfSection/new',
			sectionNew: '/section/new',
			sectionEdit: '/section/edit',
		});




angular.module('userApp').config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgAppPath',
    
                                  
                                         
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
            otherwise({
                redirectTo: '/groupOfSection'
            });
        
        $logProvider.debugEnabled(true);
        
//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common["X-Requested-With"];
//        console.log('@X-Requested-With@'+$httpProvider.defaults.headers.common["X-Requested-With"])
    }]);
