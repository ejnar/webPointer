package se.webpoint.auth

import grails.transaction.Transactional

@Transactional
class RoleGroupService {
	
	@Transactional(readOnly = true)
    def getRoleGroups() {
		List<RoleGroup> roleGroups = RoleGroup.findAllBySystem(false);
		return roleGroups;
    }
}
