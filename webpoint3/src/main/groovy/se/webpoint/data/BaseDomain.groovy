package se.webpoint.data

import org.bson.types.ObjectId

/**
 * Created by ejnarakerman on 24/07/16.
 */
abstract class BaseDomain implements Serializable {
    static mapWith = "mongo"
    ObjectId id
}
