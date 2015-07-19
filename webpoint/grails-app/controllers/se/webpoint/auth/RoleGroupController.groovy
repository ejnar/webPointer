package se.webpoint.auth


import static org.springframework.http.HttpStatus.*

import java.io.Serializable;
import java.util.Map;

import grails.plugin.springsecurity.SpringSecurityService
import grails.rest.RestfulController
import grails.transaction.Transactional


@Transactional(readOnly = true)
class RoleGroupController  {   // extends RestfulController<RoleGroup>
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST"]
	
	SpringSecurityService springSecurityService
	
	def camelContext
	def grailsApplictaion
	
	Class<RoleGroup> resource
	
	RoleGroupService roleGroupService
	
	RoleGroupController() {
		resource = RoleGroup
	}
		
	/**
	 * Lists all resources up to the given maximum
	 *
	 * @param max The maximum
	 * @return A list of resources
	 */
	def index() {
		List<RoleGroup> roleGroups = roleGroupService.getRoleGroups();
		respond roleGroups, model: [("${RoleGroup}Count".toString()): roleGroups.size()]
	}
	
	
   /**
     * Shows a single resource
     * @param id The id of the resource
     * @return The rendered resource or a 404 if it doesn't exist
     */
    def show() {
        respond queryForResource(params.id)
    }
	
	
	@Transactional
	def save() {

		RoleGroup instance = createResource()
		
		RoleGroup group = new RoleGroup()
		try  {
			group = roleGroupService.save(instance)
		} catch(e) {
			respond instance.errors, view:'create'
			return
		}
		
		respond group, [status: CREATED]
	}
	
	
	/**
	 * The object that can be bound to a domain instance.  Defaults to the request.  Subclasses may override this
	 * method to return anything that is a valid second argument to the bindData method in a controller.  This
	 * could be the request, a {@link java.util.Map} or a {@link org.grails.databinding.DataBindingSource}.
	 *
	 * @return the object to bind to a domain instance
	 */
	protected getObjectToBind() {
		request
	}

	/**
	 * Queries for a resource for the given id
	 *
	 * @param id The id
	 * @return The resource or null if it doesn't exist
	 */
	protected RoleGroup queryForResource(Serializable id) {
		resource.get(id)
	}

	/**
	 * Creates a new instance of the resource for the given parameters
	 *
	 * @param params The parameters
	 * @return The resource instance
	 */
	protected RoleGroup createResource(Map params) {
		resource.newInstance(params)
	}
	
	/**
	 * Creates a new instance of the resource.  If the request
	 * contains a body the body will be parsed and used to
	 * initialize the new instance, otherwise request parameters
	 * will be used to initialized the new instance.
	 *
	 * @return The resource instance
	 */
	protected RoleGroup createResource() {
		RoleGroup instance = resource.newInstance()
		bindData instance, getObjectToBind()
		instance
	}
	
	
	
	
	
	
	
	
//	/**
//	 * Saves a resource
//	 */
//	@Transactional
//	def save() {
//		if(handleReadOnly()) {
//			return
//		}
//		def instance = createResource()
//
//		instance.validate()
//		if (instance.hasErrors()) {
//			respond instance.errors, view:'create' // STATUS CODE 422
//			return
//		}
//
//		instance.save flush:true
//
//		respond instance
//	}
//
//	/**
//	 * Updates a resource for the given id
//	 * @param id
//	 */
//	@Transactional
//	def update() {
//		if(handleReadOnly()) {
//			return
//		}
//
//		def instance = queryForResource(params.id)
//		if (instance == null) {
//			notFound()
//			return
//		}
//
//		instance.properties = getObjectToBind()
//
//		if (instance.hasErrors()) {
//			respond instance.errors, view:'edit' // STATUS CODE 422
//			return
//		}
//
//		instance.save flush:true
//		
//		respond instance
//	}
//
//	
//	
//	protected void notFound() {
//		render status: NOT_FOUND 
//	}
	
}
