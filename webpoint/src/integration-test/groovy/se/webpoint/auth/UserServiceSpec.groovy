package se.webpoint.auth

import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import org.springframework.beans.factory.annotation.Autowired
import spock.lang.Specification

@Integration
@Rollback
class UserServiceSpec extends Specification  { //Specification

    @Autowired
    UserService service

//    void "test add authority to group"() {
//        given:
//        User user = User.findByUsername('admin')
//        Role role = Role.findByAuthority("ROLE_ADMIN")
//
//        when:
//        RoleGroup roleGroup = service.createRoleGroup('Test_Admin')
//        UserRoleGroup userRoleGroup = service.addAuthorityToUserRoleGroup(user, roleGroup, 1)
//
//        then:
//        roleGroup != null
//        roleGroup.name.equals("GROUP_TEST_ADMIN")
//        userRoleGroup != null
//        RoleGroupRole roleGroupRole = RoleGroupRole.get(roleGroup.id, role.id)
//        roleGroupRole != null
//        roleGroupRole.roleGroup.id == roleGroup.id
//
//        cleanup:
//        //userRoleGroup.delete flush:true
//        roleGroup.delete flush:true
//    }
//
//
//
//    void "test internal role created"() {
//        given:
//        Role role = Role.findByAuthority("SYS_ROLE_ADMIN")
//
//        expect:
//        role != null
//        role.authority.equals("SYS_ROLE_ADMIN")
//        Role.count() == 3
//    }

    void "test roleGroup created"() {
        given:
            RoleGroup roleGroup = service.createRoleGroup("username")

        expect:
            roleGroup != null
            roleGroup.name.equals("GROUP_USERNAME")

        cleanup:
            roleGroup.delete flush:true
    }


    void "test simpel role created"() {
        given:
            Role role = Role.create("TEST_Permission",true,0,true)

        expect:
            Role.findByAuthority("TEST_Permission").authority.equals("TEST_Permission")
            role.authority.equals("TEST_Permission")


        cleanup:
            role.delete flush:true
    }


}
