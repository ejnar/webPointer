import se.webpoint.domain.Book
import se.webpoint.domain.Setting
import se.webpoint.domain.auth.Role
import se.webpoint.domain.auth.User

class BootStrap {

    def init = { servletContext ->
		new Book(title:"Java Persistence with Hibernate", author:"Gavin King", price:99.00).save()
		new Book(title:"Spring Live", author:"Matt Raible", price:29.00).save()
		
		new Setting(id:1, title:"Book List").save()
		
		
		Role roleAdmin = Role.findByAuthority("ROLE_ADMIN") ?:
		new Role(authority: "ROLE_ADMIN").save(failOnError: true)


		User.findByUsername("admin") ?:
			new User(username: 'admin',
				password: 'admin123',
				email: 'eaakerman@gmail.com',
				name: 'Ejnar Akerman',
				authorities: [roleAdmin]).save(failOnError: true)
		
		
    }
    def destroy = {
    }
}
