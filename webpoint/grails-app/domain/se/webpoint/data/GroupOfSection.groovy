package se.webpoint.data




//@Resource(formats=['json', 'xml'])
class GroupOfSection {

	static mapWith="mongo"
	
	String id
	String originalTitle
	String category
	
//	List<Section> sections
	List<SectionMeta> sectionMetas = new ArrayList()
	
//	static hasMany = [sections : Section]
	static embedded = ['sectionMetas']
	
	static mapping = {
		originalTitle nullable: false, index:true
//		stateless true
//		sectionsMeta fetch: 'join'
//		sectionsMeta lazy: false
//		title index:true  //, indexAttributes: [unique:true, dropDups:true]
//		sections nullable: true
//		sectionsMeta nullable: true
	}
	
	static beforeInsert = { }
	
    static constraints = {
		originalTitle nullable: false, index:true
    }
	
	String toString(){
		"${originalTitle}"
	}
	
	
}
