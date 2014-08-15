package se.webpoint.data

import grails.rest.Resource

@Resource(formats=['json', 'xml'])
class Section {
	
	static mapWith="mongo"
	
	String id
	String data
	String lang
//	DataType type = DataType.TEXT
//	GroupOfSection groupOfSection
	
//	static belongsTo = [groupOfSection: GroupOfSection ]
	
	
	static mapping = {
		cache true
	}
	
	static constraints = {
		lang(blank:false, size:2..5)
	}
	
	String toString(){
		"${lang}"    //+ "${type}"
	}
    
}
