var appDirectives = angular.module('webApp');


appDirectives.directive('whenActive', ['$location',
    function ($location) {
	    
        return {
            scope: true,
            link: function (scope, element, attrs) {
                scope.$on('$routeChangeSuccess', function () {
                    if ('#'+$location.path() == element.children().attr('href')) {
                        element.addClass('active');
                    }
                    else {
                        element.removeClass('active');
                    }
                });
            }
        };
    }]);


appDirectives.directive('shaLoadingSpinner', function() {
	console.log(' --- appDirectives.directive');
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    scope: {
      loading: '=shaLoadingSpinner'
    },
    templateUrl: 'book/views/includes/loading.html',
    link: function(scope, element, attrs) {
      var spinner = new Spinner().spin();
      var loadingContainer = element.find('.sha-loading-spinner-container')[0];
      loadingContainer.appendChild(spinner.el);
    }
  };
});