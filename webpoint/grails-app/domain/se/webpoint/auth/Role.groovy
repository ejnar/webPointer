package se.webpoint.auth

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import se.webpoint.data.BaseDomain

@EqualsAndHashCode(includes='authority')
@ToString(includes='authority', includeNames=true, includePackage=false)
class Role extends BaseDomain {

	String authority;
	boolean system;
    int order;

	static mapping = {
		cache true
		system defaultValue: true
	}

	static constraints = {
		authority blank: false, unique: true
	}

	Set<Role> getRoleGroups() {
		RoleGroupRole.findAllByRole(this).collect { it.roleGroup }
	}

    static Role create(String authority, boolean system = false, int order = 0, boolean flush = false) {
		def role = new Role(authority: authority, system: system, order: order)
		role.save(flush: flush, insert: true)
        role
    }

}
