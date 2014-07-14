package se.webpoint.domain

import java.util.Date;
import java.util.List;

import se.webpoint.domain.PagePart;

class PageList {

	static mapWith="mongo"
	
	String id
	String name
	Date dueDate
	String style
	
	List<PagePart> pageParts
	
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
