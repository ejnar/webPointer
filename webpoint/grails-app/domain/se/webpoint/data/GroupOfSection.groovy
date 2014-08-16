package se.webpoint.data



//@Resource(formats=['json', 'xml'])
class GroupOfSection {

	static mapWith="mongo"
	
	String id
	String title
	String originalTitle
	String category

	List<Section> sections = new ArrayList()
	
	static embedded = ['sections']
	static hasMany = [sections : Section]
	
	static mapping = {
//		stateless true
//		sections fetch: 'join'
		sections lazy: false
		title index:true  //, indexAttributes: [unique:true, dropDups:true]
		originalTitle index:true
	}
	
	
    static constraints = {
		title (blank:false)  
		originalTitle (blank:true)
		category (blank:false)
    }
	
	String toString(){
		"${title}"
	}
}
