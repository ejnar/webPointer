package se.webpoint.data

import java.util.Date;

import org.bson.types.ObjectId


class SectionMeta {   //implements Serializable
	
	static mapWith="mongo"
	
	ObjectId id
	String originalTitle
	String title
	String category
	String language
	String sectionType
	Date modify
	Section section

	static mapping = {
//		originalTitle index:true
		title index:true
	}
	
	static constraints = {
		originalTitle nullable: true
		title nullable:false, index:true
		category nullable: true
		language nullable:false 
		sectionType nullable:true 
		section nullable:false
		modify nullable: true
	}
	
	def beforeInsert () { if(originalTitle == null) originalTitle = title;}
	def beforeUpdate () { modify = new Date();}
	def afterInsert () { }
	def afterUpdate () { }
	
	
	public String getSectionId(){
		return section.id;
	}
	
	public Date getTimestamp(){
		return new Date( id._time() * 1000 );
	}
	
	String toString(){
		"${title}" + "${language}" + "${sectionType}"
	}

}
