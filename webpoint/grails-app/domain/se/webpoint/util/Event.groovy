package se.webpoint.util

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import org.bson.types.ObjectId
import se.webpoint.data.BaseDomain

@ToString
@EqualsAndHashCode(includes='id')
class Event extends BaseDomain{

    ObjectId domainId
    Date update
    Date created
    EventType event
    String description
    String remoteHost
    long counter = 1;

    static constraints = {
        domainId nullable: true
        update nullable: true
        created nullable: true
        description nullable: true, blank:true
        remoteHost nullable: true, blank:true
    }

    def beforeInsert() { created = new Date(); update = new Date();}
    def beforeUpdate(){ update = new Date(); counter++;}

    static Event create(ObjectId domainId, EventType event, String description, String remoteHost, boolean flush = false) {
        def instance = new Event(domainId: domainId, event: event, description: description, remoteHost: remoteHost)
        instance.counter = 1
        instance.save (flush: flush, insert: true)
        return instance
    }
}
