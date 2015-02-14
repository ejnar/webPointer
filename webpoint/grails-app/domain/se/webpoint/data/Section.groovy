package se.webpoint.data

import java.util.Date;
import java.util.Set;

import org.bson.types.ObjectId

import se.webpoint.auth.RoleGroup;

//@Resource(formats=['json', 'xml'])
class Section {
	
	static mapWith="mongo"
	
	ObjectId id
	String data
	String type
	String key
	Date updated
	SectionMeta sectionMeta
	
	Set<RoleGroup> roleGroupSet;

//	static transients = ['meta']
//	static belongsTo = SectionMeta
	
	static embedded = ['roleGroupSet']
	
	static mapping = {
//		stateless true
	}
	
	static constraints = {
		data nullable: false
		type nullable: false
		key nullable: true
		updated nullable: true
	}
	
	def beforeInsert () { }
	def beforeUpdate () { updated = new Date();}
	def afterInsert () { }
	def afterUpdate () { }
	
	String toString(){
		"${id}"
	}   
}