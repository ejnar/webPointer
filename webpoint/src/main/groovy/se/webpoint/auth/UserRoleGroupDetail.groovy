package se.webpoint.auth

import grails.validation.Validateable

class UserRoleGroupDetail implements Validateable{

    String token
    RoleGroup roleGroup
    Set<RoleGroupRole> roleGroupRoles

    List<UserGroupItem> userGroupItems = new ArrayList()
    static embedded = ['userGroupItems']

    static constraints = {
        token(nullable: true)
    }

}

class UserGroupItem {

    String username
    String roleGroup
    boolean selected

    static constraints = {
    }

    String toString(){
        "${username} : ${roleGroup} : ${selected}"
    }
}
