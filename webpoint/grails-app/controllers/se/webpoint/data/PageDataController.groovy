package se.webpoint.data


import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController
import grails.transaction.Transactional

import org.bson.types.ObjectId
import org.codehaus.groovy.grails.web.servlet.HttpHeaders



class PageDataController extends RestfulController<PageData>  {

    static responseFormats = ['json', 'xml']
	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]
	
	def camelContext
	def grailsApplictaion
	
	
	PageDataController() {
		super(PageData)
	}
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save() {  
		println " --- save PageData: " + params
		
		def instance = createResource()
		if(instance == null){
			notFound()
			return
		}
//		instance.validate()
//		if (instance.hasErrors()) {
//			respond instance.errors, view:'create' // STATUS CODE 422
//			return
//		}
//		instance.save flush:true
		
//		ObjectId objectId = ObjectId.get();
		
		
		
		PageData pageData = instance;
		pageData.key = ObjectId.get().toHexString();
		PageList pageList = PageList.findById(params.PageListId);
		pageList.pageParts.add(pageData);
		pageList.save flush:true
		
		instance.key = pageData.key;
		
		String location = g.createLink( resource: 'api', absolute: true) + '/pagelist/' + params.PageListId + '/pagedata/' + pageData.key
		println location
		
		response.addHeader(HttpHeaders.LOCATION, location)
		respond pageList, [status: CREATED]
	}

	
	
	/**
	 * Deletes a resource for the given id
	 * @param id The id
	 */
	@Transactional
	def delete() {
		println " --- delete PageData: " + params
		
		PageList pageList = PageList.findById(params.PageListId);
		def pageDatas = pageList.pageParts.takeWhile{ it.key == params.id };
		pageList.pageParts = pageList.pageParts.dropWhile{ it.key == params.id };

		pageList.save flush:true		
		
		String location = g.createLink( resource: 'api', absolute: true) + '/pagelist/' + params.PageListId + '/pagedata/' + params.id
		println location
		
		response.addHeader(HttpHeaders.LOCATION, location)
		respond pageList, [status: NO_CONTENT]
	}
	
	
	
	protected void notFound() {
		render status: NOT_FOUND 
	}
	
}
