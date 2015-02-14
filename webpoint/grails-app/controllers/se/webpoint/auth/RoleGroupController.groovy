package se.webpoint.auth


import static org.springframework.http.HttpStatus.*
import grails.plugin.springsecurity.SpringSecurityService
import grails.rest.RestfulController
import grails.transaction.Transactional



class RoleGroupController extends RestfulController<RoleGroup>  {
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT"]
	
	SpringSecurityService springSecurityService
	
	def camelContext
	def grailsApplictaion
	RoleGroupService roleGroupService
	
	RoleGroupController() {
		super(RoleGroup)
	}
		
	/**
	 * Lists all resources up to the given maximum
	 *
	 * @param max The maximum
	 * @return A list of resources
	 */
	def index() {
		List<RoleGroup> roleGroups = roleGroupService.getRoleGroups();
		respond roleGroups, model: [("${resourceName}Count".toString()): roleGroups.size()]
	}
	
	
   /**
     * Shows a single resource
     * @param id The id of the resource
     * @return The rendered resource or a 404 if it doesn't exist
     */
    def show() {
        respond queryForResource(params.id)
    }
	
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {
		if(handleReadOnly()) {
			return
		}
		def instance = createResource()

		instance.validate()
		if (instance.hasErrors()) {
			respond instance.errors, view:'create' // STATUS CODE 422
			return
		}

		instance.save flush:true

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
		render status: NOT_FOUND 
	}
	
}
