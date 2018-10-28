package se.webpoint.data

import grails.rest.RestfulController
import grails.gorm.transactions.Transactional
import grails.web.http.HttpHeaders

import static org.springframework.http.HttpStatus.*

class PageListController extends RestfulController<PageList>  {

    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]

//    def camelContext
//	def grailsApplictaion

    PageService pageService

	
	PageListController() {
		super(PageList)
	}

    /**
     * Lists all resources up to the given maximum
     *
     * @param max The maximum
     * @return A list of resources
     */
    def index(Integer max) {
        log.info " --- PageListController.index: "

        Set<PageList> pageLists = pageService.getAllPageLists();

        params.max = Math.min(max ?: 10, 100)
        respond pageLists, model: [("${resourceName}Count".toString()): pageLists.size()]
    }
	
	/**
	 * Shows a single resource
	 * @param id The id of the resource
	 * @return The rendered resource or a 404 if it doesn't exist
	 */
	def show() {
        log.info " --- PageListController.show: " + params
//		println request.reader.text
		PageList list = pageService.getPageList(params.id);

		respond list, [status: OK]
	}
	
	
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {
		log.debug ' --- PageListController.save - params: [{}]', params

		def instance = createResource()	
		if(instance == null){
			notFound()
			return
		}
        pageService.savePageList(instance)

		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
	}
	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
