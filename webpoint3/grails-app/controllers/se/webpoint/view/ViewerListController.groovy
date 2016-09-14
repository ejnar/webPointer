package se.webpoint.view

import grails.rest.RestfulController
import se.webpoint.data.PageItem
import se.webpoint.data.PageList
import se.webpoint.data.SectionMeta

class ViewerListController extends RestfulController<PageList> {

	
	static responseFormats = ['json', 'xml']
	static allowedMethods = []
	
    ViewerListController() {
		super(PageList, true)
	}
	
	
	/**
	 * Lists all resources up to the given maximum
	 *
	 * @param max The maximum
	 * @return A list of resources
	 */
	def index(Integer max) {
		params.max = Math.min(max ?: 10, 100)
		respond listAllResources(params), model: [("${resourceName}Count".toString()): countResources()]
	}

	/**
	 * Shows a single resource
	 * @param id The id of the resource
	 * @return The rendered resource or a 404 if it doesn't exist
	 */
	def show() {
		PageList instance = queryForResource(params.id)
		
		for(PageItem part in instance.pageParts){
			println "PageItem: "
			
			for(SectionMeta meta in part.sectionMetas){
				println "SectionMeta: "
			}
			
		}
		
		respond instance
	}
	
	
	
	
	
	
	
}
