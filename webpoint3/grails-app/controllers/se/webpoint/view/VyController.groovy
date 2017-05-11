package se.webpoint.view

import grails.web.http.HttpHeaders
import se.webpoint.data.PageList
import se.webpoint.data.PageService

import static org.springframework.http.HttpStatus.OK

class VyController {

    static responseFormats = ['json', 'xml']

    PageService pageService

    def index() {
        log.info " --- VyController.index "
        log.debug params

        PageList pageList = pageService.getPageListByGroupAndName(params.group, params.pages)
        println pageList.pageParts[0].section.data
        println pageList.pageParts[1].section.data

        String location = g.createLink( resource: 'api', absolute: true) + '/vy/' //+ params.PageListId + '/pagedata/' + params.id
        println location
        response.addHeader(HttpHeaders.LOCATION, location)
//        respond '', [status: NO_CONTENT]
        respond pageList, [status: OK]
    }
}
