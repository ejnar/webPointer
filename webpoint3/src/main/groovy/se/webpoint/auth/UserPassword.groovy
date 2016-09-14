package se.webpoint.auth

import grails.validation.Validateable


class UserPassword implements Validateable{

    String currentPassword
    String newPassword
    String confirmPassword
	
	UserPassword(){
	}
}
