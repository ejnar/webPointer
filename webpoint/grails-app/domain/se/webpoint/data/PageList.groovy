package se.webpoint.data


class PageList {

	static mapWith="mongo"
	
	String id
	String name
	String category
//	Date dueDate
//	String style
	
	List<PageData> pageParts = new ArrayList()
	
	static embedded = [ 'pageParts' ]
	
    static constraints = {
//		pageParts (blank: false)
//		dueDate (min:new Date())
//		style (inList: ["one", "two"])
    }
	
	String toString(){
		"${name} : ${category}"
	}
}
