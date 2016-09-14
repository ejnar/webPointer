//= wrapped
//= require /angular/angular
//= require /webpoint/core/webpoint.core
//= require /webpoint/user/webpoint.user
//= require /webpoint/screen/webpoint.screen


var app = angular.module("webpointApp", [
	"webpoint.core",
	"webpoint.user",
//	"webpoint.screen"
]);

console.log("webpointApp manifest load complete.");