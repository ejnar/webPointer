package se.webpointer.domain

import grails.rest.Resource
import se.webpointer.type.DataType


//@Resource()   // uri='/parts',   
class Part {
	
	static mapWith="mongo"
	  
	String data
	String lang
	DataType type
	
//	static belongsTo = [dataParts: DataParts ]
	
    static constraints = {
		data(blank: false)
		lang(blank: false)
		type(blank: false)
    }
}
