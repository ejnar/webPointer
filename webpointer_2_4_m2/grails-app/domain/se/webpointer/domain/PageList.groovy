package se.webpointer.domain

import grails.rest.Resource


//@Resource(formats=['html', 'json'])
class PageList {
	
	static mapWith="mongo"
	
	String name
	Date dueDate
	String style
	
	List<PagePart> pageParts
	
	static embedded = ['pageParts', 'pageParts']
	
    static constraints = {
		pageParts(blank: false)
		dueDate(min:new Date())
		style(inList: ["one", "two"])
    }
}
