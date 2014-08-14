package se.webpoint.domain.view

import se.webpoint.domain.data.Section



class PagePart {

	static mapWith="mongo"
	
	String id
	String title
	String style
	String color
	
	Section part
	
	static constraints = {
		title(blank: true)
		style(blank: true)
		color(blank: true)
	}
	
	String toString(){
		"${title}"
	}

	
	
}
