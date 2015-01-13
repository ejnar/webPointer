package se.webpoint.data

import org.bson.types.ObjectId


//@Resource(formats=['json', 'xml'])
class GroupOfSection {

	static mapWith="mongo"
	
	ObjectId id
	String originalTitle
	String category
	Date modify
	
	List<SectionMeta> sectionMetas = new ArrayList()
	
	static embedded = ['sectionMetas']
	
	static mapping = {
		originalTitle index:true
//		stateless true
//		title index:true  //, indexAttributes: [unique:true, dropDups:true]
//		sections nullable: true
//		sectionsMeta nullable: true
	}
	
	static constraints = {
		originalTitle nullable: false, blank: false
		modify nullable: true
	}
	
    def beforeInsert () { }
	def beforeUpdate () { modify = new Date();}
	def afterInsert () { }
	def afterUpdate () { }	
	
	
	public Date getTimestamp(){
		return new Date( id._time() * 1000 );
	}
		
	String toString(){
		"${originalTitle}"
	}
	
	
}
