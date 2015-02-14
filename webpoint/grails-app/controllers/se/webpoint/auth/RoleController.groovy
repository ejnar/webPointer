package se.webpoint.auth


import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.SpringSecurityService
import grails.rest.RestfulController



class RoleController   {  // extends RestfulController<Role>
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = []
	
	SpringSecurityService springSecurityService
	RoleService roleService
	
	
	def camelContext
	def grailsApplictaion
	

	
	/**
	 * Lists all resources
	 *
	 * @return A list of resources
	 */
	def index() {
		List<Role> roles = roleService.getRoles();
		respond roles, model: [("${RoleController.class}Count".toString()): roles.size()]
	}
		
	
}
