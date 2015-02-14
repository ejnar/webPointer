package se.webpoint.auth


class UserDetail  {
	
	String username
	String email
	String authority
	String rolegroup
	
	UserDetail(){
	}
	
	UserDetail(String username, String email, String authority, String rolegroup){
		this.username = username
		this.email = email
		this.authority = authority
		this.rolegroup = rolegroup
	}
	
	
	
	String toString(){
		"${username}"
	}
	
}
