package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import groovy.util.logging.Slf4j

/**
 * Created by ejnarakerman on 08/07/16.
 */
@Slf4j
class AccessService {

    SpringSecurityService springSecurityService


    def haveAccess() {
        log.debug ' --- AccessService.haveAccess '
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
