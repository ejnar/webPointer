package se.webpoint.auth


class Role {
	
	String authority
	boolean system;
	
	static mapping = {
		cache true
		system defaultValue: true
	}

	static constraints = {
		authority nullable: false, blank: false, unique: true
		system nullable: true, blank: true
	}
	
	String toString(){
		authority
	}
}
