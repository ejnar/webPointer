package se.webpoint.domain.data

import grails.rest.Resource
import se.webpoint.type.DataType

@Resource(formats=['json', 'xml'])
class Part {
	
	static mapWith="mongo"
	
	String id
	String data
	String lang
	DataType type = DataType.TEXT
	
//	PartCollection partCollection
	
	static belongsTo = [partCollection: PartCollection ]
	
	static constraints = {
		type(blank: false)
		lang(blank:false, size:2..5)
		data(blank: false,  widget:'textarea', rows:20, cols:40)
	}
	
	String toString(){
		"${lang}" + "${type}"
	}
    
}
