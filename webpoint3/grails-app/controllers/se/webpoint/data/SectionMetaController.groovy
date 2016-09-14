package se.webpoint.data

import grails.transaction.Transactional
import se.webpoint.rest.BasicRestController

import static org.springframework.http.HttpStatus.*

class SectionMetaController extends BasicRestController<SectionMeta>  {


	SectionMetaService sectionMetaService
    PageService pageService

	SectionMetaController() {
		super(SectionMeta)
	}


    def index(Integer max) {
        log.info " --- SectionMetaController.index:"
        params.max = Math.min(max ?: 10, 100)
//        response.status = 401
        respond listAllResources(params), model: [("${resourceName}Count".toString()): countResources()]
    }

	
	/**
	 * Saves a resource
	 */
    @Override
	@Transactional
	def save() {
        log.info " ---  SectionMetaController.save:"
        log.debug params

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

        addHeader(this.controllerName, instance.Id)
		respond instance, [status: CREATED]
	}

	/**
	 * Updates a resource for the given id
	 * @param id
	 */
    @Override
	@Transactional
	def update() {
        log.info " --- SectionMetaController.update: "
        log.debug params


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

        access()

		instance.save flush:true
		
//		ObjectId idMeta = new ObjectId(params.id);
//		GroupOfSection groupOfSections = GroupOfSection.findById(params.GroupOfSectionId);
//		def index = groupOfSections.sectionMetas.findIndexOf { it.id == idMeta } 
//		groupOfSections.sectionMetas.set(index, instance);
//		groupOfSections.save flush:true

        addHeader(this.controllerName, instance.Id)
		respond instance, [status: OK]
	}



    /**
     * Deletes a resource for the given id
     * @param id The id
     */
    @Override
    @Transactional
    def delete() {
        log.info " --- SectionMetaController.delete: "
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

        sectionMetaService.deleteSectionMeta(instance)

        render status: NO_CONTENT
    }

	
}
