package se.webpoint.view

import grails.rest.Resource

@Resource(formats=['json', 'xml'])
class Setting {
	String id
	String key
	Object value

    static constraints = {
    }
}
