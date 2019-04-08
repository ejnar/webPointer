package se.webpoint.data

import org.bson.types.ObjectId

import java.time.format.DateTimeFormatter
import java.time.ZonedDateTime

//import org.bson.types.BSONTimestamp

/**
 * Created by ejnarakerman on 24/07/16.
 */
abstract class BaseDomain implements Serializable {
    static mapWith = "mongo"
    ObjectId id


    def getIsoDate(){
        return ZonedDateTime.now().format( DateTimeFormatter.ISO_INSTANT )
    }

    def getCreateDate(){
        return id.getDate();
    }
}
