package se.webpoint.auth

import java.util.Date;

import org.bson.types.ObjectId;

class User {

	transient springSecurityService
	
	String username
	String password
	String email
	Date created
	Date updated
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
	
	static transients = ['springSecurityService']

	static constraints = {
		username blank: false, unique: true
		password blank: false
		updated nullable: true
		created nullable: true
	}

	static mapping = {
		password column: '`password`'
		updated nullable: true
		created defaultValue: "now()"
	}

	Set<RoleGroup> getAuthorities() {
		UserRoleGroup.findAllByUser(this).collect { it.roleGroup }
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
		updated = new Date();
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}
	
	protected void generatePassword() {
		password = org.apache.commons.lang.RandomStringUtils.randomAlphanumeric(10);
	}
}
