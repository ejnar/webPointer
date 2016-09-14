/**
 * 
 */

var userApp = angular.module('userApp');
userApp.constant(
		'cfgAppPath', {
			main:  '/main/',
			pagelist:  '/pagelist',
			
		});

userApp.config(['$routeProvider', '$httpProvider', '$logProvider', 'cfgAppPath',
                                        
    function ($routeProvider, $httpProvider, $logProvider, cfgAppPath) {
        $routeProvider.
        	when('/login', {
        		templateUrl: 'common/views/auth/login.html',
        		controller: 'LoginController'
        	}).
            when( cfgAppPath.main  + ':pageListId', {
                templateUrl: 'mainViews/views/first/main.html',             
                controller: 'MainViewListCtrl'
            }).
            when( cfgAppPath.pagelist, {
                templateUrl: 'mainViews/views/first/list.html',             
                controller: 'MainViewListCtrl'
            }).
            otherwise({
                redirectTo: cfgAppPath.pagelist
            });
        
        $logProvider.debugEnabled(true);
        
//        $httpProvider.defaults.useXDomain = true;
//        delete $httpProvider.defaults.headers.common["X-Requested-With"];
//        console.log('@X-Requested-With@'+$httpProvider.defaults.headers.common["X-Requested-With"])
    }]);
