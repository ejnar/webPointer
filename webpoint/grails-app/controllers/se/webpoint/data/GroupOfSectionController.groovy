package se.webpoint.data

import grails.rest.RestfulController
import grails.gorm.transactions.Transactional
import grails.web.http.HttpHeaders

import static org.springframework.http.HttpStatus.*

class GroupOfSectionController extends RestfulController<GroupOfSection>  {

	def springSecurityService;
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]   // patch: "PATCH",

	def grailsApplictaion

	GroupOfSectionController() {
		super(GroupOfSection)
	}

	def index(Integer max) {
		log.debug ' --- GroupOfSectionController.index - params: [{}]', params

//		def prop = grailsApplictaion.config['test.hello']
			
//		if (camelContext.routes.size() == 0) {
//			camelContext.addRoutes(new RouteBuilder() {
//				@Override void configure() {
//					from("seda:input")
//						.filter({ it.in.body.contains('from') })
//						.to("stream:out")
//				}
//			});
//		}
		sendMessage("seda:input", "Hello, world! from dynamically added rotue")		
//		sendMessage("direct:foo", "Hello, a second new message from my Grails and Camel appliction!!!")
		
//		def groupOfSectionList = GroupOfSection.collection.find()
//		def groupOfSections = groupOfSectionList.collect{it as GroupOfSection}
//		respond groupOfSections, [status: OK]     // BAD_REQUEST
		
		params.max = Math.min(max ?: 10, 100)
		println countResources();
		respond listAllResources(params), model: [("${resourceName}Count".toString()): countResources()]
	}

	
	
	def show() {
		log.info " --- GroupOfSectionController.show: "
		respond queryForResource(params.id)
	}
	
	
	
	
	/**
	 * Saves a resource
	 */
	@Override
	@Transactional
	def save() {
		log.debug ' --- GroupOfSectionController.save - params: [{}]', params
//		println request.reader.text
		def instance = createResource()
		if(instance == null){
			notFound()
			return
		}
	
		instance.validate()
		if (instance.hasErrors()) {
			respond instance.errors, view:'create' // STATUS CODE 422
			return
		}
		instance.save flush:true
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
		
	}

	
	
	@Override
	@Transactional
	def update() {
		log.debug ' --- GroupOfSectionController.update - params: [{}]', params

		GroupOfSection instance = GroupOfSection.findById(params.id);
		println instance.getTimestamp();
		if (instance == null) {
			notFound()
			return
		}
		
		instance.properties = getObjectToBind();
		
		if (instance.hasErrors()) {
			respond instance.errors, view:'edit' // STATUS CODE 422
			return
		}
		instance.save flush:true
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: OK]
		
	}

	
	/**
	 * Deletes a resource for the given id
	 * @param id The id
	 */
	@Transactional
	def delete() {
        log.debug ' --- GroupOfSectionController.delete - params: [{}]', params

		GroupOfSection instance = GroupOfSection.findById(params.id);
		if (instance == null) {
			notFound()
			return
		}
		for(section in instance.sections){
			section.delete flush:true
		}
		instance.delete flush:true
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: NO_CONTENT]
	}

	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
