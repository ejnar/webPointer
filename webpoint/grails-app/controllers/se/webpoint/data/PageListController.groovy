package se.webpoint.data


import static org.springframework.http.HttpStatus.*
import grails.converters.JSON
import grails.rest.RestfulController
import grails.transaction.Transactional

import org.codehaus.groovy.grails.web.servlet.HttpHeaders



class PageListController extends RestfulController<PageList>  {

    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]
	
	def camelContext
	def grailsApplictaion
	
	
	PageListController() {
		super(PageList)
	}
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {  
		println "save PageList: "+ params
		
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
	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
