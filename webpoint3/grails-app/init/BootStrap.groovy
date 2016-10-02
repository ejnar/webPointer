import grails.converters.JSON
import org.bson.types.ObjectId
import se.webpoint.auth.*
import se.webpoint.auth.UserDetail
import se.webpoint.auth.UserPassword
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

//        JSON.registerObjectMarshaller(Section) {
//            def output = [:]
//            output['id'] = it.id
//            output['data'] = it.data
//            output['type'] = it.type
//            output['key'] = it.key
//            output['updated'] = dateFormatter.format(it.updated)
//            output['sectionMeta'] = SectionMeta(it.sectionMeta)
//            return output
//        }

        Role roleSysAdmin = Role.findByAuthority("SYS_ROLE_ADMIN") ?: new Role(authority: "SYS_ROLE_ADMIN", system: true, order: 0).save(flush: true, failOnError: true)
        Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?: new Role(authority: "ROLE_ADMIN", system: false, order: 1).save(flush: true, failOnError: true)
        Role roleView = Role.findByAuthority("ROLE_VIEW") ?: new Role(authority: "ROLE_VIEW", system: false, order: 5).save(flush: true, failOnError: true)

        RoleGroup groupSysAdmin = RoleGroup.findByName("SYS_GROUP_ADMIN") ?: new RoleGroup(name: "SYS_GROUP_ADMIN", system: true).save(flush: true, failOnError: true)
        RoleGroup groupExt = RoleGroup.findByName("GROUP_ADMIN") ?: new RoleGroup(name: "GROUP_ADMIN", system: false).save(flush: true, failOnError: true)
        RoleGroup groupPT = RoleGroup.findByName("GROUP_P_TRELLEBORG") ?: new RoleGroup(name: "GROUP_P_TRELLEBORG", system: false).save(flush: true, failOnError: true)

        RoleGroupRole.get(groupSysAdmin.id, roleSysAdmin.id) ?: RoleGroupRole.create(groupSysAdmin, roleSysAdmin, true)

        RoleGroupRole.get(groupExt.id, roleAdmin.id) ?: RoleGroupRole.create(groupExt, roleAdmin, true)
        RoleGroupRole.get(groupExt.id, roleView.id) ?: RoleGroupRole.create(groupExt, roleView, true)

        RoleGroupRole.get(groupPT.id, roleAdmin.id) ?: RoleGroupRole.create(groupPT, roleAdmin, true)
        RoleGroupRole.get(groupPT.id, roleView.id) ?: RoleGroupRole.create(groupPT, roleView, true)

        User user = User.findByUsername("admin") ?: new User(username: 'admin', password: '123', email: 'ejnar.ak@glocalnet.net').save(flush: true, failOnError: true)

//        UserRole.get(user.id, roleSysAdmin.id) ?: UserRole.create(user, roleSysAdmin, true)
//        UserRole.get(user.id, roleAdmin.id) ?: UserRole.create(user, roleAdmin, true)

        UserRoleGroup.get(user.id, groupSysAdmin.id) ?: UserRoleGroup.create(user, groupSysAdmin, true)
        UserRoleGroup.get(user.id, groupExt.id) ?: UserRoleGroup.create(user, groupExt, true)
        UserRoleGroup.get(user.id, groupPT.id) ?: UserRoleGroup.create(user, groupPT, true)

        Setting.findByKey("category") ?: new Setting(key: "category", groups: ['SYS_GROUP_ADMIN'], values: ['Worship', 'Christian', 'Hymns', 'Gospel', 'Christmas carols', 'Traditional']).save(flush: true, failOnError: true)
        Setting.findByKey("tagg") ?: new Setting(key: "tagg", groups: ['GROUP_P_TRELLEBORG'], values: ['Praise', 'Speedy', 'Trashy']).save(flush: true, failOnError: true)

    }
    def destroy = {

    }
}
