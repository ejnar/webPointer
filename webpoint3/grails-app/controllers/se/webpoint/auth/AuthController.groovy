package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import grails.web.http.HttpHeaders
import org.apache.commons.logging.LogFactory
import org.bson.types.ObjectId

import static org.springframework.http.HttpStatus.OK

class AuthController { 
	
	static responseFormats = ['json', 'xml']
	static allowedMethods = [ userrole: "GET", password: "PUT"]
	
	private static final log = LogFactory.getLog(this)
	
	UserService userService
	SpringSecurityService springSecurityService
	
	AuthController() {
	}

	
	/**
	 * Updates a resource for the given id
	 * @param id
	 */
	def password(UserPassword instance) {  //  
		log.debug(" --- update password  " + instance.currentPassword);
		
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


	def userrole() {
        log.debug " --- userrole: "
		def user = springSecurityService.getCurrentUser()
		List<UserRole> list = UserRole.findAllByUser(user.id)
        List<UserRole> userRoles = list.findAll {it.role.system == false}      //stream().filter({ it.role.system == false }).collect()
        Role role  = !userRoles.isEmpty() ? userRoles[0].role : null
		respond role, [status: OK]
	}


	
}
