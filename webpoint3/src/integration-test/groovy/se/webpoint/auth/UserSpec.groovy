package se.webpoint.auth

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class UserSpec extends BaseSpecification {

    User user

    void "test User find Authorities"() {
        given:
        user = setupUser('UserSpec')

        when:
        Set<RoleGroup> roleGroups = user.getAuthorities()

        then:
        roleGroups.size() == 1
        RoleGroup r = roleGroups[0]
        r.system == false
        r.authorities.size() == 1
        r.authorities[0].authority.equals('ROLE_ADMIN')

        cleanup:
        cleanUser(user)
    }


    void "test User create"() {
        given:
        User u = User.create('UserSpecCreate', 'UserSpecCreate@glocalnet.net', true)

        expect:
        u != null
        u.username.equals('UserSpecCreate')

        cleanup:
        u.delete flush: true
    }




    void "test User find"() {
        given:
        User u = User.findByUsername('admin')

        expect:
        u != null
        u.username.equals('admin')
    }



}
