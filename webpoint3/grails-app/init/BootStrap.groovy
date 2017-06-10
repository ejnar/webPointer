import grails.converters.JSON
import grails.util.Environment
import org.bson.types.ObjectId
import se.webpoint.auth.*
import se.webpoint.data.PageItem
import se.webpoint.view.Setting

class BootStrap {

    def init = { servletContext ->

        JSON.registerObjectMarshaller(ObjectId) {
            return it.toStringMongod()
//            return it.toHexString()
        }

        JSON.registerObjectMarshaller(PageItem) {
            def output = [:]
            output['key'] = it.key
            output['style'] = it.style
            output['color'] = it.color
            output['section'] = it.section
            return output
        }

        JSON.registerObjectMarshaller(Role) {
            def output = [:]
            output['authority'] = it.authority
            return output
        }

        JSON.registerObjectMarshaller(RoleGroup) {
            def output = [:]
            output['name'] = it.name
            return output
        }

        JSON.registerObjectMarshaller(UserDetail) {
            def output = [:]
            output['username'] = it.username
            output['email'] = it.email
            output['authority'] = it.authority
            output['rolegroup'] = it.rolegroup
            return output
        }

        JSON.registerObjectMarshaller(UserPassword) {
            def output = [:]
            output['currentPassword'] = it.currentPassword
            output['newPassword'] = it.newPassword
            output['confirmPassword'] = it.confirmPassword
            return output
        }

        JSON.registerObjectMarshaller(User) {
            def output = [:]
            output['accountExpired'] = it.accountExpired
            output['accountLocked'] = it.accountLocked
            output['enabled'] = it.enabled
            output['passwordExpired'] = it.passwordExpired
            output['username'] = it.username
            output['email'] = it.email
            return output
        }

        Setting cashUpdate = Setting.findByKey("cashUpdate") ?: new Setting(key: "cashUpdate", values: [true, new Date()]).save(flush: true, failOnError: true)
        cashUpdate.values = [true, new Date()];
        cashUpdate.save(flush: true, failOnError: true);

        if (Environment.current == Environment.DEVELOPMENT || Environment.current == Environment.TEST) {

            Role roleSysAdmin = Role.findByAuthority("SYS_ROLE_ADMIN") ?: new Role(authority: "SYS_ROLE_ADMIN", system: true, order: 0).save(flush: true, failOnError: true)
            Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?: new Role(authority: "ROLE_ADMIN", system: false, order: 1).save(flush: true, failOnError: true)
            Role roleView = Role.findByAuthority("ROLE_VIEW") ?: new Role(authority: "ROLE_VIEW", system: false, order: 5).save(flush: true, failOnError: true)

            RoleGroup groupSysAdmin = RoleGroup.findByName("SYS_GROUP_ADMIN") ?: new RoleGroup(name: "SYS_GROUP_ADMIN", system: true).save(flush: true, failOnError: true)
            RoleGroup groupAdmin = RoleGroup.findByName("GROUP_ADMIN") ?: new RoleGroup(name: "GROUP_ADMIN", system: false).save(flush: true, failOnError: true)
            RoleGroup groupPingst = RoleGroup.findByName("GROUP_PINGST_TRELLEBORG") ?: new RoleGroup(name: "GROUP_PINGST_TRELLEBORG", system: false).save(flush: true, failOnError: true)

            RoleGroupRole.get(groupSysAdmin.id, roleSysAdmin.id) ?: RoleGroupRole.create(groupSysAdmin, roleSysAdmin, true)

            RoleGroupRole.get(groupAdmin.id, roleAdmin.id) ?: RoleGroupRole.create(groupAdmin, roleAdmin, true)
            RoleGroupRole.get(groupAdmin.id, roleView.id) ?: RoleGroupRole.create(groupAdmin, roleView, true)

//            RoleGroupRole.get(groupPT.id, roleAdmin.id) ?: RoleGroupRole.create(groupPT, roleAdmin, true)
            RoleGroupRole.get(groupPingst.id, roleView.id) ?: RoleGroupRole.create(groupPingst, roleView, true)

            User admin = User.findByUsername("admin") ?: new User(username: 'admin', password: '123', email: 'eaakerman@gmail.com').save(flush: true, failOnError: true)
//            admin.password = ""
//            admin.encodePassword
//            admin.save(flush: true, failOnError: true)
            UserRoleGroup.get(admin.id, groupSysAdmin.id) ?: UserRoleGroup.create(admin, groupSysAdmin, true)
            UserRoleGroup.get(admin.id, groupAdmin.id) ?: UserRoleGroup.create(admin, groupAdmin, true)
            UserRoleGroup.get(admin.id, groupPingst.id) ?: UserRoleGroup.create(admin, groupPingst, true)

            User user = User.findByUsername("user") ?: new User(username: 'user', password: '123', email: 'eaakerman@gmail.com').save(flush: true, failOnError: true)
//            user.password = "123"
//            user.encodePassword
//            user.save(flush: true, failOnError: true)
            UserRoleGroup.get(user.id, groupPingst.id) ?: UserRoleGroup.create(user, groupPingst, true)

    //        UserRole.get(user.id, roleSysAdmin.id) ?: UserRole.create(user, roleSysAdmin, true)
    //        UserRole.get(user.id, roleAdmin.id) ?: UserRole.create(user, roleAdmin, true)

            Setting.findByKey("category") ?: new Setting(key: "category", groups: ['SYS_GROUP_ADMIN'], values: ['Worship', 'Christian', 'Hymns', 'Gospel', 'Christmas carols', 'Traditional']).save(flush: true, failOnError: true)
            Setting.findByKey("tagg") ?: new Setting(key: "tagg", groups: ['GROUP_PINGST_TRELLEBORG'], values: ['Praise', 'Speedy', 'Trashy', 'Ballad']).save(flush: true, failOnError: true)
        }
        if (Environment.current == Environment.PRODUCTION) {
            // insert Production environment specific code here
//            User admin = User.findByUsername("admin") ?: new User(username: 'admin', password: '123', email: 'ejnar.ak@glocalnet.net').save(flush: true, failOnError: true)
//            admin.password = ""
//            admin.encodePassword
//            admin.save(flush: true, failOnError: true)
//
//            User user = User.findByUsername("user") ?: new User(username: 'user', password: 'jesus', email: 'eaakerman@gmail.com').save(flush: true, failOnError: true)
////            user.password = "123"
////            user.encodePassword
////            user.save(flush: true, failOnError: true)
//            UserRoleGroup.get(user.id, groupPingst.id) ?: UserRoleGroup.create(user, groupPingst, true)
        }

    }
    def destroy = {

    }
}
