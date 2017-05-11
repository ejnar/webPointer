'use strict';

var app = angular.module('webpoint.core');


app.filter('removeHTMLTags', [function() {
	return function(text) {
		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';  // this.replace(/(<([^>]+)>)/ig,"");
	};
}]);
