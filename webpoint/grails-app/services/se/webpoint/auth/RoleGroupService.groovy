package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

import org.apache.commons.logging.LogFactory
import org.codehaus.groovy.grails.web.errors.GrailsWrappedRuntimeException

@Transactional
class RoleGroupService {
	
	private static final log = LogFactory.getLog(this)
	SpringSecurityService springSecurityService
	
	
	@Transactional(readOnly = true)
    def getRoleGroups() {
		List<RoleGroup> roleGroups = RoleGroup.findAllBySystem(false);
		return roleGroups;
    }
	
	
	
	@Transactional
	def save(RoleGroup instance){
		log.debug(' --- Create new RoleGroup ' + instance.name)
		
		instance.validate()
		if (instance.hasErrors()) {
			throw new GrailsWrappedRuntimeException()
		}
		
		RoleGroup group = RoleGroup.findByName(instance.name);
		
		if(group == null){
			
			def currentUserId = springSecurityService.getCurrentUser().id
			User currentUser = User.get(currentUserId)
			if (!currentUser) {
				throw new GrailsWrappedRuntimeException()
			}
			
			group = new RoleGroup(name: instance.name, system: false)
			group.save flush:true
			
			Role roleAdmin = Role.findByAuthority("ROLE_ADMIN")
			
			RoleGroupRole.create(group, roleAdmin, true)
			UserRoleGroup.create(currentUser, group, true)
				
		}
		
		return group
	}
	
}
