package se.webpoint.auth

import grails.validation.Validateable;

class UserDetail implements Validateable{
	
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
