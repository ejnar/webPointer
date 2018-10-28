package se.webpoint.auth


import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

/**
 * Created by ejnarakerman on 2017-08-13.
 */
class PasswordTokenController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [ token: "GET", update: "PUT" ]

    static String HEADERTOKEN = "XSS-Token";

    UserService userService



    def token() {
        log.debug ' --- PasswordTokenController.token '
        PasswordToken instance = userService.getToken(params.value);
        response.addHeader(HEADERTOKEN, instance.token2);
        respond instance, [status: OK]
    }

    def update(UserPassword instance) {
        log.debug ' --- PasswordTokenController.update - UserPassword: [{}]', instance
        try{
            userService.setNewPassword(instance, request.getHeader('xss-token'))
        } catch(e) {
            respond [:], [status: NO_CONTENT]
            return
        }
        respond [:], [status: NO_CONTENT]
    }

}
