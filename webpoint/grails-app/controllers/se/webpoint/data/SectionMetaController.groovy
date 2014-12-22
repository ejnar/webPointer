package se.webpoint.data


import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController
import grails.transaction.Transactional

import org.codehaus.groovy.grails.web.servlet.HttpHeaders



class SectionMetaController extends RestfulController<SectionMeta>  {

    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
	
	
	
	SectionMetaController() {
		super(SectionMeta)
	}
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {  
		println "save SectionMeta: " + params
		
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
		Section section = instance.section
		
		section.save flush:true
		
		instance.section = section 
		instance.save flush:true
		
		GroupOfSection groupOfSections = GroupOfSection.findById(params.GroupOfSectionId);
		groupOfSections.sectionMetas.add(instance);
		groupOfSections.save flush:true
		
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,GroupOfSectionId: params.GroupOfSectionId,  absolute: true))
		respond instance, [status: CREATED]
	}

	/**
	 * Updates a resource for the given id
	 * @param id
	 */
	@Transactional
	def update() {
	
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
		
		GroupOfSection groupOfSections = GroupOfSection.findById(params.GroupOfSectionId);
		def index = groupOfSections.sectionMetas.findIndexOf { it.id == params.id }  // =~
		groupOfSections.sectionMetas.set(index, instance);
		groupOfSections.save flush:true
		
//		api/groupsofsections/:groupId/sectionmetas/:Id
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api/groupsofsections/'+params.GroupOfSectionId , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: OK]
	}

	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
