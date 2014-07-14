package se.webpointer.domain

class PageList {
	
	String name
	
	String toString(){
		"${name}"
	}
	
	static hasMany = [view : PageView]
	
    static constraints = {
		name(blank: false, uique:true)
    }
}
