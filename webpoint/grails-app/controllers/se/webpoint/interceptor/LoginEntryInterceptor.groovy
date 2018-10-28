package se.webpoint.interceptor

import groovy.util.logging.Slf4j
import se.webpoint.util.EventService

@Slf4j
class LoginEntryInterceptor {

    EventService eventService

    public LoginEntryInterceptor() {
        match controller: 'Section'
//        match uri: '/static/webpoint/screen/views/auth/login*'
        matchAll()  //.excludes(controller: 'auth')
    }

    boolean before() {
        log.debug ' --- LoginEntryInterceptor.before - params: [{}]', params
//        eventService.validateRemoteHost(request.getRemoteHost())
        true
    }

    boolean after() {
        log.debug ' --- LoginEntryInterceptor.after'
        true
    }

    void afterView() {
        // no-op
    }
}
