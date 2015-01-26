package se.webpoint.data

import java.util.Date;

import org.bson.types.ObjectId

//@Resource(formats=['json', 'xml'])
class Section {
	
	static mapWith="mongo"
	
	ObjectId id
	String data
	String type
	String key
	Date modify
	SectionMeta sectionMeta

//	static transients = ['meta']
//	static belongsTo = SectionMeta
	
	static mapping = {
//		stateless true
	}
	
	static constraints = {
		data nullable: false
		type nullable: false
		key nullable: true
		modify nullable: true
	}
	
	def beforeInsert () { }
	def beforeUpdate () { modify = new Date();}
	def afterInsert () { }
	def afterUpdate () { }
	
	String toString(){
		"${id}"
	}   
}