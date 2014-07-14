package se.webpointer.domain

import grails.rest.Resource;

//@Resource(uri='/api/page/data')
class PageData {
	
	String name
	String data
	String category
	
	String toString(){
		"${name}"
	}
	
	static belongsTo = [view: PageView]
	
    static constraints = {
		name(blank: false, uique:true)
		category()
		data()
    }
	
}
