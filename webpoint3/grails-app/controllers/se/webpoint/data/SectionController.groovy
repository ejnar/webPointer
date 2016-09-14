package se.webpoint.data

import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.web.http.HttpHeaders

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND


class SectionController extends RestfulController<Section>  {
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]

    SectionMetaService sectionMetaService

	def camelContext
	def grailsApplictaion
    SectionService sectionService
	
	
	SectionController() {
		super(Section)
	}

	/**
	 * Shows a single resource
	 * @param id The id of the resource
	 * @return The rendered resource or a 404 if it doesn't exist
	 */
	def show() {
		log.info " --- SectionController.show:"
        respond sectionService.getSection(params.id)
	}

	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {
        log.info " --- SectionController.save:"
        log.debug params

        def instance = createResource()
		if(instance == null){
			notFound()
			return
		}
        sectionService.saveSection(instance);

        response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
	}
	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
