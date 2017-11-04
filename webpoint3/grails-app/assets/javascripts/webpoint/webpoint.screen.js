//= wrapped
//= require /angular/angular.min
//= require /webpoint/core/webpoint.core
//= require /webpoint/screen/webpoint.screen

var app = angular.module("webpoint.main", [
	"webpoint.core",
	"webpoint.screen"
]);

console.log("webpoint.main manifest load complete.");