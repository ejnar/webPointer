package se.routing

import groovy.transform.CompileStatic
import org.apache.camel.ProducerTemplate


/**
 * Trait which delivers camel functionality to
 * controllers, services, jobs and potentially other artefacts.
 *
 * Example:
 * def myMessage = [name:"foo",data:"bar"]
 * sendMessage("seda:input.queue", myMessage)
 * sendMessage("seda:input","seda.test")
 *
 */
@CompileStatic
trait CamelRouteAware {

    /**
     * Camel producer used to send messages
     */
    ProducerTemplate producerTemplate

    void sendMessage(String endpoint, Object message){
        producerTemplate.sendBody(endpoint,message)
    }

}