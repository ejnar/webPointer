package se.webpoint.data




//@Resource(formats=['json', 'xml'])
class GroupOfSection {

	static mapWith="mongo"
	
	String id
	String originalTitle
	String category

	List<Section> sections
	List<SectionMeta> sectionsMeta
	
	static embedded = ['sectionsMeta']
	static hasMany = [sections : Section]  //   sectionsMeta: SectionMeta
	
	
	static mapping = {
//		stateless true
//		sectionsMeta fetch: 'join'
//		sectionsMeta lazy: false
//		title index:true  //, indexAttributes: [unique:true, dropDups:true]
		originalTitle index:true
//		sections nullable: true
//		sectionsMeta nullable: true
	}
	
	static beforeInsert = { }
	
    static constraints = {
		originalTitle (blank:true)
		category (blank:false)
    }
	
	String toString(){
		"${title}"
	}
	
	
}
