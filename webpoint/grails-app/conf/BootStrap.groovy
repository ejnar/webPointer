import grails.converters.JSON
import se.webpoint.auth.Role
import se.webpoint.auth.RoleGroup
import se.webpoint.auth.RoleGroupRole
import se.webpoint.auth.User
import se.webpoint.auth.UserRole
import se.webpoint.auth.UserRoleGroup
import se.webpoint.bok.Book
import se.webpoint.data.SectionMeta


class BootStrap {

    def init = { servletContext ->
		
//		JSON.registerObjectMarshaller(GroupOfSection) {
//			def output = [:]
//			output['id'] = it.id
//			output['originalTitle'] = it.originalTitle
//			output['category'] = it.category
//			output['sections'] = it.sections
//			output['sectionMetas'] = it.sectionMetas
//			return output
//		}
//		
//		
//		JSON.registerObjectMarshaller(SectionMeta) {
//			def output = [:]
//			output['sectionId'] = it.sectionId
//			output['language'] = it.language
//			output['title'] = it.title
//			output['sectionType'] = it.sectionType		
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
		
		Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?:
		new Role(authority: "ROLE_ADMIN").save(failOnError: true)
		
		RoleGroup groupAdmin = RoleGroup.findByName("GROUP_ADMIN") ?:
		new RoleGroup(name: "GROUP_ADMIN").save(failOnError: true)
		
		RoleGroupRole.get(groupAdmin.id, roleAdmin.id) ?: 
		RoleGroupRole.create(groupAdmin, roleAdmin, true)
		
		User user = User.findByUsername("admin") ?:
		new User(username: 'admin', password: '123').save(failOnError: true)
				
		UserRole.get(user.id, roleAdmin.id) ?:
		UserRole.create(user, roleAdmin, true)
		
		UserRoleGroup.get(user.id, groupAdmin.id) ?:
		UserRoleGroup.create(user, groupAdmin, true)
		
		
		
		
		
		
		
    }
    def destroy = {
    }
}
