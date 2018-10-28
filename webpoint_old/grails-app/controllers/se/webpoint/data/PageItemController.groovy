package se.webpoint.data

import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.web.http.HttpHeaders
import org.springframework.http.HttpStatus

class PageItemController extends RestfulController<PageItem>  {

    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]

//	def camelContext
	def grailsApplictaion
	PageService pageService

    PageItemController() {
		super(PageItem)
	}

//	/**
//	 * Shows a single resource
//	 * @param id The id of the resource
//	 * @return The rendered resource or a 404 if it doesn't exist
//	 */
//	def show() {
//		println " --- PageItemController.show: " + params
////		println request.reader.text
//
//		PageList list = pageService.getPageList(params.id);
//
//		respond list, [status: OK]
//	}

	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {  
		log.info " --- save PageItem: "
		log.debug params
//        println request.reader.text

        request.JSON.each { k,v ->
            params[k] = v
//            println k +':'+ v
        }
		PageItem instance = pageService.addPageItem(params.style,params.color,params.section.id,params.PageListId)

		String location = g.createLink( resource: 'api', absolute: true) + '/pagelist/' + params.PageListId + '/pagedata/' + instance.key
//		println location

		response.addHeader(HttpHeaders.LOCATION, location)
		respond instance, [status: HttpStatus.CREATED]
	}
	
	
	/**
	 * Deletes a resource for the given id
	 * @param id The id
	 */
	@Transactional
	def delete() {
        log.info " --- PageItemController.delete "
        log.debug params

		PageList pageList = pageService.removePageItem(params.id, params.PageListId)
		
		String location = g.createLink( resource: 'api', absolute: true) + '/pagelist/' + params.PageListId + '/pagedata/' + params.id

		response.addHeader(HttpHeaders.LOCATION, location)
		respond pageList, [status: HttpStatus.NO_CONTENT]
	}
	
	
	
	protected void notFound() {
		render status: HttpStatus.NOT_FOUND
	}
	
}
