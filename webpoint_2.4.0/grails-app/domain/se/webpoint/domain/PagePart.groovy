package se.webpoint.domain

import se.webpoint.domain.admin.Part


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