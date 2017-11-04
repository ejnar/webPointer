package se.webpoint.websocket

import grails.converters.JSON
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.apache.commons.logging.LogFactory
import org.springframework.messaging.simp.SimpMessagingTemplate
import se.webpoint.data.SectionCash

/**
 * Created by ejnarakerman on 2017-11-04.
 */
class BrokerService {

    private static final log = LogFactory.getLog(this)
    SimpMessagingTemplate brokerMessagingTemplate

    void hello() {
        def msg = 'hello from service!'

        def obj = JSON.parse(msg)

        brokerMessagingTemplate.convertAndSend "/topic/hello", msg
    }


    void sendSongUpdate(SectionCash section) {
        log.debug(' --- sendSongUpdate')

        def jsonSlurper = new JsonSlurper()
        def object = jsonSlurper.parseText('{ ' +
                '"pageListId": "'+section.pageListId+'", ' +
                '"currentSectionId": "'+section.currentSectionId+'", ' +
                '"refresh": "'+section.refresh+'", ' +
                '"created": "'+section.created+'" } /* some comment */')

        brokerMessagingTemplate.convertAndSend "/topic/song",  object
    }
}
