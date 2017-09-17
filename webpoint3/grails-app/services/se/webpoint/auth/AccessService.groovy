package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import org.apache.commons.logging.LogFactory

/**
 * Created by ejnarakerman on 08/07/16.
 */
class AccessService {

    private static final log = LogFactory.getLog(this)
    SpringSecurityService springSecurityService


    def haveAccess() {
        log.debug(' --- AccessService.haveAccess')
        def user = springSecurityService.loadCurrentUser()
//        for (a in user.getAuthorities()) {
//            println a.name
//            for (b in a.getAuthorities()) {
//                println b.authority
//            }
//        }
        def authentication = springSecurityService.getAuthentication()
        def principal = springSecurityService.getPrincipal();
//        user.getAuthorities().each { println it.getAuthorities() }
        user
    }






}
