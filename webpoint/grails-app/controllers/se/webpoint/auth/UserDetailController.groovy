package se.webpoint.auth

import grails.artefact.Artefact;
import grails.plugin.springsecurity.SpringSecurityService;
import grails.rest.RestfulController;
import grails.transaction.Transactional;

class UserDetailController extends RestfulController<UserDetail>{
	
	static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT"]
	
	UserService userService
	
	
	UserDetailController() {
		super(UserDetail)
	}
	

	/**
	 * Shows a single resource
	 * @param id The id of the resource
	 * @return The rendered resource or a 404 if it doesn't exist
	 */
	def show() {
		respond userService.getCurrentUser()
	}
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {
		println "save user: " + params
		
		def instance = createResource()
		if(instance == null){
			notFound()
			return
		}
		userService.saveUser(instance.username, instance.email, instance.authority, instance.rolegroup)
		
		respond instance
	}
}
