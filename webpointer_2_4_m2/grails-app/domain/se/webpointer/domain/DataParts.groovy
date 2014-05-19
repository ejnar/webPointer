package se.webpointer.domain

import grails.rest.Resource
import se.webpointer.type.CategoryType

//@Resource(formats=['html', 'json'])
class DataParts {
	
	static mapWith="mongo"
	
	String title
	String originalTitle
	CategoryType category
	
	static hasMany = [dataPart : Part]
	
    static constraints = {
		title(blank: false)
		originalTitle(blank: true)
		category(blank: false)
    }
}
