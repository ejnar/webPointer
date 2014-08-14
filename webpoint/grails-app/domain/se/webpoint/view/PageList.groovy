package se.webpoint.view


class PageList {

	static mapWith="mongo"
	
	String id
	String name
	Date dueDate
	String style
	
	List<PageSection> pageParts
	
	static embedded = [ 'pageParts' ]
	
    static constraints = {
		pageParts (blank: false)
		dueDate (min:new Date())
		style (inList: ["one", "two"])
    }
	
	String toString(){
		"${name}"
	}
}
