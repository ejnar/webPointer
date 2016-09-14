package se.webpoint.auth

import org.bson.types.ObjectId

class AuthenticationToken {

    ObjectId id;

    String username
    String token
    Date created

    static constraints = {
        created nullable: true
    }
    static mapping = {
        version false
    }
    def beforeInsert() {
        created = new Date()
    }
}
