package se.webpoint.auth

import grails.validation.Validateable

class RoleGroupRoleDetail implements Validateable {

    String roleGroup
    Set<Role> roles
    boolean remove

    static constraints = {
    }
}
