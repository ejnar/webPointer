package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService;
import grails.transaction.Transactional

@Transactional
class UserService {
	
	SpringSecurityService springSecurityService
	
	
	def getCurrentUserDetail(){
		User user = springSecurityService.loadCurrentUser()
		
		return new UserDetail(user.username, user.email, "", "");
	}
	
	
	
	def saveUser(String username, String email, String authority, String rolegroup){
		
		Role role = Role.findByAuthority(authority);
		RoleGroup group = RoleGroup.findByName(rolegroup);
		
		User user = User.findByUsername(username)
		
		if(user == null){
			user = new User(username: username, email: email)
			user.generatePassword()
			user.save(failOnError: true)
			
			UserRole.get(user.id, role.id) ?: UserRole.create(user, role, true)
			UserRoleGroup.get(user.id, group.id) ?: UserRoleGroup.create(user, group, true)
		}
		return user
	}
	
	

}
