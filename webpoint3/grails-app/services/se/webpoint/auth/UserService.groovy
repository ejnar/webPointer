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

    /**
     * Get one User
     *
     * @param id
     * @param doToken equal to true generate a token if token is missing and return token
     * @return
     */
    @Transactional(readOnly = true)
	def getUserDetail(id, doToken){
        def token;
        User user;
        if(id == null) {
            user = springSecurityService.getCurrentUser()
        }else{
            user = User.findById(id)
            if(doToken) {
                PasswordToken t = newPasswordToken(id)
                token = t.token;
            }
        }
        return mapUserDetail(user,token);
	}

    /**
     * Get User list
     *
     * @return
     */
    @Transactional(readOnly = true)
    def getUserDetails(){
        List<UserDetail> userDetails = new ArrayList<>()
        User.findAll().each{ u ->
            userDetails.add(mapUserDetail(u,null))
        }
        return userDetails;
    }


    private def mapUserDetail(user,token){
        Set<String> rolegroups = user.getAuthoritiesExternal()*.name

//        Set<UserRole> userRole = UserRole.findAllByUser(user);
//        userRole.each{ u ->
//            println u.user.username
//            println u.role
//        }

        return new UserDetail(
                id: user.id, username: user.username, token: token,
                enabled: user.enabled, passwordExpired: user.passwordExpired, accountLocked: user.accountLocked,
                email: user.email, rolegroups: rolegroups )
    }


    private def newPasswordToken(id){
        User user = User.findById(id);
        PasswordToken token = PasswordToken.findByUserId(user.id);
        if(token == null) {
            token = PasswordToken.create(user.id, user.email, user.generatePassword(50));
            user.enabled = true
            user.save(failOnError: true)
        }
        return token;
    }

    def update(instance){
        User user = User.findById(instance.id)
        user.email = instance.email
        user.enabled = instance.enabled
        user.accountLocked = instance.accountLocked
        user.save(failOnError: true)
        return mapUserDetail(user,null);
    }




    def updateUserEmail(String username, String email){
		User user = User.findByUsername(username)
		user.email = email
		user.save(failOnError: true)

		return new UserDetail(username: user.username, email: user.email );
	}

    /**
     * Create a new user with default settings
     *
     * @see User
     * @param instance
     * @return
     */
	def saveNewUser(instance){
		log.debug(' --- Create new user - username: '+ instance.username +
                ' authority: '+ instance.authority +' rolegroup: '+ instance.rolegroups)
		Role role = Role.findByAuthority(instance.authority);
        log.debug(role)

		RoleGroup group = RoleGroup.findByName(instance.rolegroups[0]);
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


    def setNewPassword(UserPassword password, xss_token) {
        log.debug(' --- setNewPassword ' + xss_token)
        if(!xss_token){
            log.error(' --- xss_token is null');
            throw new GrailsWrappedRuntimeException()
        }

        PasswordToken token = PasswordToken.findByToken2(xss_token);
        User user = User.get(token.userId)
        if (!user) {
            log.error(' --- user is null');
            throw new GrailsWrappedRuntimeException()
        }
        if(token.validate(user.email, password.token, xss_token)){
            user.password = password.newPassword
            user.passwordExpired = false
            user.accountLocked = false
            user.enabled = true
            user.save flush: true
            token.delete flush: true
            println user.password
        }else{
            log.error(' --- Password and token fail to match');
            throw new GrailsWrappedRuntimeException()
        }
    }

    def getToken(String arg) {
        log.debug(' --- getToken ' + arg)
        PasswordToken token = PasswordToken.findByToken(arg);
        if(token == null){
            log.error(' --- Password fail to match');
            throw new GrailsWrappedRuntimeException()
        }
        token.token2 = User.generatePassword(20);
        token.save flush:true

        return token;
    }



    def addAuthority(RoleGroup newGroup, Role role){

        RoleGroupRole.create(newGroup, roleAdmin, true)
    }


}
