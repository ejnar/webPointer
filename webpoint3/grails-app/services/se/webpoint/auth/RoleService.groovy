package se.webpoint.auth

import grails.transaction.Transactional
import org.apache.commons.logging.LogFactory

@Transactional
class RoleService {
	
	private static final log = LogFactory.getLog(this)
	
	@Transactional(readOnly = true)
    def getRoles() {	
		List<Role> roles = Role.findAllBySystem(false);
		return roles;
    }
	

}
