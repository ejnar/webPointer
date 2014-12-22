package se.webpoint.data

//@Resource(formats=['json', 'xml'])
class Section {
	
	static mapWith="mongo"
	
	String id
	String data
	String groupId
	
	static belongsTo = SectionMeta
	
	static mapping = {
//		stateless true
	}
	
//	static beforeInsert = { 
//		data = 'test'
//	}
	
	static constraints = {
		data nullable: false
		groupId nullable: false
	}
	
	String toString(){
		"${id}"
	}   
}