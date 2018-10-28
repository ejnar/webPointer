package se.webpoint.auth

import grails.test.mongodb.MongoSpec
import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class RoleGroupRoleSpec extends Specification {


    void "test RoleGroupRole created"() {
        when:
        Role role = Role.findByAuthority("ROLE_ADMIN") ?: Role.create("ROLE_ADMIN")
        RoleGroup roleGroup = RoleGroup.create("GROUP_TESTERSSON", true)

        then:
        roleGroup != null
        roleGroup.name.equals("GROUP_TESTERSSON")

        when:
        RoleGroupRole roleGroupRole = RoleGroupRole.create(roleGroup, role, true)

        then:
        roleGroupRole != null
        true == RoleGroupRole.remove(roleGroup, role, true)

    }
}
