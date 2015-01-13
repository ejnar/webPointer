package se.webpoint.data

import org.bson.types.ObjectId


class PageData {

//	static mapWith="mongo"
	
	String key
	String style
	String color
	
	List<Section> sections = new ArrayList()
	 
	
	PageData() {
		this.key = ObjectId.get().toHexString();
	}
	
	
	static hasMany = [sections : Section]
	
	static constraints = {
		style(blank: false)
		color(blank: false)
	}
		
	
	String toString(){
		"${key}"
	}
	
}
