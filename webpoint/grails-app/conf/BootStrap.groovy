import se.webpoint.auth.Role
import se.webpoint.auth.User
import se.webpoint.auth.UserRole
import se.webpoint.domain.data.Book

class BootStrap {

    def init = { servletContext ->
		
		new Book(title:"Java Persistence with Hibernate", author:"Gavin King", price:99.00).save()
		new Book(title:"Spring Live", author:"Matt Raible", price:29.00).save()
		
		
		Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?:
		new Role(authority: "ROLE_ADMIN").save(failOnError: true, flush:true)


		User user = User.findByUsername("admin") ?:
			new User(username: 'admin',
				password: 'admin123',
				email: 'hussain.engr@gmail.com',
				name: 'Hussain Fakhruddin',
				authorities: [roleAdmin]).save(failOnError: true, flush:true)
		
				
		UserRole.get(user.id, roleAdmin.id) ?: UserRole.create(user,roleAdmin, true)
		
//		Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?:
//		new Role(authority: "ROLE_ADMIN").save(failOnError: true)
//		
//		RoleGroup groupAdmin = RoleGroup.findByName("GROUP_ADMIN") ?:
//		new RoleGroup(name: "GROUP_ADMIN").save(failOnError: true)
//		
//		RoleGroupRole.create(groupAdmin, roleAdmin)
//		
//		
//		User user = User.findByUsername("admin") ?:
//		new User(username: 'admin', password: 'admin123').save(failOnError: true)
//				
//		UserRoleGroup.create(user, groupAdmin);
    }
    def destroy = {
    }
}
