package se.webpoint.data

import grails.rest.Resource

@Resource(formats=['json', 'xml'])
class Setting {
	String id
	String key
	String value
	String category

    static constraints = {
    }
}
