package se.webpoint.data

import se.webpoint.type.DataType

//@Resource(formats=['json', 'xml'])
class Section {
	
	static mapWith="mongo"
	
	String id
	String data
	String lang
	String groupOfSectionID
	DataType sectionType = DataType.TEXT
//	GroupOfSection groupOfSection
	
//	static belongsTo = [groupOfSection: GroupOfSection ]
//	static hasOne = [groupOfSection : GroupOfSection]
	
	static mapping = {
//		stateless true
	}
	
//	static beforeInsert = { 
//		data = 'test'
//	}
	
	static constraints = {
		lang(blank:false, size:2..5)
		sectionType(nullable:true)
	}
	
	String toString(){
		"${lang}"    //+ "${type}"
	}
    
}
