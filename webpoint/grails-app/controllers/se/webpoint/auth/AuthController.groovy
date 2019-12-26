package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import grails.web.http.HttpHeaders
import groovy.util.logging.Slf4j
import org.bson.types.ObjectId

import static org.springframework.http.HttpStatus.OK

@Slf4j
class AuthController { 
	
	static responseFormats = ['json', 'xml']
	static allowedMethods = [ userrole: "GET", password: "PUT"]
	
	UserService userService
    SecurityService securityService
	
	AuthController() {
	}

	
	/**
	 * Updates a resource for the given id
	 * @param id
	 */
	def password(UserPassword instance) {
		log.debug ' --- AuthController.password - UserPassword: [{}]', instance

		try  {
			userService.updatePassword(instance)
		} catch(e) {
			respond instance.errors, view:'edit'
			return
		}
			
		String location = g.createLink( resource: 'api', action: 'auth',  UserPassword: '',  absolute: true) + '/password'
		response.addHeader(HttpHeaders.LOCATION, location)
		respond new UserPassword(), [status: OK]
	}

    /**
     * Get all roles from user and groups excluded system roles
     * @return
     */
	def userrole() {
		log.debug ' --- AuthController.userrole '
		def user = securityService.currentUser()

        Set<Role> allRoles = new HashSet<>(8);
        allRoles.addAll( UserRole.findAllByUser(user.id).stream().map({u -> u.role}).collect() );

		List<Role> roles = allRoles.stream().filter({ it.system == false }).collect()
		Role role = null;
		if(roles.isEmpty()) {
			List<RoleGroup> roleGroups = UserRoleGroup.findAllByUser(user.id).stream().map({ u -> u.roleGroup }).collect();
			roleGroups.each {
				allRoles.addAll(it.authorities);
			}

			roles = allRoles.stream().filter({
				it.system == false
			}).sorted({ a, b -> a.order.compareTo(b.order) }).collect()
			role = !roles.isEmpty() ? roles[0] : new Role(authority: 'ROLE_DEFAULT')
		} else {
			role = roles[0];
		}
		respond role, [status: OK]
	}

//    def print(Set<Role> allRoles){
//        allRoles.each {
//            println it.authority
//        }
//        println '---------';
//    }

}
