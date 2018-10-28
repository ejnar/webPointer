package se.webpoint.auth

import grails.gorm.transactions.Transactional
import groovy.util.logging.Slf4j

@Slf4j
@Transactional
class RoleService {

	
	@Transactional(readOnly = true)
    def getRoles() {	
		List<Role> roles = Role.findAllBySystem(false);
		return roles;
    }
	

}
