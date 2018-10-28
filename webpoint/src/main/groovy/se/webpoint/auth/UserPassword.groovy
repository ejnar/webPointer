package se.webpoint.auth

import grails.validation.Validateable
import groovy.transform.ToString
import se.webpoint.data.BaseDomain

class UserPassword extends BaseDomain implements Validateable {

    String currentPassword
    String newPassword
    String confirmPassword
    String email
    String token
	
	UserPassword(){
	}

    static constraints = {
        currentPassword(nullable: true)
        email(nullable: true)
        token(nullable: true)
    }
}
