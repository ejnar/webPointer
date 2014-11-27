package se.webpoint.data


import static org.springframework.http.HttpStatus.*
import grails.converters.JSON
import grails.rest.RestfulController
import grails.transaction.Transactional

import org.codehaus.groovy.grails.web.servlet.HttpHeaders



class GroupOfSectionController extends RestfulController<GroupOfSection>  {

    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]
	
	def camelContext
	def grailsApplictaion
	
	
	GroupOfSectionController() {
		super(GroupOfSection)
	}
	
	
	
	def index(Integer max) {
		
//		def prop = grailsApplictaion.config['test.hello']
		
		println "index " + grailsApplication.metadata['app.name']
//		params.max = Math.min(max ?: 10, 100)
//		respond listAllResources(params), model: [("${resourceName}Count".toString()): countResources()]
		
		
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
		
		def groupOfSections = GroupOfSection.findAll()
		respond groupOfSections
	}

	
	
	def show() {
		println "show"
		respond queryForResource(params.id)
	}
	
	
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {   // GroupOfSection instance
		println "save"
		
		def instance = createResource()
		
		if(instance == null){
			notFound()
			return
		}
		
		if(handleReadOnly()) {
			return
		}

		instance.validate()
		if (instance.hasErrors()) {
			respond instance.errors, view:'create' // STATUS CODE 422
			return
		}
		
//		SectionMeta sectionMeta = new SectionMeta()
//		sectionMeta.lang = 'en'
//		sectionMeta.sectionId = section.id
//		sectionMeta.save flush:true
//		instance.sectionsMeta.add(sectionMeta)
		instance.save flush:true
		
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
		
	}


	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
