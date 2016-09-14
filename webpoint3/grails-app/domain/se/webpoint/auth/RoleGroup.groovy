package se.webpoint.auth

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import se.webpoint.data.BaseDomain

@EqualsAndHashCode(includes='name')
@ToString(includes='name', includeNames=true, includePackage=false)
class RoleGroup extends BaseDomain {

	String name
	boolean system

	static mapping = {
		cache true
		system defaultValue: false
	}

	Set<Role> getAuthorities() {
		RoleGroupRole.findAllByRoleGroup(this)*.role as Set
	}

	static constraints = {
		name blank: false, unique: true
	}

    static RoleGroup create(String name, boolean flush = false) {
        def instance = new RoleGroup(name: name)
        instance.save flush: flush   //, insert: true
        instance
    }

    static boolean remove(String sName, boolean flush = false) {
        if (sName == null) return false

        int rowCount = RoleGroup.where { name == sName }.deleteAll()

        if (flush) { RoleGroup.withSession { it.flush() } }

        rowCount
    }
	
}
