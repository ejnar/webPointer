package se.webpoint.auth

import groovy.transform.ToString
import org.bson.types.ObjectId

@ToString()
class PasswordToken {

    ObjectId userId;

    String email
    String token
    String token2
    Date created

    static constraints = {
        created nullable: true
        token2 nullable: true
        email index: true, indexAttributes: [unique: true]
    }
    static mapping = {
        version false
    }
    def beforeInsert() {
        created = new Date()
    }

    static PasswordToken create(ObjectId userId, String email, String token, boolean flush = false) {
        def instance = new PasswordToken(userId: userId, email: email, token: token)
        instance.save (flush: flush)
        instance
    }


    def validate(_email, _token, _token2){

        if(email.equals(_email) && token.equals(_token) && token2.equals(_token2)){
            return true
        }
        return false
    }

}
