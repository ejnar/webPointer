package se.webpoint.domain

import grails.rest.Resource;

@Resource(formats=['json', 'xml'])
class Book {

 	String title
	String author
	Double price

    static constraints = {
		title blank:false, uique:true
		author blank:false   
    }
	
	String toString(){
		"${title}"
	}
}
