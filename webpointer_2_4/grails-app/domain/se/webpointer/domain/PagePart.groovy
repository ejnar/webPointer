package se.webpointer.domain

import se.webpointer.domain.admin.Part;
import grails.rest.Resource


//@Resource(formats=['html', 'json'])
class PagePart {
	
	static mapWith="mongo"
	
	String id
	String title
	String style
	String color
	
	Part part
	
    static constraints = {
		title(blank: true)
		style(blank: true)
		color(blank: true)
    }
	
	String toString(){
		"${title}"
	}

}
