package se.webpoint.view

import grails.web.http.HttpHeaders
import groovy.util.logging.Slf4j
import se.webpoint.data.PageList
import se.webpoint.data.PageService

import static org.springframework.http.HttpStatus.OK

@Slf4j
class VyController {

    static responseFormats = ['json', 'xml']

    PageService pageService

    def index() {
        log.debug ' --- VyController.index - params: [{}]', params

        PageList pageList = pageService.getPageListByGroupAndName(params.group, params.pages)
        println pageList.pageParts[0].section.data
        println pageList.pageParts[1].section.data

        String location = g.createLink( resource: 'api', absolute: true) + '/vy/' //+ params.PageListId + '/pagedata/' + params.id
        response.addHeader(HttpHeaders.LOCATION, location)
//        respond '', [status: NO_CONTENT]
        respond pageList, [status: OK]
    }
}
