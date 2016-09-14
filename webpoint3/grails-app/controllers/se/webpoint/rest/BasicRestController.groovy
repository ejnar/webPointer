package se.webpoint.rest

import grails.rest.RestfulController
import grails.web.http.HttpHeaders
import se.webpoint.auth.AccessService

import static org.springframework.http.HttpStatus.NOT_FOUND

/**
 * Created by ejnarakerman on 08/07/16.
 */
class BasicRestController<T> extends RestfulController<T> {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    AccessService accessService

    // We need to provide the constructors, so the
    // Resource transformation works.
    BasicRestController() {
        this(T)
    }

    BasicRestController(Class<T> resource) {
        this(resource, false)
    }

    BasicRestController(Class<T> resource, boolean readOnly) {
        super(resource, readOnly)
    }




    def access() {
        log.debug " --- access"
        accessService.haveAccess()


    }

    protected void addHeader(controllerName, instanceId) {
        response.addHeader(HttpHeaders.LOCATION,
                g.createLink( resource: 'api', action: controllerName, Id: instanceId,  absolute: true))
    }

    protected void notFound() {
        render status: NOT_FOUND
    }
}
