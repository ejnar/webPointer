import grails.converters.JSON

import org.bson.types.ObjectId

import se.webpoint.auth.Role
import se.webpoint.auth.RoleGroup
import se.webpoint.auth.RoleGroupRole
import se.webpoint.auth.User
import se.webpoint.auth.UserRole
import se.webpoint.auth.UserRoleGroup
import se.webpoint.data.PageData
import se.webpoint.data.Section


class BootStrap {

    def init = { servletContext ->
		
		
		JSON.registerObjectMarshaller(ObjectId) {
			return it.toHexString()
		}
		
		JSON.registerObjectMarshaller(Role) {		
			return it.authority
		}
		
		JSON.registerObjectMarshaller(RoleGroup) {
			return it.name
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
//		JSON.registerObjectMarshaller(Section) {
//			def output = [:]
//			output['id'] = it.id
//			output['data'] = it.data
//			output['groupId'] = it.groupId
//			output['meta'] = it.meta		
//			return output
//		}
		
		
//		new Book(title:"Java Persistence with Hibernate", author:"Gavin King", price:99.00).save()
//		new Book(title:"Spring Live", author:"Matt Raible", price:29.00).save()
		
		
//		Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?:
//		new Role(authority: "ROLE_ADMIN").save(failOnError: true, flush:true)
//
//
//		User user = User.findByUsername("admin") ?:
//			new User(username: 'admin',
//				password: 'admin123',
//				email: 'hussain.engr@gmail.com',
//				name: 'Hussain Fakhruddin',
//				authorities: [roleAdmin]).save(failOnError: true, flush:true)
//		
//				
//		UserRole.get(user.id, roleAdmin.id) ?: UserRole.create(user,roleAdmin, true)
		
		Role roleAdmin = Role.findByAuthority("SYS_ROLE_ADMIN") ?: new Role(authority: "SYS_ROLE_ADMIN", system: true).save(failOnError: true)
		Role roleView = Role.findByAuthority("ROLE_VIEW") ?: new Role(authority: "ROLE_VIEW", system: false).save(failOnError: true)
		
		RoleGroup groupAdmin = RoleGroup.findByName("SYS_GROUP_ADMIN") ?: new RoleGroup(name: "SYS_GROUP_ADMIN", system: true).save(failOnError: true)
		RoleGroup groupPT = RoleGroup.findByName("GROUP_P_TRELLEBORG") ?: new RoleGroup(name: "GROUP_P_TRELLEBORG", system: false).save(failOnError: true)
		
		RoleGroupRole.get(groupAdmin.id, roleAdmin.id) ?: RoleGroupRole.create(groupAdmin, roleAdmin, true)
		RoleGroupRole.get(groupPT.id, roleAdmin.id) ?: RoleGroupRole.create(groupPT, roleAdmin, true)
		
		User user = User.findByUsername("admin") ?: new User(username: 'admin', password: '123', email: 'ejnar.ak@glocalnet.net').save(failOnError: true)
				
		UserRole.get(user.id, roleAdmin.id) ?: UserRole.create(user, roleAdmin, true)
		
		UserRoleGroup.get(user.id, groupAdmin.id) ?: UserRoleGroup.create(user, groupAdmin, true)
		UserRoleGroup.get(user.id, groupPT.id) ?: UserRoleGroup.create(user, groupPT, true)
		
		
    }
    def destroy = {
    }
}
