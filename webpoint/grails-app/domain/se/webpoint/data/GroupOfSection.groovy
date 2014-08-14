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
	
    static constraints = {
		title (blank:false, index:true)  //, indexAttributes: [unique:true, dropDups:true]
		originalTitle (blank:true, index:true)
		category (blank:false)
    }
	
	String toString(){
		"${title}"
	}
}
