package se.webpoint.auth

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class RoleGroupRoleSpec extends Specification {


    void "test RoleGroupRole created"() {
        given:
        Role role = Role.findByAuthority("ROLE_ADMIN")
        RoleGroup roleGroup = RoleGroup.create("GROUP_TESTERSSON", true)
        RoleGroupRole roleGroupRole = RoleGroupRole.create(roleGroup, role, true)

        expect:
        roleGroup != null
        roleGroup.name.equals("GROUP_TESTERSSON")
        roleGroupRole != null
        true == RoleGroupRole.remove(roleGroup, role, true)

        cleanup:
        roleGroup.delete flush:true
        roleGroupRole.delete flush:true
    }
}
