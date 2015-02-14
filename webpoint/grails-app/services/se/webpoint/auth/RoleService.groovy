package se.webpoint.auth

import grails.transaction.Transactional

@Transactional
class RoleService {
	
	@Transactional(readOnly = true)
    def getRoles() {
		
		List<Role> roles = Role.findAllBySystem(false);
		return roles;
    }
}
