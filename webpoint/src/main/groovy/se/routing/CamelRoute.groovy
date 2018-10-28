package se.routing

import org.apache.camel.ProducerTemplate

/**
 * Created by ejnarakerman on 2017-09-13.
 */
class CamelRoute {

    /**
     * Camel producer used to send messages
     */
    ProducerTemplate producerTemplate

    void sendMessage(String endpoint, Object message){
        producerTemplate.sendBody(endpoint,message)
    }
}
