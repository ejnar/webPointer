'use strict';

/* Controllers */

var app = angular.module('userApp');

app.controller('AppController', ['$rootScope', '$scope', '$http', //'SettingsApi', 'UserApi',
    function ($rootScope, $scope, $http, SettingsApi, UserApi) {

//    	$scope.settings = SettingsApi.Setting.setting();
//    	$scope.currentUser = UserApi.User.profile();

    	$scope.logout = function () {
    		console.log('logOut called');

    		$http.post('auth/api/logout', {}, getHttpConfig()).
            	success(function () {
            		console.log('logout success');
            		$rootScope.$broadcast('event:auth-logoutRequest');
            	}).
            	error(function (data) {
            		console.log('logout error: ' + data);
            	});
    	};
}]);


app.factory('$exceptionHandler', ['$log', function ($log) {
    return function (exception, cause) {
    	$log.debug('********** - Exception: '+ exception.statusText + ' - **********');
        alert(exception);
    };
}]);


app.service('sharedProperties', function () {
	 var property = {
			 doSave: true,
//			 categories: {'Worship','Christian','Hymns'}
	 };

   return {
   	getProperty: function() {
           return property;
       }
   };
});


app.factory('tmpCash', ['$rootScope', function ($rootScope) {
	var mem = {};
    return {
        put: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
}]);



//appController.directive('showErrors', function ($timeout, showErrorsConfig) {
//    var getShowSuccess, linkFn;
//    getShowSuccess = function (options) {
//      var showSuccess;
//      showSuccess = showErrorsConfig.showSuccess;
//      if (options && options.showSuccess != null) {
//        showSuccess = options.showSuccess;
//      }
//      return showSuccess;
//    };
//    linkFn = function (scope, el, attrs, formCtrl) {
//      var blurred, inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses;
//      blurred = false;
//      options = scope.$eval(attrs.showErrors);
//      showSuccess = getShowSuccess(options);
//      inputEl = el[0].querySelector('[name]');
//      inputNgEl = angular.element(inputEl);
//      inputName = inputNgEl.attr('name');
//      if (!inputName) {
//        throw 'show-errors element has no child input elements with a \'name\' attribute';
//      }
//      inputNgEl.bind('blur', function () {
//        blurred = true;
//        return toggleClasses(formCtrl[inputName].$invalid);
//      });
//      scope.$watch(function () {
//        return formCtrl[inputName] && formCtrl[inputName].$invalid;
//      }, function (invalid) {
//        if (!blurred) {
//          return;
//        }
//        return toggleClasses(invalid);
//      });
//      scope.$on('show-errors-check-validity', function () {
//        return toggleClasses(formCtrl[inputName].$invalid);
//      });
//      scope.$on('show-errors-reset', function () {
//        return $timeout(function () {
//          el.removeClass('has-error');
//          el.removeClass('has-success');
//          return blurred = false;
//        }, 0, false);
//      });
//      return toggleClasses = function (invalid) {
//        el.toggleClass('has-error', invalid);
//        if (showSuccess) {
//          return el.toggleClass('has-success', !invalid);
//        }
//      };
//    };
//    return {
//      restrict: 'A',
//      require: '^form',
//      compile: function (elem, attrs) {
//        if (!elem.hasClass('control-group')) {
//          throw 'show-errors element does not have the \'control-group\' class';
//        }
//        return linkFn;
//      }
//    };
//  }
//);
//
//appController.provider('showErrorsConfig', function () {
//  var _showSuccess;
//  _showSuccess = false;
//  this.showSuccess = function (showSuccess) {
//    return _showSuccess = showSuccess;
//  };
//  this.$get = function () {
//    return { showSuccess: _showSuccess };
//  };
//});

