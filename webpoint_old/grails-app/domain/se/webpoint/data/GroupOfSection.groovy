package se.webpoint.data
//@Resource(formats = ['json', 'xml'])
class GroupOfSection extends BaseDomain {

	String originalTitle
	String category
	Date modify

	
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
