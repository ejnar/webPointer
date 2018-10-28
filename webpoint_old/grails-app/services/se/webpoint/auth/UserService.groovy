package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import org.apache.commons.logging.LogFactory
import org.grails.web.errors.GrailsWrappedRuntimeException
//import org.springframework.boot.cli.util.Log

@Transactional
class UserService {
	
	private static final log = LogFactory.getLog(this)
	SpringSecurityService springSecurityService
	def passwordEncoder
	
	
	@Transactional(readOnly = true)
	def getUserDetail(){
		User user = springSecurityService.getCurrentUser()
		log.debug(user);
		return new UserDetail(username: user.username, email: user.email );
	}
	
	
	def updateUser(String username, String email){
		User user = User.findByUsername(username)
		user.email = email
		user.save(failOnError: true)
		
		return new UserDetail(username: user.username, email: user.email );
	}
	
	
	def saveNewUser(instance){
		log.debug(' --- Create new user - username: '+ instance.username +
                ' authority: '+ instance.authority +' rolegroup: '+ instance.rolegroup)
		Role role = Role.findByAuthority(instance.authority);
        log.debug(role)
		RoleGroup group = RoleGroup.findByName(instance.rolegroup);
        log.debug(group)
		
		User user = User.findByUsername(instance.username)
		try {
            if (user == null) {
                user = User.create(instance.username, instance.email, true)
                log.debug(user)

				UserRole userRole = UserRole.get(user.id, role.id) ?: UserRole.create(user, role, true)
				log.debug(userRole)
				UserRoleGroup userRoleGroup = UserRoleGroup.get(user.id, group.id) ?: UserRoleGroup.create(user, group, true)
				log.debug(userRoleGroup)

                RoleGroup newGroup = createRoleGroup(instance.username)
                log.debug(newGroup)

                UserRoleGroup newUserRoleGroup = addAuthorityToUserRoleGroup(user, newGroup, 1)
                log.debug(newUserRoleGroup)
                log.debug('-------------------------')
            }
        }catch(All){
            Log.error(All)
        }
		return user
	}


    @Transactional
    def UserRoleGroup addAuthorityToUserRoleGroup(user, roleGroup, allowedAuthority = 5){  // user, roleGroup
        println 'addAuthorityToGroup'
        if(user == null || roleGroup == null)
            throw new GrailsWrappedRuntimeException()

        List<Role> list = Role.findAll().sort{it.order};
        for (role in list){
            if(allowedAuthority <= role.order) {
                RoleGroupRole.create(roleGroup, role, true)
            }
        }
        return UserRoleGroup.create(user, roleGroup, true)
    }



    /**
     *
     * @param username
     * @return
     */
    @Transactional
	def createRoleGroup(username){
        log.debug(username)
        def group_name = 'GROUP_' + username.toUpperCase();
        RoleGroup group = RoleGroup.findByName(group_name) ?: RoleGroup.create(group_name, true)
        log.debug(group)
        return group
    }

    /**
     *
     * @param password
     * @return
     */
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

    def addAuthority(RoleGroup newGroup, Role role){

        RoleGroupRole.create(newGroup, roleAdmin, true)
    }


}
