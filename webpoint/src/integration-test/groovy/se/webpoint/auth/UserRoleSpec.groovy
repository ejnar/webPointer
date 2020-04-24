package se.webpoint.auth

import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class UserRoleSpec extends Specification {

    void "test UserRole created"() {
        given:
        User user = User.create('UserRoleSpec', 'testersson@glocalnet.net', true)
        Role role = Role.findByAuthority("ROLE_ADMIN") ?: Role.create("ROLE_ADMIN")
        UserRole userRole = UserRole.create(user, role, true)

        expect:
        userRole != null
        userRole.getUser().username.equals('UserRoleSpec')
        true == UserRole.remove(user, role, true)

        cleanup:
        userRole.delete flush:true
        user.delete flush:true
        role.delete flush:true

    }

}
