package se.webpoint.data

import grails.transaction.Transactional
import grails.web.http.HttpHeaders
import se.webpoint.rest.BasicRestController

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK


class SectionController extends BasicRestController<Section> {
	
	
    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]

	def camelContext
	def grailsApplictaion
    SectionService sectionService
    PageService pageService
	
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
    @Override
	@Transactional
	def save() {
        log.info " --- SectionController.save:"
        log.debug params

        def instance = createResource()
        println instance
		if(instance == null){
			notFound()
			return
		}
        access()
        sectionService.saveSection(instance);

        response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
	}


    /**
     * Updates a resource for the given id
     * @param id
     */
    @Override
    @Transactional
    def update() {
        log.info " --- SectionController.update: "
        if(handleReadOnly()) {
            return
        }

        def instance = queryForResource(params.id)
        if (instance == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        instance.properties = getObjectToBind()

        if (instance.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond instance.errors, view:'edit' // STATUS CODE 422
            return
        }

        if(instance.data != null)
            instance.data = instance.data.expand()

        updateResource instance

        response.addHeader(HttpHeaders.LOCATION,
                g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
        respond instance, [status: OK]
    }


    /**
	 * Deletes a resource for the given id
	 * @param id The id
	 */
	@Override
	@Transactional
	def delete() {
		log.info " --- SectionController.delete: "
		log.debug params
		if(handleReadOnly()) {
			return
		}

		def instance = queryForResource(params.id)
		if (instance == null) {
			transactionStatus.setRollbackOnly()
			render status: NOT_FOUND
			return
		}
		pageService.removePagePart(params.id)

        instance.delete flush:true

        render status: NO_CONTENT
	}
	
}
