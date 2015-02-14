package se.webpoint.auth


class RoleGroup {
	
	String name
	boolean system;

	static mapping = {
		cache true
		system defaultValue: true
	}

	Set<Role> getAuthorities() {
		RoleGroupRole.findAllByRoleGroup(this).collect { it.role }
	}

	static constraints = {
		name blank: false, unique: true
	}
	
	String toString(){
		name
	}
	
}
