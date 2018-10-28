package se.webpoint.auth

import grails.compiler.GrailsCompileStatic
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import groovy.transform.TypeCheckingMode
import se.webpoint.data.BaseDomain

@GrailsCompileStatic
@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class User extends BaseDomain{

    transient springSecurityService

	String username
	String password
	String email
	Date created
	Date updated
	boolean enabled = false
	boolean accountExpired = false
	boolean accountLocked = true
	boolean passwordExpired = true

	static transients = ['springSecurityService']

	static constraints = {
		password blank: false
		username blank: false, unique: true
		email nullable: true, blank: true
		updated nullable: true
		created nullable: true
	}

	static mapping = {
		password column: '`password`'
        created nullable: true
        updated nullable: true
	}

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
	Set<RoleGroup> getAuthorities() {
		UserRoleGroup.findAllByUser(this)*.roleGroup as Set
	}

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
	Set<RoleGroup> getAuthoritiesExternal() {
        Set<RoleGroup> set = UserRoleGroup.findAllByUser(this).collect { it.roleGroup }
        set.findAll {it.system == false}
	}

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
    Set<String> getAuthoritiesInternal() {
        UserRoleGroup.findAllByUser(this).collect { it.roleGroup.name }
    }

	def beforeInsert() {
		encodePassword()
        created = updated = new Date();
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
		updated = new Date();
	}

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
	protected void generatePassword() {
		password = generatePassword(10);
	}

    @GrailsCompileStatic(TypeCheckingMode.SKIP)
    static String generatePassword(count) {
        org.apache.commons.lang.RandomStringUtils.randomAlphanumeric(count);
    }

    static User create(String username, String email, boolean flush = false) {
        def instance = new User(username: username, email: email)
        instance.generatePassword()
        instance.save (flush: flush, insert: true)
        instance
    }
}
