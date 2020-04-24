package se.webpoint.auth

import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import se.webpoint.util.BaseSpecification

@Integration
@Rollback
class UserRoleGroupSpec extends BaseSpecification {


    void "test UserRoleGroup findAllByUser"() {
        given:
        User u = User.create('UserRoleGroupSpec1', 'test@glocalnet.net', true)
        RoleGroup rGroup = RoleGroup.create(u.username, true)
        UserRoleGroup uRoleGroup = UserRoleGroup.create(u, rGroup, true)

        when:
        Set<RoleGroup> roleGroups = UserRoleGroup.findAllByUser(u)*.roleGroup as Set

        then:
        roleGroups != null
        roleGroups[0].name.equals('UserRoleGroupSpec1')

        cleanup:
        uRoleGroup.delete flush:true
        rGroup.delete flush:true
        u.delete flush:true
    }

    void "test UserRoleGroup created"() {
        given:
        User u = User.create('UserRoleGroupSpec2', 'test@glocalnet.net', true)
        RoleGroup rGroup = RoleGroup.create(u.username, true)
        UserRoleGroup uRoleGroup = UserRoleGroup.create(u, rGroup, true)


        expect:
        uRoleGroup != null
        true == UserRoleGroup.remove(u, rGroup, true)

        cleanup:
        rGroup.delete flush:true
        u.delete flush:true
    }

    void "test UserRoleGroup remove"() {
        given:
        User u = User.create('UserRoleGroupSpec3', 'test@glocalnet.net', true)
        RoleGroup rGroup = RoleGroup.create(u.username, true)
        UserRoleGroup uRoleGroup = UserRoleGroup.create(u, rGroup, true)


        expect:
        uRoleGroup != null
        //true == UserRoleGroup.removeAll(u, true)

        cleanup:
        rGroup.delete flush:true
        u.delete flush:true
    }
}
