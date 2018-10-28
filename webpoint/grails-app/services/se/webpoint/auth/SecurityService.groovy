package se.webpoint.auth

import grails.plugin.springsecurity.SpringSecurityService
import groovy.util.logging.Slf4j

@Slf4j
class SecurityService {

    SpringSecurityService springSecurityService


    def Set<RoleGroup> currentUserAuthorities(){
        log.debug ' --- SecurityService.currentUserAuthorities'
        User user = springSecurityService.loadCurrentUser()
        Set<RoleGroup> authorities = user.getAuthorities()
        return authorities
    }

    def Set<RoleGroup> currentUserExternalAuthorities(){
        log.debug ' --- SecurityService.currentUserExternalAuthorities'
        User user = springSecurityService.loadCurrentUser()
        Set<RoleGroup> authorities = user.getAuthoritiesExternal()
        return authorities
    }

    def currentUser(){
        log.debug ' --- SecurityService.currentUser'
        def user = springSecurityService.getCurrentUser()
        log.debug ' User: [{}]', user
        return user
    }
}
