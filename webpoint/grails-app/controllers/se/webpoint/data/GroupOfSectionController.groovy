package se.webpoint.data


import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController
import grails.transaction.Transactional

import org.codehaus.groovy.grails.web.servlet.HttpHeaders



class GroupOfSectionController extends RestfulController<GroupOfSection>  {

    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]
	
	
	GroupOfSectionController() {
		super(GroupOfSection)
	}
	
	
	
	def index(Integer max) {
		println "index"
//		params.max = Math.min(max ?: 10, 100)
//		respond listAllResources(params), model: [("${resourceName}Count".toString()): countResources()]
		
		
		def groupOfSectionList = GroupOfSection.collection.find()
		def groupOfSections = groupOfSectionList.collect{it as GroupOfSection}
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
		
		Section section = new Section()
		section.lang = 'en'
		section.data = ''
		section.save flush:true
		
		instance.sections.add(section)
		instance.save flush:true
		
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
		
	}


	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
