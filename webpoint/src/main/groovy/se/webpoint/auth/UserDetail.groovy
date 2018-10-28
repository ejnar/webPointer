package se.webpoint.auth

import grails.validation.Validateable
import se.webpoint.data.BaseDomain;

class UserDetail extends BaseDomain implements Validateable{
	
	String username = ""
	String email = ""
    String authority = ""
    Set<String> authorities
	Set<String> rolegroups
    boolean enabled
	boolean passwordExpired
    boolean accountLocked
    String pazz
    String token

    Role role
    Role systemRole

    static transients = ['role', 'systemRole']

	UserDetail(){
	}

	static constraints = {
		authority(nullable: true)
        rolegroups(nullable: true)
        enabled(nullable: true)
        pazz(nullable: true)
        token(nullable: true)
	}
	
	String toString(){
		"${username}"
	}
	
}
