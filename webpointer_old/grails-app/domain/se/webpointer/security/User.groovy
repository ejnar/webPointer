package se.webpointer.security


class User {
	
	String userName
	String firstName
	String lastName
	String email
	
	static belongsTo = [group: UserGroup]
	
    static constraints = {
    }
}
