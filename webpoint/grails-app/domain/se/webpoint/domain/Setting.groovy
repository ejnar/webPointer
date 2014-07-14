package se.webpoint.domain

import grails.rest.Resource

@Resource(formats=['json', 'xml'])
class Setting {
	Long id
	String title

    static constraints = {
    }
}
