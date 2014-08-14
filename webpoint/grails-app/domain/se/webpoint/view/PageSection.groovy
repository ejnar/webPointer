package se.webpoint.view

import se.webpoint.data.Section




class PageSection {

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
