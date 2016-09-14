package se.webpoint.data

import grails.rest.RestfulController
import grails.transaction.Transactional
import grails.web.http.HttpHeaders
import org.bson.types.ObjectId

import static org.springframework.http.HttpStatus.*

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
		log.debug " --- save PageItem: "
//        println request.reader.text

        request.JSON.each { k,v ->
            params[k] = v
            println k +':'+ v
        }
//        log.debug params.sections
//        log.debug params.sectionMetas
		PageItem instance = new PageItem(key: ObjectId.get().toHexString(), style: params.style, color: params.color);
//        Section section = new Section(params.sections[0].id);
//        instance.sections.add(params.sections[0].id);
//        println section.data
        SectionMeta sectionMeta = SectionMeta.findById(params.sectionMeta.id);
        println sectionMeta;
        instance.sectionMeta = sectionMeta;

        instance.validate()
		if (instance.hasErrors()) {
			respond instance.errors, view:'create' // STATUS CODE 422
			return
		}
        PageList pageList = PageList.findById(params.PageListId);
        pageList.pageParts.add(instance);
	    pageList.save flush:true

		String location = g.createLink( resource: 'api', absolute: true) + '/pagelist/' + params.PageListId + '/pagedata/' + instance.key
//		println location

		response.addHeader(HttpHeaders.LOCATION, location)
		respond instance, [status: CREATED]
	}
	
	
	/**
	 * Deletes a resource for the given id
	 * @param id The id
	 */
	@Transactional
	def delete() {
        log.info " --- PageItemController.delete "
        log.debug params

		PageList pageList = PageList.findById(params.PageListId);

        List<PageItem> pageParts = new ArrayList()
		Iterator itr = pageList.pageParts.iterator()
		while(itr.hasNext()){
			def pageData = itr.next() 
			if(pageData.key != params.id){
                pageParts.add(pageData)
			}
		}
        pageList.pageParts = pageParts
		pageList.save flush:true
		
		String location = g.createLink( resource: 'api', absolute: true) + '/pagelist/' + params.PageListId + '/pagedata/' + params.id

		response.addHeader(HttpHeaders.LOCATION, location)
		respond pageList, [status: NO_CONTENT]
	}
	
	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
