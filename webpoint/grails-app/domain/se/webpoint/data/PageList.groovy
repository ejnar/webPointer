package se.webpoint.data

import org.bson.types.ObjectId


class PageList {

	static mapWith="mongo"
	
	ObjectId id
	String name
	String category
	Date updated
//	String style
	
	List<PageData> pageParts = new ArrayList()
	
	static embedded = [ 'pageParts' ]
	
    static constraints = {
		updated nullable: true
//		pageParts (blank: false)
//		dueDate (min:new Date())
//		style (inList: ["one", "two"])
    }
	
	def beforeInsert () { }
	def beforeUpdate () { modify = new Date();}
	def afterInsert () { }
	def afterUpdate () { }
	
	
	String toString(){
		"${name} : ${category}"
	}
}
