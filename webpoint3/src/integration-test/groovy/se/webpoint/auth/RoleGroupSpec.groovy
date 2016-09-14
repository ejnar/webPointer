package se.webpoint.auth

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import spock.lang.Specification

@Integration
@Rollback
class RoleGroupSpec extends Specification {

    static Logger LOG = LoggerFactory.getLogger(RoleGroupSpec)



    void "test RoleGroup created"() {
        given:
        RoleGroup roleGroup = RoleGroup.create("RoleGroupSpec", true)

        expect:
        roleGroup != null
        roleGroup.name.equals("RoleGroupSpec")
        true == RoleGroup.remove("RoleGroupSpec", true)

    }


    void "test RoleGroup getAuthorities"() {
        given:
        RoleGroup roleGroup = RoleGroup.findByName("GROUP_ADMIN")
        Set<Role> roles = roleGroup.getAuthorities()

        expect:
        roleGroup != null
        roleGroup.name.equals("GROUP_ADMIN")
        roles.size() == 2
        Role role = roles[0]
        role != null
        role.authority.equals('ROLE_ADMIN')

    }

}
