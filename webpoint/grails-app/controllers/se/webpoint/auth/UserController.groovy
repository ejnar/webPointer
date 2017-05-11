package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import grails.rest.RestfulController
import grails.transaction.Transactional
import org.springframework.http.HttpStatus

class UserController extends RestfulController<User>  {
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH"]
	
	UserService userService;
	
	SpringSecurityService springSecurityService
	
	def camelContext
	def grailsApplictaion
	
	
	UserController() {
		super(User)
	}
	
	
	/**
	 * Lists one resource
	 *
	 * @param max The maximum
	 * @return A list of resources
	 */
	def index(Integer max) {
		
		User user = springSecurityService.loadCurrentUser()
		List list = new ArrayList()
		list.add(user)
		respond list
	}
		
	
	/**
	 * Shows a single resource
	 * @param id The id of the resource
	 * @return The rendered resource or a 404 if it doesn't exist
	 */
	def show() {
		User user = springSecurityService.loadCurrentUser()
		respond user
	}
	
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {
		println "save user: " + params
		if(handleReadOnly()) {
			return
		}
		def instance = createResource()

		instance.validate()
		if (instance.hasErrors()) {
			respond instance.errors, view:'create' // STATUS CODE 422
			return
		}
		instance.generatePassword();
		println instance.password
//		instance.save flush:true

		respond instance
	}

	/**
	 * Updates a resource for the given id
	 * @param id
	 */
	@Transactional
	def update() {
		if(handleReadOnly()) {
			return
		}

		def instance = queryForResource(params.id)
		if (instance == null) {
			notFound()
			return
		}

		instance.properties = getObjectToBind()

		if (instance.hasErrors()) {
			respond instance.errors, view:'edit' // STATUS CODE 422
			return
		}

		instance.save flush:true
		
		respond instance
	}

	
	
	protected void notFound() {
		render status: HttpStatus.NOT_FOUND
	}
	
}
