//= wrapped
//= require /angular/angular.min
//= require /webpoint/core/webpoint.core
//= require /webpoint/user/webpoint.user

var app = angular.module("webpoint", [
	"webpoint.core",
	"webpoint.user"
]);

console.log("webpoint manifest load complete.");