package se.webpoint.auth

import grails.validation.Validateable

class UserRoleDetail implements Validateable{

    String currentPassword
    String newPassword
    String confirmPassword
	
	UserRoleDetail(){
	}
}
