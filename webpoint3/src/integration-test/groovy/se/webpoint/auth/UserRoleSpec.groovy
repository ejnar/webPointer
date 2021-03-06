package se.webpoint.auth

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class UserRoleSpec extends Specification {

    void "test UserRole created"() {
        given:
        User user = User.create('UserRoleSpec', 'testersson@glocalnet.net', true)
        Role role = Role.findByAuthority("ROLE_ADMIN")
        UserRole userRole = UserRole.create(user, role, true)

        expect:
        userRole != null
        userRole.getUser().username.equals('UserRoleSpec')
        true == UserRole.remove(user, role, true)

        cleanup:
        user.delete flush:true

    }

}
