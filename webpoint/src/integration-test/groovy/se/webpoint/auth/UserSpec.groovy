package se.webpoint.auth

import grails.test.mongodb.MongoSpec
import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import se.webpoint.util.BaseSpecification
import spock.lang.Specification

@Integration
@Rollback
class UserSpec extends BaseSpecification {

    User user

    def setup() {
        user = setupUser('UserSpec')
    }

    void "test User find"() {

        expect:
        user != null
        user.username.equals('UserSpec')
    }

    void "test User find Authorities"() {
        when:
        Set<RoleGroup> roleGroups = user.getAuthorities()

        then:
        roleGroups.size() == 1
        RoleGroup r = roleGroups[0]
        r.system == false
        r.authorities.size() == 1
        r.authorities[0].authority.equals('ROLE_ADMIN')

//        cleanup:
//        cleanUser(user)
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



}
