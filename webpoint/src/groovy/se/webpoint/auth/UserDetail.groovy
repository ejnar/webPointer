package se.webpoint.auth

import grails.validation.Validateable;

@Validateable
class UserDetail  {
	
	String username = ""
	String email = ""
	String authority = ""
	String rolegroup = ""
	
	UserDetail(){
	}

	static constraints = {
		authority(nullable: true)
		rolegroup(nullable: true)
	}
	
	String toString(){
		"${username}"
	}
	
}
