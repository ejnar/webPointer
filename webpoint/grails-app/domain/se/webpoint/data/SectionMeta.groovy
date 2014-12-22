package se.webpoint.data

import java.util.List;


class SectionMeta {   //implements Serializable
	
	static mapWith="mongo"
	
	String id
	String title
	String language
	String sectionType
	
	Section section

//	static mapping = {
//	
//	}
	
	static constraints = {
		title nullable:false, index:true
		language nullable:false 
		sectionType nullable:true 
		section nullable:false
	}
	
	public String getSectionId(){
		return section.id;
	}
	
	String toString(){
		"${title}" + "${language}" + "${sectionType}"
	}

}
