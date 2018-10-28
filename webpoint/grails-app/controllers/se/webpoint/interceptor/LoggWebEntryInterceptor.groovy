package se.webpoint.interceptor

import groovy.util.logging.Slf4j
import se.webpoint.util.Event
import se.webpoint.util.EventService

@Slf4j
class LoggWebEntryInterceptor {

    EventService eventService

    public LoggWebEntryInterceptor() {
        match uri: '/static/webpoint/user/views/auth/login*'
        match uri: '/static/webpoint/screen/views/auth/login*'
//        matchAll()  //.excludes(controller: 'auth')
    }

    boolean before() {
        log.debug ' --- LoggInterceptor.before:'
        eventService.validateRemoteHost(request.getRemoteHost())
    }

    boolean after() {
        log.debug ' --- LoggInterceptor.after'
        true
    }

    void afterView() {
        // no-op
    }
}
