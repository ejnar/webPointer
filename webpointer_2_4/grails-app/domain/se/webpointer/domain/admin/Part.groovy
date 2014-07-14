package se.webpointer.domain.admin

import grails.rest.Resource
import se.webpointer.type.DataType


//@Resource()   // uri='/parts',   
class Part {
	
	static mapWith="mongo"
	
	String id
	String data
	String lang
	DataType type
	
//	PartCollection partCollection
	
	static belongsTo = [partCollection: PartCollection ]
	
    static constraints = {
		type(blank: false)
		lang(blank:false, size:2..5)
		data(blank: false,  widget:'textarea', rows:20, cols:40)
    }
	
	
} 
