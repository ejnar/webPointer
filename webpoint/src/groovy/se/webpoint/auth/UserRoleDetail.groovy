package se.webpoint.auth

import grails.validation.Validateable



@Validateable
class UserRoleDetail {

    String currentPassword
    String newPassword
    String confirmPassword
	
	UserRoleDetail(){
	}
}
