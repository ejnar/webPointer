package se.webpoint.data

import java.util.List;


class PageData {

	static mapWith="mongo"
	
	String id
	String style
	String color
//	
//	String part
	
	List<SectionMeta> sectionMetas = new ArrayList()
	 
	static hasMany = [sectionMetas : SectionMeta]
	
	static constraints = {
		style(blank: false)
		color(blank: false)
	}
		
	
}
