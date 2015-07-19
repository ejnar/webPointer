package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

import org.apache.commons.logging.LogFactory
import org.codehaus.groovy.grails.web.errors.GrailsWrappedRuntimeException

@Transactional
class UserService {
	
	private static final log = LogFactory.getLog(this)
	SpringSecurityService springSecurityService
	def passwordEncoder
	
	
	@Transactional(readOnly = true)
	def getUserDetail(){
		User user = springSecurityService.getCurrentUser()
		
		return new UserDetail(username: user.username, email: user.email );
	}
	
	
	def updateUser(String username, String email){
		User user = User.findByUsername(username)
		user.email = email
		user.save(failOnError: true)
		
		return new UserDetail(username: user.username, email: user.email );
	}
	
	
	def saveNewUser(String username, String email, String authority, String rolegroup){
		log.debug(' --- Create new user')
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
	
	
	
	def updatePassword(UserPassword password) {
		def currentUserId = springSecurityService.getCurrentUser().id
		User currentUser = User.get(currentUserId)
		if (!currentUser) {
			return
		}
		if (passwordEncoder.isPasswordValid(currentUser.password, password.currentPassword, null)) {	
			if (password.newPassword.equals(password.confirmPassword)) {
				currentUser.password = password.newPassword
				currentUser.save flush:true
			} 
		}else{
			log.error(' --- Pssword fail to match');
			throw new GrailsWrappedRuntimeException()
		}

	}
	
	

}
