package se.webpoint.util

import grails.gorm.transactions.Transactional
import org.bson.types.ObjectId

import java.time.LocalDateTime
import java.time.ZoneId

@Transactional
class EventService {


    def boolean validateRemoteHost(String host) {
        log.debug ' --- EventService.validateRemoteHost - host: [{}]', host
        Event event = Event.findByRemoteHost(host)
        Date eventUpdate
        if(event == null){
            event = new Event(event: EventType.ACCESS_REMOTE, description: "Atempt to access the site", remoteHost: host)
            event.insert flush: true
        }else{
            eventUpdate = new Date(event.getUpdate().getTime())
            log.warn 'Atempt to access the site - count: [{}]', event.getCounter()
            event.save flush:true
        }
        LocalDateTime now = LocalDateTime.now().minusSeconds(2)
        LocalDateTime update = eventUpdate.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        if(update.isAfter(now)){
            log.debug 'is after - now: [{}] - update: [{}]', now, update
            return false
        }else{
            log.debug 'is befor - now: [{}] - update: [{}]', now, update
            return true
        }
    }


}
