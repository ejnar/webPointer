package se.webpoint.websocket

import grails.converters.JSON
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import groovy.util.logging.Slf4j
import org.springframework.messaging.simp.SimpMessagingTemplate
import se.webpoint.data.SectionCash

/**
 * Created by ejnarakerman on 2017-11-04.
 */
@Slf4j
class BrokerService {

    SimpMessagingTemplate brokerMessagingTemplate

    void hello() {
        def msg = 'hello from service!'
        brokerMessagingTemplate.convertAndSend "/topic/hello", msg
    }

    void sendSongUpdate(SectionCash section) {
        log.debug ' --- BrokerService.sendSongUpdate '

        def jsonSlurper = new JsonSlurper()
        def object = jsonSlurper.parseText('{ ' +
                '"pageListId": "'+section.pageListId+'", ' +
                '"currentSectionId": "'+section.currentSectionId+'", ' +
                '"refresh": "'+section.refresh+'", ' +
                '"created": "'+section.created+'" } /* some comment */')

        brokerMessagingTemplate.convertAndSend "/topic/"+section.pageListId,  object
    }
}
