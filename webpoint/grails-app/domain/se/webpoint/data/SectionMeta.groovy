package se.webpoint.data

import se.webpoint.type.DataType;

class SectionMeta {
	
	static mapWith="mongo"
	
	String sectionId
	String language
	String title
//	String mKey
	DataType sectionType = DataType.TEXT
	
//	Map meta = new HashMap()
//	static embedded = ['meta']
	
	static constraints = {
//		title nullable:true, index:true
//		language blank:false, size:2..5
//		sectionType nullable:true 
	}
	
	String toString(){
		"${title}" + "${language}" + "${sectionType}"
	}

}
