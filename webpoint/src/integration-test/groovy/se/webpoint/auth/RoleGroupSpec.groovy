package se.webpoint.auth

import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class RoleGroupSpec extends Specification {


    void "test RoleGroup created"() {
        when:
        RoleGroup roleGroup = RoleGroup.create("RoleGroupSpec1", true)

        then:
        roleGroup != null
        roleGroup.name.equals("RoleGroupSpec1")
        true == RoleGroup.remove("RoleGroupSpec1", true)

    }


//    void "test RoleGroup getAuthorities"() {
//        when:
//        RoleGroup roleGroup = RoleGroup.create("RoleGroupSpec2", true)
//        Set<Role> roles = roleGroup.getAuthorities()
//
//        then:
//        roleGroup != null
//        roleGroup.name.equals("RoleGroupSpec2")
//        roles.size() == 2
//        Role role = roles[0]
//        role != null
//        role.authority.equals('ROLE_ADMIN')
//
//    }

}
