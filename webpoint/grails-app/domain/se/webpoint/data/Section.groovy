package se.webpoint.data

import se.webpoint.type.DataType

//@Resource(formats=['json', 'xml'])
class Section {
	
	static mapWith="mongo"
	
	String id
	String data
//	String language
//	String title
	String groupId
//	DataType sectionType = DataType.TEXT
	
//	static transients = ['language', 'title', 'sectionType']
	
//	GroupOfSection groupOfSection

//	static belongsTo = GroupOfSection //[groupOfSection: GroupOfSection ]
//	static hasOne = [groupOfSection : GroupOfSection]
	
	static mapping = {
//		stateless true
	}
	
//	static beforeInsert = { 
//		data = 'test'
//	}
	
	static constraints = {
	}
	
	String toString(){
		"${groupId}"    //+ "${type}"
	}
    
}
