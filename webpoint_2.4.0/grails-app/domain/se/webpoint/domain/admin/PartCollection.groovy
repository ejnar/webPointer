package se.webpoint.domain.admin

import se.webpoint.type.CategoryType


class PartCollection {

	static mapWith="mongo"
	
	String id
	String title
	String originalTitle
	CategoryType category
	
//	List<Part> parts
	
	static hasMany = [parts : Part]
	
    static constraints = {
		title (blank:false, index:true)  //, indexAttributes: [unique:true, dropDups:true]
		originalTitle (blank:true, index:true)
		category (blank:false)
    }
	
	String toString(){
		"${title}"
	}
}
