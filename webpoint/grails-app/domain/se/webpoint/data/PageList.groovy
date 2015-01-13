package se.webpoint.data

import org.bson.types.ObjectId


class PageList {

	static mapWith="mongo"
	
	ObjectId id
	String name
	String category
	Date modify
//	String style
	
	List<PageData> pageParts = new ArrayList()
	
	static embedded = [ 'pageParts' ]
	
    static constraints = {
		modify nullable: true
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
