package se.webpoint.auth

import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional

import org.apache.commons.logging.LogFactory
import org.codehaus.groovy.grails.web.servlet.HttpHeaders


class UserDetailController {   // extends RestfulController<UserDetail>
	
	static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT"]
	
	private static final log = LogFactory.getLog(this)
	
	Class<UserDetail> resource
	
	UserService userService
	SpringSecurityService springSecurityService
	
	UserDetailController() {
		resource = UserDetail
	}
	
	
	
	/**
	 * Lists all resources up to the given maximum
	 *
	 * @param max The maximum
	 * @return A list of resources
	 */
	def index() {
		log.debug(" debug ---------------  log4j test password")
		println 'UserDetailController.index'
		List<UserDetail> users = new ArrayList()
		users.add(userService.getUserDetail())
		respond users, model: [("${UserDetail}Count".toString()): users.size()]
	}

	

	/**
	 * Shows a single resource
	 * @param id The id of the resource
	 * @return The rendered resource or a 404 if it doesn't exist
	 */
	def show() {
		println 'UserDetailController.show'		
		respond userService.getUserDetail()
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
		userService.saveNewUser(instance.username, instance.email, instance.authority, instance.rolegroup)
		
		respond instance
	}
	
	
	
	/**
	 * Updates a resource for the given id
	 * @param id
	 */
	def update(UserDetail instance) {
		println " --- update UserDetail: " + params.controller
	
		instance = userService.updateUser(instance.username, instance.email)
		
		String location = g.createLink( resource: 'api', action: 'user', Username: instance.username,  absolute: true)
		response.addHeader(HttpHeaders.LOCATION, location)
//		println new JsonBuilder( instance ).toPrettyString()
//		println new JSON(instance).toString()
		respond instance, [status: OK]
	}
	
	/**
	 * Creates a new instance of the resource for the given parameters
	 *
	 * @param params The parameters
	 * @return The resource instance
	 */
	protected UserDetail createResource(Map params) {
		resource.newInstance(params)
	}
	
	
}
