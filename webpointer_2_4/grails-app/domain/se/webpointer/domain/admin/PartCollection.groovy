package se.webpointer.domain.admin

import grails.rest.Resource
import se.webpointer.type.CategoryType

//@Resource(formats=['html', 'json'])
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
