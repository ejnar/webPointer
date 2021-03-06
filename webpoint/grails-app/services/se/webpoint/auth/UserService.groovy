package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import grails.gorm.transactions.Transactional
import groovy.util.logging.Slf4j
import org.grails.web.errors.GrailsWrappedRuntimeException

@Slf4j
@Transactional
class UserService {

    SecurityService securityService
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
            user = securityService.getCurrentUser()
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

        Set<UserRole> userRoles = UserRole.findAllByUser(user);
        List<UserRole> oUserRoles = userRoles.stream().filter({ ur ->  !ur.role.system }).collect()
        List<UserRole> sUserRoles = userRoles.stream().filter({ ur ->  ur.role.system }).collect()

        String authority = "";
        if(!oUserRoles.isEmpty()){
            authority = oUserRoles[0].role.authority;
        }
        Role sRole = null;
        if(!sUserRoles.isEmpty()) {
            UserRole sUserRole = sUserRoles[0];
            if (sUserRole != null) {
                sRole = sUserRole.role
            }
        }
        Set<String> authorities = new HashSet<>();
        //authorities.addAll(oUserRoles.stream().map({r -> r.authority}).collect())
        authorities.addAll(rolegroups);
        return new UserDetail(
                id: user.id, username: user.username, token: token, authority: authority, authorities: authorities,
                enabled: user.enabled, passwordExpired: user.passwordExpired, accountLocked: user.accountLocked,
                email: user.email, rolegroups: rolegroups, systemRole: sRole)
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
        User user = updateUserSettings(instance);
        Set<UserRole> userRoles = UserRole.findAllByUser(user);
        Set<UserRole> oUserRoles = userRoles.findAll {it.role.system == false}
        Role role = Role.findByAuthority(instance.authority);
        if(oUserRoles.isEmpty()) {
            UserRole userRole = new UserRole();
            userRole.setRole(role);
            userRole.setUser(user);
            userRole.save(flush: true);
        }else{
            UserRole userRole = oUserRoles.getAt(0)
            if(oUserRoles.size() > 1){
                for (ur in oUserRoles) {
                    ur.delete flush:true
                }
            }
            if(!userRole.getRole().equals(role)) {
                userRole.setRole(role);
                userRole.save(flush: true)
            }
        }

        if(oUserRoles.size() > 1){
            log.error ' To many roles '
        }
        updateSystemRole(instance, userRoles)
        return mapUserDetail(user,null);
    }

    def updateSystemRole(instance, userRoles){
        Set<UserRole> sysUserRoles = userRoles.findAll {it.role.system == true}
        if(instance.systemRole && sysUserRoles.isEmpty()) {
            if(instance.systemRole.system) {
                Role r = Role.findByAuthority('SYS_ROLE_ADMIN');
                UserRole userRole = new UserRole()
                userRole.setUser(user);
                userRole.setRole(r);
                userRole.save(flush: true)
            }
        }else if (instance.systemRole && !sysUserRoles.isEmpty()){
            if(!instance.systemRole.system) {
                UserRole userRole = sysUserRoles.getAt(0)
                userRole.delete flush: true
            }
        }
    }

    def updateUserSettings(instance){
        User user = User.findById(instance.id)
        user.email = instance.email
        user.enabled = instance.enabled
        user.accountLocked = instance.accountLocked
        user.excludePasswordUpdate = true;
        user.save(failOnError: true)
        return user
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
        log.debug ' --- UserService.saveNewUser - instance: [{}]', instance
		Role role = Role.findByAuthority(instance.authority);
        log.debug ' --- Role: [{}]', role

		RoleGroup group = RoleGroup.findByName(instance.rolegroups[0]);
        // log.debug(group)

		User user = User.findByUsername(instance.username)
		try {
            if (user == null) {
                user = User.create(instance.username, instance.email, true)
                // log.debug(user)

				UserRole userRole = UserRole.get(user.id, role.id) ?: UserRole.create(user, role, true)
				// log.debug(userRole)

				UserRoleGroup userRoleGroup = UserRoleGroup.get(user.id, group.id) ?: UserRoleGroup.create(user, group, true)
				// log.debug(userRoleGroup)

                RoleGroup newGroup = createRoleGroup(instance.username)
                // log.debug(newGroup)

                UserRoleGroup newUserRoleGroup = addAuthorityToUserRoleGroup(user, newGroup, 1)
                // log.debug(newUserRoleGroup)
                // log.debug('-------------------------')
            }
        }catch(All){
            log.error All;
        }
		return user
	}


    @Transactional
    def UserRoleGroup addAuthorityToUserRoleGroup(user, roleGroup, allowedAuthority = 5){  // user, roleGroup
        log.debug ' --- UserService.addAuthorityToUserRoleGroup - allowedAuthority: [{}]', allowedAuthority
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
        log.debug ' --- UserService.createRoleGroup - username: [{}]', username
        def group_name = 'GROUP_' + username.toUpperCase();
        RoleGroup group = RoleGroup.findByName(group_name) ?: RoleGroup.create(group_name, true)
        return group
    }

    /**
     *
     * @param password
     * @return
     */
	def updatePassword(UserPassword password) {
		def currentUserId = securityService.currentUser().id
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
        log.debug ' --- UserService.setNewPassword - xss_token: [{}]', xss_token
        if(!xss_token){
            log.error ' --- xss_token is null'
            throw new GrailsWrappedRuntimeException()
        }

        PasswordToken token = PasswordToken.findByToken2(xss_token);
        User user = User.get(token.userId)
        if (!user) {
            log.error ' --- user is null'
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
            log.error ' --- Password and token fail to match'
            throw new GrailsWrappedRuntimeException()
        }
    }

    def getToken(String arg) {
        log.debug ' --- UserService.getToken - arg: [{}]', arg
        PasswordToken token = PasswordToken.findByToken(arg);
        if(token == null){
            log.error ' --- Password fail to match'
            throw new GrailsWrappedRuntimeException()
        }
        token.token2 = User.generatePassword(20);
        token.save flush:true

        return token;
    }



    def addAuthority(RoleGroup newGroup, Role role){
        log.debug ' --- UserService.addAuthority - newGroup: [{}]', newGroup
        RoleGroupRole.create(newGroup, roleAdmin, true)
    }


    def updateUserRoleGroup(UserRoleGroupDetail instance){
        instance.userGroupItems.each { item ->
            User user = User.findByUsername(item.username)
            RoleGroup roleGroup = RoleGroup.findByName(item.roleGroup)
            UserRoleGroup userRoleGroup = UserRoleGroup.get(user.id, roleGroup.id)
            log.debug 'item: [{}]', item
            if(item.selected) {
                UserRoleGroup.create(user, roleGroup, true)
            } else {
                UserRoleGroup.remove(user, roleGroup,true)
            }
        }
    }

}
