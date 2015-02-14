package se.webpoint.auth


class Role {
	
	String authority
	boolean system;
	
	static mapping = {
		cache true
		system defaultValue: true
	}

	static constraints = {
		authority blank: false, unique: true
	}
	
	String toString(){
		authority
	}
}
