package se.webpoint.auth

import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.SpringSecurityService

import org.apache.commons.logging.LogFactory
import org.codehaus.groovy.grails.web.servlet.HttpHeaders

class AuthController { 
	
	static responseFormats = ['json', 'xml']
	static allowedMethods = [ password: "PUT"]
	
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
	
	
	
}
