package se.webpoint.auth

import grails.validation.Validateable



@Validateable
class UserPassword {

    String currentPassword
    String newPassword
    String confirmPassword
	
	UserPassword(){
	}
}
