package se.webpoint.data

import grails.validation.Validateable
import groovy.transform.EqualsAndHashCode

class PageListUtil extends BaseDomain implements Validateable{

    List<String> parts = new ArrayList()
    static embedded = ['parts']

    static constraints = {
        parts(nullable: true)
    }

    String toString(){
        "PageListUtil - id: ${id} parts: ${parts}"
    }

}
