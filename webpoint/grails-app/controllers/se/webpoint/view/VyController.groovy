package se.webpoint.view

import grails.web.http.HttpHeaders
import org.springframework.http.HttpStatus
import se.webpoint.data.PageList
import se.webpoint.data.PageService

class VyController {

    static responseFormats = ['json', 'xml']

    PageService pageService

    def index() {
        log.info " --- VyController.index "
        log.debug params

        PageList pageList = pageService.getPageListByGroupAndName(params.group, params.pages)

        String location = g.createLink( resource: 'api', absolute: true) + '/vy/' //+ params.PageListId + '/pagedata/' + params.id
        println location
        response.addHeader(HttpHeaders.LOCATION, location)
//        respond '', [status: NO_CONTENT]
        respond pageList, [status: HttpStatus.OK]
    }
}
