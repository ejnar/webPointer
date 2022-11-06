package se.webpoint.data


import grails.web.http.HttpHeaders
import groovy.util.logging.Slf4j
import se.webpoint.auth.*

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR

import static org.springframework.http.HttpStatus.BAD_REQUEST



@Slf4j
class PageListUtilController {

	static responseFormats = ['json', 'xml']
	static allowedMethods = [ test: "GET", updatelist: "PUT"]

	PageService pageService
    SecurityService securityService

    PageListUtilController() {
	}

	def test() {
		log.debug ' --- PageListUtilController.test : '
		def user = securityService.currentUser()
		respond user, [status: OK]
	}

	/**
	 * Updates a resource for the given id
	 * @param id
	 */
	def updatelist(PageListUtil instance) {
		log.debug ' --- PageListUtilController.updatelist : [{}]', instance

		if (instance == null) {
			respond [:], [status: NOT_FOUND]
			return
		}

		try  {
			pageService.sortPageList(instance)
		} catch(e) {
			respond [:], [status: INTERNAL_SERVER_ERROR]
			return
		}
			
		String location = g.createLink( resource: 'api', action: 'pagelistutil',  Object: '',  absolute: true) + '/updatelist'
		response.addHeader(HttpHeaders.LOCATION, location)
		respond [:], [status: NO_CONTENT]
	}

}