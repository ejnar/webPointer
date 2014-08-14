package se.webpoint.domain.data

import grails.rest.Resource
import se.webpoint.type.CategoryType


@Resource(formats=['json', 'xml'])
class GroupsOfSections {

	static mapWith="mongo"
	
	String id
	String title
	String originalTitle
	String category
	
	static hasMany = [sections : Section]
	
    static constraints = {
		title (blank:false, index:true)  //, indexAttributes: [unique:true, dropDups:true]
		originalTitle (blank:true, index:true)
		category (blank:false)
    }
	
	String toString(){
		"${title}"
	}
}
