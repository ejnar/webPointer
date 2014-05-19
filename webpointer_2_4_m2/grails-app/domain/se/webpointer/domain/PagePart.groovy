package se.webpointer.domain

import grails.rest.Resource


//@Resource(formats=['html', 'json'])
class PagePart {
	
	static mapWith="mongo"
	
	String title
	String style
	String color
	
	Part part
	
    static constraints = {
		title(blank: true)
		style(blank: true)
		color(blank: true)
    }
}
