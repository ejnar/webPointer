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
	
	
	
	/**
	 * Saves a resource
	 */
	@Transactional
	def save(GroupOfSection instance) {
		println "save"
		
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
		section.sections = instance
		section.save flush:true
		
		instance.sections.add(section)
		
		instance.save flush:true
		
		response.addHeader(HttpHeaders.LOCATION,
			g.createLink( resource: 'api'  , action: this.controllerName,id: instance.id, absolute: true))
		respond instance, [status: CREATED]
		
		
//		request.withFormat {
//			form multipartForm {
//				flash.message = message(code: 'default.created.message', args: [message(code: "${resourceName}.label".toString(), default: resourceClassName), instance.id])
//				redirect instance
//			}
//			'*' {
//				response.addHeader(HttpHeaders.LOCATION,
//						g.createLink(
//								resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
//								namespace: hasProperty('namespace') ? this.namespace : null ))
//				respond instance, [status: CREATED]
//			}
//		}
	}

	
	
	@Override
	protected GroupOfSection createResource() {
		println "createResource"
		GroupOfSection instance = resource.newInstance()
		
		bindData instance, getObjectToBind()
	
		instance
	}
	
	
	
	
}
