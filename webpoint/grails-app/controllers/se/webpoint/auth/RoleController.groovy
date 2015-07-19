package se.webpoint.auth


import static org.springframework.http.HttpStatus.*
import grails.converters.JSON
import grails.transaction.Transactional;

import org.apache.commons.logging.LogFactory


@Transactional(readOnly = true)
class RoleController   { 
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST"]
	
	private static final log = LogFactory.getLog(this)
	Class<Role> resource
	
	RoleService roleService
	
	RoleController() {
		resource = Role
	}
	
	
	/**
	 * Lists all resources
	 *
	 * @return A list of resources
	 */
	def index() {
		List<Role> roles = roleService.getRoles();
		respond roles, model: [("${RoleController.class}Count".toString()): roles.size()]
	}
	
	@Transactional
	def save() {

		Role instance = createResource()
		
		Role role = new Role()
		try  {
			role = roleService.save(instance)
		} catch(e) {
			respond instance.errors, view:'create'
			return
		}
		
		respond role, [status: CREATED]
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
    protected Role queryForResource(Serializable id) {
        resource.get(id)
    }

    /**
     * Creates a new instance of the resource for the given parameters
     *
     * @param params The parameters
     * @return The resource instance
     */
    protected Role createResource(Map params) {
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
    protected Role createResource() {
        Role instance = resource.newInstance()
        bindData instance, getObjectToBind()
        instance
    }

}
